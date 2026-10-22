import React, { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useApp } from '../context/AppContext';
import { user } from '../data/user';
import { colors } from '../theme';
import StatsCard from '../components/StatsCard';

function MenuRow(props) {
  return (
    <Pressable style={styles.menuRow} onPress={props.onPress}>
      <Text style={styles.menuText}>{props.label}</Text>
      <Text style={styles.chevron}>›</Text>
    </Pressable>
  );
}

function SettingRow(props) {
  return (
    <View style={styles.menuRow}>
      <Text style={styles.menuText}>{props.label}</Text>
      <Switch
        accessibilityLabel={props.label}
        value={props.value}
        onValueChange={props.onChange}
        trackColor={{ true: colors.button, false: colors.inactive }}
      />
    </View>
  );
}

export default function AccountScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { cartCount, likedPostIds, settings, toggleSetting, resetAll } =
    useApp();
  const [loggedOut, setLoggedOut] = useState(false);

  function openScreen(name) {
    setLoggedOut(false);
    navigation.navigate(name);
  }

  function changeSetting(key) {
    setLoggedOut(false);
    toggleSetting(key);
  }

  function logOut() {
    resetAll();
    setLoggedOut(true);
  }

  return (
    <ScrollView style={styles.screen}>
      <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>JD</Text>
        </View>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <StatsCard
          credit={user.credit}
          points={user.points}
          packageCount={user.packageCount}
          onPress={() => navigation.navigate('Mall')}
        />
      </View>

      <Text style={styles.sectionLabel}>MY ACCOUNT</Text>
      <View style={styles.group}>
        <MenuRow
          label={'My Cart (' + cartCount + ')'}
          onPress={() => openScreen('Cart')}
        />
        <MenuRow
          label="My Appointment"
          onPress={() => openScreen('AppointmentDetail')}
        />
        <MenuRow
          label={'Liked Posts (' + likedPostIds.length + ')'}
          onPress={() => openScreen('LikedPosts')}
        />
      </View>

      <Text style={styles.sectionLabel}>SETTINGS</Text>
      <View style={styles.group}>
        <SettingRow
          label="Notifications"
          value={settings.notifications}
          onChange={() => changeSetting('notifications')}
        />
        <SettingRow
          label="Promotional emails"
          value={settings.promoEmails}
          onChange={() => changeSetting('promoEmails')}
        />
      </View>

      <Pressable style={styles.logOut} onPress={logOut}>
        <Text style={styles.logOutText}>Log Out</Text>
      </Pressable>
      {loggedOut ? (
        <Text style={styles.loggedOut}>
          You have been logged out. Data reset.
        </Text>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 22,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.primary,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.white,
    marginTop: 10,
  },
  email: {
    fontSize: 13,
    color: colors.white,
    opacity: 0.7,
    marginTop: 2,
    marginBottom: 4,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 1,
    color: colors.grey,
    marginTop: 24,
    marginBottom: 8,
    marginHorizontal: 20,
  },
  group: {
    backgroundColor: colors.white,
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
  },
  menuText: {
    fontSize: 15,
    color: colors.text,
  },
  chevron: {
    fontSize: 22,
    color: colors.inactive,
  },
  logOut: {
    backgroundColor: colors.white,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 24,
  },
  logOutText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#AA5851',
  },
  loggedOut: {
    textAlign: 'center',
    fontSize: 13,
    color: colors.grey,
    marginTop: 12,
    marginBottom: 24,
  },
});
