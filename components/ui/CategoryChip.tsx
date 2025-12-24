import React from 'react';
import styled from 'styled-components/native';
import { AppTheme } from '../../theme';
import { Category } from '../../types';

interface CategoryChipProps {
  category: Category | 'All';
  selected: boolean;
  onPress: () => void;
}

const Chip = styled.TouchableOpacity<{ selected: boolean; theme: AppTheme }>`
  padding: ${(props: { selected: boolean; theme: AppTheme }) => props.theme.spacing.s}px ${(props: { selected: boolean; theme: AppTheme }) => props.theme.spacing.m}px;
  border-radius: ${(props: { selected: boolean; theme: AppTheme }) => props.theme.borderRadius.l}px;
  background-color: ${(props: { selected: boolean; theme: AppTheme }) => props.selected ? props.theme.primary : props.theme.secondary};
  margin-right: ${(props: { selected: boolean; theme: AppTheme }) => props.theme.spacing.s}px;
  border-width: 1px;
  border-color: ${(props: { selected: boolean; theme: AppTheme }) => props.selected ? props.theme.primary : props.theme.border};
`;

const ChipText = styled.Text<{ selected: boolean; theme: AppTheme }>`
  font-size: 14px;
  font-weight: 500;
  color: ${(props: { selected: boolean; theme: AppTheme }) => props.selected ? '#ffffff' : props.theme.text};
`;

export const CategoryChip: React.FC<CategoryChipProps> = ({ category, selected, onPress }) => {
  return (
    <Chip selected={selected} onPress={onPress}>
      <ChipText selected={selected}>{category}</ChipText>
    </Chip>
  );
};

