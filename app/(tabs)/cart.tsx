import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, Alert, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import styled from 'styled-components/native';
import { Image as ExpoImage } from 'expo-image';
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux';
import { removeFromCart, updateQuantity, selectCartTotal } from '@/features/cart/cartSlice';
import { placeOrderRequest, resetOrderState } from '@/features/orders/orderSlice';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Button } from '@/components/ui/Button';
import { CongratulationsModal } from '@/components/CongratulationsModal';
import { AppTheme } from '@/theme';

const Container = styled.View<{ theme: AppTheme }>`
  flex: 1;
  background-color: ${(props: { theme: AppTheme }) => props.theme.background};
`;

const CartItemContainer = styled.View<{ theme: AppTheme }>`
  flex-direction: row;
  padding: ${(props: { theme: AppTheme }) => props.theme.spacing.m}px;
  border-bottom-width: 1px;
  border-bottom-color: ${(props: { theme: AppTheme }) => props.theme.border};
`;

const ItemImage = styled(ExpoImage)<{ theme: AppTheme }>`
  width: 80px;
  height: 80px;
  border-radius: ${(props: { theme: AppTheme }) => props.theme.borderRadius.s}px;
`;

const ItemInfo = styled.View<{ theme: AppTheme }>`
  flex: 1;
  margin-left: ${(props: { theme: AppTheme }) => props.theme.spacing.m}px;
`;

const ItemTitle = styled.Text<{ theme: AppTheme }>`
  font-size: 16px;
  font-weight: 600;
  color: ${(props: { theme: AppTheme }) => props.theme.text};
  margin-bottom: 4px;
`;

const ItemPrice = styled.Text<{ theme: AppTheme }>`
  font-size: 16px;
  font-weight: 700;
  color: ${(props: { theme: AppTheme }) => props.theme.primary};
`;

const QuantityRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`;

const QtyButton = styled.TouchableOpacity<{ theme: AppTheme }>`
  padding: 4px;
  background-color: ${(props: { theme: AppTheme }) => props.theme.secondary};
  border-radius: 4px;
`;

const QtyText = styled.Text`
  margin: 0 12px;
  font-size: 16px;
  font-weight: 600;
`;

const RemoveButton = styled.TouchableOpacity<{ theme: AppTheme }>`
  justify-content: center;
  padding-left: ${(props: { theme: AppTheme }) => props.theme.spacing.m}px;
`;

const SummaryFooter = styled.View<{ theme: AppTheme }>`
  padding: ${(props: { theme: AppTheme }) => props.theme.spacing.l}px;
  background-color: ${(props: { theme: AppTheme }) => props.theme.card};
  border-top-width: 1px;
  border-top-color: ${(props: { theme: AppTheme }) => props.theme.border};
`;

const SummaryRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const TotalText = styled.Text<{ theme: AppTheme }>`
  font-size: 18px;
  font-weight: 700;
  color: ${(props: { theme: AppTheme }) => props.theme.text};
`;

const EmptyContainer = styled.View<{ theme: AppTheme }>`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${(props: { theme: AppTheme }) => props.theme.spacing.xl}px;
`;

const EmptyText = styled.Text<{ theme: AppTheme }>`
  font-size: 18px;
  color: ${(props: { theme: AppTheme }) => props.theme.textSecondary};
  margin-top: 16px;
`;

export default function CartScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(state => state.cart.items);
  const total = useAppSelector(selectCartTotal);
  const { loading: orderLoading, currentOrder } = useAppSelector(state => state.orders);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (currentOrder) {
      setShowModal(true);
    }
  }, [currentOrder]);

  const handleCloseModal = () => {
    setShowModal(false);
    dispatch(resetOrderState());
    router.replace('/(tabs)');
  };

  const handleCheckout = () => {
    dispatch(placeOrderRequest());
  };

  const renderItem = ({ item }: { item: any }) => (
    <CartItemContainer>
      <ItemImage source={{ uri: item.image }} />
      <ItemInfo>
        <ItemTitle numberOfLines={1}>{item.name}</ItemTitle>
        <ItemPrice>${item.price}</ItemPrice>
        <QuantityRow>
          <QtyButton onPress={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}>
            <IconSymbol name="minus" size={16} color={item.quantity > 1 ? '#0a7ea4' : '#888'} />
          </QtyButton>
          <QtyText>{item.quantity}</QtyText>
          <QtyButton onPress={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}>
            <IconSymbol name="plus" size={16} color="#0a7ea4" />
          </QtyButton>
        </QuantityRow>
      </ItemInfo>
      <RemoveButton onPress={() => dispatch(removeFromCart(item.id))}>
        <IconSymbol name="trash" size={20} color="#ff4444" />
      </RemoveButton>
    </CartItemContainer>
  );

  if (cartItems.length === 0 && !showModal) {
    return (
      <EmptyContainer>
        <IconSymbol name="cart" size={64} color="#ccc" />
        <EmptyText>Your cart is empty</EmptyText>
        <TouchableOpacity style={{ marginTop: 20 }} onPress={() => router.push('/(tabs)')}>
          <Text style={{ color: '#0a7ea4', fontWeight: '600' }}>Go Shopping</Text>
        </TouchableOpacity>
      </EmptyContainer>
    );
  }

  return (
    <Container>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <SummaryFooter>
        <SummaryRow>
          <Text style={{ fontSize: 16, color: '#666' }}>Subtotal</Text>
          <Text style={{ fontSize: 16 }}>${total.toFixed(2)}</Text>
        </SummaryRow>
        <SummaryRow>
          <Text style={{ fontSize: 16, color: '#666' }}>Shipping</Text>
          <Text style={{ fontSize: 16 }}>Free</Text>
        </SummaryRow>
        <SummaryRow style={{ marginTop: 8 }}>
          <TotalText>Total</TotalText>
          <TotalText>${total.toFixed(2)}</TotalText>
        </SummaryRow>
        <View style={{ marginTop: 16 }}>
          <Button 
            title="Place Order" 
            onPress={handleCheckout} 
            loading={orderLoading}
          />
        </View>
      </SummaryFooter>
      
      <CongratulationsModal 
        visible={showModal} 
        onClose={handleCloseModal} 
      />
    </Container>
  );
}
