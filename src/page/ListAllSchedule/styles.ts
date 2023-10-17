import styled from "styled-components";

export const Container = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem;
  background: ${(props) => props.theme["gray700"]};
`;

export const Item = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 50rem;
  border: 0;
  border-bottom: 1px solid ${(props) => props.theme["gray-300"]};
  cursor: pointer;
  background: ${(props) => props.theme["white"]}; 
  padding: 0.5rem 1rem;
  /* Tablets (992 a 1199 pixels de largura) */
  @media (max-width: 1199px) {
    width: 100%;
  }

  &:focus {
    box-shadow: none;
  }
  &:hover {
    background: ${(props) => props.theme["gray-100"]};
  }
`;
export const Content = styled.div`
  background: ${(props) => props.theme["white"]};
  padding: 2rem;
  border-radius: 4px;
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: left;
  gap: 1rem;
  font-size: 1rem;
  color: ${(props) => props.theme["gray-700"]};
`;
export const Info = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: right;
  gap: 1rem;
`;

//Filtro

export const SearchInput = styled.input`
  display: flex;
  align-items: center;
  width: 50%;
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme["gray-400"]};
`;
