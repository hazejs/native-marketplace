import { Image as ExpoImage } from 'expo-image';
import React from 'react';
import styled from 'styled-components/native';
import { AppTheme } from '../theme';
import { Product } from '../types';
import { IconSymbol } from './ui/icon-symbol';

interface ProductCardProps {
  product: Product;
  onPress: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

const Card = styled.TouchableOpacity<{ theme: AppTheme }>`
  background-color: ${(props: { theme: AppTheme }) => props.theme.card};
  border-radius: ${(props: { theme: AppTheme }) =>
    props.theme.borderRadius.m}px;
  margin: ${(props: { theme: AppTheme }) => props.theme.spacing.s}px;
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 280px;
  width: 100%;
  max-width: 100%;

  /* Enhanced Shadow for depth */
  shadow-color: #000;
  shadow-offset: 0px 8px;
  shadow-opacity: 0.15;
  shadow-radius: 12px;

  /* Shadow for Android */
  elevation: 8;

  /* Subtle border to define the card against white backgrounds */
  border-width: 1px;
  border-color: rgba(0, 0, 0, 0.05);
`;

const ImageContainer = styled.View`
  border-top-left-radius: ${(props: { theme: AppTheme }) =>
    props.theme.borderRadius.m}px;
  border-top-right-radius: ${(props: { theme: AppTheme }) =>
    props.theme.borderRadius.m}px;
  overflow: hidden;
  width: 100%;
`;

const ProductImage = styled(ExpoImage)`
  width: 100%;
  aspect-ratio: 1;
`;

const Content = styled.View<{ theme: AppTheme }>`
  padding: ${(props: { theme: AppTheme }) => props.theme.spacing.s}px;
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 120px;
  width: 100%;
`;

const TopSection = styled.View`
  flex: 1;
  flex-shrink: 1;
  width: 100%;
`;

const BottomSection = styled.View<{ theme: AppTheme }>`
  margin-top: ${(props: { theme: AppTheme }) => props.theme.spacing.s}px;
  width: 100%;
`;

const Title = styled.Text<{ theme: AppTheme }>`
  font-size: 14px;
  font-weight: 600;
  color: ${(props: { theme: AppTheme }) => props.theme.text};
  margin-bottom: 4px;
`;

const Category = styled.Text<{ theme: AppTheme }>`
  font-size: 12px;
  color: ${(props: { theme: AppTheme }) => props.theme.textSecondary};
  margin-bottom: 4px;
`;

const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 4px;
`;

const Price = styled.Text<{ theme: AppTheme }>`
  font-size: 16px;
  font-weight: 700;
  color: ${(props: { theme: AppTheme }) => props.theme.primary};
`;

const RatingContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 4px;
`;

const RatingText = styled.Text<{ theme: AppTheme }>`
  font-size: 12px;
  margin-left: 2px;
  color: ${(props: { theme: AppTheme }) => props.theme.textSecondary};
`;

const AddButton = styled.TouchableOpacity<{ theme: AppTheme }>`
  background-color: ${(props: { theme: AppTheme }) => props.theme.primary};
  width: 32px;
  height: 32px;
  border-radius: 16px;
  justify-content: center;
  align-items: center;
`;

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onPress,
  onAddToCart,
}) => {
  return (
    <Card onPress={() => onPress(product)} activeOpacity={0.9}>
      <ImageContainer>
        <ProductImage
          source={{ uri: product.image }}
          contentFit='cover'
          transition={200}
        />
      </ImageContainer>
      <Content>
        <TopSection>
          <Category>{product.category}</Category>
          <Title numberOfLines={2}>{product.name}</Title>
        </TopSection>
        <BottomSection>
          <RatingContainer>
            <IconSymbol name='star.fill' size={12} color='#FFD700' />
            <RatingText>
              {product.rating} ({product.reviewCount})
            </RatingText>
          </RatingContainer>
          <Footer>
            <Price>${product.price}</Price>
            <AddButton onPress={() => onAddToCart(product)} activeOpacity={0.7}>
              <IconSymbol name='plus' size={20} color='#fff' />
            </AddButton>
          </Footer>
        </BottomSection>
      </Content>
    </Card>
  );
};
