export interface Track {
  album: Album;
  artists?: (ArtistsEntity)[] | null;
  explicit: boolean;
  external_ids: ExternalIds;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  popularity: number;
  preview_url: string;
  uri: string;
  genres?: string[];
}
export interface Album {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images?: (ImagesEntity)[] | null;
  name: string;
  uri: string;
}
export interface ExternalUrls {
  spotify: string;
}
export interface ImagesEntity {
  height: number;
  url: string;
  width: number;
}
export interface ArtistsEntity {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}
export interface ExternalIds {
  isrc: string;
}
