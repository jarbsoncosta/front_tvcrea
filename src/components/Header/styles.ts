import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const HeaderContainer = styled.header`
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 2rem;
  width: 100%;
  background: ${(props) => props.theme["blue"]};
  @media (max-width: 577px) {
    a {
      display: none;
    }
  }
`;

export const StylesLink = styled(NavLink)`
  display: flex;
  align-items: center;
  border: 0;
  font-size: 1.1rem;
  color: ${(props) => props.theme["gray-100"]};

  &:hover {
    color: ${(props) => props.theme["yellow-400"]};
  }
  text-decoration: none;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  border: 0;
  font-size: 1.1rem;
  color: ${(props) => props.theme["gray-100"]};
  background-color: transparent;
  &:hover {
    color: ${(props) => props.theme["yellow-400"]};
  }
  text-decoration: none;
`;

export const ContentLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  h5{
    margin-top: 5px;
    color: ${(props) => props.theme["yellow-400"]};
  }

`;
