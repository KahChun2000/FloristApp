import React from 'react';
import {
  Image,
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { malls } from '../data/malls';
import { colors } from '../theme';

export function openInMaps(place: string) {
  const query = encodeURIComponent(place);
  if (Platform.OS === 'ios') {
    Linking.openURL('http://maps.apple.com/?q=' + query);
  } else {
    Linking.openURL('geo:0,0?q=' + query);
  }
}

export default function LocationSection() {
  return (
    <View style={styles.section}>
      <Text style={styles.heading}>LOCATION</Text>

      <Pressable
        style={styles.map}
        onPress={() => openInMaps(malls[0].name)}
        accessibilityLabel="Open map"
      >
        <Image
          source={require('../assets/images/icon-location.png')}
          style={styles.mapPin}
        />
        <Text style={styles.mapText}>Tap to open in Maps</Text>
      </Pressable>

      {malls.map(mall => (
        <View key={mall.id} style={styles.mall}>
          <Text style={styles.mallName}>{mall.name}</Text>
          <View style={styles.row}>
            <Image
              source={require('../assets/images/icon-location.png')}
              style={styles.icon}
            />
            <Pressable
              style={styles.addressButton}
              onPress={() => openInMaps(mall.name)}
              accessibilityLabel={'Open ' + mall.name + ' address'}
            >
              <Text style={styles.address}>{mall.address}</Text>
            </Pressable>
          </View>
          <View style={styles.row}>
            <Image
              source={require('../assets/images/icon-clock.png')}
              style={styles.icon}
            />
            <Text style={styles.hours}>{mall.hours}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 30,
  },
  heading: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.primary,
  },
  map: {
    height: 196,
    borderRadius: 6,
    backgroundColor: '#E8ECEA',
    borderWidth: 1,
    borderColor: '#DCE2DF',
    marginTop: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapPin: {
    width: 22,
    height: 30,
  },
  mapText: {
    fontSize: 13,
    color: colors.primary,
    marginTop: 8,
  },
  mall: {
    marginTop: 22,
  },
  mallName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.primary,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 10,
  },
  icon: {
    width: 12,
    height: 14,
    resizeMode: 'contain',
    marginTop: 3,
    marginRight: 12,
  },
  addressButton: {
    flexShrink: 1,
  },
  address: {
    fontSize: 15,
    color: colors.link,
    textDecorationLine: 'underline',
    lineHeight: 20,
  },
  hours: {
    fontSize: 15,
    color: colors.grey,
  },
});
