import React, { useState } from 'react';
import {
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { categories } from '../data/categories';
import { colors } from '../theme';

type Props = {
  onOpenShop: () => void;
  onOpenCategory: (categoryId: string) => void;
};

const TRACK_WIDTH = 280;
const THUMB_WIDTH = 36;

export default function ShopPlantsStrip(props: Props) {
  const [thumbLeft, setThumbLeft] = useState(0);

  function onScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const maxScroll = contentSize.width - layoutMeasurement.width;
    if (maxScroll <= 0) {
      return;
    }
    const progress = Math.min(Math.max(contentOffset.x / maxScroll, 0), 1);
    setThumbLeft(progress * (TRACK_WIDTH - THUMB_WIDTH));
  }

  return (
    <View style={styles.section}>
      <View style={styles.row}>
        <Pressable onPress={props.onOpenShop} accessibilityLabel="Shop Plants">
          <Image
            source={require('../assets/images/plants-main.png')}
            style={styles.mainIcon}
          />
        </Pressable>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
          contentContainerStyle={styles.list}
        >
          {categories.map(category => (
            <Pressable
              key={category.id}
              accessibilityLabel={category.name}
              onPress={() => props.onOpenCategory(category.id)}
            >
              <Image source={category.plantsImage} style={styles.circle} />
            </Pressable>
          ))}
        </ScrollView>
      </View>
      <View style={styles.track}>
        <View style={[styles.thumb, { left: thumbLeft }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: colors.background,
    paddingVertical: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainIcon: {
    width: 76,
    height: 66,
    marginLeft: 16,
    marginRight: 8,
  },
  list: {
    paddingRight: 16,
  },
  circle: {
    width: 60,
    height: 60,
    marginRight: 2,
  },
  track: {
    width: TRACK_WIDTH,
    height: 2,
    backgroundColor: colors.grey,
    marginTop: 14,
    alignSelf: 'center',
  },
  thumb: {
    position: 'absolute',
    top: -1,
    width: THUMB_WIDTH,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.primary,
  },
});
