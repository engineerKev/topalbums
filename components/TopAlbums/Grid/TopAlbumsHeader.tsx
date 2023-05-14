import React from 'react'
import Grid, { GridItem} from 'components/Grid';
import auxStyles from 'styles/globalStyles.module.scss';
import styled from 'styled-components';

interface TopAlbumsHeaderProps {
  isMobile?: boolean;
  showMoreInfo: boolean
}

const defaultProps = {
  isMobile: false,
}
const AlignmentCell = styled.div`
  width: 2em;
  height: 2em;
`
export default function TopAlbumsHeader({ isMobile, showMoreInfo }: TopAlbumsHeaderProps): JSX.Element {
  const albumArtistText = isMobile ? 'Album/Artist' : 'Album & Artist';
  const genreReleaseDateText = isMobile ? 'Genre' : 'Release Date'
  return (
      <Grid
        className={auxStyles.lowerBorder}
        colMin={55} 
        rowMax={28}
        colGap={6}
      >
        <GridItem className={auxStyles.headingLabels} colStart={2} colEnd={3}>{showMoreInfo || isMobile ? albumArtistText : 'Album'}</GridItem>
        <GridItem className={auxStyles.headingLabels} colStart={isMobile ? 4 : 3} colEnd={isMobile ? 5 : 4} hideOnMobile={isMobile}>{showMoreInfo && !isMobile ? 'Release Date' : 'Artist'}</GridItem>
        <GridItem className={auxStyles.headingLabels} colStart={4} colEnd={5}>{showMoreInfo && !isMobile ? 'Genre' : genreReleaseDateText}</GridItem>
      </Grid>
  )
}

TopAlbumsHeader.defaultProps = defaultProps;