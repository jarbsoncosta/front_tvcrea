import { Route, Routes } from "react-router-dom";
import { UploadVideo } from "../page/UploadVideo";
import { Login } from "../page/Login";
import { CreateSchedule } from "../page/CreateSchedule";
import { ListAllSchedule } from "../page/ListAllSchedule";
import PrivateRoutes from "./PrivateRouter";


//import { DefaultLayout } from './components/Layout/DefaultLayout'

export function Router() {
  return (
    <Routes>
       <Route path="/" element={<Login />} />
      <Route path="/views/cadastrar_video" element={<PrivateRoutes><UploadVideo /></PrivateRoutes>} />
      <Route path="/views/criar_programacao" element={<PrivateRoutes><CreateSchedule /></PrivateRoutes>} />
     <Route path="/views/programacao" element={<PrivateRoutes><ListAllSchedule /></PrivateRoutes>} />
    </Routes>
  );
}
