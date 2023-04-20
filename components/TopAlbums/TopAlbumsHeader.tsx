import React from 'react'
import Grid, { GridItem} from 'components/Grid';
import auxStyles from 'styles/globalStyles.module.scss';

interface TopAlbumsHeaderProps {
  isMobile?: boolean;
}

const defaultProps = {
  isMobile: false,
}

export default function TopAlbumsHeader({ isMobile }: TopAlbumsHeaderProps): JSX.Element {
  return (
      <Grid
        className={auxStyles.lowerBorder}
        colMin={55} 
        rowMax={28}
        colGap={6}
      >
        <GridItem className={auxStyles.headingLabels} colStart={2} colEnd={3}>Album</GridItem>
        <GridItem className={auxStyles.headingLabels} colStart={isMobile ? 4 : 3} colEnd={isMobile ? 5 : 4}>Artist</GridItem>
        <GridItem className={auxStyles.headingLabels} colStart={4} colEnd={5} hideOnMobile={isMobile}>Release Date</GridItem>
      </Grid>
  )
}

TopAlbumsHeader.defaultProps = defaultProps;