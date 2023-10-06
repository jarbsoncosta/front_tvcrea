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

export const InputPassword = styled.div`
width: 100%;
border: 1px solid ${(props) => props.theme['gray-300']};
background: white;
height: 2.5rem;
padding: 0 .5rem;
gap: 1rem;
display: flex;
align-items: center;
border-radius: 5px;
svg{
  color: ${(props) => props.theme['gray-500']};
  cursor: pointer;
}
input{
  border: 0;
  width: 100%;
  height: 100%;
  &:focus{
    box-shadow: none;
  }
}
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
   box-shadow: none;
  }
  &::placeholder{
    font-size: 12px;
  }
`;

export const ButtonLogin = styled.button`
  width: 100%;  
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
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
