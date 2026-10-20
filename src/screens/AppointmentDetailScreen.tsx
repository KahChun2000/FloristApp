import React, { useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { StackScreenProps } from '../navigation/types';
import { useApp } from '../context/AppContext';
import { TimeSlot, timeSlots } from '../data/appointment';
import { colors } from '../theme';
import ScreenHeader from '../components/ScreenHeader';

function DetailRow(props: { icon: ImageSourcePropType; text: string }) {
  return (
    <View style={styles.detailRow}>
      <Image source={props.icon} style={styles.detailIcon} />
      <Text style={styles.detailText}>{props.text}</Text>
    </View>
  );
}

export default function AppointmentDetailScreen({
  navigation,
}: StackScreenProps<'AppointmentDetail'>) {
  const { appointment, setAppointment } = useApp();
  const [showSlots, setShowSlots] = useState(false);
  const [confirmCancel, setConfirmCancel] = useState(false);

  function reschedule(slot: TimeSlot) {
    if (appointment) {
      setAppointment({ ...appointment, date: slot.date, time: slot.time });
      setShowSlots(false);
    }
  }

  function cancel() {
    setAppointment(null);
    setConfirmCancel(false);
  }

  function bookService() {
    navigation.navigate('Tabs', {
      screen: 'Mall',
      params: { type: 'service' },
    });
  }

  return (
    <View style={styles.screen}>
      <ScreenHeader title="Appointment" onBack={() => navigation.goBack()} />
      {appointment ? (
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.card}>
            <Text style={styles.label}>SERVICE</Text>
            <Text style={styles.service}>{appointment.service}</Text>
            <DetailRow
              icon={require('../assets/images/icon-calendar.png')}
              text={appointment.date}
            />
            <DetailRow
              icon={require('../assets/images/icon-clock.png')}
              text={appointment.time}
            />
            <DetailRow
              icon={require('../assets/images/icon-location.png')}
              text={appointment.address}
            />
          </View>

          <Pressable
            style={styles.button}
            onPress={() => setShowSlots(!showSlots)}
          >
            <Text style={styles.buttonText}>Reschedule</Text>
          </Pressable>

          {showSlots
            ? timeSlots.map(slot => (
                <Pressable
                  key={slot.date + slot.time}
                  style={styles.slot}
                  onPress={() => reschedule(slot)}
                >
                  <Text style={styles.slotText}>
                    {slot.date + ' · ' + slot.time}
                  </Text>
                </Pressable>
              ))
            : null}

          {confirmCancel ? (
            <View style={styles.confirm}>
              <Text style={styles.confirmText}>Are you sure?</Text>
              <Pressable onPress={cancel}>
                <Text style={styles.yes}>Yes</Text>
              </Pressable>
              <Pressable onPress={() => setConfirmCancel(false)}>
                <Text style={styles.no}>No</Text>
              </Pressable>
            </View>
          ) : (
            <Pressable
              style={styles.cancelButton}
              onPress={() => setConfirmCancel(true)}
            >
              <Text style={styles.cancelText}>Cancel Appointment</Text>
            </Pressable>
          )}
        </ScrollView>
      ) : (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No upcoming appointment</Text>
          <Pressable onPress={bookService}>
            <Text style={styles.link}>Book a service</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 16,
  },
  label: {
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 1,
    color: colors.grey,
  },
  service: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.primary,
    marginTop: 4,
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  detailIcon: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
    tintColor: colors.primary,
    marginRight: 12,
  },
  detailText: {
    fontSize: 15,
    color: colors.text,
  },
  button: {
    backgroundColor: colors.button,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
  },
  slot: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 14,
    marginTop: 8,
  },
  slotText: {
    fontSize: 14,
    color: colors.primary,
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 12,
  },
  cancelText: {
    color: colors.grey,
    fontSize: 15,
    fontWeight: '500',
  },
  confirm: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 14,
    marginTop: 12,
  },
  confirmText: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
  },
  yes: {
    fontSize: 15,
    fontWeight: '700',
    color: '#AA5851',
    marginLeft: 20,
  },
  no: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.primary,
    marginLeft: 20,
  },
  empty: {
    alignItems: 'center',
    marginTop: 80,
  },
  emptyText: {
    fontSize: 15,
    color: colors.grey,
  },
  link: {
    fontSize: 14,
    color: colors.link,
    textDecorationLine: 'underline',
    marginTop: 12,
  },
});
