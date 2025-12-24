import { AppTheme } from '@/theme';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  loading?: boolean;
  disabled?: boolean;
}

const StyledButton = styled.TouchableOpacity<{
  variant: string;
  disabled: boolean;
  theme: AppTheme;
}>`
  height: 48px;
  border-radius: ${(props: { theme: AppTheme }) =>
    props.theme.borderRadius.m}px;
  justify-content: center;
  align-items: center;
  padding: 0 ${(props: { theme: AppTheme }) => props.theme.spacing.m}px;
  background-color: ${(props: {
    variant: string;
    disabled: boolean;
    theme: AppTheme;
  }) => {
    if (props.disabled) return props.theme.secondary;
    switch (props.variant) {
      case 'primary':
        return props.theme.primary;
      case 'secondary':
        return props.theme.secondary;
      case 'outline':
        return 'transparent';
      default:
        return props.theme.primary;
    }
  }};
  border-width: ${(props: { variant: string; theme: AppTheme }) =>
    props.variant === 'outline' ? 1 : 0}px;
  border-color: ${(props: { theme: AppTheme }) => props.theme.primary};
`;

const ButtonText = styled.Text<{
  variant: string;
  disabled: boolean;
  theme: AppTheme;
}>`
  font-weight: 600;
  font-size: 16px;
  color: ${(props: { variant: string; disabled: boolean; theme: AppTheme }) => {
    if (props.disabled) return props.theme.textSecondary;
    switch (props.variant) {
      case 'primary':
        return '#ffffff';
      case 'secondary':
        return props.theme.text;
      case 'outline':
        return props.theme.primary;
      default:
        return '#ffffff';
    }
  }};
`;

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
}) => {
  return (
    <StyledButton
      variant={variant}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#fff' : '#000'} />
      ) : (
        <ButtonText variant={variant} disabled={disabled}>
          {title}
        </ButtonText>
      )}
    </StyledButton>
  );
};
