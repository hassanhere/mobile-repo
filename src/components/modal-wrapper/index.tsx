import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import ModalWrapperProps from './types';
import { ModalRef } from '~types';
import { Text } from '~components';
import { CrossSvg } from '~assets';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { verticalSpacing } from '~utils';
import { useStyles } from '~hooks';
import createStyles from './styles';
import { useTheme } from '~theme';

/**
 * Imperative modal wrapper around `react-native-modal` that centralizes
 * animations, backdrop handling, swipe behavior, header layout, and optional
 * keyboard-aware scrolling.
 *
 * Exposes `show` and `hide` methods through a ref, allowing parent components
 * to control the modal programmatically. The modal can also be configured to
 * restrict dismissal through the backdrop and Android back button.
 *
 * Supports an optional header with a title, left icon, and close icon, along
 * with a swipe handler, custom modal/content styles, configurable swipe
 * behavior, and keyboard-aware content scrolling.
 *
 * When `isKeyboardAvoidingEnabled` is enabled, the modal content is wrapped in
 * a `KeyboardAwareScrollView`; otherwise, children are rendered directly.
 *
 * - `restricted`: prevents dismissal through the backdrop, Android back button,
 *   and swipe gesture when true.
 * - `onClose`: callback invoked when the modal is dismissed.
 * - `showHeader`: controls whether the modal header is displayed.
 * - `showCrossIcon`: controls whether the header close icon is displayed.
 * - `leftIcon`: optional content rendered on the left side of the header.
 * - `title`: optional title displayed in the modal header.
 * - `swipable`: enables or disables downward swipe-to-dismiss behavior.
 * - `showSwipeHandler`: controls visibility of the swipe handle.
 * - `isKeyboardAvoidingEnabled`: enables keyboard-aware scrolling for modal
 *   content.
 * - `show()`: displays the modal through the exposed ref.
 * - `hide()`: hides the modal through the exposed ref.
 *
 * Additional `react-native-modal` props can be passed through and will be
 * applied to the underlying modal.
 *
 * @example
 * ```tsx
 * const modalRef = useRef<ModalRef>(null);
 *
 * <ModalWrapper
 *   ref={modalRef}
 *   title="Details"
 *   onClose={handleClose}
 *   isKeyboardAvoidingEnabled
 * >
 *   <Card>Modal content</Card>
 * </ModalWrapper>
 *
 * Open the modal
 * modalRef.current?.show();
 *
 * Close the modal
 * modalRef.current?.hide();
 * ```
 */

const ModalWrapper: React.ForwardRefRenderFunction<
  ModalRef,
  ModalWrapperProps
> = (
  {
    restricted = false,
    onClose,
    children,
    modalStyle,
    showHeader = true,
    showCrossIcon = true,
    leftIcon,
    title,
    contentContainerStyle,
    swipable = true,
    showSwipeHandler = true,
    isKeyboardAvoidingEnabled = false,
    scrollViewContentContainerStyle,
    swipeHandlerStyle,
    titleTextStyle,
    ...modalProps
  },
  ref,
) => {
  const styles = useStyles(createStyles);

  const { theme } = useTheme();

  const [isVisible, setIsVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    show: () => setIsVisible(true),
    hide: () => setIsVisible(false),
  }));

  const onModalClose = () => {
    setIsVisible(false);
    if (onClose) {
      onClose();
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      onModalHide={onModalClose}
      onBackdropPress={() => !restricted && onModalClose()}
      onBackButtonPress={() => !restricted && onModalClose()}
      animationIn="fadeInUpBig"
      animationOut="fadeOutDownBig"
      style={[styles.modal, modalStyle]}
      animationInTiming={500}
      animationOutTiming={500}
      useNativeDriver
      swipeDirection={swipable ? 'down' : undefined}
      propagateSwipe
      onSwipeComplete={swipable ? onModalClose : undefined}
      {...modalProps}>
      <View style={[styles.contentContainer, contentContainerStyle]}>
        {showSwipeHandler && (
          <View style={[styles.swipeHandle, swipeHandlerStyle]} />
        )}
        {showHeader && (
          <View style={styles.headerStyle}>
            {leftIcon ?? <View style={{ width: 40 }} />}
            {title && (
              <Text variant="subTitle" style={titleTextStyle}>
                {title}
              </Text>
            )}
            {showCrossIcon && (
              <TouchableOpacity onPress={onModalClose}>
                <CrossSvg
                  width={30}
                  height={30}
                  color={theme.generalIconColor}
                />
              </TouchableOpacity>
            )}
          </View>
        )}
        {isKeyboardAvoidingEnabled ? (
          <KeyboardAwareScrollView
            bottomOffset={verticalSpacing(50)}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={scrollViewContentContainerStyle}>
            {children}
          </KeyboardAwareScrollView>
        ) : (
          children
        )}
      </View>
    </Modal>
  );
};

export default forwardRef<ModalRef, ModalWrapperProps>(ModalWrapper);
