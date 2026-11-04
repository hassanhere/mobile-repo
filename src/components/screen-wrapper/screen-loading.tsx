import React from 'react';
import { View } from 'react-native';
import { SkeletonLoader } from '~components';
import { horizontalSpacing, verticalSpacing } from '~utils';

const ScreenLoading = () => {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: horizontalSpacing(20),
          paddingTop: verticalSpacing(20),
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: verticalSpacing(24),
          }}>
          <SkeletonLoader
            containerStyle={{
              width: horizontalSpacing(56),
              height: horizontalSpacing(56),
              borderRadius: horizontalSpacing(28),
            }}
          />

          <View
            style={{
              flex: 1,
              marginLeft: horizontalSpacing(16),
            }}>
            <SkeletonLoader
              containerStyle={{
                width: '45%',
                height: verticalSpacing(18),
                marginBottom: verticalSpacing(10),
              }}
            />

            <SkeletonLoader
              containerStyle={{
                width: '70%',
                height: verticalSpacing(14),
              }}
            />
          </View>
        </View>

        {/* Search */}
        <SkeletonLoader
          containerStyle={{
            height: verticalSpacing(48),
            borderRadius: horizontalSpacing(12),
            marginBottom: verticalSpacing(28),
          }}
        />

        {/* Cards */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: verticalSpacing(28),
          }}>
          {[1, 2, 3].map(item => (
            <SkeletonLoader
              key={item}
              containerStyle={{
                width: '31%',
                height: verticalSpacing(110),
                borderRadius: horizontalSpacing(16),
              }}
            />
          ))}
        </View>

        {/* Section title */}
        <SkeletonLoader
          containerStyle={{
            width: '40%',
            height: verticalSpacing(20),
            marginBottom: verticalSpacing(18),
          }}
        />

        {/* List */}
        {[1, 2, 3, 4].map(item => (
          <View
            key={item}
            style={{
              flexDirection: 'row',
              marginBottom: verticalSpacing(20),
            }}>
            <SkeletonLoader
              containerStyle={{
                width: horizontalSpacing(72),
                height: horizontalSpacing(72),
                borderRadius: horizontalSpacing(12),
              }}
            />

            <View
              style={{
                flex: 1,
                marginLeft: horizontalSpacing(16),
                justifyContent: 'space-between',
              }}>
              <SkeletonLoader
                containerStyle={{
                  width: '80%',
                  height: verticalSpacing(16),
                }}
              />

              <SkeletonLoader
                containerStyle={{
                  width: '60%',
                  height: verticalSpacing(14),
                }}
              />

              <SkeletonLoader
                containerStyle={{
                  width: '35%',
                  height: verticalSpacing(14),
                }}
              />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default ScreenLoading;
