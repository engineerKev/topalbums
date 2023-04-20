import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface GridProps {
  gridColumns?: string;
  gridRows?: number | string;
  colGap?: number;
  rowGap?: number;
  gridFlow?: string;
  rowMin?: number;
  rowMax?: number | string;
  colMin?: number;
  colMax?: number | string;
  isFullWidth?: boolean;
  children?: ReactNode;
  className?: string;
}

const defaultProps = {
  gridColumns: 'auto-fit',
  gridRows: 'auto-fit',
  colGap: 0,
  rowGap: 0,
  gridFlow: 'row',
  rowMin: 0,
  rowMax: '1fr',
  colMin: 0,
  colMax: '1fr',
  isFullWidth: false,
  children: null,
}
const GridContainer = styled.div.attrs<Omit<GridProps, 'children'>>(props => ({
  style: {
    gridTemplateColumns: `${props.colMin}px 1fr 1fr 1fr 2em`,
    gridTemplateRows: `repeat(${props.gridRows}, ${props.rowMax}px)`,
    columnGap: `${props.colGap}px`,
    rowGap: `${props.rowGap}px`,
    gridAutoFlow: props.gridFlow
  }
}))`
  display: grid;
  padding: 1em;
  width: 85%;
  margin: 0 auto;
  @media (min-width: 17.5em) and (max-width: 51.25em) {
    width: 90%;
  }
`;


export default function Grid({children, ...gridProps}: GridProps): JSX.Element {
  return (
    <GridContainer {...gridProps}>
      {children}
    </GridContainer>
  )
}

Grid.defaultProps = defaultProps;