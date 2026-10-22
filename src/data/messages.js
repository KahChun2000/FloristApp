export const messages = [
  {
    id: 'i1',
    title: 'Appointment confirmed',
    preview: 'Your plant health check is booked for 14 Oct 2020.',
    body: 'Hi Jane, your Indoor Plant Health Check is confirmed for 14 Oct 2020 at 12:30 PM. Our florist will arrive at 123 Plant Street. See you soon!',
    date: '12 Oct',
  },
  {
    id: 'i2',
    title: '50% off selected flowers',
    preview: 'This week only, enjoy half price on bouquets.',
    body: 'Brighten up your home with our fresh bouquets. Selected flowers are 50% off until Sunday. Visit the Mall tab to see all deals.',
    date: '11 Oct',
  },
  {
    id: 'i3',
    title: 'You earned 10 points',
    preview: 'Thank you for your last purchase.',
    body: 'You earned 10 points from your last order. Collect more points to redeem free plants and services.',
    date: '9 Oct',
  },
  {
    id: 'i4',
    title: 'New workshop available',
    preview: 'Join our Flower Arrangement Workshop for beginners.',
    body: 'Learn the basics of flower arranging with our experts. Seats are limited, book now from the Services section.',
    date: '7 Oct',
  },
  {
    id: 'i5',
    title: 'Your order is on the way',
    preview: 'Your Monstera will arrive tomorrow.',
    body: 'Good news! Your order has been shipped and will arrive tomorrow between 9am and 6pm.',
    date: '5 Oct',
  },
  {
    id: 'i6',
    title: 'Welcome to FloristApp',
    preview: 'Discover plants, services and tips.',
    body: 'Welcome! Browse the Mall for plants and services, read tips in Discover and keep track of everything in your Account.',
    date: '1 Oct',
  },
];

export function getMessage(messageId) {
  return messages.find(item => item.id === messageId);
}
