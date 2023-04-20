import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { TopAlbum } from 'types/topAlbumConverter';
import Grid, { GridItem } from 'components/Grid';
import TopAlbumsHeader from './TopAlbumsHeader';
import Skeleton from 'components/Skeleton';
import auxStyles from 'styles/globalStyles.module.scss';
import useWindowSize from 'hooks/useWindowSize';

interface TopAlbumsProps {
  topAlbums: TopAlbum[],
  showLoadingState: boolean;
};

const AlbumInfo = styled.div`
  height:100%;
  display: flex;
  flex-direction: column;
  align-items: space-evenly;
  justify-content: center;
`
const InfoDiv = styled.div`
  padding: 0.25em;
`;

const NoResultsHeading = styled.h2`
  text-align: center;
  font-size: 2em;
`;

export default function TopAlbums({ topAlbums, showLoadingState }: TopAlbumsProps): JSX.Element {
  const { isMobile } = useWindowSize();
  const colWidth = topAlbums[0]?.albumCoverImgHeight || 55;
  const rowHeight = colWidth;
  return (
    <>
      <TopAlbumsHeader isMobile={isMobile} />
      {!topAlbums.length ? 
        <NoResultsHeading>Sorry No Albums to Display</NoResultsHeading>
        :
        (
          <Grid
            className={auxStyles.outline}
            colMin={colWidth}
            gridRows={topAlbums.length - 1}
            rowMax={rowHeight}
            rowGap={8}
            colGap={6}
          >
            {topAlbums.map((album, i) => {
              return (
                <React.Fragment key={album.id}>
                  <GridItem colStart={1} colEnd={2} rowStart={i + 1} rowEnd={i + 2}>
                    {showLoadingState ?
                      <Skeleton height={rowHeight} width={colWidth} />
                      :
                      (<Image
                        alt={`${album.albumTitle} by ${album.artistName}`}
                        height={album.albumCoverImgHeight}
                        loader={() => album.albumCoverImgLink}
                        src={album.albumCoverImgLink}
                        unoptimized={true}
                        width={album.albumCoverImgHeight}
                        priority={i < 30}
                      />)
                    }
                  </GridItem>
                  <GridItem colStart={2} colEnd={isMobile ? 4 : 3} rowStart={i + 1} rowEnd={i + 2}>
                    {showLoadingState ?
                      <Skeleton />
                      :
                      (<AlbumInfo>
                        <InfoDiv>{album.albumTitle}</InfoDiv>
                      </AlbumInfo>)
                    }
                  </GridItem>
                  <GridItem colStart={isMobile ? 4 : 3} colEnd={isMobile ? 5 : 4} rowStart={i + 1} rowEnd={i + 2}>
                    {showLoadingState ? <Skeleton /> : <AlbumInfo>{album.artistName}</AlbumInfo>}
                  </GridItem>
                  <GridItem colStart={4} colEnd={5} rowStart={i + 1} rowEnd={i + 2} hideOnMobile={isMobile}>
                    {showLoadingState ?
                      <Skeleton />
                      :
                      (<AlbumInfo>
                        {album.releaseDate}
                      </AlbumInfo>)
                    }
                  </GridItem>
                </React.Fragment>
              )
            })}
          </Grid>
        )
      }
    </>
  )
}