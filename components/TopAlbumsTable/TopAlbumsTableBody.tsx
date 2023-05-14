import React from 'react';
import Image from 'next/image';
import { TopAlbum } from 'types/topAlbumConverter';
import { StyledTd } from 'components/TopAlbums/TopAlbumsStyled.components';
import Skeleton from 'components/Skeleton';
import { MoreInfoButton, InnerFlexDiv, NoResultsHeading, FixexMobileWidthDiv } from 'components/TopAlbums/TopAlbumsStyled.components';

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

export default function TopAlbumsTableBody({tableData, showLoadingState, showMoreInfo, setShowMoreInfo, isMobile, isTablet}: TopAlbumsTableBodyProps) {
  const colWidth = tableData[0]?.albumCoverImgHeight || 60;
  const rowHeight = colWidth;
  const tdProps = {};
  if(isTablet) {
    tdProps['width'] = '235';
  }
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
                <StyledTd {...tdProps}>
                  {showLoadingState ?
                    <Skeleton />
                    :
                    (
                      <>
                        {showMoreInfo || isMobile ?
                          <>
                            <FixexMobileWidthDiv>{datum.albumTitle}</FixexMobileWidthDiv>
                            <FixexMobileWidthDiv>{datum.artistName}</FixexMobileWidthDiv>
                          </>
                          :
                          datum.albumTitle
                        }
                      </>
                    )
                  }
                </StyledTd>
                {isTablet ?
                  (<StyledTd>
                    {showLoadingState ?
                      <Skeleton />
                      :
                      (
                        <>
                          {showMoreInfo || isTablet ?
                            datum.releaseDate
                            :
                            datum.artistName
                          }
                        </>
                      )
                    }
                  </StyledTd>)
                  :
                  null
              }
                <StyledTd>
                  {showLoadingState ?
                    <Skeleton />
                    :
                    (
                      <>
                        {showMoreInfo || isMobile ?
                          datum.genre
                          :
                          datum.releaseDate
                        }
                      </>
                    )
                  }
                </StyledTd>
                {isMobile ?
                  null
                  :
                  (<StyledTd>
                    {showLoadingState ?
                      <Skeleton />
                      :
                      <InnerFlexDiv>
                        <MoreInfoButton onClick={(e) => setShowMoreInfo(!showMoreInfo)}>&hellip;</MoreInfoButton>
                      </InnerFlexDiv>
                    }
                  </StyledTd>)
                }
              </tr>
            )
          })
        )}
      </tbody>
  )
};

TopAlbumsTableBody.defaultProps = defaultProps;
