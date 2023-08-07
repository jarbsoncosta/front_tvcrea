import { useEffect, useState } from 'react';
import { LoadingContainer, LoadingText } from './style';

interface LoadingComponentProps {
  text: string;
  fontColor?: string; // Propriedade opcional para receber a cor da fonte
}

export const LoadingComponent = ({ text, fontColor = '#ffff' }:LoadingComponentProps) => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prevDots => prevDots.length >= 3 ? '' : prevDots + '.');
    }, 300);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <LoadingContainer>
      <LoadingText style={{ color: fontColor }}>{text} {dots}</LoadingText>
    </LoadingContainer>
  );
};

