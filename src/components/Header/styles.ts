import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  gap: 1rem;
  justify-content: right;
  align-items: center;
  padding: 0.5rem 2rem 0.5rem 1rem;
  width: 100%;
  height: 3rem;
  background: ${(props) => props.theme["blue"]};
  @media (max-width: 1024px) {
    justify-content: right;
  }
`;

export const ButtonOpenSidebar = styled.div`
  display: none;
  @media (max-width: 1024px) {
    display: block;
  }
`;

export const DivLogin = styled.div`
  @media (max-width: 1024px) {
    display: block;
  }
`;
