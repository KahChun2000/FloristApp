import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TabScreenProps } from '../navigation/types';
import { products } from '../data/products';
import { getCategoryName } from '../data/categories';
import { filterProducts } from '../utils/filterProducts';
import { colors } from '../theme';
import ProductCard from '../components/ProductCard';
import FilterSheet, { SortOption } from '../components/FilterSheet';

type TypeOption = 'shop' | 'service' | undefined;

const typeOptions: { value: TypeOption; label: string }[] = [
  { value: undefined, label: 'All' },
  { value: 'shop', label: 'Shop' },
  { value: 'service', label: 'Services' },
];

export default function MallScreen({
  navigation,
  route,
}: TabScreenProps<'Mall'>) {
  const insets = useSafeAreaInsets();
  const [type, setType] = useState<TypeOption>(route.params?.type);
  const [categoryId, setCategoryId] = useState(route.params?.categoryId);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortOption>('default');
  const [saleOnly, setSaleOnly] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    setType(route.params?.type);
    setCategoryId(route.params?.categoryId);
    setSearch('');
  }, [route.params]);

  const items = filterProducts(products, {
    type,
    categoryId,
    search,
    sort,
    saleOnly,
  });

  function goBack() {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('Home');
    }
  }

  function applyFilter(newSort: SortOption, newSaleOnly: boolean) {
    setSort(newSort);
    setSaleOnly(newSaleOnly);
    setFilterOpen(false);
  }

  const filterActive = sort !== 'default' || saleOnly;

  return (
    <View style={styles.screen}>
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <Pressable onPress={goBack} accessibilityLabel="Back" hitSlop={10}>
          <Image
            source={require('../assets/images/icon-back.png')}
            style={styles.backIcon}
          />
        </Pressable>
        <View style={styles.searchBox}>
          <Image
            source={require('../assets/images/icon-search.png')}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Salon"
            placeholderTextColor={colors.grey}
            value={search}
            onChangeText={setSearch}
            returnKeyType="search"
          />
          <Pressable
            onPress={() => setFilterOpen(true)}
            accessibilityLabel="Filter"
            hitSlop={10}
          >
            <Image
              source={require('../assets/images/icon-filter.png')}
              style={styles.filterIcon}
            />
            {filterActive ? <View style={styles.filterDot} /> : null}
          </Pressable>
        </View>
      </View>

      <View style={styles.pills}>
        {typeOptions.map(option => {
          const selected = option.value === type;
          return (
            <Pressable
              key={option.label}
              style={[styles.pill, selected && styles.pillSelected]}
              onPress={() => setType(option.value)}
            >
              <Text
                style={[styles.pillText, selected && styles.pillTextSelected]}
              >
                {option.label}
              </Text>
            </Pressable>
          );
        })}
        {categoryId ? (
          <Pressable
            style={[styles.pill, styles.pillSelected]}
            onPress={() => setCategoryId(undefined)}
          >
            <Text style={[styles.pillText, styles.pillTextSelected]}>
              {getCategoryName(categoryId) + ' ✕'}
            </Text>
          </Pressable>
        ) : null}
      </View>

      <FlatList
        testID="mall-list"
        data={items}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        numColumns={2}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() =>
              navigation.navigate('ProductDetail', { productId: item.id })
            }
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No items found</Text>}
      />

      {filterOpen ? (
        <FilterSheet
          sort={sort}
          saleOnly={saleOnly}
          onApply={applyFilter}
          onClose={() => setFilterOpen(false)}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  backIcon: {
    width: 8,
    height: 14,
    tintColor: colors.text,
    marginRight: 16,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    paddingHorizontal: 14,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 3,
  },
  searchIcon: {
    width: 18,
    height: 18,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: colors.text,
    marginHorizontal: 10,
    paddingVertical: 0,
  },
  filterIcon: {
    width: 20,
    height: 20,
  },
  filterDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.price,
  },
  pills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 14,
    backgroundColor: colors.white,
    marginRight: 8,
    marginBottom: 4,
  },
  pillSelected: {
    backgroundColor: colors.primary,
  },
  pillText: {
    fontSize: 12,
    color: colors.grey,
  },
  pillTextSelected: {
    color: colors.white,
  },
  grid: {
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 24,
  },
  empty: {
    textAlign: 'center',
    color: colors.grey,
    fontSize: 14,
    marginTop: 40,
  },
});
