interface Label {
  label: string; 
};
interface FeedEntryAttributes extends Label {
  height: string;
  amount: string;
  currency: string;
  term: string;
  rel: string;
  type: string;
  href: string;
  "im:id": string;
  scheme: string;

}
type Author = {
  name: Label;
  uri: Label;
};
export type FeedEntryImg = Label & {
  attributes: Pick<FeedEntryAttributes, "height">; 
}
type FeedEntryPrice = Label & {
  attributes: Pick<FeedEntryAttributes, "amount" | "currency">
}
type FeedEntryContent = {
  "im:contentType": Pick<FeedEntryAttributes, "term" | "label">;
  attributes: Pick<FeedEntryAttributes, "term" | "label">;
}
type FeedEntryLink = {
  attributes: Pick<FeedEntryAttributes, "rel" | "type" | "href">
}
type FeedEntryID = Label & {
  attributes: Pick<FeedEntryAttributes, "im:id">
}
type FeedEntryArtist = Label & {
  attributes: Pick<FeedEntryAttributes, "href">
}
type FeedEntryCategory = {
  attributes: Pick<FeedEntryAttributes, "im:id" | "term" | "scheme" | "label">
}
type FeedEntryReleaseDate = Label & {
  attributes: Label
}
export type FeedEntry = {
  "im:name": Label;
  "im:image": FeedEntryImg[];
  "im:itemCount": Label;
  "im:price": FeedEntryPrice;
  "im:contentType": FeedEntryContent;
  rights: Label;
  title: Label;
  link: FeedEntryLink;
  id: FeedEntryID;
  "im:artist": FeedEntryArtist;
  category: FeedEntryCategory;
  "im:releaseDate": FeedEntryReleaseDate;
}
type Feed = {
  feed: {
    author: Author
    entry: FeedEntry | FeedEntry[];
    updated: Label;
    rights: Label;
    title: Label;
    icon: Label;
    link: FeedEntryLink[];
    id: Label;
  },
}
export type TopAlbumsAPIResponse = Feed;