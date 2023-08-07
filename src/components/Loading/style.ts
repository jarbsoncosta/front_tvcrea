import styled, { keyframes } from 'styled-components';

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background:  transparent;
  padding: 0.1rem 0;
  
 
`;

const dotAnimation = keyframes`
  0%, 80%, 100% {
    opacity: 0;
  }
  40% {
    opacity: 1;
  }
`;
export const LoadingText = styled.span`
  background: transparent;

  &::after {
    content: '';
    animation: ${dotAnimation} 1.4s infinite;
    display: inline-block;
    vertical-align: middle;
    margin-left: 0.2em;
    height: 1em;
    width: 1em;
    background-color:  ${(props) => props.theme["white"]};
    border-radius: 50%;
  }
`;
