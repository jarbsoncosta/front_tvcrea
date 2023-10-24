import { Circle } from "@phosphor-icons/react";
import { styled } from "styled-components";

export const ContentModal = styled.div`
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  strong {
    margin-bottom: 1rem;
  }
`;
export const IconVideoCamara = styled(Circle)`
  border: 2px solid #65a30d;
  border-radius: 100%;

  @keyframes blink {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  margin: -4px 2px 0 1rem;
  animation: blink 1s infinite;
`;