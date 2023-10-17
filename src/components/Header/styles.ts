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
  @media (max-width: 1024px) {
    justify-content: right;
  }
`;

export const DropdownContent = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  margin-top: 0.2rem;
  border-radius: 4px;
  a {
    background-color: #f1f1f1;
    display: flex;
    width: 150px;
    text-decoration: none;
    padding: 0.5rem 1rem;
    color: ${(props) => props.theme["gray-500"]};
    text-align: center;
    &:hover {
      background-color: ${(props) => props.theme["gray-200"]};
      color: ${(props) => props.theme["gray700"]};
    }
  }
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;
export const ButtonDropdown = styled.button`
  background: transparent;
  color: ${(props) => props.theme["yellow-400"]};
  display: flex;
  gap: 0.3rem;
  align-items: center;
  padding: 0.3rem 1rem;
  border: 0;
  strong {
    letter-spacing: 1px;
    font-size: 1rem;
    &:hover {
      color: ${(props) => props.theme["yellow-200"]};
    }
  }
  &:hover {
    color: ${(props) => props.theme["yellow-200"]};
    svg {
      color: ${(props) => props.theme["yellow-200"]};
    }
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

export const Link = styled(NavLink)`
  display: flex;
  align-items: center;
  background: transparent;
  border: 0;
  color: ${(props) => props.theme["white"]};
  &:hover {
    color: ${(props) => props.theme["yellow-200"]};
  }
  text-decoration: none;
`;
