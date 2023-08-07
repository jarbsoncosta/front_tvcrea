import { Trash } from "@phosphor-icons/react";
import { v4 as uuidv4 } from "uuid";
import { formatarTamanhoDoVideo } from "../../../../utils/formatSizeVideo";
import { formatarTempoDeExecucao } from "../../../../utils/formatVideoLength";
import {
  Container,
  Content,
  ContentButton,
  DivButtonSubmit,
  DivButtonTrash,
  DivMoveVideo,
  Item,
  SubmittButton,
} from "./style";


export function ComponentSchedule({ selectedVideos, setSelectedVideos }: any) {
  const videosWithIds = selectedVideos.map((video) => ({
    ...video,
    videoId: uuidv4(),
  }));

 const handleVideoRemove = (video) => {
    setSelectedVideos(() =>
      videosWithIds.filter(
        (selectedVideo) => selectedVideo.videoId !== video.videoId
      )
    );
  };

  const handleVideoMove = (index, direction) => {
    const updatedVideos = [...selectedVideos];
    const [movedVideo] = updatedVideos.splice(index, 1);
    const newIndex = direction === "up" ? index - 1 : index + 1;
    updatedVideos.splice(newIndex, 0, movedVideo);
    setSelectedVideos(updatedVideos);
  };


function handleSubmit(){
  console.log(videosWithIds, "lista dpar enviar")
}



  return (
    <Container>
      {videosWithIds.length > 0 && (
        <Content>
          {videosWithIds.map((video, index) => (
            <Item key={video.videoId}>
              <span
                style={{
                  borderRadius: "5px 0 0 5px",
                }}
              >
                <img
                  width={30}
                  height={30}
                  src={video.localizacao_thumb}
                  alt=""
                  style={{ marginRight: "0.5rem" }}
                />
                {video.nome}
              </span>
              <span>{formatarTamanhoDoVideo(video.tamanho)}</span>
              <span>{formatarTempoDeExecucao(video.duracao)}</span>
              <span>{video.formato}</span>
              <ContentButton>
              <DivMoveVideo>
                  <button
                    onClick={() => handleVideoMove(index, "up")}
                    disabled={index === 0}
                  >
                    &#8679; {/* Seta para cima */}
                  </button>
                  <button
                    onClick={() => handleVideoMove(index, "down")}
                    disabled={index === selectedVideos.length - 1}
                  >
                    &#8681; {/* Seta para baixo */}
                  </button>
                </DivMoveVideo>
                <DivButtonTrash>
                  <button onClick={() => handleVideoRemove(video)}>
                    <Trash size={25} />
                  </button>
                </DivButtonTrash>               
              </ContentButton>
            </Item>
          ))}
        </Content>
      )}
      <DivButtonSubmit>
      <SubmittButton onClick={handleSubmit} size="sm" variant="success"> 
      {videosWithIds.length > 1 ? "Enviar lista" : "Enviar" }
      </SubmittButton>
      </DivButtonSubmit>
    </Container>
  );
}
