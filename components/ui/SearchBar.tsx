import React from 'react';
import { View, TextInput } from 'react-native';
import styled from 'styled-components/native';
import { IconSymbol } from './icon-symbol';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${props => props.theme.secondary};
  padding: ${props => props.theme.spacing.s}px ${props => props.theme.spacing.m}px;
  border-radius: ${props => props.theme.borderRadius.l}px;
  margin: ${props => props.theme.spacing.m}px;
`;

const StyledInput = styled.TextInput`
  flex: 1;
  margin-left: ${props => props.theme.spacing.s}px;
  font-size: 16px;
  color: ${props => props.theme.text};
  height: 40px;
`;

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChangeText, placeholder = 'Search products...' }) => {
  return (
    <Container>
      <IconSymbol name="magnifyingglass" size={20} color="#888" />
      <StyledInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#888"
        autoCapitalize="none"
        autoCorrect={false}
      />
    </Container>
  );
};

