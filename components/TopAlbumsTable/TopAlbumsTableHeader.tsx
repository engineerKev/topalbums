import React from 'react';
import { StyledTh } from 'components/TopAlbums/TopAlbumsStyled.components';
import auxStyles from 'styles/globalStyles.module.scss';

interface TopAlbumsHeaderProps {
  isMobile?: boolean;
  showMoreInfo?: boolean;
  isTablet?: boolean;
}

const defaultProps = {
  isMobile: false,
  showMoreInfo: false,
  isTablet: false,
}
export default function TopAlbumsTableHeader({isMobile, showMoreInfo, isTablet}: TopAlbumsHeaderProps): JSX.Element {
  const hrColSpan = isTablet ? 4 : 3;
  return (
    <>
      <thead>
        <tr>
          <StyledTh topValue='-1' height='48'>{' '}</StyledTh>
          <StyledTh className={`${auxStyles.headingLabels}`} topValue='-1' height='48'>{showMoreInfo || isMobile ? 'Album & Artist' : 'Album' }</StyledTh>
          <StyledTh className={`${auxStyles.headingLabels}`} topValue='-1' height='48'>{showMoreInfo || isMobile ? 'Genre' : 'Artist'}</StyledTh>
          <StyledTh className={`${auxStyles.headingLabels} ${auxStyles.tabletOnlyElement}`} topValue='-1' height='48'>{showMoreInfo || isTablet ?  'Release Date' : 'Genere'}</StyledTh>
          <StyledTh className={`${auxStyles.headingLabels} ${auxStyles.desktopOnlyElement}`} center topValue='-1' height='48'>More Info</StyledTh>
        </tr>
        <tr><StyledTh colSpan={isMobile ? hrColSpan : 5} topValue='44' height='2'><hr /></StyledTh></tr>
      </thead>
    </>
  );
}

TopAlbumsTableHeader.defaultProps = defaultProps;