import React from "react";
import NavbarUser from "./NavBarUser";
import logo from "../../../img/project/logo-branca.png";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Header() {

  const [isOpen, setOpen] = React.useState("");
  const handle = () => {
    setOpen(isOpen === "" ? "l-header--open" : "");
  };
  return (
    <header className={"l-header user " + isOpen}>
      <div className="l-header__logo">
        <div className="l-header__image">
          <img src={logo} alt="Logotipo, Fica Facil"/>
        </div>
        {isOpen === "" ? (
          <FaBars className="l-header__menu icon" onClick={() => handle()} />
        ) : (
          <FaTimes
            className="l-header__menu icon close"
            onClick={() => handle()}
          />
        )}
      </div>
      <NavbarUser />
    </header>
  );
}
