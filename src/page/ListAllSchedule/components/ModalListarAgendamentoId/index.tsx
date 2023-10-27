import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import {
  ButtonTask,
  ContentDate,
  ContentModal,
  Form,
  Hours,
  IconVideoCamara,
  Item,
} from "./styles";
import { FloppyDisk, PencilSimpleLine, Trash, X } from "@phosphor-icons/react";
import { formatarData } from "../../../../utils/formatDate";
import { pt } from "date-fns/locale";
import { api } from "../../../../services/api";
import ReactDatePicker from "react-datepicker";
import { useAuth } from "../../../../context/authContext";
import { toast } from "react-toastify";

export function ModalListarAgendamentoId(props) {
  const data = props.data;
  // Obtendo a data e hora atual
  const dataAtual = new Date(); // Filtrando os objetos com hora_fim maior ou igual à data e hora atual
  const objetosFiltrados = data?.exibicoes.filter((objeto) => {
    const horaFim = new Date(objeto.hora_fim);
    return horaFim >= dataAtual;
  });
  const [programacao, setProgramacao] = useState(null);
  const [open, setOpen] = useState(null);
   function activate(item) {
    setOpen(open === item ? null : item);
    setProgramacao(item);
  }

  //DELETAR UM AGENDAMENTO
  function deleteAgendamento(programacao: any) {
    const confirmDelete = window.confirm(
      `Deseja realmente excluir está programação ${programacao.nome} ?`
    );
    if (confirmDelete) {
      console.log(programacao);
    }

    // if (confirmDelete) {
    //   api
    //     .delete(`/programacao/hide-programacao/${programacao.id_programacao}`, {
    //       headers: {
    //         "content-type": "application/json",
    //         Authorization: `Bearer ${user.token}`,
    //       },
    //     })
    //     .then(() => {
    //       // fetchVideoList();
    //     })
    //     .catch((error) => {
    //       console.error("Ocorreu um erro:", error);
    //     });
    // } else {
    //   console.log("Exclusão cancelada pelo usuário.");
    // }
  }

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
  
    const selectedDateTime = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      selectedHour,
      selectedMinute
    );

    if (selectedHour === 0 ) {
      setMessage("Selecione uma hora e minutos válidos!");
    } else if (selectedDateTime < currentDateTime) {
      setMessage(
        "A data e hora selecionadas não podem ser anteriores à data e hora atual!"
      );
    } else if (
      selectedHour < currentHour && selectedDateTime < currentDateTime
    ) {
      setMessage("A hora selecionada não pode ser anterior à hora atual!");
    } else {
      const formattedDate = selectedDateTime.toISOString();
      const data = {
        id_programacao: props.data.id_programacao,
        data_agendada: formattedDate,
      };

      console.log(data)
      // api
      //   .post("agendar", data, {
      //     headers: {
      //       accept: "application/json",
      //       Authorization: `Bearer ${user.token}`,
      //     },
      //   })
      //   .then(() => {
      //     toast.success("Agendamento concluído com sucesso");
      //     console.log(data);
      //     props.fetchVideoList();
      //     resetStates();
      //   })
      //   .catch((error) => {
      //     const { data } = error.response;
      //     toast.info(data.detail);
      //     console.error("Ocorreu um erro:", error);
      //   });
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
            Agendamentos para {data?.nome}
          </strong>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {data?.exibicoes.length > 0 ? (
              <>
                {objetosFiltrados?.map((item, index) => {
                  const emReproducao = item.play === true ? "Reproduzindo" : "";

                  const horaFimString = item.hora_fim
                    .split("T")[1]
                    .split(".")[0];
                  return (
                    <>
                      <Item>
                        <div key={index}>
                          <strong>
                            {index + 1} - Dia : {formatarData(item.hora_inicio)}
                          </strong>
                          &nbsp;até&nbsp;
                          <strong>{horaFimString}</strong>
                          <span>
                            {emReproducao && (
                              <IconVideoCamara
                                size={17}
                                color="#84cc16"
                                weight="fill"
                              />
                            )}
                          </span>
                        </div>
                        <ButtonTask
                          statusColor="blue"
                          title="Editar programação"
                          onClick={() => {
                            activate(item);
                          }}
                          disabled={item.play}
                        >
                          <PencilSimpleLine size={23} />
                        </ButtonTask>
                        <ButtonTask
                          statusColor="red"
                          title="Remover da programação"
                          disabled={item.play}
                          onClick={() => {
                            deleteAgendamento(item);
                          }}
                        >
                          <Trash size={23} />
                        </ButtonTask>
                      </Item>

                      {open &&
                        item.hora_inicio === programacao?.hora_inicio && (
                          <Form onSubmit={handleSubmit}>
                            <strong>Editar </strong>
                            <ContentDate>                              
                              <div>
                                <label>Selecione uma data e hora</label>
                                <ReactDatePicker
                                  className="datepicker-wrapper"
                                  selected={selectedDate}
                                  onChange={handleDateChange}
                                  dateFormat="dd/MM/yyyy"
                                  locale={pt} // Configuração para o idioma português
                                />
                                <p style={{ color: "red" }}>
                                  {message && message}
                                </p>
                              </div>
                              <Hours>
                                <div className="hour">
                                  <label>Horas</label>
                                  <select
                                    value={selectedHour}
                                    onChange={handleHourChange}
                                  >
                                    {[...Array(24).keys()].map((hour) => (
                                      <option key={hour} value={hour}>
                                        {hour}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                                <div className="minute">
                                  <label>Minutos</label>
                                  <select
                                    value={selectedMinute}
                                    onChange={handleMinuteChange}
                                  >
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
                            <div style={{display:"flex", justifyContent:"right"}}>
                              <button type="submit">
                                <FloppyDisk size={20} weight="bold" /> Salvar
                              </button>
                            </div>
                          </Form>
                        )}
                    </>
                  );
                })}
              </>
            ) : (
              <span>Não existe agendamento para essa programação</span>
            )}
          </div>
        </ContentModal>
      </Modal.Body>
    </Modal>
  );
}
