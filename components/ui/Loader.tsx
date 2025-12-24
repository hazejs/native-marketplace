import { AppTheme } from '@/theme';
import React, { useEffect } from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import styled from 'styled-components/native';

interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  fullScreen?: boolean;
}

const Container = styled.View<{ fullScreen: boolean; theme: AppTheme }>`
  ${(props: { fullScreen: boolean; theme: AppTheme }) =>
    props.fullScreen
      ? `
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${props.theme.background};
  `
      : `
    padding: ${props.theme.spacing.m}px;
    align-items: center;
    justify-content: center;
  `}
`;

const SpinnerContainer = styled.View<{ size: number }>`
  width: ${(props: { size: number }) => props.size}px;
  height: ${(props: { size: number }) => props.size}px;
  justify-content: center;
  align-items: center;
`;

const Circle = styled(Animated.View)<{ size: number; color: string }>`
  width: ${(props: { size: number; color: string }) => props.size}px;
  height: ${(props: { size: number; color: string }) => props.size}px;
  border-radius: ${(props: { size: number; color: string }) =>
    props.size / 2}px;
  border-width: 3px;
  border-color: ${(props: { size: number; color: string }) => props.color};
  border-top-color: transparent;
`;

const SIZE_MAP = {
  small: 20,
  medium: 32,
  large: 48,
};

export const Loader: React.FC<LoaderProps> = ({
  size = 'medium',
  color = '#0a7ea4',
  fullScreen = false,
}) => {
  const rotation = useSharedValue(0);
  const sizeValue = SIZE_MAP[size];

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 1000,
        easing: Easing.linear,
      }),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  return (
    <Container fullScreen={fullScreen}>
      <SpinnerContainer size={sizeValue}>
        <Circle size={sizeValue} color={color} style={animatedStyle} />
      </SpinnerContainer>
    </Container>
  );
};
