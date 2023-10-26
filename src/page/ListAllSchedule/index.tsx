import {
  Calendar,
  CaretDown,
  CaretRight,
  Circle,
  ClipboardText,
  Clock,
  Queue,
  Trash,
} from "@phosphor-icons/react";
import { Header } from "../../components/Header";
import {
  ButtonAgendarProgramacao,
  ButtonCriarProgramacao,
  ButtonListarProgramacao,
  ButtonTask,
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
import { ModalContent } from "../../components/Modal";
export function ListAllSchedule() {
  const [showTable, setShowTable] = useState(null);

  const { user } = useAuth();

  interface Programacao {
    id_programacao: number;
    nome: string;
    id_operador: string;
    duracao: number;
    p_hide: boolean;
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

  const filterListNotAdmin = list.filter(
    (item) => item.p_hide === false && user.username !== "admin"
  );
  let array = filterListNotAdmin;
  if (user.username === "admin") {
    array = list;
  }

  console.log(array);

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

  //DELETAR UMA PROGRAMAÇÃO
  function DeleteProgramação(programacao: any) {
    const confirmDelete = window.confirm(
      `Deseja realmente excluir está programação ${programacao.nome} ?`
    );

    if (confirmDelete) {
      api
        .delete(`/programacao/hide-programacao/${programacao.id_programacao}`, {
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
          {array.length === 0 ? (
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
              {array.map((item) => {
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
                        <span style={{margin:"-3rem 0 0 2rem", position:"absolute"}}>
                          {item?.p_hide === true && (
                            <Circle size={17} color="red" weight="fill" />
                          )}{" "}
                        </span>
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
                        <ButtonTask
                          title="Remover da programação"
                          onClick={() => {
                            DeleteProgramação(item);
                          }}
                        >
                          <Trash size={23} />
                        </ButtonTask>
                      </Info>
                    </Item>
                    {showTable === item.id_programacao && (
                      <ListVideo>
                        {item.sequencia.map((video, index) => {
                          return (
                            <Video key={index}>
                              <li>
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
                                    style={{
                                      width: "35px",
                                      height: "35px",
                                      cursor: "pointer",

                                      marginLeft: "2px",
                                    }}
                                    src={video.thumb}
                                    alt=""
                                    onClick={() =>
                                      activeModalThumb(video.thumb)
                                    }
                                  />
                                </div>
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
                disabled={array.length === 0} // Desabilitar o botão "Next" quando não houver mais itens.
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
