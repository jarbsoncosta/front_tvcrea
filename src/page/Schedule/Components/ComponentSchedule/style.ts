import { styled } from "styled-components";
import { Button } from "react-bootstrap";

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
  justify-content: right;
  gap: 1rem;
`;

export const SubmittButton = styled(Button)`
  display: flex;
  box-shadow: none;
  gap: 1rem;
`;
export const ButtonTask = styled.button`
display: flex;
background-color:transparent;
border: 0;
color: red;
border-radius: 100%;
box-shadow: none;
padding: 5px;
&:hover{
 background-color:#fecaca;
 box-shadow: none;
}
`;