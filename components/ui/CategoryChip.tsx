import React from 'react';
import styled from 'styled-components/native';
import { Category } from '../../types';

interface CategoryChipProps {
  category: Category | 'All';
  selected: boolean;
  onPress: () => void;
}

const Chip = styled.TouchableOpacity<{ selected: boolean }>`
  padding: ${props => props.theme.spacing.s}px ${props => props.theme.spacing.m}px;
  border-radius: ${props => props.theme.borderRadius.l}px;
  background-color: ${props => props.selected ? props.theme.primary : props.theme.secondary};
  margin-right: ${props => props.theme.spacing.s}px;
  border-width: 1px;
  border-color: ${props => props.selected ? props.theme.primary : props.theme.border};
`;

const ChipText = styled.Text<{ selected: boolean }>`
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.selected ? '#ffffff' : props.theme.text};
`;

export const CategoryChip: React.FC<CategoryChipProps> = ({ category, selected, onPress }) => {
  return (
    <Chip selected={selected} onPress={onPress}>
      <ChipText selected={selected}>{category}</ChipText>
    </Chip>
  );
};

