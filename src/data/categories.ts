import { ImageSourcePropType } from 'react-native';

export type Category = {
  id: string;
  name: string;
  circleImage: ImageSourcePropType;
  plantsImage: ImageSourcePropType;
};

export const categories: Category[] = [
  {
    id: 'c1',
    name: 'Indoor Plants',
    circleImage: require('../assets/images/category-1.png'),
    plantsImage: require('../assets/images/plants-1.png'),
  },
  {
    id: 'c2',
    name: 'Seedlings',
    circleImage: require('../assets/images/category-2.png'),
    plantsImage: require('../assets/images/plants-2.png'),
  },
  {
    id: 'c3',
    name: 'Pots',
    circleImage: require('../assets/images/category-3.png'),
    plantsImage: require('../assets/images/plants-3.png'),
  },
  {
    id: 'c4',
    name: 'Flowers',
    circleImage: require('../assets/images/category-4.png'),
    plantsImage: require('../assets/images/plants-4.png'),
  },
  {
    id: 'c5',
    name: 'Garden Care',
    circleImage: require('../assets/images/category-5.png'),
    plantsImage: require('../assets/images/plants-5.png'),
  },
];

export function getCategoryName(categoryId: string) {
  const category = categories.find(item => item.id === categoryId);
  return category ? category.name : '';
}
