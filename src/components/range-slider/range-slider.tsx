import React, { useRef, useEffect, useState, useMemo, Fragment } from 'react';
import { View, Animated, PanResponder } from 'react-native';
import { horizontalSpacing } from '~utils';
import { RangeSliderComponentProps } from './types';
import { Text } from '~components';
import { useStyles } from '~hooks';
import createStyles from './styles';

const RangeSliderComponent = ({
  variant,
  min = 0,
  max = 100,
  minValue = 0,
  maxValue = 100,
  rangeSliderContainerStyle,
  trackStyle,
  fillTrackStyle,
  thumbStyle,
  minTextLabel,
  maxTextLabel,
  onMinValueChange,
  onMaxValueChange,
}: RangeSliderComponentProps) => {
  const styles = useStyles(createStyles);

  const THUMB_SIZE = horizontalSpacing(26);

  const [trackWidth, setTrackWidth] = useState(0);

  const minPan = useRef(new Animated.Value(0)).current;
  const maxPan = useRef(new Animated.Value(0)).current;

  const minStart = useRef(0);
  const maxStart = useRef(0);

  const isDraggingMin = useRef(false);
  const isDraggingMax = useRef(false);

  const getValueFromPosition = (position: number) => {
    const maxPos = Math.max(trackWidth - THUMB_SIZE, 0);
    const ratio = position / maxPos;
    return Math.round(min + ratio * (max - min));
  };

  const getPositionFromValue = (value: number) => {
    const ratio = (value - min) / (max - min);
    return ratio * (trackWidth - THUMB_SIZE);
  };

  useEffect(() => {
    if (!trackWidth) return;

    minPan.setValue(getPositionFromValue(minValue));
    maxPan.setValue(getPositionFromValue(maxValue));
  }, [trackWidth]);

  const minResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,

        onPanResponderGrant: () => {
          isDraggingMin.current = true;
          minStart.current = minPan?.__getValue();
        },

        onPanResponderMove: (_, { dx }) => {
          const maxPos = maxPan?.__getValue();

          let newPos = minStart.current + dx;

          newPos = Math.max(0, newPos);
          newPos = Math.min(newPos, maxPos - THUMB_SIZE);

          minPan.setValue(newPos);

          const value = getValueFromPosition(newPos);

          onMinValueChange?.(value);
        },

        onPanResponderRelease: () => {
          isDraggingMin.current = false;
        },
      }),
    [trackWidth],
  );

  const maxResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,

        onPanResponderGrant: () => {
          isDraggingMax.current = true;
          maxStart.current = maxPan?.__getValue();
        },

        onPanResponderMove: (_, { dx }) => {
          const minPos = minPan?.__getValue();
          const maxLimit = trackWidth - THUMB_SIZE;

          let newPos = maxStart.current + dx;

          newPos = Math.min(maxLimit, newPos);

          if (variant === 'double-slider') {
            newPos = Math.max(newPos, minPos + THUMB_SIZE);
          } else {
            newPos = Math.max(newPos, 0);
          }

          maxPan.setValue(newPos);

          const value = getValueFromPosition(newPos);

          onMaxValueChange?.(value);
        },

        onPanResponderRelease: () => {
          isDraggingMax.current = false;
        },
      }),
    [trackWidth],
  );

  const fillLeft = minPan;
  const fillWidth = Animated.subtract(maxPan, minPan);

  return (
    <Fragment>
      <View
        style={[styles.slider, rangeSliderContainerStyle]}
        onLayout={e => setTrackWidth(e.nativeEvent.layout.width)}>
        <View style={[styles.track, trackStyle]} />

        <Animated.View
          style={[
            styles.fill,
            {
              left: fillLeft,
              width: fillWidth,
            },
            fillTrackStyle,
          ]}
        />

        {variant == 'double-slider' && (
          <Animated.View
            style={[
              styles.thumb,
              { transform: [{ translateX: minPan }] },
              thumbStyle,
            ]}
            {...minResponder.panHandlers}
          />
        )}

        <Animated.View
          style={[
            styles.thumb,
            { transform: [{ translateX: maxPan }] },
            thumbStyle,
          ]}
          {...maxResponder.panHandlers}
        />
      </View>

      <View style={styles.rangeText}>
        <Text variant="subTitle" size={15} style={minTextLabel}>
          {minValue}
        </Text>
        <Text variant="subTitle" size={15} style={maxTextLabel}>
          {maxValue}
        </Text>
      </View>
    </Fragment>
  );
};

export default RangeSliderComponent;
