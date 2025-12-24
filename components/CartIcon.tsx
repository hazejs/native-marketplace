import React from 'react';
import styled from 'styled-components/native';
import { useRouter } from 'expo-router';
import { IconSymbol } from './ui/icon-symbol';
import { useAppSelector } from '../hooks/use-redux';
import { selectCartCount } from '../features/cart/cartSlice';
import { AppTheme } from '@/theme';

const Container = styled.TouchableOpacity`
  padding: 8px;
`;

const Badge = styled.View<{ theme: AppTheme }>`
  position: absolute;
  top: 4px;
  right: 4px;
  background-color: ${(props: { theme: AppTheme }) => props.theme.error};
  border-radius: 10px;
  min-width: 18px;
  height: 18px;
  justify-content: center;
  align-items: center;
  padding: 0 4px;
`;

const BadgeText = styled.Text`
  color: #fff;
  font-size: 10px;
  font-weight: bold;
`;

export const CartIcon = () => {
  const router = useRouter();
  const count = useAppSelector(selectCartCount);

  return (
    <Container onPress={() => router.push('/(tabs)/cart')}>
      <IconSymbol name="cart.fill" size={24} color="#000" />
      {count > 0 && (
        <Badge>
          <BadgeText>{count > 99 ? '99+' : count}</BadgeText>
        </Badge>
      )}
    </Container>
  );
};

