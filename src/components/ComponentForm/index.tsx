import { useState } from "react";
import {
  ArrayThumbnail,
  ButtonCancel,
  ButtonSubmit,
  Container,
  ErrorInput,
  FormContainer,
  FormInput,
  FormLabel,
  FormTextarea,
  InfoVideo,
  SelectThumbnail,
  StyledButton,
  Thumbnail,
  ValidateVideo,
  VideoFile,
} from "./styles";
import axios from "axios";
import { toast } from "react-toastify";
import { LoadingComponent } from "../Loading";
import { Trash, Video } from "@phosphor-icons/react";
import { formatarTempoDeExecucao } from "../../utils/formatVideoLength";
import { formatarTamanhoDoVideo } from "../../utils/formatSizeVideo";
import { useAuth } from "../../context/authContext";
import { api } from "../../services/api";

interface ResponseData {
  id:number;
  duration: number;
  file_size: number;
  status: true;
  name: string;
  thumbnail_1: string;
  thumbnail_2: string;
  thumbnail_3: string;
  thumbnail_4: string;
}

export function ComponentForm({ data }: any) {
  const { user } = useAuth();

  //const fileName = data.filename !== null && data.filename;
  const [subject, setSubject] = useState("");
  const [observation, setObservation] = useState("");
  const [status, setStatus] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [thumbnailError, setThumbnailError] = useState("");

  const [returnData, setReturnData] = useState<ResponseData>(
    {} as ResponseData
  );

  //função para pegar a url e armazenar em um state
  const [thumbnail, setThumbnail] = useState(null);
  const handleClick = (valorThumbnail) => {
    setThumbnail(valorThumbnail);
  };
  const handleCheckStatusFalse = () => {
    setStatus(!status);
  };
  //Função para enviar para banco
  const verificarValidadeVideoPOST = (e: any) => {
    e.preventDefault();
    setLoading(true);
    const newData = {
      filename:data.filename,
      id:data.id,
      status:status,
      subject:subject,      
      observacao:observation,            
    }
    api.post(
        `register`,
        newData,
        {
          headers: {
            accept: "application/json",
          },
        
        }
      )
      .then((response) => {
        console.log(response.data); // Dados retornados pela API
        setLoading(false);
        setReturnData(response.data);
        //localStorage.removeItem('data')
      })
      .catch((error) => {
        setLoading(false);
        console.error("Ocorreu um erro:", error);
      });
  };

  const salvarVideoNoBanco = (e: any) => {
    e.preventDefault();

    if (thumbnail === null && status) {
      setThumbnailError("Selecione uma imagem!");
      return;
    }
    const data  = {
      filename:returnData.name,
      id:returnData.id,
      thumb:thumbnail,
      subject:subject,      
      observacao:observation,
      operador:user.username,
      status:status,
      file_size:returnData.file_size,
      duration:returnData.duration

    }
    console.log(data, "dados")

    setLoading(true);
    const url = `http://10.10.0.22:8000/thumb`
     axios.post(url,data,
      {
      headers: {
        'accept': 'application/json'
      }
    })
      .then((response) => {
        console.log(response.data); // Dados retornados pela API
        setLoading(false);
        setReturnData(response.data);
        
        toast.success("Video enviado com sucesso !");
        setSubject("");
        setObservation("");
        setInterval(() => {
          localStorage.removeItem("data");
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Ocorreu um erro:", error);
      });  

  };

  function DeleteVideo() {
    axios
      .delete(`http://10.10.0.22:8000/delete/${data.id}`)
      .then(() => {
        localStorage.removeItem("data");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Ocorreu um erro:", error);
      });
  }

  return (
    <Container>
      <FormContainer>
        <strong style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>
          Cadastro
        </strong>
        <VideoFile>
          {!returnData.name ? (
            <strong>
              <Video color="#1d4ed8" size={25} /> {data.filename}
              <Trash
                size={25}
                style={{ cursor: "pointer" }}
                color="#e11d48"
                onClick={DeleteVideo}
                weight="bold"
              />
            </strong>
          ) : (
            <InfoVideo>
              <li>Nome: {returnData.name} </li>
              <li>Duração: {formatarTempoDeExecucao(returnData.duration)} </li>
              <li>Tamanho: {formatarTamanhoDoVideo(returnData.file_size)} </li>
            </InfoVideo>
          )}
        </VideoFile>
        <form onSubmit={verificarValidadeVideoPOST}>
          {!returnData.name && (
            <>
              <ValidateVideo>
                <StyledButton disabled={!status || isLoading} type="submit">
                  {!isLoading ? (
                    " validar"
                  ) : (
                    <LoadingComponent text="Processando..." />
                  )}
                </StyledButton>
                {!isLoading && (
                  <StyledButton type="button" onClick={handleCheckStatusFalse}>
                    não validar
                  </StyledButton>
                )}
              </ValidateVideo>
            </>
          )}
        </form>

        <form onSubmit={salvarVideoNoBanco}>
          {!status ? (
            <>
              <div style={{ marginBottom: "1rem" }}>
                <strong style={{ fontSize: "12px" }}>
                  Preencha os dados para cadastro do video
                </strong>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <FormLabel>Assunto:</FormLabel>
                <FormInput
                  type="text"
                  name="assunto"
                  value={subject}
                  placeholder="Assunto relacionado ao video"
                  onChange={(e) => {
                    setSubject(e.target.value);
                  }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <FormLabel>Observação:</FormLabel>
                <FormTextarea
                  name="observacao"
                  value={observation}
                  placeholder="Observação"
                  onChange={(e) => {
                    setObservation(e.target.value);
                  }}
                />
              </div>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <ButtonSubmit type="submit">
                  {isLoading ? "Aguarde" : "Salvar"}
                </ButtonSubmit>
                {!isLoading && (
                  <ButtonCancel type="button" onClick={DeleteVideo}>
                    Cancelar
                  </ButtonCancel>
                )}
              </div>
            </>
          ) : (
            returnData.name && (
              <>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <FormLabel>
                    Assunto: <span style={{ color: "red" }}>*</span>{" "}
                  </FormLabel>
                  <FormInput
                    type="text"
                    name="assunto"
                    value={subject}
                    placeholder="Assunto relacionado ao video"
                    onChange={(e) => {
                      setSubject(e.target.value);
                    }}
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <FormLabel>Observação:</FormLabel>
                  <FormTextarea
                    name="observacao"
                    value={observation}
                    placeholder="Observação"
                    onChange={(e) => {
                      setObservation(e.target.value);
                    }}
                  />
                </div>
                <FormLabel>
                  Selecione uma imagem para o video{" "}
                  <span style={{ color: "red" }}>*</span>
                </FormLabel>
                <ArrayThumbnail>
                  {Object.keys(returnData).map((key) => {
                    if (key.startsWith("thumbnail_")) {
                      return (
                        <button
                          type="button"
                          key={key}
                          onClick={() => handleClick(returnData[key])}
                        >
                          <img
                            width={60}
                            height={60}
                            src={returnData[key]}
                            alt={`Thumbnail ${key}`}
                          />
                        </button>
                      );
                    }
                    return null;
                  })}
                </ArrayThumbnail>
                {thumbnailError && <ErrorInput>{thumbnailError}</ErrorInput>}
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <ButtonSubmit type="submit">
                    {isLoading ? "Aguarde" : "Salvar"}
                  </ButtonSubmit>
                  {!isLoading && (
                    <ButtonCancel type="button" onClick={DeleteVideo}>
                      Cancelar
                    </ButtonCancel>
                  )}
                </div>
              </>
            )
          )}
        </form>
      </FormContainer>
      <div>
        {thumbnail && (
          <SelectThumbnail>
            <span>Imagen Selecionada</span>

            <Thumbnail>
              <img
                width={250}
                height={250}
                src={thumbnail}
                alt="Thumbnail selecionada"
              />
            </Thumbnail>
          </SelectThumbnail>
        )}
      </div>
    </Container>
  );
}
