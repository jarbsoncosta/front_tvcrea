import { styled } from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: left;
`;

export const DivMoveVideo = styled.div`
  display: flex;
  gap: 0.5rem;
  button {
    width: 1.5rem;
    border-radius: 4px;
  }
`;
export const DivButtonSubmit = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: right;
  gap: 1rem;
`;

export const SubmittButton = styled.button`
  padding: 5px 1rem;
  border: 0;
  gap: 0.5rem;
  display: flex;
  align-items: center;
  border-radius: 4px;
  color: ${(props) => props.theme["white"]};
  background-color: ${(props) => props.theme["blue"]};
  transition: 1s;
  &:hover {
    background-color: ${(props) => props.theme["blue-back"]};
  }
`;
export const ButtonTask = styled.button`
  display: flex;
  background-color: transparent;
  border: 0;
  color:${(props) => props.theme["red-500"]};
  border-radius: 100%;
  box-shadow: none;
  padding: 5px;
  &:hover {
    background-color: ${(props) => props.theme["red-200"]};
    box-shadow: none;
  }
`;

export const DivButton = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: right;
  gap: 1rem;
`;

export const Time = styled.div`
 display: flex;
 justify-content: right;
 gap: 1rem;
 align-items: center;
 width: 100%;
 h2{
  font-weight: bold;
  color: ${(props) => props.theme["blue-back"]};
  padding: 1rem;
  background: ${(props) => props.theme["gray-200"]};
  border-radius: 5px;

 }
 h5{
  font-weight: 600;
  color: ${(props) => props.theme["gray700"]};
 }
 
 
`;