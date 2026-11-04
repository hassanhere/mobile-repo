import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const BackSvg = ({ color = '#0F0F0F', ...props }: SvgProps) => (
  <Svg width={800} height={800} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M16.18 3.269a1 1 0 0 0-1.415 0L8.121 9.913a3 3 0 0 0-.001 4.242l6.57 6.575a1 1 0 1 0 1.415-1.414l-6.573-6.572a1 1 0 0 1 0-1.414l6.648-6.647a1 1 0 0 0 0-1.414Z"
    />
  </Svg>
);

export default BackSvg;
