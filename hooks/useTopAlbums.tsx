import { fetcher } from "utils/request";
import useSWR from 'swr';
import { TopAlbumsAPIResponse } from 'types/API';

type TopAlbumsResponse = {
  topAlbumsData: TopAlbumsAPIResponse,
  topAlbumsError: Error,
  isLoading: boolean
}
export default function useTopAlbums(): TopAlbumsResponse {
  const { data, error, isLoading } = useSWR<TopAlbumsAPIResponse, Error>("https://itunes.apple.com/us/rss/topalbums/limit=50/json", fetcher);
  return {
    topAlbumsData: data,
    topAlbumsError: error,
    isLoading
  }
}