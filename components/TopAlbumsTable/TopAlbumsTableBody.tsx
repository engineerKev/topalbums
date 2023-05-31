import React, { useEffect } from 'react';
import Image from 'next/image';
import { TopAlbum } from 'types/topAlbumConverter';
import { StyledTd } from 'components/TopAlbums/TopAlbumsStyled.components';
import Skeleton from 'components/Skeleton';
import { MoreInfoButton, InnerFlexDiv, NoResultsHeading, FixedMobileWidthDiv } from 'components/TopAlbums/TopAlbumsStyled.components';
import auxStyles from 'styles/globalStyles.module.scss';

interface TopAlbumsTableBodyProps {
  tableData: TopAlbum[],
  showLoadingState?: boolean;
  showMoreInfo?: boolean;
  setShowMoreInfo: React.Dispatch<React.SetStateAction<boolean>>;
  isMobile?: boolean;
  isTablet?: boolean;
};

const defaultProps = {
  showLoadingState: false,
  showMoreInfo: false,
  isMobile: false,
  isTablet: false,
}

export default function TopAlbumsTableBody({tableData, showLoadingState, showMoreInfo, setShowMoreInfo, isTablet, isMobile}: TopAlbumsTableBodyProps) {
  const { desktopOnlyElement, tabletOnlyElement} = auxStyles;
  const colWidth = tableData[0]?.albumCoverImgHeight || 60;
  const rowHeight = colWidth;
  return (
      <tbody>
        { !tableData.length ?
            (
              <tr>
                <StyledTd colSpan={5}>
                  <NoResultsHeading>Sorry No Albumbs Matched Your Search Criteria</NoResultsHeading>
                </StyledTd>
              </tr>
            )
          :
          (tableData.map((datum, i) => {
            return (
              <tr key={datum.id}>
                <StyledTd width={colWidth}>
                  {showLoadingState ?
                    <Skeleton height={rowHeight} width={colWidth} />
                    :
                    (<Image
                      alt={`${datum.albumTitle} by ${datum.artistName}`}
                      height={datum.albumCoverImgHeight}
                      loader={() => datum.albumCoverImgLink}
                      src={datum.albumCoverImgLink}
                      unoptimized={true}
                      width={datum.albumCoverImgHeight}
                      priority={i < 30}
                    />)
                  }
                </StyledTd>
                <StyledTd>
                  {showLoadingState ?
                    <Skeleton />
                    :
                    (
                      <>
                        {showMoreInfo || isMobile ?
                          <>
                            <FixedMobileWidthDiv>{datum.albumTitle}</FixedMobileWidthDiv>
                            <FixedMobileWidthDiv>{datum.artistName}</FixedMobileWidthDiv>
                          </>
                          :
                          <FixedMobileWidthDiv>{datum.albumTitle}</FixedMobileWidthDiv>
                        }
                      </>
                    )
                  }
                </StyledTd>
                <StyledTd>
                  {showLoadingState ?
                    <Skeleton />
                    :
                    (
                      <FixedMobileWidthDiv>
                        {showMoreInfo || isMobile ?
                          datum.genre
                          :
                          datum.artistName
                        }
                      </FixedMobileWidthDiv>
                    )
                  }
                </StyledTd> 
                <StyledTd className={tabletOnlyElement}>
                  {showLoadingState ?
                    <Skeleton />
                    :
                    (
                      <>
                        {showMoreInfo || isTablet ?
                          datum.releaseDate
                          :
                          datum.genre
                        }
                      </>
                    )
                  }
                </StyledTd>
                <StyledTd className={desktopOnlyElement}>
                  {showLoadingState ?
                    <Skeleton />
                    :
                    <InnerFlexDiv>
                      <MoreInfoButton onClick={(e) => setShowMoreInfo(!showMoreInfo)}>&hellip;</MoreInfoButton>
                    </InnerFlexDiv>
                  }
                </StyledTd>
              </tr>
            )
          })
        )}
      </tbody>
  )
};

TopAlbumsTableBody.defaultProps = defaultProps;
