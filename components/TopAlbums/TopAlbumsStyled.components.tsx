import styled from "styled-components";

interface ThProps {
  topValue?: string;
  height?: string;
  center?: boolean;
}

export const MoreInfoButton = styled.button`
  background-color: transparent;
  border-radius: 50%;
  font-size: 1em;
  width: 2em;
  height: 2em;
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  justify-self: center;
  cursor: pointer;
`

export const InnerFlexDiv = styled.div`
  display: flex;
  justify-content: center;
  aling-items: center;
`;

export const StyledTd = styled.td.attrs(props => ({
  style: {
    width: props.width,
  },
  cellPadding: "0"
}))`
  height: 4.25em;
  padding: .5em .5em 0 .5em;
  z-index: 1;
`;

export const StyledTh = styled.th.attrs(props => ({
  cellPadding: "0",
}))<ThProps>`
  height: ${props => props.height}px;
  padding: 0 .5em;
  position: sticky;
  top: ${props => props.topValue}px;
  background-color: #fff;
  z-index: 2;
  text-align: ${props => props.center ? 'center' : 'left'};
  @media (min-width: 17.5em) and (max-width: 47.9375em) {
    font-size: 1em;
  }
`;

export const NoResultsHeading = styled.h2`
  text-align: center;
  font-size: 2em;
`;

export const FixedMobileWidthDiv = styled.div`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 15.625em;
  @media (min-width: 17.5em) and (max-width: 47.9375em) {
    width: 7.5em;
  }
  @media (min-width: 48em) and (max-width: 51.25em) {
    width: 7.8125em;
  }
`;