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
const STATUS_COLOR = {
  red: "red-500",
  blue: "blue-back",
} as const;

interface StatusProps {
  statusColor: keyof typeof STATUS_COLOR;
}
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

export const ButtonTask = styled.button<StatusProps>`
  display: flex;
  background-color: transparent;
  border: 0;
  border-radius: 100%;
  box-shadow: none;
  padding: 5px;
  color: ${(props) => props.theme[STATUS_COLOR[props.statusColor]]};
  &:hover {
    background-color: ${(props) => props.theme["gray-200"]};
    box-shadow: none;
  }
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  background-color: transparent;
  gap: 0.5rem;
  padding: 2px 0;
  border-bottom: 1px solid ${(props) => props.theme["gray-200"]};

`;

// Formulario de edição de agendamento
export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;  
  border: 1px solid ${(props) => props.theme["gray-200"]};
  padding: 0.5rem;
  input {
    width: 15rem;
    padding: 6px;
    border-radius: 4px;
    border: 1px solid ${(props) => props.theme["gray-300"]};    
  }
  label {
    width: 100%;
  }
  button {
    display: flex;
    justify-content: center;
    width: min-content;
    gap: 0.5rem;
    padding: 0.4rem 0.7rem;
    border-radius: 4px;
    background: ${(props) => props.theme["blue"]};
    border: 0;
    color: white;
    &:hover {
      background: ${(props) => props.theme["blue-back"]};
    }
  }

`;

//Content Data
export const ContentDate = styled.div`
  display: flex;
  gap: 0.5rem;
`;
export const Hours = styled.div`
  display: flex;
  width: 100%;
  gap: 0.5rem;

  .hour {
    select {
      width: 6.25rem;
      padding: 0.4rem;
      border-radius: 4px;
    border: 1px solid ${(props) => props.theme["gray-300"]};
    }
  }
  .minute {

      select {
      width: 6.25rem;
      padding: 0.4rem;
      border-radius: 4px;
    border: 1px solid ${(props) => props.theme["gray-300"]};
    }
  }
`;
