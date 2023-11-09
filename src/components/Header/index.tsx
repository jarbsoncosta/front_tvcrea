import { useAuth } from "../../context/authContext";
import { Button, ContentLinks, HeaderContainer, StylesLink } from "./styles";
import { User, DoorOpen } from "@phosphor-icons/react";
import Logo from "../../assets/logo.png";
import { useState } from "react";
import { ModalCreateUser } from "../ModalCreateUser";

export function Header() {
  const { user, signOut } = useAuth();
  const [modalShow, setModalShow] = useState(false);

  return (
    <HeaderContainer>
      <a href="/views/programacao">
        <img src={Logo} width={140} alt="logo" />
      </a>

      <ContentLinks>
        <StylesLink to="/views/cadastrar_video">Cadastrar video</StylesLink>
        <h5>|</h5>
        <StylesLink to="/views/criar_programacao">Criar programação</StylesLink>
        <h5>|</h5>
        <StylesLink to="/views/programacao">Agendamentos</StylesLink>
        {user.username === "admin" && (
          <>
          <h5>|</h5>
          <Button onClick={() => setModalShow(true)} >Criar usuário</Button>
          </>
        )}
      </ContentLinks>

      <div style={{ display: "flex", gap: "0.5rem" }}>
        <div>
          <User style={{ color: "#ffff" }} size={25} weight="duotone" />
          <span
            style={{ color: "#ffff", fontSize: "0.875rem", marginLeft: "1rem" }}
          >
            {user?.username}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <button
            title="Sair"
            onClick={signOut}
            style={{ background: "transparent", border: "0" }}
          >
            <DoorOpen size={25} style={{ color: "white" }} weight="bold" />
          </button>
        </div>
      </div>

      <ModalCreateUser
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </HeaderContainer>
  );
}
