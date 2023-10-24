import Modal from "react-bootstrap/Modal";
import "react-datepicker/dist/react-datepicker.css";
import { ContentModal } from "./styles";
import { X } from "@phosphor-icons/react";
import { formatarData } from "../../../../utils/formatDate";

export function ModalListarAgendamentoId(props) {
  const data = props.data;

  // Obtendo a data e hora atual
  const dataAtual = new Date(); // Filtrando os objetos com hora_fim maior ou igual à data e hora atual
  const objetosFiltrados = data?.exibicoes.filter((objeto) => {
    const horaFim = new Date(objeto.hora_fim);
    return horaFim >= dataAtual;
  });

  console.log(objetosFiltrados);
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
                  const horaFimString = item.hora_fim
                    .split("T")[1]
                    .split(".")[0];
                  return (
                    <span key={index}>
                      <strong>
                        {index + 1} - Dia : {formatarData(item.hora_inicio)}
                      </strong >
                      &nbsp;até&nbsp;
                      <strong>{horaFimString}</strong>
                    </span>
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
