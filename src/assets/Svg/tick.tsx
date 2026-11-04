import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
import { AppColors } from '~theme';

const TickSvg = ({ color = AppColors.Black, ...props }: SvgProps) => (
  <Svg width={12} height={10} fill="none" viewBox="0 0 12 10" {...props}>
    <Path fill={color} d="m4 9.4-4-4L1.4 4 4 6.6 10.6 0 12 1.4l-8 8Z" />
  </Svg>
);

export default TickSvg;
