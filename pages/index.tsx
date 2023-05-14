import React, { useState, useCallback, useRef, useEffect } from 'react';
import { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import request from 'utils/request';
import { TopAlbumsAPIResponse } from 'types/API';
import getTopAlbumProps from 'utils/topAlbumsConverter';
import { TopAlbum } from 'types/topAlbumConverter';
import TopAlbums from 'components/TopAlbums/Grid';
import Search from 'components/Search';
import { randomIntFromInterval } from 'utils/getHeroTopAlbum';
import TopAlbumsHero from 'components/Hero';
import Table from 'components/Table';
import TopAlbumsTable from 'components/TopAlbumsTable';
interface PageProps {
  topAlbums: TopAlbum[]
}
export async function getStaticProps(context: GetStaticPropsContext): Promise<GetStaticPropsResult<PageProps>> {
  const topAlbumResponse = await request<TopAlbumsAPIResponse | null>("https://itunes.apple.com/us/rss/topalbums/limit=25/json", { next: { revalidate: 30 }});
  const topAlbums = getTopAlbumProps(topAlbumResponse);
  return {
    props: {  
      topAlbums,
    },
    revalidate: 5,
  };
}

function HomePage({topAlbums }: PageProps) {
  const [heroAlbum, setHeroAlbum] = useState({
    url: '',
    height: 170
  });
  const [statefulTopAlbums, setStatefulTopAlbums] = useState(topAlbums);
  const [dirtyInput, setDirtyInput] = useState(false)
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const updateWithSearchResults = useCallback(() => {
    const newTopAlbumsArray = topAlbums.filter((album) => {
      const albumTitleMatch = album.albumTitle.toLowerCase().includes(searchQuery);
      const artistNameMatch = album.artistName.toLowerCase().includes(searchQuery);
      const genreMatch = album.genre.toLowerCase().includes(searchQuery);
      return (albumTitleMatch || artistNameMatch || genreMatch);
    });
    const noResults = !Boolean(newTopAlbumsArray.length);
    return noResults ? [] : [...newTopAlbumsArray] 
  },[searchQuery]);
  useEffect(() => {
    const heroAlbumIndex = randomIntFromInterval(0, (topAlbums.length -1));
    setHeroAlbum({
      url: topAlbums[heroAlbumIndex].heroUrl,
      height: topAlbums[heroAlbumIndex].heroHeight
    });
  }, [])
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if(loading && searchQuery) {
        const searchResults = updateWithSearchResults();
        setStatefulTopAlbums(searchResults);
      }
      if(dirtyInput && !searchQuery.length) {
        setStatefulTopAlbums(topAlbums);
      }
    }, 1000);
    return () => clearTimeout(delayDebounce)
  }, [loading, searchQuery, dirtyInput]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(delayDebounce)
  }, [statefulTopAlbums]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(!loading && e.currentTarget.value.length) {
      setLoading(true);
    }
    setSearchQuery(e.currentTarget.value.toLowerCase());
  }

  const onClickSearchButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(searchQuery) {
      setLoading(true);
    }
  }

  const onSubmitSearch = (e: React.FormEvent<HTMLFormElement>)  => {
    e.preventDefault();
    if(searchQuery) {
      setLoading(true);
    }
  }
  return (
    <>
      <TopAlbumsHero heroAlbum={heroAlbum} />
      <Search 
        placeholder='Search Albums' 
        onSubmit={onSubmitSearch} 
        onBlur={(e) => setDirtyInput(true)} 
        defaultValue={searchQuery}
        onChange={onChange}
        onClick={onClickSearchButton}
      />
      <TopAlbumsTable showLoadingState={loading || (heroAlbum === null)} topAlbums={statefulTopAlbums} />
    </>
  )
}

export default HomePage