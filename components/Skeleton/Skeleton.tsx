import React from 'react';
import styled, { keyframes, css } from 'styled-components';

interface SkeletonProps {
  height?: string | number;
  width?: string | number;
};
const skeleton = keyframes`
  to {
    background-position: left;
  }
`;
const skeletonCss = css`
  cursor: progress;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #bbbf 40%, #efefefaa, #bbbf 60%) right / 300% 100%;
  animation: ${skeleton} 1.75s linear infinite;
`;
const SkeletonContainer = styled.div.attrs<SkeletonProps>(props => ({
  style: {
    width: typeof props.width === 'number' ? `${props.width}px` : props.width,
    height: typeof props.height === 'number' ? `${props.height}px` : props.height,
  }
}))``;
const defaultProps = {
  width: '100%',
  height: '16px',
};

const SkeletonElement = styled.div(() => [skeletonCss]);

export default function Skeleton(props: SkeletonProps): JSX.Element {
  return (
    <SkeletonContainer {...props}>
      <SkeletonElement>{' '}</SkeletonElement>
    </SkeletonContainer>
  );
}

Skeleton.defaultProps = defaultProps;