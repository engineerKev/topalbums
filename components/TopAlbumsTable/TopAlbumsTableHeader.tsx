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
export default function TopAlbumsTableHeader({isMobile, showMoreInfo, isTablet}): JSX.Element {
  const hrColSpan = isTablet ? 4 : 3;
  return (
    <>
      <thead>
        <tr>
          <StyledTh topValue='0' height='2.5'>{' '}</StyledTh>
          <StyledTh className={`${auxStyles.headingLabels}`} topValue='0' height='2.5'>{showMoreInfo || isMobile ? 'Album & Artist' : 'Album' }</StyledTh>
          {isTablet ? (<StyledTh className={`${auxStyles.headingLabels}`} topValue='0' height='2.5'>{showMoreInfo || isTablet ? 'Release Date' : 'Artist'}</StyledTh>) : null}
          <StyledTh className={`${auxStyles.headingLabels}`} topValue='0' height='2.5'>{showMoreInfo || isMobile ? 'Genre' : 'Release Date'}</StyledTh>
          {isMobile ? null : (<StyledTh className={`${auxStyles.headingLabels}`} center topValue='0' height='2.5'>More Info</StyledTh>)}
        </tr>
        <tr><StyledTh colSpan={isMobile ? hrColSpan : 5} topValue='2.5' height='1.25'><hr /></StyledTh></tr>
      </thead>
    </>
  );
}

TopAlbumsTableHeader.defaultProps = defaultProps;