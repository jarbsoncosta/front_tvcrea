import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ContentDate, ContentModal, Form, Hours } from "./styles";
import { FloppyDisk, X } from "@phosphor-icons/react";
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

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState(0);
  const [selectedMinute, setSelectedMinute] = useState(0);

  const [message, setMessage] = useState("");

  const handleDateChange = (newDateTime: any) => {
    setSelectedDate(newDateTime);
  };

  const handleHourChange = (event) => {
    setSelectedHour(parseInt(event.target.value, 10));
  };

  const handleMinuteChange = (event) => {
    setSelectedMinute(parseInt(event.target.value, 10));
  };

  // Função para enviar programação para o banco
  function handleSubmit(event) {
    event.preventDefault();
    setMessage(""); // Limpar mensagens de erro anteriores

    const currentDateTime = new Date();
    const currentHour = currentDateTime.getHours();
    const currentMinute = currentDateTime.getMinutes();

    const selectedDateTime = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      selectedHour,
      selectedMinute
    );

    if (selectedHour === 0 || selectedMinute === 0) {
      setMessage("Selecione uma hora e minutos válidos!");
    } else if (selectedDateTime < currentDateTime) {
      setMessage(
        "A data e hora selecionadas não podem ser anteriores à data e hora atual!"
      );
    } else if (
      selectedHour < currentHour ||
      (selectedHour === currentHour && selectedMinute < currentMinute)
    ) {
      setMessage("A hora selecionada não pode ser anterior à hora atual!");
    } else {
      const formattedDate = selectedDateTime.toISOString();
      const data = {
        id_programacao: props.data.id_programacao,
        data_agendada: formattedDate,
      };
      api
        .post("agendar", data, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then(() => {
          toast.success("Agendamento concluído com sucesso");
          console.log(data);
          props.fetchVideoList();
          resetStates();
        })
        .catch((error) => {
          const { data } = error.response;
          toast.info(data.detail);
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
          <strong style={{ fontSize: "1.2rem" }}>Agendar reprodução</strong>
          <div>
            <span>
              Programação: <strong>{props.data?.nome}</strong> Duração:
              <strong>{formatarTempoDeExecucao(props.data?.duracao)}</strong>
            </span>
          </div>
          <Form onSubmit={handleSubmit}>
            <ContentDate>
              <div>
                <label>Selecione uma data e hora</label>
                <DatePicker
                  className="datepicker-wrapper"
                  selected={selectedDate}
                  onChange={handleDateChange}
                  dateFormat="dd/MM/yyyy"
                  locale={pt} // Configuração para o idioma português
                />
                <p style={{ color: "red" }}>{message && message}</p>
              </div>
              <Hours>
                <div className="hour">
                  <label>Horas</label>
                  <select value={selectedHour} onChange={handleHourChange}>
                    {[...Array(24).keys()].map((hour) => (
                      <option key={hour} value={hour}>
                        {hour}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="minute">
                  <label>Minutos</label>
                  <select value={selectedMinute} onChange={handleMinuteChange}>
                    {[...Array(60).keys()].map((minute) => (
                      <option key={minute} value={minute}>
                        {minute}
                      </option>
                    ))}
                  </select>
                </div>
              </Hours>
            </ContentDate>
            {/* <p>Data e hora selecionadas: {formatarData(formattedDate)}</p> */}
            <button type="submit">
              <FloppyDisk size={20} weight="bold" /> Salvar
            </button>
          </Form>
        </ContentModal>
      </Modal.Body>
    </Modal>
  );
}
