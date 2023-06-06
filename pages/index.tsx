import React, { useState, useCallback, useEffect } from 'react';
import getTopAlbumProps from 'utils/topAlbumsConverter';
import Search from 'components/Search';
import { randomIntFromInterval } from 'utils/getHeroTopAlbum';
import TopAlbumsHero from 'components/Hero';
import TopAlbumsTable from 'components/TopAlbumsTable';
import useTopAlbums from 'hooks/useTopAlbums';

const TOTALPLACEHOLDERS = 25;
const INITALTOPALBUMSSTATE = Array(TOTALPLACEHOLDERS).fill({});

function HomePage() {
  const { topAlbumsData, topAlbumsError, isLoading } = useTopAlbums();
  const [heroAlbum, setHeroAlbum] = useState({
    url: '',
    height: 170
  });
  const [topAlbums, setTopAlbums] = useState(INITALTOPALBUMSSTATE);
  const [dirtyInput, setDirtyInput] = useState(false)
  const [searchQuery, setSearchQuery] = useState('');
  const [loadingSearch, setLoadingSearch] = useState(false);

  const updateWithSearchResults = useCallback(() => {
    const allTopAlbums = getTopAlbumProps(topAlbumsData);
    const newTopAlbumsArray = allTopAlbums.filter((album) => {
      const albumTitleMatch = album.albumTitle.toLowerCase().includes(searchQuery);
      const artistNameMatch = album.artistName.toLowerCase().includes(searchQuery);
      const genreMatch = album.genre.toLowerCase().includes(searchQuery);
      return (albumTitleMatch || artistNameMatch || genreMatch);
    });
    const noResults = !Boolean(newTopAlbumsArray.length);
    return noResults ? [] : [...newTopAlbumsArray] 
  },[searchQuery]);

  useEffect(() => {
    if(topAlbumsData && !isLoading) {
      const convertedTopAlbumsResponse = getTopAlbumProps(topAlbumsData);
      const heroAlbumIndex = randomIntFromInterval(0, (convertedTopAlbumsResponse.length -1));
      setTopAlbums(convertedTopAlbumsResponse);
      setHeroAlbum({
        url: convertedTopAlbumsResponse[heroAlbumIndex].heroUrl,
        height: convertedTopAlbumsResponse[heroAlbumIndex].heroHeight
      });
    }
  }, [isLoading, topAlbumsData]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if(dirtyInput && !searchQuery.length) {
        setTopAlbums(getTopAlbumProps(topAlbumsData));
        setLoadingSearch(false);
      }
    }, 1000);
    return () => clearTimeout(delayDebounce)
  }, [dirtyInput, searchQuery])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(!loadingSearch && e.currentTarget.value.length) {
      setLoadingSearch(true);
    }
    setSearchQuery(e.currentTarget.value.toLowerCase());
  }

  const onSubmitSearch = (e: React.FormEvent<HTMLFormElement>)  => {
    e.preventDefault();
    if(searchQuery.length) {
      const searchResults = updateWithSearchResults();
      setTopAlbums(searchResults);
    } else {
      setTopAlbums(getTopAlbumProps(topAlbumsData));
    }
    setLoadingSearch(false);
  }
  return (
    <>
      <TopAlbumsHero heroAlbum={heroAlbum} showLoadingState={isLoading} />
      <Search
        buttonType='submit'
        placeholder='Search Albums' 
        onSubmit={onSubmitSearch} 
        onBlur={(e) => setDirtyInput(true)} 
        defaultValue={searchQuery}
        onChange={onChange}
      />
      <TopAlbumsTable showLoadingState={isLoading || loadingSearch } topAlbums={topAlbums} />
    </>
  )
}

export default HomePage