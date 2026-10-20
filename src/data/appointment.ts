export type Appointment = {
  service: string;
  date: string;
  time: string;
  address: string;
};

export type TimeSlot = {
  date: string;
  time: string;
};

export const defaultAppointment: Appointment = {
  service: 'Indoor Plant Health Check at Home',
  date: '14 Oct 2020',
  time: '12:30 PM',
  address: '123 Plant Street, 1/1 Lorem Ipsum',
};

export const timeSlots: TimeSlot[] = [
  { date: '16 Oct 2020', time: '10:00 AM' },
  { date: '17 Oct 2020', time: '2:30 PM' },
  { date: '20 Oct 2020', time: '4:00 PM' },
];
