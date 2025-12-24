import { AppTheme } from '@/theme';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Modal, Platform, View } from 'react-native';
import styled from 'styled-components/native';
import { Button } from './ui/Button';
import { IconSymbol } from './ui/icon-symbol';

interface CongratulationsModalProps {
  visible: boolean;
  onClose: () => void;
}

const Overlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Content = styled.View<{ theme: AppTheme }>`
  background-color: ${(props: { theme: AppTheme }) => props.theme.card};
  border-radius: ${(props: { theme: AppTheme }) =>
    props.theme.borderRadius.l}px;
  padding: 30px;
  width: 100%;
  max-width: 400px;
  align-items: center;
  elevation: 5;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 10px;
`;

const Title = styled.Text<{ theme: AppTheme }>`
  font-size: 24px;
  font-weight: 700;
  color: ${(props: { theme: AppTheme }) => props.theme.text};
  margin-top: 20px;
  text-align: center;
`;

const Message = styled.Text<{ theme: AppTheme }>`
  font-size: 16px;
  color: ${(props: { theme: AppTheme }) => props.theme.textSecondary};
  margin-vertical: 15px;
  margin-bottom: 25px;
  text-align: center;
`;

export const CongratulationsModal: React.FC<CongratulationsModalProps> = ({
  visible,
  onClose,
}) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const confettiLoaded = useRef(false);
  const [ConfettiComponent, setConfettiComponent] = useState<any>(null);

  useEffect(() => {
    if (visible && !confettiLoaded.current) {
      confettiLoaded.current = true;

      // Lazy load confetti
      const loadConfetti = async () => {
        try {
          if (Platform.OS === 'web') {
            const confettiModule = await import('canvas-confetti');
            const confetti = confettiModule.default;
            const defaults = {
              startVelocity: 30,
              spread: 360,
              ticks: 60,
              zIndex: 9999,
            };

            const randomInRange = (min: number, max: number) =>
              Math.random() * (max - min) + min;

            confetti({
              ...defaults,
              particleCount: 50,
              origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            });
            confetti({
              ...defaults,
              particleCount: 50,
              origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            });
          } else {
            const module = await import('react-native-confetti-cannon');
            setConfettiComponent(() => module.default);
          }
        } catch {}
      };

      loadConfetti();

      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        friction: 5,
      }).start();
    } else if (!visible) {
      scaleAnim.setValue(0);
      confettiLoaded.current = false;
      setConfettiComponent(null);
    }
  }, [visible, scaleAnim]);

  return (
    <Modal
      transparent
      visible={visible}
      animationType='fade'
      onRequestClose={onClose}
    >
      <Overlay>
        <Animated.View
          style={{
            transform: [{ scale: scaleAnim }],
            width: '100%',
            alignItems: 'center',
          }}
        >
          <Content>
            <View
              style={{
                backgroundColor: '#4BB543',
                width: 60,
                height: 60,
                borderRadius: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <IconSymbol name='checkmark.circle.fill' size={40} color='#fff' />
            </View>
            <Title>Congratulations!</Title>
            <Message>Your order has been placed successfully.</Message>
            <Button title='Back to Shop' onPress={onClose} />
          </Content>
        </Animated.View>
        {visible && Platform.OS !== 'web' && ConfettiComponent && (
          <ConfettiComponent
            count={200}
            origin={{ x: Dimensions.get('window').width / 2, y: -20 }}
            fadeOut={true}
            fallSpeed={2000}
          />
        )}
      </Overlay>
    </Modal>
  );
};
