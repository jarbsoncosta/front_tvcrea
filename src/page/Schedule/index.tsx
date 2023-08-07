import { useEffect, useState } from "react";
import {
  ButtonAddVideo,
  Container,
  Content,
  ContentPaginate,
  Input,
  Search,
  Table,
} from "./styles";
import { Header } from "../../components/Header";
import { Card, Pagination } from "react-bootstrap";
import { MagnifyingGlass } from "@phosphor-icons/react";
import axios from "axios";
import { formatarTamanhoDoVideo } from "../../utils/formatSizeVideo";
import { formatarTempoDeExecucao } from "../../utils/formatVideoLength";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import { Trash} from "@phosphor-icons/react";

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
  erros: string;
  status: boolean;
}

export function Programacao() {
  const [list, setList] = useState<Filmes[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedVideos, setSelectedVideos] = useState<Filmes[]>([]);

  console.log(selectedVideos);

  const handleVideoSelect = (video) => {
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleVideoRemove = (video) => {
    setSelectedVideos((prevSelected) =>
      prevSelected.filter((selectedVideo) => selectedVideo.id !== video.id)
    );
  };
  //const filteredVideos = list.filter((video) =>
  //video.nome.toLowerCase().includes(searchTerm.toLowerCase())
  //);

  return (
    <Container>
      <Header />
      <Content>
        <Card style={{ width: "450px", minHeight: "500px" }}>
          <Card.Header>Lista de videos</Card.Header>
          <Card.Body>
            <Search>
              <div>
                <MagnifyingGlass color="#2868b0" size={30} weight="fill" />
              </div>
              <div style={{ width: "100%" }}>
                <Input
                  type="text"
                  placeholder="Buscar pelo nome do vídeo"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            </Search>
            {list.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Tamanho</th>
                    <th>Duração</th>
                    <th>Formato</th>
                    <th>Add</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((video, index) => (
                    <tr key={index}>
                      <td
                        style={{
                          borderRadius: "5px 0 0 5px",
                        }}
                      >
                        <img
                          width={25}
                          height={25}
                          src={video.localizacao_thumb}
                          alt=""
                          style={{ marginRight: "0.5rem" }}
                        />
                        {video.nome}
                      </td>
                      <td>{formatarTamanhoDoVideo(video.tamanho)}</td>
                      <td>{formatarTempoDeExecucao(video.duracao)}</td>
                      <td>{video.formato}</td>
                      <td
                        style={{
                          borderRadius: "0 5px 5px 0",
                        }}
                      >
                        <ButtonAddVideo
                          onClick={() => handleVideoSelect(video)}
                        >
                          <AiOutlineVideoCameraAdd />
                        </ButtonAddVideo>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
            {list.length > 0 && (
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
          </Card.Body>
        </Card>
        <Card style={{ width: "450px", minHeight: "500px" }}>
          <Card.Header>Programação</Card.Header>
          <Card.Body>
          {selectedVideos.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Tamanho</th>
                    <th>Duração</th>
                    <th>Formato</th>
                    <th>Add</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedVideos.map((video, index) => (
                    <tr key={index}>
                      <td
                        style={{
                          borderRadius: "5px 0 0 5px",
                        }}
                      >
                        <img
                          width={25}
                          height={25}
                          src={video.localizacao_thumb}
                          alt=""
                          style={{ marginRight: "0.5rem" }}
                        />
                        {video.nome}
                      </td>
                      <td>{formatarTamanhoDoVideo(video.tamanho)}</td>
                      <td>{formatarTempoDeExecucao(video.duracao)}</td>
                      <td>{video.formato}</td>
                      <td
                        style={{
                          borderRadius: "0 5px 5px 0",
                        }}
                      >
                        <ButtonAddVideo
                           onClick={() => handleVideoRemove(video)}
                        >
                          <Trash />
                        </ButtonAddVideo>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Card.Body>
        </Card>
      </Content>
    </Container>
  );
}
