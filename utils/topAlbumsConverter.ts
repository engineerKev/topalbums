import { FeedEntry, TopAlbumsAPIResponse } from "types/API";
import { FeedEntryImg } from "types/API";
import { TopAlbum } from "types/topAlbumConverter";

function getAlbumCoverObj(feedEntryImgArray: FeedEntryImg[]): FeedEntryImg[] {
  const sortedArray = feedEntryImgArray.sort((a, b) => parseInt(a.attributes.height) - parseInt(b.attributes.height));
  const albumObj = sortedArray[0];
  const heroObj = sortedArray[sortedArray.length - 1];
  return [albumObj, heroObj];
}

function getTopAlbum(feedEntry: FeedEntry): TopAlbum {
  const [albumObj, heroObj] = getAlbumCoverObj(feedEntry["im:image"]);
  return {
    albumCoverImgLink: albumObj.label,
    albumCoverImgHeight: parseInt(albumObj.attributes.height),
    albumTitle: feedEntry["im:name"].label,
    artistName: feedEntry["im:artist"].label,
    id: feedEntry.id.attributes["im:id"],
    genre: feedEntry.category.attributes.term,
    releaseDate: feedEntry["im:releaseDate"].attributes.label,
    heroUrl: heroObj.label,
    heroHeight: parseInt(heroObj.attributes.height)
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