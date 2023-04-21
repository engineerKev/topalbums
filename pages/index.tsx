import React, { useState, useCallback, useRef, useEffect } from 'react';
import { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import request from 'utils/request';
import { TopAlbumsAPIResponse } from 'types/API';
import getTopAlbumProps from 'utils/topAlbumsConverter';
import { TopAlbum } from 'types/topAlbumConverter';
import TopAlbums from 'components/TopAlbums';
import Search from 'components/Search';
import getHeroAlbum from 'utils/getHeroTopAlbum';
import TopAlbumsHero from 'components/Hero';
interface PageProps {
  topAlbums: TopAlbum[]
  heroAlbum: {
    url: string;
    height: number;
  }
}
export async function getStaticProps(context: GetStaticPropsContext): Promise<GetStaticPropsResult<PageProps>> {
  const topAlbumResponse = await request<TopAlbumsAPIResponse | null>("https://itunes.apple.com/us/rss/topalbums/limit=100/json");
  const topAlbums = getTopAlbumProps(topAlbumResponse);
  const heroAlbum = getHeroAlbum(topAlbumResponse);
  return {
    props: {  
      topAlbums,
      heroAlbum
    },
    revalidate: 5,
  };
}

function HomePage({topAlbums, heroAlbum}: PageProps) {
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
      <TopAlbums topAlbums={statefulTopAlbums} showLoadingState={loading} />
    </>
  )
}

export default HomePage