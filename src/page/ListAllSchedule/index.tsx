import {
  Calendar,
  CaretDown,
  CaretRight,
  ClipboardText,
  Clock,
  Queue,
} from "@phosphor-icons/react";
import { Header } from "../../components/Header";
import {
  ButtonAgendarProgramacao,
  ButtonCriarProgramacao,
  ButtonListarProgramacao,
  Container,
  Content,
  ContentPaginate,
  IconVideoCamara,
  Info,
  InfoProgramacao,
  Item,
  ItemTitle,
  ListVideo,
  SearchInput,
  Title,
  Video,
} from "./styles";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { useAuth } from "../../context/authContext";
import { Pagination } from "react-bootstrap";
import { formatarTempoDeExecucao } from "../../utils/formatVideoLength";
import { ModalCriarAgendamento } from "./components/ModalAgendamento";
import { ModalListarAgendamentoId } from "./components/ModalListarAgendamentoId";
import ImgTeste from "../../assets/download.jpg";
import { ModalContent } from "../../components/Modal";
export function ListAllSchedule() {
  const [showTable, setShowTable] = useState(null);

  const { user } = useAuth();

  interface Programacao {
    id_programacao: number;
    nome: string;
    id_operador: string;
    duracao: number;
    exibicoes: [
      {
        hora_fim: Date;
        hora_inicio: Date;
        play: boolean;
      }
    ];
    sequencia: [
      {
        nome: string;
        duracao: number;
        thumb: string;
      }
    ];
  }

  function handleChangeShowTable(itemId: any) {
    setShowTable(itemId === showTable ? null : itemId);
  } // Se o itemId for igual a showTable, oculta, senão mostra  }

  const [modalShow, setModalShow] = useState(false); // Modal de criar agendamento
  const [modalShowAgendamentos, setModalShowAgendamentos] = useState(false);
  const [idProgramacao, setIdProgramacao] = useState(); // iD DA PROGRAMAÇÃO
  const [arrayExibicoes, setArrayExibicoes] = useState(); // Array exibições da PROGRAMAÇÃO Selecionada
  function activeModalCreateAgendamento(item: any) {
    setIdProgramacao(item);
    setModalShow(true);
  }
  function activeModalListarAgendamentos(item: any) {
    setArrayExibicoes(item);
    setModalShowAgendamentos(true);
  }

  const [currentPage, setCurrentPage] = useState(1);

  const [searchTerm, setSearchTerm] = useState("");
  const [list, setList] = useState<Programacao[]>([]);
  console.log(list);
  const fetchVideoList = () => {
    api
      .get(
        `/vprogramacao/?skip=${
          currentPage - 1
        }&limit=${10}&search=${searchTerm}`,

        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((response) => {
        setList(response.data);
      })
      .catch((error) => {
        console.error("Erro carregar listagem:", error);
      });
  };
  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };
  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value);
  };
  useEffect(() => {
    fetchVideoList();
  }, [currentPage, searchTerm]);

  //Abrir Modal Imagem do video
  const [modalShowThumb, setModalShowThumb] = useState(false);
  const [thumb, setThumb] = useState("");
  function activeModalThumb(data) {
    setModalShowThumb(true);
    setThumb(data);
  }

  return (
    <>
      <Header />
      <Container>
        <Content>
          <Title>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <ClipboardText size={35} color="#074e8c" weight="bold" />
              <h5>Lista de programação</h5>
            </div>

            <ButtonCriarProgramacao to="/views/criar_programacao">
              <Queue size={25} weight="bold" /> Criar Programação
            </ButtonCriarProgramacao>
          </Title>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <SearchInput
              placeholder="Buscar programação"
              type="text"
              onChange={handleSearchChange}
            />
          </div>
          {list.length === 0 ? (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <span>Sua lista de programação está vazia!</span>
            </div>
          ) : (
            <>
              {list.map((item) => {
                const play = item.exibicoes.filter(
                  (item) => item.play === true
                );
                //Mostrar apenas a quantidade de agendamentos onde a data seja maior ou igual a data atual
                // Obtendo a data e hora atual
                const dataAtual = new Date(); // Filtrando os objetos com hora_fim maior ou igual à data e hora atual
                const objetosFiltrados = item?.exibicoes.filter((objeto) => {
                  const horaFim = new Date(objeto.hora_fim);
                  return horaFim >= dataAtual;
                });
                return (
                  <>
                    <Item
                      style={
                        showTable === item.id_programacao ? { border: "0" } : {}
                      }
                      key={item.id_programacao}
                      type="button"
                    >
                      <ItemTitle
                        onClick={() =>
                          handleChangeShowTable(item.id_programacao)
                        }
                      >
                        {showTable === item.id_programacao ? (
                          <CaretDown color="#6b7280" size={25} />
                        ) : (
                          <CaretRight size={25} color="#6b7280" />
                        )}
                        <ClipboardText color="#074e8c" size={25} />
                        <InfoProgramacao>
                          <strong>{item.nome}</strong>
                          <div>
                            <span>{formatarTempoDeExecucao(item.duracao)}</span>{" "}
                            <span title="Em reprodução">
                              {play[0]?.play === true && (
                                <>
                                  <IconVideoCamara
                                    size={17}
                                    color="#84cc16"
                                    weight="fill"
                                  />
                                </>
                              )}
                            </span>
                          </div>
                        </InfoProgramacao>
                      </ItemTitle>
                      <Info>
                        <ButtonAgendarProgramacao
                          onClick={() => {
                            activeModalCreateAgendamento(item);
                          }}
                        >
                          <Calendar size={20} /> Agendar
                        </ButtonAgendarProgramacao>
                        {objetosFiltrados.length > 0 && (
                          <ButtonListarProgramacao
                            title="Clique para ver os agendamentos"
                            onClick={() => activeModalListarAgendamentos(item)}
                          >
                            <strong> {objetosFiltrados.length}</strong>
                          </ButtonListarProgramacao>
                        )}
                      </Info>
                    </Item>
                    {showTable === item.id_programacao && (
                      <ListVideo>
                        {item.sequencia.map((video, index) => {
                          return (
                            <Video key={index}>
                              <li>
                                <img
                                  style={{
                                    width: "35px",
                                    height: "35px",
                                    cursor: "pointer",
                                  }}
                                  src={video.thumb}
                                  alt=""
                                  onClick={() => activeModalThumb(video.thumb)}
                                />
                                <strong>{video.nome} / </strong>
                                <span>
                                  <Clock
                                    size={16}
                                    weight="bold"
                                    style={{ margin: "-3px 5px 0 5px" }}
                                  />
                                  {formatarTempoDeExecucao(video.duracao)}
                                </span>
                              </li>
                              <ModalContent
                                show={modalShowThumb}
                                onHide={() => setModalShowThumb(false)}
                                data={thumb}
                              />
                            </Video>
                          );
                        })}
                      </ListVideo>
                    )}
                  </>
                );
              })}
            </>
          )}

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
        </Content>
      </Container>
      <ModalCriarAgendamento
        show={modalShow}
        close={setModalShow}
        data={idProgramacao}
        fetchVideoList={fetchVideoList}
      />
      <ModalListarAgendamentoId
        show={modalShowAgendamentos}
        close={setModalShowAgendamentos}
        data={arrayExibicoes}
      />
    </>
  );
}
