import { styled } from "styled-components";

export const Container = styled.main`
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding: 5rem 0;
`;
export const Search = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  border-radius: 5px;
  gap: 0.5rem;
`;
export const Input = styled.input`
  width: 100%;
  border-radius: 5px;
  height: 2rem;
  border: 2px solid ${(props) => props.theme["gray-400"]};
  background-color: ${(props) => props.theme["gray-100"]};
  &:focus {
    border: 0;
    outline: none;
    padding-left: 10px; /* Espaçamento do ponteiro em foco */
  }
  &::placeholder {
    padding: 0 10px;
    font-size: 0.75rem;
  }
`;
export const Table = styled.table`
  margin-top: 1rem;
  border-collapse: collapse;
  width: 100%;
  th,
  td {
    border: none;
    text-align: left;
    padding: 5px 10px;
  }
  td {
    //background-color: ${(props) => props.theme["gray-100"]};
    padding-bottom: 5px; /* Adicione esse estilo para dar espaço entre as linhas */
    img {
      border-radius: 100%;
    }
  }
  thead {
    border-radius: 5px;
    font-size: 0.75rem;
  }
  tbody tr:hover {
    background-color: ${(props) => props.theme["gray-100"]}; /* Cor de realce ao passar o mouse */
  }
`;
export const ContentPaginate = styled.div`
  margin-top: 1rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: right;
`;
export const ButtonAddVideo = styled.button`
  background: transparent;
  border: 0;
  box-shadow: none;
  svg {
    width: 30px;
    height: 30px;
    color: ${(props) => props.theme["blue"]};
  }
  :hover {
    color: ${(props) => props.theme["blue-back"]};
   
  }
`;
