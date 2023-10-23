import { styled } from "styled-components";
import { NavLink } from "react-router-dom";

export const Container = styled.main`
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const Title = styled.div`
  padding: 1rem 0;
  display: flex;
  justify-content: space-between;
  h5 {
    font-weight: 600;
    color: ${(props) => props.theme["slate"]};
  }
  button {
    padding: 0 1rem;
  }
`;
export const ContentCard = styled.div`
  min-width: 700px;
  height: 900px;
  background: #ffff;
  min-height: 600px;
  padding: 3.2rem 2rem;
  border-radius: 4px;
  @media (max-width: 750px) {
    width: 100%;
  }
`;

export const Link = styled(NavLink)`
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  border-radius: 4px;
  color: ${(props) => props.theme["white"]};
  background-color: ${(props) => props.theme["blue"]};
  text-decoration: none;
  transition: 1s;
  &:hover {
    background-color: ${(props) => props.theme["blue-back"]};
  }
`;

export const Content = styled.div`
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding: 5rem 0;
  @media (max-width: 750px) {
    width: 100%;
  }
`;
export const Search = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  border-radius: 5px;
  gap: 0.5rem;
`;
export const Input = styled.input`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme["gray-400"]};
`;
export const Table = styled.table`
  margin-top: 1rem;
  border-collapse: collapse;
  width: 100%;
  tr {
    padding:10px;
    text-align: center;
  }
  td {
    border: none;
    text-align: left;
    padding: 8px;
    border-bottom: 1px solid ${(props) => props.theme["gray-200"]}; /* Cor de realce ao passar o mouse */
  }
  td {
    padding-bottom: 5px;
    img {
      border-radius: 100%;
    }
  }
  thead {
    border-radius: 5px;
    font-size: 0.75rem;
  }
  tbody tr:hover {
    background-color: ${(props) =>
      props.theme["gray50"]}; /* Cor de realce ao passar o mouse */
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
  display: flex;
  background-color: transparent;
  border: 0;
  color: ${(props) => props.theme["blue"]};
  border-radius: 100%;
  box-shadow: none;
  padding: 5px;
  &:hover {
    background-color: #bfdbfe;
    box-shadow: none;
  }
  &:disabled {
    cursor: not-allowed;
    &:hover {
      background-color: ${(props) => props.theme["gray-200"]};
      box-shadow: none;
    }
  }
`;

export const Validate = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  align-items: center;
  font-size: 0.875rem;
`;

export const ButtonTask = styled.button`
  display: flex;
  background-color: transparent;
  border: 0;
  color: ${(props) => props.theme["red-500"]};
  border-radius: 100%;
  box-shadow: none;
  padding: 5px;
  &:hover {
    background-color: ${(props) => props.theme["red-200"]};
    box-shadow: none;
  }
`;
