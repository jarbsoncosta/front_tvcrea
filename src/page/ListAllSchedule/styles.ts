import styled from "styled-components";
import { Circle } from "@phosphor-icons/react";

export const IconVideoCamara = styled(Circle)`
  border: 2px solid #65a30d;
  border-radius: 100%;

  @keyframes blink {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  margin: -4px 2px 0 1rem;
  animation: blink 1s infinite;
`;

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
  width: 100%;
  align-items: center;
  justify-content: space-around;
  border: 0;
  border-bottom: 1px solid ${(props) => props.theme["gray-300"]};
  cursor: pointer;
  background: ${(props) => props.theme["white"]};
  padding: 0.5rem 1rem;
  &:focus {
    box-shadow: none;
  }
  &:hover {
    background: ${(props) => props.theme["gray50"]};
    border-bottom-left-radius: 20px;
  }
`;
export const Content = styled.div`
  width: 60rem;
  background: ${(props) => props.theme["white"]};
  padding: 2rem;
  border-radius: 4px;
  /* Tablets (992 a 1199 pixels de largura) */
  @media (max-width: 1199px) {
    width: 100%;
  }
`;
export const Title = styled.div`
  padding: 1rem 0;
  display: flex;
  justify-content: space-between;
  h5 {
    font-weight: 600;
    color: ${(props) => props.theme["gray700"]};
  }
  button {
    padding: 0 1rem;
  }
`;
export const ContentPaginate = styled.div`
  margin-top: 1rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: right;
`;
export const ItemTitle = styled.div`
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

export const ButtonListarProgramacao = styled.button`
  background: ${(props) => props.theme["gray-300"]};
  position: absolute;
  border: 0;
  padding: 0.4rem 0.8rem;
   color: ${(props) => props.theme["gray700"]};
  border-radius: 100%;
  display: flex;
  justify-content: center;
  margin: -3rem -1rem 0 0rem;
  align-items: center;
  gap: 0.5rem;
  &:hover {
    background-color: ${(props) => props.theme["gray-400"]};
    color: ${(props) => props.theme["gray700"]};
    font-weight: 500;
      
  }
  &:focus{
    box-shadow: none;
  }
`;

export const ButtonAgendarProgramacao = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 4px;
  padding: 0.3rem 0.5rem;
  border: 0;
  color: ${(props) => props.theme["white"]};
  background-color: ${(props) => props.theme["blue"]};
  &:hover {
    background-color: ${(props) => props.theme["blue-back"]};
   
  }
  
`;

export const ListVideo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 1.4rem;
  width: 98%;
  border: 1px solid ${(props) => props.theme["gray-300"]};
  border-radius: 0 0 4px 4px;
  padding: 0 1rem;
`;

export const Video = styled.div`
  display: flex;
  padding: 5px 1rem;
  align-items: center;
  width: 100%;
  margin-top: 5px;
  justify-content: space-between;
  border-bottom: 1px solid ${(props) => props.theme["gray-300"]};
  li {
    display: flex;
    align-items: center;
    list-style: none;
    strong {
      font-size: 1rem;
      color: ${(props) => props.theme["gray-700"]};
    }
  }
  img {
    width: 35px;
    border-radius: 100%;
    margin-right: 0.5rem;
  }
  &:last-child {
    border: 0;
  }
`;

export const InfoProgramacao = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  text-align: left;
  span {
    font-size: 0.875rem;
    font-weight: 500;
    color: ${(props) => props.theme["gray-500"]};
    &:last-child {
      font-weight: bold;
      color: ${(props) => props.theme["gray-500"]};
    }
  }
`;

//Filtro
export const SearchInput = styled.input`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme["gray-400"]};
`;

export const ButtonAgendar = styled.button`
  display: flex;
  align-items: center;
  width: 50%;
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme["gray-400"]};
`;
