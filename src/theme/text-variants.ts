import { textSize } from '~utils';
import AppFonts from './app-fonts';
import { TextVariantsTypes } from './types';

const TextVariants: TextVariantsTypes = {
  appHeader: {
    fontSize: textSize(28),
    fontFamily: AppFonts.bold,
  },
  header: {
    fontSize: textSize(25),
    fontFamily: AppFonts.bold,
  },
  title: {
    fontSize: textSize(22),
    fontFamily: AppFonts.semiBold,
  },
  subTitle: {
    fontSize: textSize(18),
    fontFamily: AppFonts.semiBold,
  },
  bodyMedium: {
    fontSize: textSize(15),
    fontFamily: AppFonts.medium,
  },
  bodyRegular: {
    fontSize: textSize(15),
    fontFamily: AppFonts.regular,
  },
  bodySemiBold: {
    fontSize: textSize(15),
    fontFamily: AppFonts.semiBold,
  },
  bodyBold: {
    fontSize: textSize(15),
    fontFamily: AppFonts.bold,
  },
  smallText: {
    fontSize: textSize(12.5),
    fontFamily: AppFonts.regular,
  },
  miniText: {
    fontSize: textSize(11),
    fontFamily: AppFonts.light,
  },
};

export default TextVariants;
