import { useCallback, useState } from "react";
import {
  ButtonLogin,
  ErrorInput,
  InputField,
  InputPassword,
  LoginContainer,
  LoginForm,
  Title,
} from "./styled";
import { toast } from "react-toastify";
import { useAuth } from "../../context/authContext";
import { LoadingComponent } from "../../components/Loading";
import { DoorOpen, Eye, EyeClosed } from "@phosphor-icons/react";


export function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const [showPassword, setShowPassword]= useState(false)

  function handleChangeShowPassword(){
    setShowPassword(!showPassword)
  }

  const [userNameError, setUserNameError] = useState("");
  const [passwordeError, setPasswordeError] = useState("");

  const handleSubmit = useCallback(
    async (event: any) => {
      event.preventDefault();
      let hasErrors = false;

      switch (true) {
        case !username:
          setUserNameError("Campo usuário é obrigatório!");
          hasErrors = true;
          break;
        case !password:
          setPasswordeError("Campo senha é obrigatório!");
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
            window.location.replace("/cadastrar-video");
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
        {userNameError && <ErrorInput>{userNameError}</ErrorInput>}

       <InputPassword>
       <input
          type={showPassword ? "text": "password"}
          name="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
       {showPassword ?<Eye size={30} weight="bold" onClick={handleChangeShowPassword} /> : <EyeClosed size={30} weight="bold" onClick={handleChangeShowPassword} />}
       </InputPassword>
        {passwordeError && <ErrorInput>{passwordeError}</ErrorInput>}
        {isLoading ? (
          <ButtonLogin type="submit">
            <LoadingComponent text="Carregando" />
          </ButtonLogin>
        ) : (
          <ButtonLogin type="submit"><DoorOpen size={20} weight="bold" /> Entrar</ButtonLogin>
        )}
      </LoginForm>
    </LoginContainer>
  );
}
