import Modal from "react-bootstrap/Modal";
import "react-datepicker/dist/react-datepicker.css";
import { ContentModal } from "./styles";
import { X } from "@phosphor-icons/react";
import { formatarData } from "../../../../utils/formatDate";

export function ModalListarAgendamentoId(props) {
  const data = props.data;
  console.log(data);
  // Obtendo a data e hora atual
  const dataAtual = new Date(); // Filtrando os objetos com hora_fim maior ou igual à data e hora atual
  const objetosFiltrados = data?.exibicoes.filter((objeto) => {
    const horaFim = new Date(objeto.hora_fim);
    return horaFim >= dataAtual;
  });

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
                  // Separar a data e a hora usando o método split()
                  var partes = item.hora_inicio.split("T");
                  var data = partes[0]; // Parte antes do 'T' é a data
                  var hora = partes[1]; // Parte depois do 'T' é a hora

                  var dataObjeto = new Date(data);

                  // Obter dia, mês e ano do objeto de data
                  var dia = dataObjeto.getDate(); // 20
                  var mes = dataObjeto.getMonth() + 1; // Mês é base 0 (janeiro é 0), então adicionamos 1
                  var ano = dataObjeto.getFullYear(); // 2023

                  // Formatar dia e mês com dois dígitos (por exemplo, 01, 02, ..., 09)
                  dia = dia < 10 ? "0" + dia : dia;
                  mes = mes < 10 ? "0" + mes : mes;

                  // Formatar a data no formato desejado (DD-MM-AAAA)
                  var dataFormatada = dia + "/" + mes + "/" + ano;

                  // Obtendo apenas a parte da hora da string hora_fim
                  const horaFimString = item.hora_fim
                    .split("T")[1]
                    .split(".")[0];
                  return (
                    <span key={index}>
                      <strong >{index+1} - Dia : </strong>
                      <span>{dataFormatada} </span> <strong>Hora : </strong>
                      {hora} <strong> até</strong>
                      {horaFimString}
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
