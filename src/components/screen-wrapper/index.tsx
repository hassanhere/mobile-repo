import React, { Fragment } from 'react';
import { ImageBackground, RefreshControl, StatusBar, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import createStyles from './styles';
import { ScreenWrapperProps } from './types';
import { AppColors, useTheme } from '~theme';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { SELECTED_MODE, verticalSpacing } from '~utils';
import ScreenLoading from './screen-loading';
import { useStyles } from '~hooks';
import { useSelector } from 'react-redux';
import { selectedMode } from '~redux/slices/config';
// import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

/**
 * All-in-one screen layout scaffold that provides consistent handling for
 * safe areas, status bar configuration, optional background images, scrollable
 * content, keyboard avoidance, pull-to-refresh, loading states, and fixed
 * header/footer slots.
 *
 * Supports both scrollable and non-scrollable screen layouts. When scrolling
 * is enabled, content is rendered inside a `KeyboardAwareScrollView` with
 * optional pull-to-refresh support and configurable scroll behavior.
 *
 * The component can display a custom loading component while preserving the
 * header and/or footer when explicitly configured to remain visible during
 * loading.
 *
 * Supports optional background images with configurable resize mode and
 * styling, theme-aware background colors, custom content/container styles,
 * status bar appearance, and safe-area spacing for devices with notches or
 * navigation areas.
 *
 * Fixed header and footer components can be rendered outside the scrollable
 * content using `headerUnScrollable` and `footerUnScrollable`. When used with
 * scrolling enabled, the footer is positioned above the bottom safe-area
 * inset; when scrolling is disabled, the footer may be pushed off-screen if
 * the screen content exceeds the available height.
 *
 * - `children`: screen content rendered inside the wrapper.
 * - `scrollViewRef`: ref forwarded to the `KeyboardAwareScrollView`.
 * - `scrollEnabled`: enables scrollable and keyboard-aware screen content.
 * - `barStyle`: custom status bar content style.
 * - `statusBarColor`: custom status bar background color.
 * - `translucent`: controls whether content uses the translucent status bar
 *   layout behavior.
 * - `backgroundImage`: optional image displayed behind the screen content.
 * - `imageStyle`: custom styles applied to the background image container.
 * - `imageResizeMode`: resize mode used for the background image.
 * - `backgroundColor`: custom screen background color.
 * - `containerViewStyle`: custom styles for the main screen content container.
 * - `contentContainerStyle`: custom styles for the scrollable content container.
 * - `showheaderUnScrollable`: controls whether the fixed header is rendered.
 * - `headerUnScrollable`: function returning the fixed header component.
 * - `showfooterUnScrollable`: controls whether the fixed footer is rendered.
 * - `footerUnScrollable`: function returning the fixed footer component.
 * - `showHeaderDuringLoading`: keeps the fixed header visible while loading.
 * - `showFooterDuringLoading`: keeps the fixed footer visible while loading.
 * - `isLoading`: replaces the screen content with the loading component.
 * - `LoadingComponent`: custom component rendered while `isLoading` is true.
 * - `enablePullToRefresh`: enables pull-to-refresh when scrolling is enabled.
 * - `refreshing`: controls the active state of the refresh indicator.
 * - `onRefresh`: callback invoked when pull-to-refresh is triggered.
 * - `showsVerticalScrollIndicator`: controls visibility of the vertical scroll
 *   indicator.
 * - `onContentSizeChange`: callback invoked when the scrollable content size
 *   changes.
 *
 * @example
 * ```tsx
 * <ScreenWrapper
 *   scrollEnabled
 *   headerUnScrollable={() => <Header />}
 *   footerUnScrollable={() => <Footer />}
 *   showheaderUnScrollable
 *   showfooterUnScrollable
 *   enablePullToRefresh
 *   refreshing={refreshing}
 *   onRefresh={refetch}
 * >
 *   {children}
 * </ScreenWrapper>
 * ```
 *
 * @example
 * Loading state with a custom loader
 * ```tsx
 * <ScreenWrapper
 *   isLoading={isLoading}
 *   showHeaderDuringLoading
 *   LoadingComponent={() => <CustomLoader />}
 * >
 *   {children}
 * </ScreenWrapper>
 * ```
 *
 * @example
 * Notes:
 * 1. When using `headerUnScrollable` or `footerUnScrollable` without
 *    `scrollEnabled`, the header is rendered below the status bar. If the
 *    content exceeds the available screen height, the fixed footer may be
 *    pushed off-screen.
 * 2. When using `headerUnScrollable` or `footerUnScrollable` with
 *    `scrollEnabled`, the header is rendered below the status bar and the
 *    footer is positioned above the bottom safe-area inset.
 * 3. The status bar is configured as translucent to support Android edge-to-edge
 *    layouts. For non-translucent screens, the wrapper adds the required top
 *    safe-area spacing to the content.
 */

const ScreenWrapper = ({
  children,
  scrollViewRef,
  barStyle,
  statusBarColor,
  translucent = false,
  scrollEnabled = false,
  backgroundImage,
  containerViewStyle = {},
  contentContainerStyle = {},
  showheaderUnScrollable = false,
  showfooterUnScrollable = false,
  headerUnScrollable = () => null,
  footerUnScrollable = () => null,
  backgroundColor,
  showsVerticalScrollIndicator = false,
  imageStyle,
  imageResizeMode = 'cover',
  refreshing = false,
  enablePullToRefresh = false,
  isLoading = false,
  showHeaderDuringLoading = false,
  showFooterDuringLoading = false,
  LoadingComponent = () => <ScreenLoading />,
  onRefresh,
  onContentSizeChange,
}: ScreenWrapperProps) => {
  /* these top and bottom insets are available all time on ios
     but the top inset is only available on android if the translucent is true
  */
  const mode = useSelector(selectedMode);

  const { bottom, top } = useSafeAreaInsets();

  const styles = useStyles(createStyles);

  const { theme } = useTheme();

  const statusBarBackgroundColor =
    statusBarColor ?? theme.generalBackgroundColor;
  const backgroundColorTheme = backgroundColor ?? theme.generalBackgroundColor;

  // this bellow code is used for removing padding at the bottom of the screen for tab bar
  // const getBottomTabBarHeight = () => {
  //   try {
  //     const tabBar = useBottomTabBarHeight();
  //     if (tabBar == undefined) {
  //       return 0;
  //     }
  //     return tabBar;
  //   } catch (error) {
  //     return 0;
  //   }
  // };

  // const tabBarHeight = getBottomTabBarHeight();

  const content = () => (
    <>
      {/* This below view is used to handle the spacing of status bar for the screens if translucent is false */}
      {!translucent && (
        <View
          style={{
            backgroundColor:
              backgroundImage && translucent
                ? AppColors.Transparent
                : statusBarBackgroundColor,
            paddingTop: translucent ? 0 : top,
          }}
        />
      )}
      <View
        style={[
          styles.mainViewContainer,
          {
            backgroundColor: backgroundImage
              ? AppColors.Transparent
              : backgroundColorTheme,
          },
          containerViewStyle,
        ]}>
        {showheaderUnScrollable &&
          (!isLoading || showHeaderDuringLoading) &&
          headerUnScrollable()}
        {isLoading ? (
          <LoadingComponent />
        ) : scrollEnabled ? (
          <KeyboardAwareScrollView
            ref={scrollViewRef}
            refreshControl={
              enablePullToRefresh ? (
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              ) : undefined
            }
            contentContainerStyle={[
              {
                // tabBarHeight != 0 &&  add this condition bellow with && when you have a bottom tab to avoid adding unnecessary bottom padding if there is a bottom tab visible
                paddingBottom:
                  translucent || showfooterUnScrollable ? 0 : bottom,
              },
              contentContainerStyle,
            ]}
            bottomOffset={verticalSpacing(50)}
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={showsVerticalScrollIndicator}
            onContentSizeChange={onContentSizeChange}>
            {children}
          </KeyboardAwareScrollView>
        ) : (
          children
        )}
        {showfooterUnScrollable && (!isLoading || showFooterDuringLoading) && (
          <Fragment>
            {footerUnScrollable()}
            {/* This bellow view is used to move the footer component up when used along with scroll enabled */}
            {/* tabBarHeight == 0 Dont Render bellow view when you have a bottom tab to avoid adding unnecessary bottom padding if there is a bottom tab visible */}
            <View
              style={{
                backgroundColor: translucent
                  ? AppColors.Transparent
                  : backgroundColorTheme,
                height: bottom,
              }}
            />
          </Fragment>
        )}
      </View>
    </>
  );

  return (
    <Fragment>
      {/* StatusBar only effects the bar style on ios and android.
      The translucent it is functional only in all versions of android but not in ios.
      I have intentionally made status bar translucent to comply with android edge-to-edge scheme
      The spacing for the status bar for screens which don't want translucent is handled in content in the first view */}
      <StatusBar
        barStyle={
          barStyle ??
          (mode == SELECTED_MODE.DARK ? 'light-content' : 'dark-content')
        }
        backgroundColor={AppColors.Transparent}
        translucent={true}
      />
      {backgroundImage ? (
        <ImageBackground
          source={backgroundImage}
          style={[styles.container, imageStyle]}
          resizeMode={imageResizeMode}>
          {content()}
        </ImageBackground>
      ) : (
        content()
      )}
    </Fragment>
  );
};

export default ScreenWrapper;
