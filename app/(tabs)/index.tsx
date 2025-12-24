import React, { useEffect, useCallback, useState } from 'react';
import { FlatList, View, ActivityIndicator, RefreshControl, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import styled from 'styled-components/native';
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux';
import { fetchProductsRequest, setFilters } from '@/features/products/productsSlice';
import { addToCart } from '@/features/cart/cartSlice';
import { ProductCard } from '@/components/ProductCard';
import { SearchBar } from '@/components/ui/SearchBar';
import { CategoryChip } from '@/components/ui/CategoryChip';
import { Category } from '@/types';
import { AppTheme } from '@/theme';

const Container = styled.View<{ theme: AppTheme }>`
  flex: 1;
  background-color: ${(props: { theme: AppTheme }) => props.theme.background};
`;

const Header = styled.View<{ theme: AppTheme }>`
  background-color: ${(props: { theme: AppTheme }) => props.theme.background};
  padding-bottom: ${(props: { theme: AppTheme }) => props.theme.spacing.s}px;
`;

const CategoriesList = styled.ScrollView<{ theme: AppTheme }>`
  padding: 0 ${(props: { theme: AppTheme }) => props.theme.spacing.m}px;
  margin-bottom: ${(props: { theme: AppTheme }) => props.theme.spacing.s}px;
`;

const FooterLoader = styled.View<{ theme: AppTheme }>`
  padding: ${(props: { theme: AppTheme }) => props.theme.spacing.l}px;
  align-items: center;
`;

const EmptyContainer = styled.View<{ theme: AppTheme }>`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${(props: { theme: AppTheme }) => props.theme.spacing.xl}px;
`;

const EmptyText = styled.Text<{ theme: AppTheme }>`
  font-size: 16px;
  color: ${(props: { theme: AppTheme }) => props.theme.textSecondary};
  text-align: center;
`;

const CATEGORIES: (Category | 'All')[] = ['All', 'Electronics', 'Clothing', 'Home', 'Beauty', 'Sports', 'Books'];

export default function ShopScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { items, loading, refreshing, page, hasMore, filters } = useAppSelector(state => state.products);
  const [searchTerm, setSearchTerm] = useState(filters.search || '');

  useEffect(() => {
    dispatch(fetchProductsRequest({ page: 1, isRefresh: true }));
  }, []);

  const handleRefresh = useCallback(() => {
    dispatch(fetchProductsRequest({ page: 1, isRefresh: true }));
  }, [dispatch]);

  const handleLoadMore = useCallback(() => {
    if (hasMore && !loading) {
      dispatch(fetchProductsRequest({ page: page + 1 }));
    }
  }, [hasMore, loading, page, dispatch]);

  const handleSearch = (text: string) => {
    setSearchTerm(text);
    dispatch(setFilters({ search: text }));
    dispatch(fetchProductsRequest({ page: 1, isRefresh: true }));
  };

  const handleCategorySelect = (category: Category | 'All') => {
    dispatch(setFilters({ category: category === 'All' ? undefined : category }));
    dispatch(fetchProductsRequest({ page: 1, isRefresh: true }));
  };

  const renderProduct = ({ item }: { item: any }) => (
    <ProductCard
      product={item}
      onPress={(p) => router.push(`/details/${p.id}`)}
      onAddToCart={(p) => dispatch(addToCart({ product: p, quantity: 1 }))}
    />
  );

  return (
    <Container>
      <Header>
        <SearchBar 
          value={searchTerm} 
          onChangeText={handleSearch} 
        />
        <View>
          <CategoriesList horizontal showsHorizontalScrollIndicator={false}>
            {CATEGORIES.map(cat => (
              <CategoryChip
                key={cat}
                category={cat}
                selected={cat === (filters.category || 'All')}
                onPress={() => handleCategorySelect(cat)}
              />
            ))}
          </CategoriesList>
        </View>
      </Header>

      <FlatList
        data={items}
        renderItem={renderProduct}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={{ padding: 8 }}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListFooterComponent={() => 
          loading && !refreshing ? (
            <FooterLoader>
              <ActivityIndicator size="small" />
            </FooterLoader>
          ) : null
        }
        ListEmptyComponent={() => 
          !loading ? (
            <EmptyContainer>
              <EmptyText>No products found matching your search.</EmptyText>
            </EmptyContainer>
          ) : null
        }
      />
    </Container>
  );
}
