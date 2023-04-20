import { TopAlbumsAPIResponse } from "types/API";

type HeroAlbum = {
  height: number;
  url: string;
}
function randomIntFromInterval(min, max): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
export default function getHeroAlbum(topAlbumDataObj: TopAlbumsAPIResponse): HeroAlbum {
  if(Array.isArray(topAlbumDataObj?.feed?.entry)) {
      const randomEntry = (topAlbumDataObj.feed.entry[randomIntFromInterval(0,topAlbumDataObj.feed.entry.length-1)]["im:image"]
        .filter(imgObj => imgObj.attributes.height === "170")[0]);
      return ({
        height: parseInt(randomEntry.attributes.height),
        url: randomEntry.label
      })
  }
  const singleEntry= (topAlbumDataObj.feed.entry["im:image"]
      .filter(imgObj => imgObj.attributes.height === "170")[0]
  );
  return ({
    height: parseInt(singleEntry.attributes.height),
    url: singleEntry.label
  })
} 