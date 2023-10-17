import axios from 'axios'
import {
    createContext,
    useCallback,
    useContext,
    useState,
  } from 'react'
import { api } from '../services/api'

  
  interface User {
    username: string
    token: string
    
  }
  
  interface AuthContextState {
    token: TokenState
    signIn({ username, password }: UserData): Promise<void>
    userLogged(): boolean
    signOut(): void
    updateUser(user: User): void
    user: User
  }
  
  interface UserData {
    username: string
    password: string
  }
  
  interface TokenState {
    token: string
    username: User
  }
  
  const AuthContext = createContext<AuthContextState>({} as AuthContextState)
  
  const AuthProvider = ({ children }: any) => {
    // armazenando token em um estado
    const [token, setToken] = useState<TokenState>(() => {
      const token = localStorage.getItem('@crea:token')
      const user = localStorage.getItem('@crea:user')
  
      console.log(token)
      if (token && user) {

        axios.defaults.headers.common.Authorization = `Bearer ${token}`
        return { token, username: JSON.parse(user) }
      }
  
      return {} as TokenState
    })

   
 
    const signIn = useCallback(async (data: UserData) => {
      const loginData = {
        username: data.username,
        password: data.password,     
      };
      const response = await api.post('login', loginData, {
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      const { token, username } = response.data  
        
      localStorage.setItem('@crea:token', token)
      localStorage.setItem('@crea:user', JSON.stringify(response.data))
  
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
  
      setToken({ token, username })
    }, [])


  
    const signOut = useCallback(() => {
      localStorage.removeItem('@crea:token')
      localStorage.removeItem('@crea:user')
      setToken({} as TokenState)
    }, [])
  
    // verificar se existe um token no localstorage
    const userLogged = useCallback(() => {
      const token = localStorage.getItem('@crea:token')
      const user = localStorage.getItem('@crea:user')
      if (token && user) {
        return true
      }
      return false
    }, [])
  
    const updateUser = useCallback(
      (username: User) => {
        localStorage.setItem('@crea:user', JSON.stringify(username))
        setToken({
          token: token.token,
          username,
        })
      },
      [setToken, token.token],
    )  
    return (
      <AuthContext.Provider
        value={{
          user:token.username,
          token,
          signIn,
          signOut,
          userLogged,
          updateUser,
        }}
      >
        {children}
      </AuthContext.Provider>
    )
  }
  
  function useAuth(): AuthContextState {
    const context = useContext(AuthContext)
    return context
  }
  
  export { AuthProvider, useAuth }