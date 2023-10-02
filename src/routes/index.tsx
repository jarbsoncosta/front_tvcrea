import { Route, Routes } from "react-router-dom";
import { UploadVideo } from "../page/UploadVideo";
import { Login } from "../page/Login";
import { CreateSchedule } from "../page/CreateSchedule";
import { ListAllSchedule } from "../page/ListAllSchedule";
//import PrivateRoutes from "./PrivateRouter";


//import { DefaultLayout } from './components/Layout/DefaultLayout'

export function Router() {
  return (
    <Routes>
       <Route path="/" element={<Login />} />
      <Route path="/cadastrar-video" element={<UploadVideo />} />
      <Route path="/criar-programacao" element={<CreateSchedule />} />
      <Route path="/programacao" element={<ListAllSchedule />} />
    </Routes>
  );
}
