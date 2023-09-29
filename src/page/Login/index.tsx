import {useCallback, useState} from 'react'
import { ErrorInput, InputField, LoginContainer, LoginForm, SubmitButton, Title } from "./styled";
import { toast } from 'react-toastify';
import { useAuth } from '../../context/authContext';
import { LoadingComponent } from '../../components/Loading';

export function  Login() {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setLoading] = useState(false);
    const { signIn } = useAuth();

    const [userNameError, setUserNameError] = useState("") 
    const [passwordeError, setPasswordeError] = useState("") 
    
  
    
  const handleSubmit = useCallback(
    async (event: any) => {
      event.preventDefault();
      let hasErrors = false;

      switch (true) {
        case !username:
            setUserNameError('Campo usuário é obrigatório!');
          hasErrors = true;
          break;
        case !password:
            setPasswordeError('Campo senha é obrigatório!');
          hasErrors = true;
          break;
        default:
          break;
      }

      if (!hasErrors) {
        setLoading(true);
      }
      setTimeout(async () => {
        if (!hasErrors) {
          try {
            await signIn({ username, password });
            window.location.replace("/programacao");
          } catch {
            toast.error("Usuário ou Senha incorretos!");
          }
        }
        setLoading(false);
      }, 1000);
    },
    [username, password, history, signIn]
  );
  
    return (
      <LoginContainer>
        <LoginForm onSubmit={handleSubmit}>
            <Title>
                <strong>Entrar</strong>
            </Title>
          <InputField 
            type="text"
            name="username"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            />
         {userNameError && 
          <ErrorInput>
            {userNameError} 
          </ErrorInput> }
            
          <InputField 
            type="password" 
            name="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
           />
        {passwordeError && 
          <ErrorInput>
            {passwordeError} 
          </ErrorInput> }
         {isLoading ?(
            <SubmitButton type="submit"> <LoadingComponent text="Carregando..."/></SubmitButton>
            
         ):( <SubmitButton type="submit">Login</SubmitButton>)}
        </LoginForm>
      </LoginContainer>
    );
  };
 
