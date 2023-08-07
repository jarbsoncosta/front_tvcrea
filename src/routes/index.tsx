import { Route, Routes } from "react-router-dom";
import { UploadVideo } from "../page/Dashboard";
import { Login } from "../page/Login";
import PrivateRoutes from "./PrivateRouter";
import { Programacao} from "../page/Schedule";

//import { DefaultLayout } from './components/Layout/DefaultLayout'

export function Router() {
  return (
    <Routes>
       <Route path="/" element={<Login />} />
      <Route path="/upload" element={<PrivateRoutes><UploadVideo /></PrivateRoutes>} />
      <Route path="/programacao" element={<PrivateRoutes><Programacao /></PrivateRoutes>} />
    </Routes>
  );
}
