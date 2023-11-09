import Modal from "react-bootstrap/Modal";
import { Form, Input } from "./styles";
import { api } from "../../services/api";
import { useAuth } from "../../context/authContext";
import {  useState } from "react";
import { toast } from "react-toastify";

export function ModalCreateUser(props) {

  const [operador, setOperador] = useState("")
  
  const [email, setEmail] = useState("")
  
  const [password, setPassword] = useState("")
const data ={
  operador,
  email,
  password
}
  const { user } = useAuth();
  function criarUsuario(event) {
    event.preventDefault()


    function clearStates (){
      setOperador("")
      setEmail("")
      setPassword("")
      props.onHide()
    }
    
    api
      .post("/usuarios/add",data,{       
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then(() => {
        toast.success("Operador cadastrado com sucesso!")
        clearStates()
      })
      .catch((error) => {
        const {data} = error.response
        toast.error(data.detail)
        console.error("Ocorreu um erro:", error);
      });
  }
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Criar usuário
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={criarUsuario}>
          <Input placeholder="Operador" type="text"  required onChange={(e)=>setOperador(e.target.value)}/>
          <Input placeholder="E-mail" type="email"  required onChange={(e)=>setEmail(e.target.value)}/>
          <Input placeholder="Senha" type="password" required onChange={(e)=>setPassword(e.target.value)} />
          <div style={{ display: "flex", justifyContent: "right" }}>
            <button type="submit">Cadastrar</button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
