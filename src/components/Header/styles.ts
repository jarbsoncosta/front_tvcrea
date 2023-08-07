import styled from "styled-components";
import {NavLink} from 'react-router-dom'


export const HeaderContainer = styled.header`
  display: flex;
  gap: 1rem;
  justify-content: space-between;
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

export const Link = styled(NavLink)`
display: flex;
align-items: center;
background: transparent;
border: 0;
color:${(props) => props.theme["white"]} ;
&:hover{
  color:${(props) => props.theme["yellow-200"]} ;
}
text-decoration: none;
  
`;

