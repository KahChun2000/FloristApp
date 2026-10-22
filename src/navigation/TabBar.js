import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { colors } from '../theme';

const tabs = {
  Home: {
    label: 'HOME',
    icon: require('../assets/images/nav-home.png'),
    activeIcon: require('../assets/images/nav-home-active.png'),
  },
  Mall: {
    label: 'MALL',
    icon: require('../assets/images/nav-mall.png'),
    activeIcon: require('../assets/images/nav-mall-active.png'),
  },
  Discover: {
    label: 'DISCOVER',
    icon: require('../assets/images/nav-discover.png'),
  },
  Inbox: {
    label: 'INBOX',
    icon: require('../assets/images/nav-inbox.png'),
  },
  Account: {
    label: 'ACCOUNT',
    icon: require('../assets/images/nav-account.png'),
  },
};

export default function TabBar({ state, navigation }) {
  const insets = useSafeAreaInsets();
  const { unreadCount } = useApp();

  return (
    <View style={[styles.bar, { paddingBottom: insets.bottom }]}>
      {state.routes.map((route, index) => {
        const tab = tabs[route.name];
        const isActive = state.index === index;

        let icon = tab.icon;
        let tintColor = colors.inactive;
        if (isActive && tab.activeIcon) {
          icon = tab.activeIcon;
          tintColor = undefined;
        } else if (isActive) {
          tintColor = colors.primary;
        }

        function onPress() {
          if (!isActive) {
            navigation.navigate(route.name);
          }
        }

        return (
          <Pressable key={route.key} style={styles.item} onPress={onPress}>
            <View>
              <Image
                source={icon}
                style={[styles.icon, tintColor ? { tintColor } : null]}
              />
              {route.name === 'Inbox' && unreadCount > 0 ? (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{unreadCount}</Text>
                </View>
              ) : null}
            </View>
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {tab.label}
            </Text>
            {isActive ? <View style={styles.underline} /> : null}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: -2 },
    elevation: 8,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 8,
  },
  icon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  label: {
    marginTop: 4,
    fontSize: 10,
    letterSpacing: 0.5,
    color: colors.inactive,
  },
  labelActive: {
    color: colors.primary,
  },
  underline: {
    position: 'absolute',
    bottom: 0,
    left: 6,
    right: 6,
    height: 2,
    backgroundColor: colors.primary,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -10,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    paddingHorizontal: 4,
    backgroundColor: colors.price,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '700',
  },
});
