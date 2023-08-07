import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'
//import { useAuth } from '../context/authContext'


export function PrivateRoutes({ children }: any) {
 const { token } = useAuth()

 return token?.token ? children : <Navigate to="/" />

}

export default PrivateRoutes