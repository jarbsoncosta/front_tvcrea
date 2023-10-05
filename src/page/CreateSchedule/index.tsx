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
} from "./styles";
import { Header } from "../../components/Header";
import { Pagination } from "react-bootstrap";
import axios from "axios";
import { formatarTamanhoDoVideo } from "../../utils/formatSizeVideo";
import { formatarTempoDeExecucao } from "../../utils/formatVideoLength";
import { ComponentSchedule } from "./Components/ComponentSchedule";
import Img from "../../assets/download.jpg";
import { ArrowFatLinesRight, Trash, VideoCamera } from "@phosphor-icons/react";
import { ModalContent } from "../../components/Modal";

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

const filmes: Filmes[] = [
  {
    id: 1,
    id_operador: 1,
    nome: "Certificado Crea",
    formato: "MP4",
    tamanho: 1024, // tamanho em bytes
    assunto: "Ação",
    observacao: "Descrição do filme 1",
    localizacao_video: "/caminho/para/filme1.mp4",
    localizacao_thumb: Img,
    data_insercao: "2023-09-26",
    data_ultima_utilizacao: "2023-09-26",
    duracao: 13500, // duração em segundos
    videoId: "12345",
    erros: "Nenhum erro",
    status: true,
  },
  {
    id: 2,
    id_operador: 2,
    nome: "Capacita Crea Mossoró",
    formato: "AVI",
    tamanho: 2048, // tamanho em bytes
    assunto: "Comédia",
    observacao: "Descrição do filme 2",
    localizacao_video: "/caminho/para/filme2.avi",
    localizacao_thumb: Img,
    data_insercao: "2023-09-26",
    data_ultima_utilizacao: "2023-09-26",
    duracao: 95, // duração em segundos
    videoId: "67890",
    erros: "Alguns erros",
    status: false,
  },
  // Adicione mais objetos conforme necessário
];

export function CreateSchedule() {
  const [list, setList] = useState<Filmes[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedVideos, setSelectedVideos] = useState<Filmes[]>([]);

  const handleVideoSelect = (video: any) => {
    setSelectedVideos((prevSelected) => [...prevSelected, video]);
  };

  useEffect(() => {
    fetchVideoList();
  }, [currentPage, searchTerm]);

  const fetchVideoList = () => {
    axios
      .get(
        `http://10.10.0.22:8000/vlist?page=${
          currentPage - 1
        }&search=${searchTerm}`
      )
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
            <h5>Lista de videos</h5>

            <Link to="/cadastrar-video">
              <VideoCamera
                size={20}
                weight="bold"
                style={{ marginRight: "0.5rem" }}
              />{" "}
              Add
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
          {filmes.length > 0 && (
            <Table>
              <thead>
                <tr>
                  <th>Nº</th>
                  <th>Nome</th>
                  <th>Tamanho</th>
                  <th>Duração</th>
                  <th>Formato</th>
                </tr>
              </thead>
              <tbody>
                {filmes.map((video, index) => {
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
                      <td style={{ textAlign: "center", fontSize:"0.75rem", color:"#6b7280" }}>
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
                      <td style={{ textAlign: "center" }}>
                        {video.formato.toLocaleLowerCase()}
                      </td>
                      <td style={{ textAlign: "right" }}>
                       <div style={{display:"flex"}}>
                       <ButtonTask title="Remover da programação">
                          <Trash size={23} />
                        </ButtonTask>
                        <ButtonAddVideo
                          title="Adicionar a programação"
                          onClick={() => handleVideoSelect(video)}
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
          {list.length >= 25 && (
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
            <h5>Programação</h5>
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
