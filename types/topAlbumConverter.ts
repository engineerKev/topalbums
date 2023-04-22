interface AlbumCoverImg {
  albumCoverImgLink: string;
  albumCoverImgHeight: number;
}

export type TopAlbum = AlbumCoverImg & {
  albumTitle: string;
  artistName: string;
  id: string;
  genre: string;
  releaseDate: string;
  heroUrl: string;
  heroHeight: number;
}