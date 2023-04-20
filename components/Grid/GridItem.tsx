import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface GridItemProps {
  rowStart?: number;
  colStart?: number;
  rowEnd?: number;
  colEnd?: number;
  children?: ReactNode;
  className?: string;
  hideOnMobile?: boolean;
}

const defaultProps = {
  rowStart: 1,
  colStart: 1,
  rowEnd: 1,
  colEnd: 1,
  children: null,
  hideOnMobile: false,
}
const GridCell = styled.div.attrs<Omit<GridItemProps, 'children'>>(props => ({
  style: {
    gridColumn: `${props.colStart} / ${props.colEnd}`,
    gridRow: `${props.rowStart} / ${props.rowEnd}`,
    display: `${props.hideOnMobile ? 'none': 'flex'}`,
  }
}))`
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 1em;
  @media (min-width: 17.5em) and (max-width: 51.25em) {
    font-size: 0.8125em;
    font-weight: 600;
  }
`;

export default function GridItem({children, ...gridItemProps}: GridItemProps): JSX.Element {
  return (
    <GridCell {...gridItemProps}>
      {children}
    </GridCell>
  )
}

GridItem.defaultProps = defaultProps;