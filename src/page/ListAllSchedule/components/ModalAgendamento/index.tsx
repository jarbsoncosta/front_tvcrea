import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ContentModal, Form } from "./styles";
import { X } from "@phosphor-icons/react";
import { toast } from "react-toastify";
import { useAuth } from "../../../../context/authContext";
import { api } from "../../../../services/api";
import { pt } from "date-fns/locale";
import { formatarTempoDeExecucao } from "../../../../utils/formatVideoLength";

export function ModalCriarAgendamento(props) {
  const { user } = useAuth();
  function resetStates() {
    props.close();
  }

  const [dateTime, setDateTime] = useState(new Date());
  const handleDateTimeChange = (newDateTime: any) => {
    // Verificar se a nova data e hora são maiores ou iguais à data e hora atuais
    if (newDateTime >= new Date()) {
      setDateTime(newDateTime);
    } else {
      toast.info("Data selecionada não está disponível.");
    }
  };

  // Função para enviar programação para o banco
  function handleSubmit(event: any) {
    event.preventDefault();
    const data = {
      id_programacao: props.data.id_programacao,
      data_agendada: dateTime,
    };

    api
      .post("agendar", data, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then(() => {
        toast.success("Agendamento concluido com sucesso");
        console.log(data);
        props.fetchVideoList()
        resetStates();
      })
      .catch((error) => {
        const {data} = error.response
        toast.info(data.detail)
        console.error("Ocorreu um erro:", error);
      });
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
          <strong style={{ fontSize: "1.2rem" }}>Agendar reprodução</strong>
          <div>
            <span>
              Programação: <strong>{props.data?.nome}</strong> Duração:
              <strong>{formatarTempoDeExecucao(props.data?.duracao)}</strong>
            </span>
          </div>
          <Form onSubmit={handleSubmit}>
            <label>Título</label>
            <DatePicker
              className="datepicker-wrapper"
              selected={dateTime}
              onChange={handleDateTimeChange}
              showTimeSelect
              dateFormat="dd/MM/yyyy HH:mm"
              timeFormat="HH:mm"
              locale={pt} // Configuração para o idioma português
            />
            <button type="submit">Salvar</button>
          </Form>
        </ContentModal>
      </Modal.Body>
    </Modal>
  );
}
