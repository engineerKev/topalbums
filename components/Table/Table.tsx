import React from 'react';
import styled from 'styled-components';
interface TableProps {
  children: React.ReactNode;
  className?: string;
}

const StyledTable = styled.table`
  padding: 1em;
  width: 85vw;
  margin: 0 auto;
  border-collapse: collapse;
  border-spacing: 0 0.5em;
  @media (min-width: 17.5em) and (max-width: 47.9375em) {
    width: 90vw;
  }
`;

const defaultProps:TableProps = {
  children: null,
  className: ''
}

export default function Table({ children, className }: TableProps): JSX.Element {
  return (
    <StyledTable className={className}>
      {children}
    </StyledTable>
  )
}

Table.defaultProps = defaultProps;