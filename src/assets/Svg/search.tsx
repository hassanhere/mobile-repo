import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const SearchSvg = ({ color = '#575760', ...props }: SvgProps) => (
  <Svg width={17} height={17} fill="none" viewBox="0 0 17 17" {...props}>
    <Path
      fill={color}
      d="m13.36 12.18 3.568 3.57-1.179 1.178-3.568-3.569A7.467 7.467 0 0 1 7.5 15C3.36 15 0 11.64 0 7.5 0 3.36 3.36 0 7.5 0 11.64 0 15 3.36 15 7.5a7.467 7.467 0 0 1-1.64 4.68Zm-1.672-.617A5.814 5.814 0 0 0 13.332 7.5 5.832 5.832 0 0 0 7.5 1.667 5.831 5.831 0 0 0 1.667 7.5 5.832 5.832 0 0 0 7.5 13.333a5.814 5.814 0 0 0 4.063-1.646l.124-.124Z"
    />
  </Svg>
);

export default SearchSvg;
