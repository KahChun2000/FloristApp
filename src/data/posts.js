const body =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Cras mattis consectetur purus sit amet fermentum.\n\nDonec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Maecenas faucibus mollis interdum. Nullam quis risus eget urna mollis ornare vel eu leo.';

export const posts = [
  {
    id: 'd1',
    categoryId: 'c1',
    category: 'Indoor Plants',
    title: 'How to keep your Pilea happy indoors',
    body,
    likes: 24,
  },
  {
    id: 'd2',
    categoryId: 'c4',
    category: 'Flowers',
    title: 'Five flowers that bloom all year round in a tropical climate',
    body,
    likes: 41,
  },
  {
    id: 'd3',
    categoryId: 'c3',
    category: 'Pots',
    title:
      'Choosing the right pot size for a growing plant and why drainage matters',
    body,
    likes: 12,
  },
  {
    id: 'd4',
    categoryId: 'c2',
    category: 'Seedlings',
    title: 'Starting herbs from seed on your balcony',
    body,
    likes: 33,
  },
  {
    id: 'd5',
    categoryId: 'c5',
    category: 'Garden Care',
    title: 'Watering mistakes most beginners make',
    body,
    likes: 58,
  },
  {
    id: 'd6',
    categoryId: 'c1',
    category: 'Indoor Plants',
    title: 'Low light plants that are almost impossible to kill and look great',
    body,
    likes: 19,
  },
  {
    id: 'd7',
    categoryId: 'c4',
    category: 'Flowers',
    title: 'Making a bouquet last longer in a vase at home',
    body,
    likes: 27,
  },
  {
    id: 'd8',
    categoryId: 'c5',
    category: 'Garden Care',
    title: 'Natural ways to deal with garden pests',
    body,
    likes: 9,
  },
];

export function getPost(postId) {
  return posts.find(item => item.id === postId);
}
