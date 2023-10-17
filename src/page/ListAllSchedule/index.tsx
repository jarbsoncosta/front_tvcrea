import {
  CaretDown,
  CaretRight,
  CaretUp,
  MagnifyingGlass,
} from "@phosphor-icons/react";
import { Header } from "../../components/Header";
import { Container, Content, Info, Item, SearchInput, Title } from "./styles";
import { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
export function ListAllSchedule() {
  const [showTable, setShowTable] = useState(null);
  console.log(showTable);

  const data = [
    {
      id: 1,
      title: "Capacita Crea",
      listVideos: [
        {
          id: 1,
          id_operador: 1,
          nome: "Certificado Crea",
          formato: "MP4",
          tamanho: 1024,
          assunto: "Ação",
          observacao: "Descrição do filme 1",
          localizacao_video: "/caminho/para/filme1.mp4",
          localizacao_thumb: "/src/assets/download.jpg",
          data_insercao: "2023-09-26",
          data_ultima_utilizacao: "2023-09-26",
          duracao: 13500,
          videoId: "12345",
          erros: "Nenhum erro",
          status: true,
        },
      ],
      dataProgramacao: "07/10/2023 11:30:00",
      duracao: "2:00:00",
    },
    {
      id: 2,
      title: "Capacita Crea",
      listVideos: [
        {
          id: 1,
          id_operador: 1,
          nome: "Certificado Crea",
          formato: "MP4",
          tamanho: 1024,
          assunto: "Ação",
          observacao: "Descrição do filme 1",
          localizacao_video: "/caminho/para/filme1.mp4",
          localizacao_thumb: "/src/assets/download.jpg",
          data_insercao: "2023-09-26",
          data_ultima_utilizacao: "2023-09-26",
          duracao: 13500,
          videoId: "12345",
          erros: "Nenhum erro",
          status: true,
        },
        {
          id: 2,
          id_operador: 1,
          nome: "Certificado Crea",
          formato: "MP4",
          tamanho: 1024,
          assunto: "Ação",
          observacao: "Descrição do filme 1",
          localizacao_video: "/caminho/para/filme1.mp4",
          localizacao_thumb: "/src/assets/download.jpg",
          data_insercao: "2023-09-26",
          data_ultima_utilizacao: "2023-09-26",
          duracao: 13500,
          videoId: "12345",
          erros: "Nenhum erro",
          status: true,
        },
      ],
      dataProgramacao: "07/10/2023 11:30:00",
      duracao: "5:00:00",
    },
  ];

  function handleChangeShowTable(itemId) {
    setShowTable(itemId === showTable ? null : itemId); // Se o itemId for igual a showTable, oculta, senão mostra
  }

  // Obtém a data atual no formato "YYYY-MM-DD"
  const currentDate = new Date().toISOString().split('T')[0];
  // Inicializa o estado com a data atual como valor padrão
  const [selectedDate, setSelectedDate] = useState(currentDate);

  // Manipulador de evento para alterações no campo de data
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };
  return (
    <>
      <Header />
      <Container>
        <Content>
          <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
            <label htmlFor="datePicker">Buscar programação por data</label>
            <SearchInput
              type="date"
              id="datePicker"
              name="datePicker"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </div>
          {data.map((item) => {
            return (
              <>
                <Item
                  type="button"
                  onClick={() => handleChangeShowTable(item.id)}
                >
                  <Title>
                    {showTable === item.id ? (
                      <CaretDown color="#6b7280" size={25} />
                    ) : (
                      <CaretRight size={25} color="#6b7280" />
                    )}
                    <strong>{item.title} </strong>
                  </Title>
                  <Info>
                    <span><strong>Data: </strong>{item.dataProgramacao} </span>
                    <span><strong>Duração: </strong> {item.duracao} </span>
                  </Info>
                </Item>
                {showTable === item.id && (
                  <>
                    <h5>Lista de videos</h5>
                    {item.listVideos.map((video) => {
                      return (
                        <ul key={video.id}>
                          <li>{video.nome} </li>
                          <li>{video.formato}</li>
                          <li>{video.duracao}</li>
                        </ul>
                      );
                    })}
                  </>
                )}
              </>
            );
          })}
        </Content>
      </Container>
    </>
  );
}
