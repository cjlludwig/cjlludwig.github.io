import { Track } from "../models/tracks";
import topTracks from "./topTracks.json";

function getTopTracks() {
  return topTracks as Track[];
}

export {
  getTopTracks
}