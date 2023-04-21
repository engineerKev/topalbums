import { FeedEntry, TopAlbumsAPIResponse } from "types/API";
import { FeedEntryImg } from "types/API";
import { TopAlbum } from "types/topAlbumConverter";

function getAlbumCoverObj(feedEntryImgArray: FeedEntryImg[]): FeedEntryImg {
  const sortedArray = feedEntryImgArray.sort((a, b) => parseInt(a.attributes.height) - parseInt(b.attributes.height));
  const AlbumObj = sortedArray[0];
  return AlbumObj;
}

function getTopAlbum(feedEntry: FeedEntry): TopAlbum {
  const albumCoverObj = getAlbumCoverObj(feedEntry["im:image"]);
  return {
    albumCoverImgLink: albumCoverObj.label,
    albumCoverImgHeight: parseInt(albumCoverObj.attributes.height),
    albumTitle: feedEntry["im:name"].label,
    artistName: feedEntry["im:artist"].label,
    id: feedEntry.id.attributes["im:id"],
    genre: feedEntry.category.attributes.term,
    releaseDate: feedEntry["im:releaseDate"].attributes.label
  }
}

export default function getTopAlbumProps(topAlbumsDataObj: TopAlbumsAPIResponse | null): TopAlbum[] | null {
  if(!topAlbumsDataObj) {
    return topAlbumsDataObj as null;
  }
  if (Array.isArray(topAlbumsDataObj?.feed?.entry)) {
    const topAlbumProps = topAlbumsDataObj.feed.entry.map<TopAlbum>(getTopAlbum)
    return topAlbumProps;
  } else {
    return [{...getTopAlbum(topAlbumsDataObj.feed.entry)}];
  }
}