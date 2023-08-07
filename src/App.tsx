import 'bootstrap/dist/css/bootstrap.min.css';
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from "./styles/themes/default"
import { ToastContainer } from "react-toastify";
import { GlobalStyle } from "./styles/global"
import { BrowserRouter } from 'react-router-dom';
import { Router } from './routes';
import { AuthProvider } from './context/authContext';


function App() {

  return (
    <BrowserRouter>
     <AuthProvider>
  <ThemeProvider theme={defaultTheme}>
       <Router />
    <GlobalStyle/>
    <ToastContainer 
    position="top-center"
      />
  </ThemeProvider>
  </AuthProvider>
  </BrowserRouter>
  )
}

export default App
