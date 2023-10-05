// Importação de componentes e estilos necessários
import { Trash, Upload } from "@phosphor-icons/react"; // Ícone da lixeira
import { formatarTamanhoDoVideo } from "../../../../utils/formatSizeVideo"; // Função para formatar tamanho do vídeo
import { formatarTempoDeExecucao } from "../../../../utils/formatVideoLength"; // Função para formatar tempo de execução do vídeo
import { ButtonTask, Container, DivButtonSubmit, SubmittButton } from "./style"; // Estilos importados
import { useState } from "react";
import { Table } from "../../styles";
import { ModalCreateSchedule } from "../../ModalCreateSchedule";

// Definição do componente ComponentSchedule
export function ComponentSchedule({ selectedVideos, setSelectedVideos }: any) {
  const [draggedIndex, setDraggedIndex] = useState(null);

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
      {/* Verifica se há vídeos na lista */}
      <div>
        <Table>
          <thead>
            <tr>
              <th>Nº</th>
              <th style={{ textAlign: "center" }}>Nome</th>
              <th>Tamanho</th>
              <th>Duração</th>
              <th>Formato</th>
            </tr>
          </thead>
          <tbody>
            {selectedVideos.map((filme, index) => {
              {
                /* let formatoIcone;
              switch (filme.formato.toLocaleLowerCase()) {
                case "mp4":
                  formatoIcone = <img src="" alt="" />;
                  break;
                case "avi":
                  formatoIcone =<img src="" alt="" />;
                  break;
                // Adicione mais casos para outros formatos, se necessário
                default:
                  formatoIcone = filme.formato.toLocaleLowerCase()
                  break;
              } */
              }
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
                    style={{
                      borderRadius: "5px 0 0 5px",
                    }}
                  >
                    <img
                      width={30}
                      height={30}
                      src={filme.localizacao_thumb}
                      alt=""
                      style={{ marginRight: "0.5rem" }}
                    />
                    {filme.nome}
                  </td>
                  <td style={{ textAlign: "center", fontSize:"0.75rem", color:"#6b7280" }}>
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
                  <td style={{ textAlign: "center" }}>
                    {filme.formato.toLocaleLowerCase()}
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
      />
    </Container>
  );
}
