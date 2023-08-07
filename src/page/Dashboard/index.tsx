import { useState, ChangeEvent, useRef, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { RiVideoUploadLine } from "react-icons/ri";
import { Container, File, Icon } from "./styles";
import { toast } from "react-toastify";
import { LoadingComponent } from "../../components/Loading";
import { ComponentForm } from "../../components/ComponentForm";
import { Header } from "../../components/Header";
import { api } from "../../services/api";

export function UploadVideo() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setLoading] = useState(false);

  const storedFile = localStorage.getItem("data");
  const result = JSON.parse(storedFile);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;

    setSelectedFile(file);
  };

  const fileInputRef = useRef(null);
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleUpload = () => {
    setLoading(true);
    if (!selectedFile) {
      console.error("Nenhum arquivo selecionado.");
      return;
    }
    const formData = new FormData();
    formData.append("file", selectedFile);
    api
      .post("upload", formData, {
        headers: {
          accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response: AxiosResponse) => {
        setLoading(false);
        const data = response.data;
        localStorage.setItem("data", JSON.stringify(data));
        setSelectedFile(null);
        // Lide com a resposta do servidor após o upload bem-sucedido, se necessário.
        console.log("Upload realizado com sucesso!", response.data);
      })
      .catch((error) => {
        setLoading(false);
        // Lide com quaisquer erros que ocorram durante o upload.
        console.error("Erro durante o upload do vídeo:", error);
        toast.error("Erro ao carregar o vídeo, tente novamente mais tarde");
      });
  };
  useEffect(() => {
    handleUpload();
  }, [selectedFile]);

  return (
    <Container>
      <Header />
      {!storedFile && (
        <File>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <Icon>
            <RiVideoUploadLine onClick={handleButtonClick} />
          </Icon>
        </File>
      )}
      <div style={{ marginTop: "2rem" }}>
        {isLoading && selectedFile ? (
          <LoadingComponent text="Carregando..." />
        ) : (
          !storedFile && (
            <span style={{ color: "#ffff" }}>Selecione um arquivo</span>
          )
        )}
      </div>

      {storedFile && (
        <ComponentForm data={result} setSelectedFile={setSelectedFile} />
      )}
    </Container>
  );
}
