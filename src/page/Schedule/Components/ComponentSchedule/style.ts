import { styled } from "styled-components";
import { Button } from "react-bootstrap";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: left;
`;

export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Item = styled.div`
  width: 100%;
  //background: ${(props) => props.theme["gray-100"]};
  align-items: center;
  display: flex;
  padding: 0.4rem;
  border-radius: 5px;
  gap: 0.5rem;
  justify-content: space-between;
  img {
    border-radius: 100%;
  }
  &:hover {
    background-color: ${(props) => props.theme["gray-100"]};
  }
`;

export const DivButtonTrash = styled.div`
  button {
    background: transparent;
    border: 0;
  }
  svg {
    color: ${(props) => props.theme["red-600"]};
    :hover {
      color: red;
    }
  }
  display: flex;
  gap: 0.5rem;
`;

export const DivMoveVideo = styled.div`
  display: flex;
  gap: 0.5rem;
  button {
    width: 1.5rem;
    border-radius: 4px;
  }
`;

export const ContentButton = styled.div`
  display: flex;
  gap: 1rem;
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
