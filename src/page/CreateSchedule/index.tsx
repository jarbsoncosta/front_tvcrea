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
  Circle,
  MonitorPlay,
  Trash,
  Video,
  VideoCamera,
} from "@phosphor-icons/react";
import { ModalContent } from "../../components/Modal";
import { api } from "../../services/api";
import { useAuth } from "../../context/authContext";
import ImgPadao from "../../assets/img-padrao.jpg";

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
  hide: boolean;
}

export function CreateSchedule() {
  const { user } = useAuth();
  const [list, setList] = useState<Filmes[]>([]);

  const filterListNotAdmin = list.filter(
    (item) => item.hide === false && user.username !== "admin"
  );
  let array = filterListNotAdmin;
  console.log(list);
  if (user.username === "admin") {
    array = list;
  }

  const [currentPage, setCurrentPage] = useState(1);

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
            "content-type": "application/json",
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
          {array.length > 0 ? (
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
                {array.map((video, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td
                        style={{ display: "flex", alignItems: "center" }}
                        onClick={() => activeModal(video)}
                      >
                        <span
                          style={{
                            margin: "-3rem 0 0 -1rem",
                            position: "absolute",
                          }}
                        >
                          {video.hide === true && (
                            <Circle size={17} color="red" weight="fill" />
                          )}{" "}
                        </span>
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
                            src={
                              video.localizacao_thumb === null
                                ? ImgPadao
                                : video.localizacao_thumb
                            }
                            alt=""
                            style={{
                              width: "35px",
                              height: "35px",
                              cursor: "pointer",
                              marginLeft: "2px",
                            }}
                          />
                        </div>
                        <strong style={{ color: "#374151", fontWeight: 500 }}>
                          {video.assunto}
                        </strong>
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
                            fontSize: "0.75rem",
                            padding: "2px 5px",
                            borderRadius: "4px",
                            color: "#074e8c",
                          }}
                        >
                          {formatarTempoDeExecucao(video.duracao)}
                        </span>
                      </td>

                      <td style={{ textAlign: "center" }} align="center">
                        {video.status === false ? (
                          <Validate>
                            Process<span>...</span>
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
          ) : (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <span>Sua lista de video está vazia!</span>
            </div>
          )}
          <ModalContent
            show={modalShow}
            onHide={() => setModalShow(false)}
            data={data}
          />

          {array.length > 0 && (
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
                  disabled={array.length === 0} // Desabilitar o botão "Next" quando não houver mais itens.
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
