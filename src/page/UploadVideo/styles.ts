import styled, { keyframes } from "styled-components";

export const Container = styled.main`
  width: 100%;
  padding: 0 2rem;
  height: 95vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const pulsateAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;
const changeBorderColorAnimation = keyframes`
  0% {
    border-color: #f0f0f0;
  }
  50% {
    border-color: #1d4ed8; /* Cor da borda no meio da animação */
  }
  100% {
    border-color: #f0f0f0;
  }
`;
export const Icon = styled.div`
 // background: ${(props) => props.theme["gray-200"]};
  padding: 1.5rem;
  border-radius: 100%;
  display: flex;
  align-items: center;
  transition: 1s;
  //animation: ${pulsateAnimation} 2s ease-in-out infinite,
  //${changeBorderColorAnimation} 2s linear infinite;
  svg {
    color: ${(props) => props.theme["white"]};
    width: 8rem;
    height: 8rem;
  
  }
`;
export const Content = styled.div`
  width: 35%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 5px dashed white;
  border-radius: 30px;
  padding: 0 0 2rem 0;
  @media (max-width: 750px) {
    width: 100%;  
  }
`;
export const File = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
 
`;
export const Uploading = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;

  strong {
    display: flex;
    align-items: center;
    gap: 1rem;
    border-radius: 5px;
    padding: 0.4rem 1rem;
    display: flex;
    background: ${(props) => props.theme["gray-100"]};
  }
`;
export const ButtonToLoad = styled.button`
  padding: 0.5rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 0;
  border-radius: 5px;
  background: ${(props) => props.theme["green-600"]};
  color: ${(props) => props.theme["white"]};
  cursor: pointer;
  transition: 1ms;
  &:hover {
    background-color: ${(props) => props.theme["green-700"]};
  }
`;

export const Button= styled.button`
  padding: 0.5rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 0;
  border-radius: 5px;
  background: ${(props) => props.theme["green-600"]};
  color: ${(props) => props.theme["white"]};
  cursor: pointer;
  transition: 1ms;
  &:hover {
    background-color: ${(props) => props.theme["green-700"]};
  }
`;
export const ButtonTrash = styled.div`
  background: ${(props) => props.theme["gray-100"]};
  padding: 0.4rem;
  border-radius: 5px;
  svg {
    width: 1.3rem;
    height: 1.3rem;
    color: ${(props) => props.theme["gray700"]};
    cursor: pointer;
  }
  &:hover {
    background: ${(props) => props.theme["gray-200"]};

    svg {
      color: ${(props) => props.theme["red-600"]};
    }
  }
`;
