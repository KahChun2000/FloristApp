import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Appointment } from '../data/appointment';
import { user } from '../data/user';
import { colors } from '../theme';
import StatsCard from './StatsCard';

type Props = {
  appointment: Appointment | null;
  onOpenAppointment: () => void;
  onBookService: () => void;
  onOpenAccount: () => void;
};

export default function HomeHeader(props: Props) {
  const insets = useSafeAreaInsets();
  const appointment = props.appointment;

  return (
    <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
      <Text style={styles.logo}>LOGO</Text>

      <View style={styles.labelRow}>
        <View style={styles.line} />
        <Text style={styles.label}>NEXT APPOINTMENT</Text>
        <View style={styles.line} />
      </View>

      {appointment ? (
        <Pressable
          style={styles.infoRow}
          onPress={props.onOpenAppointment}
          accessibilityLabel="Open appointment"
        >
          <Image
            source={require('../assets/images/icon-calendar.png')}
            style={styles.infoIcon}
          />
          <Text style={styles.infoText}>{appointment.date}</Text>
          <Image
            source={require('../assets/images/icon-clock-small.png')}
            style={styles.infoIcon}
          />
          <Text style={styles.infoText}>{appointment.time}</Text>
          <Image
            source={require('../assets/images/icon-location-small.png')}
            style={styles.infoIcon}
          />
          <Text style={[styles.infoText, styles.address]} numberOfLines={1}>
            {appointment.address}
          </Text>
          <Image
            source={require('../assets/images/icon-arrow-circle.png')}
            style={styles.arrow}
          />
        </Pressable>
      ) : (
        <View style={styles.emptyRow}>
          <Text style={styles.infoText}>No upcoming appointment</Text>
          <Pressable onPress={props.onBookService}>
            <Text style={styles.bookLink}>Book a service</Text>
          </Pressable>
        </View>
      )}

      <StatsCard
        credit={user.credit}
        points={user.points}
        packageCount={user.packageCount}
        onPress={props.onOpenAccount}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingBottom: 22,
  },
  logo: {
    color: colors.white,
    fontSize: 44,
    fontWeight: '500',
    textAlign: 'center',
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  label: {
    color: colors.white,
    fontSize: 8,
    fontWeight: '500',
    letterSpacing: 1,
    marginHorizontal: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  infoIcon: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
    marginRight: 5,
    tintColor: colors.white,
    opacity: 0.6,
  },
  infoText: {
    color: colors.white,
    fontSize: 13,
    marginRight: 14,
  },
  address: {
    flex: 1,
    marginRight: 6,
  },
  arrow: {
    width: 25,
    height: 25,
  },
  emptyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    height: 25,
  },
  bookLink: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});
