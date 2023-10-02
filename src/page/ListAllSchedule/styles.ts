import styled from "styled-components";

export const Container = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1rem;
  background: ${(props) => props.theme["gray700"]};
`;

export const Content = styled.div`
  width: 70rem;
  background: white;
  border-radius: 4px;
  margin-top: 2rem;
  padding: 1rem;
  /* Tablets (992 a 1199 pixels de largura) */
  @media (max-width: 1199px) {
    width: 100%;
  }
`;
