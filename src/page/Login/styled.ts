import styled from 'styled-components';

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const LoginForm = styled.form`
background:${(props) => props.theme['gray-100']};
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 350px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const Title = styled.div`
width: 100%;
height: 2rem;
font-size: 1.2rem;
display: flex;
align-items: center;
justify-content: center;
margin-bottom: 0.5rem;

`;

export const InputField = styled.input`
width: 100%;
padding: 10px;
 border-radius: 5px;
border: 1px solid ${(props) => props.theme['gray-300']};
font-size: 12px;
  margin-bottom: 10px;
  padding-left: 0.5rem;
  &:focus {
    border-color:${(props) => props.theme['blue']}; /* Altere para a cor desejada quando o input estiver em foco */
    outline: none; /* Remove o contorno padrão quando o input está em foco */
    box-shadow: 0 0 5 ${(props) => props.theme['blue']} /* Adiciona uma sombra quando o input está em foco */
  }
  &::placeholder{
    font-size: 12px;
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color:${(props) => props.theme['blue']};;
  color: #fff;
  border: none;
  border-radius: 5px;
  margin-top: 0.5rem;
  cursor: pointer;
  &:hover {
    background: ${(props) => props.theme['blue-back']} /* Adiciona uma sombra quando o input está em foco */
  }
`;

export const ErrorInput = styled.p`
width: 100%;
margin-top: -0.3rem;
font-size: 12px;
color:${(props) => props.theme['red-600']} ;
`
