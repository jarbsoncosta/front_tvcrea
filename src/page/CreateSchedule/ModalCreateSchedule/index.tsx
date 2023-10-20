import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "react-datepicker/dist/react-datepicker.css";
import { ContentModal, Form } from "./styles";
import { X } from "@phosphor-icons/react";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/authContext";
import { api } from "../../../services/api";

export function ModalCreateSchedule(props) {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [erroTitle, setErroTitle] = useState("");

  function resetStates() {
    setTitle("");
    props.setSelectedVideos([]);
    props.close();
  }

  const handleTitleChange = (event) => {
    setTitle(event);
  };
  // Função para enviar programação para o banco
  function handleSubmit(event) {
    event.preventDefault();
    if (!title) {
      setErroTitle("Título é obrigatorio");
    } else {
      const newDate = props.data.map((item) => item.id);

      const data = {
        nome: title,
        sequencia: newDate,
        id_operador: user.id,
        duracao: props.duracaoTotal,
      };
      api
        .post("programacao/criar", data, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then(() => {
          toast.success("Programação enviada com sucesso!");
          resetStates();
        })
        .catch((error) => {
          console.error("Ocorreu um erro:", error);
        });
    }
  }

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Body style={{ padding: "0" }}>
        <ContentModal style={{ padding: "1rem" }}>
          <div
            style={{ width: "100%", display: "flex", justifyContent: "right" }}
          >
            <button
              onClick={() => props.close(false)}
              style={{ border: "0", background: "transparent" }}
            >
              <X size={25} weight="bold" />
            </button>
          </div>
          <strong style={{ fontSize: "1.2rem" }}>
            Enviar lista para reprodução
          </strong>
          <Form onSubmit={handleSubmit}>
            <label>Título</label>
            <input
              type="text"
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Título"
            />
            {erroTitle && <p style={{ color: "red" }}>{erroTitle}</p>}
            <button type="submit">Salvar</button>
          </Form>
        </ContentModal>
      </Modal.Body>
    </Modal>
  );
}
