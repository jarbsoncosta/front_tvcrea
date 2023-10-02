import { useAuth } from "../../context/authContext";
import { useEffect, useRef, useState } from "react";
import {
  ButtonDropdown,
  DropdownContent,
  HeaderContainer,
} from "./styles";
import { User, DoorOpen, CaretDown, CaretUp } from "@phosphor-icons/react";

export function Header() {
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <HeaderContainer ref={dropdownRef}>
      <div style={{ marginLeft: "2rem" }}>
        <ButtonDropdown onClick={toggleDropdown}>Programação{isOpen ?  <CaretUp size={20} />: <CaretDown size={20} />} </ButtonDropdown>
        
        {isOpen && (
          <DropdownContent>
            <a href="/criar-programacao">Criar programação</a>
            <a href="/cadastrar-video">Cadastrar video</a>
            <a href="/programacao">Listagem</a>
          </DropdownContent>
        )}
      </div>
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
    </HeaderContainer>
  );
}
