import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ContentModal, Form } from "./styles";
import { X } from "@phosphor-icons/react";
import { formatarData } from "../../../utils/formatDate";
import { toast } from "react-toastify";
import { pt } from 'date-fns/locale';

export function ModalCreateSchedule(props) {
  const [dateTime, setDateTime] = useState(new Date());

  const dataProgramacao = formatarData(dateTime);
  const [title, setTitle] = useState("");
  const [erroTitle, setErroTitle] = useState("");

  function resetStates() {
    setTitle("");
    props.setSelectedVideos([]);
    props.close();
  }

  const handleDateTimeChange = (newDateTime) => {
    // Verificar se a nova data e hora são maiores ou iguais à data e hora atuais
    if (newDateTime >= new Date()) {
      setDateTime(newDateTime);
    } else {
      toast.warning("Data selecionada não está disponivel.");
    }
  };
  const handleTitleChange = (event) => {
    setTitle(event);
  };
  // Função chamada ao clicar no botão de envio
  function handleSubmit(event) {
    event.preventDefault();
    if (!title) {
      setErroTitle("Título é obrigatorio");
    } else if (dateTime < new Date()) {
      toast.warning("Data selecionada não está disponivel.");
    } else {
      const data = {
        title,
        listVideos: props.data,
        dataProgramacao,
      };
      console.log(data);
      toast.success("Programação enviada com sucesso!");
      resetStates();
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
            <label>Selecione uma Data e Hora (Exibir a programação)</label>
            <DatePicker
              className="datepicker-wrapper"
              selected={dateTime}
              onChange={handleDateTimeChange}
              showTimeSelect
              dateFormat="dd/MM/yyyy HH:mm"
              timeFormat="HH:mm"
              locale={pt} // Configuração para o idioma português
            />
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
