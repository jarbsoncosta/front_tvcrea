import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 44rem;
  align-items: center;
  margin: 0 auto;
`;
export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 30rem;
  margin: 3rem auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: ${(props) => props.theme["gray-100"]};
`;

export const FormLabel = styled.label`
  margin-bottom: 5px;
  font-size: 12px;
  color: ${(props) => props.theme["gray-600"]};
`;
export const FormInput = styled.input`
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme["gray-300"]};
  font-size: 12px;
  margin-bottom: 12px;
  padding: 10px;
  padding-left: 0.5rem;
  &:focus {
    border-color: ${(props) =>
      props.theme[
        "blue"
      ]}; /* Altere para a cor desejada quando o input estiver em foco */
    outline: none; /* Remove o contorno padrão quando o input está em foco */
    box-shadow: 0 0 5 ${(props) => props.theme["blue"]}; /* Adiciona uma sombra quando o input está em foco */
  }
  &::placeholder {
    font-size: 12px;
  }
`;

export const FormTextarea = styled.textarea`
  margin-bottom: 12px;
  border-radius: 5px;
  padding: 5px;
  border: 1px solid ${(props) => props.theme["gray-300"]};
  font-size: 12px;
  padding: 5px;
  padding-left: 0.5rem;
  &:focus {
    border-color: ${(props) =>
      props.theme[
        "blue"
      ]}; /* Altere para a cor desejada quando o input estiver em foco */
    outline: none; /* Remove o contorno padrão quando o input está em foco */
    box-shadow: 0 0 5 ${(props) => props.theme["blue"]}; /* Adiciona uma sombra quando o input está em foco */
  }
  &::placeholder {
    font-size: 12px;
  }
`;

export const ButtonSubmit = styled.button`
  width: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  font-size: 0.75rem;
  border-radius: 5px;
  border: 0;
  background: ${(props) => props.theme["green-600"]};
  color: ${(props) => props.theme["white"]};
  transition: 1s;
  &:hover {
    background: ${(props) =>
      props.theme[
        "green-700"
      ]}; /* Adiciona uma sombra quando o input está em foco */
  }
`;
export const ButtonCancel = styled.button`
  width: 40%;
  display: flex;
  padding: 10px;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  font-size: 0.75rem;
  border-radius: 5px;
  border: 0;
  background: ${(props) => props.theme["gray-500"]};
  color: ${(props) => props.theme["white"]};
  transition: 1s;
  &:hover {
    background: ${(props) =>
      props.theme[
        "gray700"
      ]}; /* Adiciona uma sombra quando o input está em foco */
  }
`;
export const ErrorInput = styled.p`
  margin-top: 0.5rem;
  font-size: 12px;
  color: ${(props) => props.theme["red-600"]};
`;
export const ValidateVideo = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 0.5rem;
`;
export const StyledButton = styled.button`
  background-color: ${(props) => props.theme["blue"]};
  color: #fff;
  width: 100%;
  padding: 5px;
  border-radius: 5px;
  border: none;
  margin-bottom: 1rem;
  cursor: pointer;
  opacity: ${(props) => (props.disabled ? "0.6" : "1")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;

export const ContentLoading = styled.div`
  padding: 4px 0;
  border-radius: 5px;
  font-size: 12px;
`;
export const VideoFile = styled.div`
  width: 100%;
  margin-bottom: 1rem;
  strong {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    border-radius: 5px;
    padding: 0.5rem 1rem;
    display: flex;
    background: ${(props) => props.theme["gray-200"]};
  }
`;

export const SelectThumbnail = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  span {
    color: ${(props) => props.theme["white"]};
    margin-bottom: 1rem;
  }
`;
export const Thumbnail = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    border-radius: 100%;
  }
`;
export const ArrayThumbnail = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between; 
  border-radius: 5px;
 
  img {
    border-radius: 5px;
  }
  button {
    border: 0;
  }
`;

export const InfoVideo = styled.div`
  width: 100%;
  display: flex;
  background: ${(props) => props.theme["gray-200"]};
  flex-direction: column;
  justify-content: left;
  padding: 0.5rem;
  border-radius: 5px;

  li {
    list-style: none;
  }
`;
