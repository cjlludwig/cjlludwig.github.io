#!/usr/bin/env node
// Generates src/components/music-data.js from ludwig.json
// Uses Spotify's public oEmbed API (no credentials required) to resolve album art.
// Run: node scripts/parse-music.js

import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

const raw = JSON.parse(readFileSync(join(ROOT, 'ludwig.json'), 'utf8'))
const favorites = raw.likely_favorites ?? []

// Deduplicate by album name, keeping the highest-affinity track per album
const albumMap = new Map()
for (const track of favorites) {
  const key = track.album
  if (!albumMap.has(key) || track.affinity_score > albumMap.get(key).affinity_score) {
    albumMap.set(key, track)
  }
}

// Sort by affinity score descending, take top 30 as our pool
const candidates = [...albumMap.values()]
  .sort((a, b) => b.affinity_score - a.affinity_score)
  .slice(0, 30)

console.log(`Resolving album art for ${candidates.length} albums via Spotify oEmbed...`)

const albums = []
for (const track of candidates) {
  const trackUrl = track.spotify_url
  try {
    const res = await fetch(
      `https://open.spotify.com/oembed?url=${encodeURIComponent(trackUrl)}`
    )
    if (!res.ok) {
      console.warn(`  ⚠ Skipped "${track.album}" (${res.status})`)
      continue
    }
    const data = await res.json()

    // oEmbed gives a track thumbnail — convert to album-level URL if possible
    // Spotify track thumbnails are the same as the album art at the same CDN path
    const image = data.thumbnail_url ?? null
    if (!image) {
      console.warn(`  ⚠ No image for "${track.album}"`)
      continue
    }

    // Build a Spotify album search URL from the artist + album name
    const artist = track.artists[0] ?? ''
    const albumUrl = `https://open.spotify.com/search/${encodeURIComponent(`${artist} ${track.album}`)}`

    albums.push({
      name: track.album,
      artist,
      image,
      url: albumUrl,
      affinity: track.affinity_score,
    })

    console.log(`  ✓ ${track.album} — ${artist}`)

    // Be polite to the API
    await new Promise(r => setTimeout(r, 120))
  } catch (err) {
    console.warn(`  ✗ Error for "${track.album}": ${err.message}`)
  }
}

const output = `// Auto-generated from ludwig.json via Spotify oEmbed
// Run: node scripts/parse-music.js

export const albums = ${JSON.stringify(albums, null, 2)}
`

const outPath = join(ROOT, 'src/components/music-data.js')
writeFileSync(outPath, output, 'utf8')
console.log(`\n✅ Wrote ${albums.length} albums to src/components/music-data.js`)
