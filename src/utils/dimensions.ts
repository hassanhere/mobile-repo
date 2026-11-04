import { Dimensions, Platform, StatusBar } from 'react-native';

/**
 * Screen width in pixels
 * Retrieved from the device window dimensions.
 *
 * Purpose:
 * Used as the base value for width-based calculations and responsive scaling.
 * Should not be used directly for layout sizing unless absolutely needed.
 */
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

/**
 * Guideline base width (design reference)
 *
 * Purpose:
 * Represents the width of the device used during UI design
 * (e.g. iPhone X – 375px).
 * All horizontal scaling is calculated relative to this value.
 */
const guidelineBaseWidth = 375;

/**
 * Guideline base height (design reference)
 *
 * Purpose:
 * Represents the height of the device used during UI design
 * (e.g. iPhone X – 812px).
 * All vertical scaling is calculated relative to this value.
 */
const guidelineBaseHeight = 812;

/**
 * Scales a size proportionally based on the device screen width.
 *
 * @param size Size based on the design guideline width
 * @returns Scaled size relative to current screen width
 *
 * Purpose / Where to use:
 * - Horizontal dimensions
 * - Margins and paddings (rarely, use moderateScale instead)
 * - Exact proportional scaling when required
 *
 * Avoid using for:
 * - Font sizes
 */
const scaleHorizontal = (size: number): number =>
  (SCREEN_WIDTH / guidelineBaseWidth) * size;

/**
 * Scales a size proportionally based on the device screen height.
 *
 * @param size Size based on the design guideline height
 * @returns Scaled size relative to current screen height
 *
 * Purpose / Where to use:
 * - Vertical dimensions
 * - Heights and vertical spacing (with caution)
 *
 * Avoid using for:
 * - Font sizes
 * - Aggressive spacing on tall devices
 */
const scaleVertical = (size: number): number =>
  (SCREEN_HEIGHT / guidelineBaseHeight) * size;

/**
 * Moderately scales a horizontal size using a scaling factor.
 *
 * @param size Original design size
 * @param factor Scaling factor (0 = no scale, 1 = full scale)
 * @returns Moderately scaled horizontal size
 *
 * Purpose / Where to use:
 * - Horizontal margins and paddings
 * - Button spacing
 * - Card spacing
 * - Icon spacing
 *
 * Recommended default for most horizontal spacing.
 */
const horizontalSpacing = (size: number, factor: number = 0.5): number =>
  size + (scaleHorizontal(size) - size) * factor;

/**
 * Moderately scales a vertical size using a scaling factor.
 *
 * @param size Original design size
 * @param factor Scaling factor (0 = no scale, 1 = full scale)
 * @returns Moderately scaled vertical size
 *
 * Purpose / Where to use:
 * - Vertical margins and paddings
 * - Section spacing
 * - List item spacing
 *
 * Recommended default for most vertical spacing.
 */
const verticalSpacing = (size: number, factor: number = 0.5): number =>
  size + (scaleVertical(size) - size) * factor;

/**
 * Scales text size based on screen height and aspect ratio.
 *
 * @param percent Percentage of calculated device height
 * @returns Font size in pixels (rounded)
 *
 * Purpose / Where to use:
 * - Font sizes (body text, headings, labels)
 * - Typography scaling across devices
 *
 * Notes:
 * - Applies smaller scaling on tall aspect-ratio devices (18.5:9, 20:9)
 * - Prevents text from becoming too large on modern phones
 * - Safer than vertical scaling for text
 */
const textSize = (percent: number): number => {
  const screenHeight = Dimensions.get('window').height;

  // Calculate absolute ratio for taller screens
  const ratio =
    Dimensions.get('window').height / Dimensions.get('window').width;

  // Guideline sizes are based on a standard ~5″ screen mobile device
  const deviceHeight = guidelineBaseWidth
    ? screenHeight * (ratio > 1.8 ? 0.126 : 0.15)
    : Platform?.OS === 'android'
    ? screenHeight - (StatusBar.currentHeight || 0)
    : screenHeight;

  const heightPercent = (percent * deviceHeight) / 100;
  return Math.round(heightPercent);
};

/**
 * Function for returning the width in pixels
 *
 * @param number Percentage of the screen width
 * @returns Width in pixels
 *
 * Purpose / Where to use:
 * - Card widths
 * - Responsive layouts
 * - Full-width or partial-width components
 *
 * Example:
 * width(90) -> 90% of screen width
 */
const width = (number: number) => {
  if (number >= 100) return SCREEN_WIDTH;
  if (number <= 0) return 0;
  else return SCREEN_WIDTH * (number / 100);
};

/**
 * Function for returning the height in pixels
 *
 * @param number Percentage of the screen height
 * @returns Height in pixels
 *
 * Purpose / Where to use:
 * - Modals
 * - Bottom sheets
 * - Fullscreen or partial-height components
 *
 * Example:
 * height(50) -> 50% of screen height
 */
const height = (number: number) => {
  if (number >= 100) return SCREEN_HEIGHT;
  if (number <= 0) return 0;
  else return SCREEN_HEIGHT * (number / 100);
};

export {
  scaleHorizontal,
  scaleVertical,
  textSize,
  verticalSpacing,
  horizontalSpacing,
  height,
  width,
};
