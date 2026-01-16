---
title: "Vibe Coding a Spotify Playlist Analyzer"
date: "2026-01-15"
slug: "vibe-coding-spotify-playlist-analyzer"
description: "A quick vibe-coded Python project exploring what can be inferred from public Spotify playlist data using modern AI coding tools."
tags: ["vibe-coding", "python", "spotify", "developer-tools", "side-projects"]
---


I recently vibe coded a small side project after getting curious about what you can actually infer from public Spotify data versus what stays private.

I wanted to poke at my own playlists without investing a ton of time digging through Spotify’s dev docs. This is where modern AI coding tools really shine. The barrier to entry is so much lower now that you can focus on the idea instead of the plumbing.

One thing that helped a lot was being opinionated early. I locked in Python, Spotipy for the Spotify APIs, and Rich for CLI output from the start. That bit of upfront constraint narrowed the problem space and led to something usable much faster. In my experience, lots of unfocused back-and-forth with an agent tends to compound into messy tech decisions. In real codebases, that shows up as readability issues, maintainability pain, and bugs. Fewer prompts with clearer intent usually leads to better outcomes.

The script analyzes public playlists to surface likely favorite songs, albums, and artists. It is intentionally simple and there are some important caveats. Track appearances are not listens, so songs that show up in lots of playlists skew higher. Some of my actual favorite tracks barely appeared because they live in a single playlist I play constantly. Also worth noting, Spotify appears to be tightening access to their developer platform, which makes creating and experimenting with new apps harder right now.

If you want to explore your own data or inspect any public profile, the code is open and easy to run.

Script: [https://github.com/cjlludwig/spotify-analyzer](https://github.com/cjlludwig/spotify-analyzer)

<p align="center">
  <img src="https://github.com/user-attachments/assets/11f1cb1d-fc17-4687-ad37-9de31af599af" alt="Spotify Playlist Analyzer demo" />
</p>
