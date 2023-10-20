import { useEffect, useState } from "react";
import {
  ButtonAddVideo,
  ButtonTask,
  Container,
  Content,
  ContentCard,
  ContentPaginate,
  Input,
  Link,
  Search,
  Table,
  Title,
  Validate,
} from "./styles";
import { Header } from "../../components/Header";
import { Pagination, Spinner } from "react-bootstrap";
import { formatarTamanhoDoVideo } from "../../utils/formatSizeVideo";
import { formatarTempoDeExecucao } from "../../utils/formatVideoLength";
import { ComponentSchedule } from "./Components/ComponentSchedule";
import {
  ArrowFatLinesRight,
  CheckCircle,
  MonitorPlay,
  Trash,
  Video,
  VideoCamera,
} from "@phosphor-icons/react";
import { ModalContent } from "../../components/Modal";
import { api } from "../../services/api";
import { useAuth } from "../../context/authContext";

interface Filmes {
  id: number;
  id_operador: number;
  nome: string;
  formato: string;
  tamanho: number;
  assunto: string;
  observacao: string;
  localizacao_video: string;
  localizacao_thumb: string;
  data_insercao: string;
  data_ultima_utilizacao: string;
  duracao: number;
  videoId: string;
  erros: string;
  status: boolean;
}

export function CreateSchedule() {
  const { user } = useAuth();
  const [list, setList] = useState<Filmes[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  console.log(list)

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVideos, setSelectedVideos] = useState<Filmes[]>([]);

  const handleVideoSelect = (video: any) => {
    setSelectedVideos((prevSelected) => [...prevSelected, video]);
  };

  //DELETAR UM VIDEO
  function DeleteVideo(video) {
    const confirmDelete = window.confirm(
      `Deseja realmente excluir o video ${video.nome} ?`
    );

    if (confirmDelete) {
      api
        .delete(`/arquivos/delete/${video.id}`, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then(() => {
          fetchVideoList();
        })
        .catch((error) => {
          console.error("Ocorreu um erro:", error);
        });
    } else {
      console.log("Exclusão cancelada pelo usuário.");
    }
  }

  //UseEffect que executa a cada 30segundo a consulta
  useEffect(() => {
    const fetchData = async () => {
      await fetchVideoList();
    };
    fetchData(); // Executa a função imediatamente
    const interval = setInterval(() => {
      fetchData(); // Executa a função a cada 30 segundos
    }, 30000);
    // Limpa o intervalo quando o componente é desmontado ou quando currentPage ou searchTerm mudam
    return () => clearInterval(interval);
  }, [currentPage, searchTerm]);

  const fetchVideoList = () => {
    api
      .get(`/vlist/?skip=${currentPage - 1}&limit=${10}&search=${searchTerm}`, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        setList(response.data);
      })
      .catch((error) => {
        console.error("Erro durante o upload do vídeo:", error);
      });
  };

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };
  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  //Abrir Modal Imagem do video
  const [modalShow, setModalShow] = useState(false);
  const [data, setData] = useState(null);

  function activeModal(data) {
    setModalShow(true);
    setData(data);
  }

  return (
    <Container>
      <Header />
      <Content>
        <ContentCard>
          <Title>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <Video color="#074e8c" weight="bold" size={35} />
              <h5>Lista de videos</h5>
            </div>

            <Link to="/views/cadastrar_video">
              <VideoCamera
                size={20}
                weight="bold"
                style={{ marginRight: "0.5rem" }}
              />{" "}
              Novo Video
            </Link>
          </Title>

          <Search>
            <Input
              type="text"
              placeholder="Buscar pelo nome do vídeo"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Search>
          {list.length > 0 && (
            <Table>
              <thead>
                <tr>
                  <th>Nº</th>
                  <th>Nome</th>
                  <th>Tamanho</th>
                  <th>Duração</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {list.map((video, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td onClick={() => activeModal(video)}>
                        <img
                          width={30}
                          height={30}
                          src={video.localizacao_thumb}
                          alt=""
                          style={{ marginRight: "0.5rem", cursor: "pointer" }}
                        />
                        {video.nome}
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          fontSize: "0.75rem",
                          color: "#6b7280",
                        }}
                      >
                        {formatarTamanhoDoVideo(video.tamanho)}
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
                          {formatarTempoDeExecucao(video.duracao)}
                        </span>
                      </td>

                      <td
                        style={{ textAlign: "center", width: "200px" }}
                        align="center"
                      >
                        {video.status === false ? (
                          <Validate>
                            <span> Proces...</span>
                            <Spinner
                              style={{ width: "17px", height: "17px" }}
                              animation="border"
                              variant="primary"
                            />
                          </Validate>
                        ) : (
                          <CheckCircle color="#16a34a" size={30} />
                        )}
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <div style={{ display: "flex" }}>
                          <ButtonTask
                            title="Remover da programação"
                            onClick={() => {
                              DeleteVideo(video);
                            }}
                          >
                            <Trash size={23} />
                          </ButtonTask>
                          <ButtonAddVideo
                            title="Adicionar a programação"
                            onClick={() => handleVideoSelect(video)}
                            disabled={video.status === false}
                          >
                            <ArrowFatLinesRight size={23} />
                          </ButtonAddVideo>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}
          <ModalContent
            show={modalShow}
            onHide={() => setModalShow(false)}
            data={data}
          />
          {list.length > 10 && (
            <ContentPaginate>
              {/* Componente de paginação */}
              <Pagination>
                <Pagination.Prev
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                />
                <Pagination.Item active>{currentPage}</Pagination.Item>
                <Pagination.Next
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={list.length === 0} // Desabilitar o botão "Next" quando não houver mais itens.
                />
              </Pagination>
            </ContentPaginate>
          )}
        </ContentCard>
        <ContentCard>
          <Title>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <MonitorPlay size={35} color="#074e8c" weight="bold" />
              <h5>Programação</h5>
            </div>
          </Title>

          <ComponentSchedule
            selectedVideos={selectedVideos}
            setSelectedVideos={setSelectedVideos}
          />
        </ContentCard>
      </Content>
    </Container>
  );
}
