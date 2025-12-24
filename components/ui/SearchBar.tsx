import React from 'react';
import styled from 'styled-components/native';
import { AppTheme } from '../../theme';
import { IconSymbol } from './icon-symbol';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

const Container = styled.View<{ theme: AppTheme }>`
  flex-direction: row;
  align-items: center;
  background-color: ${(props: { theme: AppTheme }) => props.theme.secondary};
  padding: ${(props: { theme: AppTheme }) => props.theme.spacing.s}px
    ${(props: { theme: AppTheme }) => props.theme.spacing.m}px;
  border-radius: ${(props: { theme: AppTheme }) =>
    props.theme.borderRadius.l}px;
  margin: ${(props: { theme: AppTheme }) => props.theme.spacing.m}px;
`;

const StyledInput = styled.TextInput<{ theme: AppTheme }>`
  flex: 1;
  margin-left: ${(props: { theme: AppTheme }) => props.theme.spacing.s}px;
  font-size: 16px;
  color: ${(props: { theme: AppTheme }) => props.theme.text};
  height: 40px;
`;

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = 'Search products...',
}) => {
  return (
    <Container>
      <IconSymbol name='magnifyingglass' size={20} color='#888' />
      <StyledInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor='#888'
        autoCapitalize='none'
        autoCorrect={false}
      />
    </Container>
  );
};
