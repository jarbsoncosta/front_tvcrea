import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ContentModal, Form } from "./styles";
import { X } from "@phosphor-icons/react";
import { formatarData } from "../../../utils/formatDate";
import { toast } from "react-toastify";

export function ModalCreateSchedule(props) {
  const [dateTime, setDateTime] = useState(new Date());
  const dataProgramacao = formatarData(dateTime);
  const [title, setTitle] = useState("");

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
    const data = {
      title,
      listVideos: props.data,
      dataProgramacao,
    };
    event.preventDefault();
    console.log(data);
    props.setSelectedVideos([]);
    props.close();
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
          <strong style={{fontSize:"1.2rem"}}>Enviar lista de reprodução</strong>
          <Form onSubmit={handleSubmit}>
            <label>Selecione uma Data e Hora:</label>
            <DatePicker
              className="datepicker-wrapper"
              selected={dateTime}
              onChange={handleDateTimeChange}
              showTimeSelect
              dateFormat="dd/MM/yyyy HH:mm"
              timeFormat="HH:mm"
            />
            <label>Título</label>
            <input
              type="text"
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Título"
            />
            <button type="submit">Salvar</button>
          </Form>
        </ContentModal>
      </Modal.Body>
    </Modal>
  );
}
