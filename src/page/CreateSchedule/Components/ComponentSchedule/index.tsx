import { Trash, Upload } from "@phosphor-icons/react"; // Ícone da lixeira
import { formatarTamanhoDoVideo } from "../../../../utils/formatSizeVideo"; // Função para formatar tamanho do vídeo
import { formatarTempoDeExecucao } from "../../../../utils/formatVideoLength"; // Função para formatar tempo de execução do vídeo
import {
  ButtonTask,
  Container,
  DivButtonSubmit,
  SubmittButton,
  Time,
} from "./style"; // Estilos importados
import { useEffect, useState } from "react";
import { Table } from "../../styles";
import { ModalCreateSchedule } from "../../ModalCreateSchedule";

// Definição do componente ComponentSchedule
export function ComponentSchedule({ selectedVideos, setSelectedVideos }: any) {
  const [draggedIndex, setDraggedIndex] = useState(null);

  //Somando duração total da programação
  const [duracaoTotal, setDuracaoTotal] = useState(0);
  useEffect(() => {
    // Calcula a duração total quando o estado dos vídeos é alterado
    const novaDuracaoTotal = selectedVideos.reduce((total, video) => {
      // Verifica se a duração é um número válido antes de adicionar ao total
      const duracaoNumerica = parseFloat(video.duracao);
      if (!isNaN(duracaoNumerica) && duracaoNumerica > 0) {
        return total + duracaoNumerica;
      }
      return total;
    }, 0);

    setDuracaoTotal(novaDuracaoTotal);
  }, [selectedVideos]); // Executa o efeito sempre que o estado dos vídeos é alterado

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
  };

  const handleDrop = (e, index) => {
    e.preventDefault();

    if (draggedIndex === null) {
      return;
    }

    const newFilmes = [...selectedVideos];
    const [movedFilme] = newFilmes.splice(draggedIndex, 1);

    if (index === 0) {
      // Move para o início da lista
      newFilmes.unshift(movedFilme);
    } else if (index === selectedVideos.length) {
      // Move para o final da lista
      newFilmes.push(movedFilme);
    } else {
      // Move para uma posição intermediária
      newFilmes.splice(index, 0, movedFilme);
    }

    setSelectedVideos(newFilmes);
    setDraggedIndex(null);
  };

  const removerFilme = (index) => {
    const newFilmes = [...selectedVideos];
    newFilmes.splice(index, 1);
    setSelectedVideos(newFilmes);
  };
  //Abrir Modal Imagem do video
  const [modalShow, setModalShow] = useState(false);
  function activeModal() {
    setModalShow(true);
  }
  // Renderização do componente
  return (
    <Container>
      {selectedVideos.length > 0 && (
        <Time>
          <h2>{formatarTempoDeExecucao(duracaoTotal)}</h2>
        </Time>
      )}

      {selectedVideos.length > 0 && (
        <div>
          <Table>
            <thead>
              <tr>
                <th>Nº</th>
                <th style={{ textAlign: "center" }}>Nome</th>
                <th>Tamanho</th>
                <th>Duração</th>
              </tr>
            </thead>
            <tbody>
              {selectedVideos.map((filme, index) => {
                return (
                  <tr
                    key={index}
                    title="Arraste e solte para mudar a ordem de reprodução video"
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDrop={(e) => handleDrop(e, index)}
                    style={{ cursor: "pointer" }}
                  >
                    <td>{index + 1}</td>
                    <td
                     style={{width:"250px", display:"flex",alignItems:"center"}}
                    >
                      <div
                        style={{
                          width: "45px",
                          height: "45px",
                          borderRadius: "100%",
                          border: "3px solid #2868b0",
                          display: "flex",
                          alignItems: "center",
                          marginRight: "1rem",
                        }}
                      >
                        <img
                          src={filme.localizacao_thumb}
                          alt=""
                          style={{
                            width: "35px",
                            height: "35px",
                            cursor: "pointer",
                           
                            marginLeft:"2px"
                            
                          }}
                        />
                        
                      </div>
                      <strong>{filme.assunto}</strong>
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "0.75rem",
                        color: "#6b7280",
                      }}
                    >
                      {formatarTamanhoDoVideo(filme.tamanho)}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <span
                        style={{
                          background: "#e2e8f0",
                          padding: "2px 5px",
                          borderRadius: "4px",
                          color: "#074e8c",
                        }}
                      >
                        {formatarTempoDeExecucao(filme.duracao)}
                      </span>
                    </td>

                    <td>
                      <ButtonTask
                        title="Remover da programação"
                        onClick={() => removerFilme(index)}
                      >
                        <Trash size={23} />
                      </ButtonTask>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      )}

      {selectedVideos.length > 0 && (
        <DivButtonSubmit>
          {/* Botão de envio */}
          <SubmittButton onClick={activeModal}>
            <Upload size={20} weight="bold" />
            <span> Enviar</span>
          </SubmittButton>
        </DivButtonSubmit>
      )}
      <ModalCreateSchedule
        show={modalShow}
        close={setModalShow}
        data={selectedVideos}
        setSelectedVideos={setSelectedVideos}
        duracaoTotal={duracaoTotal}
      />
    </Container>
  );
}
