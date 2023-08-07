import { useAuth } from "../../context/authContext";
import { HeaderContainer, Link } from "./styles";
import { User, DoorOpen } from "@phosphor-icons/react";


export function Header() {
  const { user, signOut } = useAuth();
  return (
    <HeaderContainer>
      <div style={{marginLeft:" 2rem"}}>
        <Link to="/programacao">Programação </Link>
      </div>
      <div style={{display:"flex", gap:"0.5rem" }}>
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
    </HeaderContainer>
  );
}