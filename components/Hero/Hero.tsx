import React from 'react';
import styled from 'styled-components';
import Grid, {GridItem} from 'components/Grid';
import Image from 'next/image';
import auxStyles from 'styles/globalStyles.module.scss';

interface HeroHeadingProps {
  heroAlbum: {
    url: string;
    height: number;
  }  
}

const HeroHeading = styled.h1`
  font-size: 4rem;
  text-align: left;
  @media (min-width: 17.5em) and (max-width: 51.25em) {
    font-size: 3em;
  }
`;

export default function TopAlbumsHero({ heroAlbum }: HeroHeadingProps): JSX.Element {
  return (
      <Grid
        colMin={heroAlbum.height}
        rowMax={heroAlbum.height}
        colGap={20}
      >
        <GridItem className={auxStyles.box} colStart={1} colEnd={2}>
          <Image 
            alt="Top 100 Albums"
            height={heroAlbum.height}
            loader={() => heroAlbum.url}
            src={heroAlbum.url}
            unoptimized={true}
            width={heroAlbum.height}
            priority={true}
          />
        </GridItem>
        <GridItem colStart={2} colEnd={-1}>
          <HeroHeading><p>Top</p><p>Albums</p></HeroHeading>
        </GridItem>
      </Grid>
  );
}