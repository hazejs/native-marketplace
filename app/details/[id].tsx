import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import styled from 'styled-components/native';
import { Image as ExpoImage } from 'expo-image';
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux';
import { fetchProductByIdRequest } from '@/features/products/productsSlice';
import { addToCart } from '@/features/cart/cartSlice';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Button } from '@/components/ui/Button';
import { AppTheme } from '@/theme';

const Container = styled.ScrollView<{ theme: AppTheme }>`
  flex: 1;
  background-color: ${(props: { theme: AppTheme }) => props.theme.background};
`;

const ProductImage = styled(ExpoImage)`
  width: 100%;
  aspect-ratio: 1.2;
`;

const Content = styled.View<{ theme: AppTheme }>`
  padding: ${(props: { theme: AppTheme }) => props.theme.spacing.l}px;
`;

const CategoryLabel = styled.Text<{ theme: AppTheme }>`
  color: ${(props: { theme: AppTheme }) => props.theme.primary};
  font-weight: 600;
  margin-bottom: 4px;
`;

const Title = styled.Text<{ theme: AppTheme }>`
  font-size: 24px;
  font-weight: 700;
  color: ${(props: { theme: AppTheme }) => props.theme.text};
  margin-bottom: 8px;
`;

const PriceRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const Price = styled.Text<{ theme: AppTheme }>`
  font-size: 28px;
  font-weight: 700;
  color: ${(props: { theme: AppTheme }) => props.theme.text};
`;

const RatingContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const StockBadge = styled.View<{ inStock: boolean }>`
  background-color: ${props => props.inStock ? '#e8f5e9' : '#ffebee'};
  padding: 4px 8px;
  border-radius: 4px;
  margin-bottom: 16px;
`;

const StockText = styled.Text<{ inStock: boolean }>`
  color: ${props => props.inStock ? '#2e7d32' : '#c62828'};
  font-size: 12px;
  font-weight: 600;
`;

const DescriptionTitle = styled.Text<{ theme: AppTheme }>`
  font-size: 18px;
  font-weight: 600;
  color: ${(props: { theme: AppTheme }) => props.theme.text};
  margin-bottom: 8px;
`;

const Description = styled.Text<{ theme: AppTheme }>`
  font-size: 16px;
  line-height: 24px;
  color: ${(props: { theme: AppTheme }) => props.theme.textSecondary};
  margin-bottom: 24px;
`;

const QuantityRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 24px;
`;

const QuantityButton = styled.TouchableOpacity<{ theme: AppTheme }>`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${(props: { theme: AppTheme }) => props.theme.secondary};
  justify-content: center;
  align-items: center;
`;

const QuantityText = styled.Text<{ theme: AppTheme }>`
  font-size: 18px;
  font-weight: 600;
  margin: 0 20px;
  color: ${(props: { theme: AppTheme }) => props.theme.text};
`;

const ActionFooter = styled.View<{ theme: AppTheme }>`
  padding: ${(props: { theme: AppTheme }) => props.theme.spacing.l}px;
  background-color: ${(props: { theme: AppTheme }) => props.theme.card};
  border-top-width: 1px;
  border-top-color: ${(props: { theme: AppTheme }) => props.theme.border};
`;

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const product = useAppSelector(state => 
    state.products.items.find(p => p.id === id)
  );
  const loading = useAppSelector(state => state.products.loading);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!product) {
      dispatch(fetchProductByIdRequest(id as string));
    }
  }, [id, product, dispatch]);

  if (loading && !product) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Product not found</Text>
      </View>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity }));
    router.back();
  };

  return (
    <View style={{ flex: 1 }}>
      <Container>
        <ProductImage source={{ uri: product.image }} contentFit="cover" />
        <Content>
          <CategoryLabel>{product.category}</CategoryLabel>
          <Title>{product.name}</Title>
          
          <PriceRow>
            <Price>${product.price}</Price>
            <RatingContainer>
              <IconSymbol name="star.fill" size={18} color="#FFD700" />
              <Text style={{ marginLeft: 4, fontWeight: '600' }}>{product.rating}</Text>
              <Text style={{ color: '#888', marginLeft: 4 }}>({product.reviewCount} reviews)</Text>
            </RatingContainer>
          </PriceRow>

          <StockBadge inStock={product.stock > 0}>
            <StockText inStock={product.stock > 0}>
              {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
            </StockText>
          </StockBadge>

          <DescriptionTitle>Description</DescriptionTitle>
          <Description>{product.description}</Description>

          <DescriptionTitle>Quantity</DescriptionTitle>
          <QuantityRow>
            <QuantityButton onPress={() => setQuantity(q => Math.max(1, q - 1))}>
              <IconSymbol name="minus" size={20} color={quantity > 1 ? '#0a7ea4' : '#888'} />
            </QuantityButton>
            <QuantityText>{quantity}</QuantityText>
            <QuantityButton onPress={() => setQuantity(q => Math.min(product.stock, q + 1))}>
              <IconSymbol name="plus" size={20} color="#0a7ea4" />
            </QuantityButton>
          </QuantityRow>
        </Content>
      </Container>
      <ActionFooter>
        <Button 
          title="Add to Cart" 
          onPress={handleAddToCart}
          disabled={product.stock === 0}
        />
      </ActionFooter>
    </View>
  );
}
