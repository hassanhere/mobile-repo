import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
import { AppColors } from '~theme';

const DownArrowSvg = ({ color = AppColors.Black, ...props }: SvgProps) => (
  <Svg width={800} height={800} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m7 10 5 5 5-5"
    />
  </Svg>
);

export default DownArrowSvg;
