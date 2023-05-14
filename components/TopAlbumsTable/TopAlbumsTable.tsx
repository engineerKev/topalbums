import React, { useState } from 'react';
import { TopAlbum } from 'types/topAlbumConverter';
import TopAlbumsTableHeader from './TopAlbumsTableHeader';
import TopAlbumsTableBody from './TopAlbumsTableBody';
import Table from 'components/Table';
import auxStyles from 'styles/globalStyles.module.scss';
import useWindowSize from 'hooks/useWindowSize';

interface TopAlbumsTableProps {
  topAlbums: TopAlbum[];
  showLoadingState: boolean;
}

export default function TopAlbumsTable({ topAlbums, showLoadingState }: TopAlbumsTableProps): JSX.Element {
  const { isMobile, isTablet } = useWindowSize();
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  return (
    <Table className={auxStyles.outline}>
      <TopAlbumsTableHeader showMoreInfo={showMoreInfo} isMobile={isMobile} isTablet={isTablet} />
      <TopAlbumsTableBody
        isTablet={isTablet}
        isMobile={isMobile}
        tableData={topAlbums}
        showMoreInfo={showMoreInfo}
        setShowMoreInfo={setShowMoreInfo}
        showLoadingState={showLoadingState}
      />
    </Table>
  )
}