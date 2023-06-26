import React from 'react';
import styled from 'styled-components';
import Grid, {GridItem} from 'components/Grid';
import Image from 'next/image';
import auxStyles from 'styles/globalStyles.module.scss';
import Skeleton from 'components/Skeleton';

interface HeroHeadingProps {
  heroAlbum: {
    url: string;
    height: number;
  }  | null,
  showLoadingState: boolean
}
const DEFAULTSQUARESIZE = 170;

const HeroHeading = styled.h1`
  font-size: 4rem;
  text-align: left;
  @media (min-width: 17.5em) and (max-width: 51.25em) {
    font-size: 3em;
  }
`;

export default function TopAlbumsHero({ heroAlbum, showLoadingState }: HeroHeadingProps): JSX.Element {
  return (
      <Grid
        colMin={showLoadingState || !(heroAlbum.height) ? DEFAULTSQUARESIZE : heroAlbum.height}
        rowMax={showLoadingState || !(heroAlbum.height) ? DEFAULTSQUARESIZE : heroAlbum.height}
        colGap={20}
      >
        <GridItem className={auxStyles.box} colStart={1} colEnd={2}>
          {!showLoadingState && heroAlbum?.url?.length ?
            <Image 
              alt="Top 100 Albums"
              height={heroAlbum.height}
              loader={() => heroAlbum.url}
              src={heroAlbum.url}
              unoptimized={true}
              width={heroAlbum.height}
              priority={true}
            />
            :
            <Skeleton width={DEFAULTSQUARESIZE} height={DEFAULTSQUARESIZE} />
          }
        </GridItem>
        <GridItem colStart={2} colEnd={-1}>
          <HeroHeading>
            <>
              <p>Top</p>
              <p>Albums</p>
            </>
          </HeroHeading>
        </GridItem>
      </Grid>
  );
}