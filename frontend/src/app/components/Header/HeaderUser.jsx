import React from "react";
import NavbarUser from "./NavbarUser";
import { Switch, FormControlLabel, Tooltip } from "@material-ui/core";
import logo from "../../../img/project/logo-branca.png";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
  const storage = localStorage.getItem("dark");

  const [isDark, setDark] = React.useState(
    storage === "true" ? true : false || false
  );

  const dark = (e) => {
    setDark(e.target.checked);
    localStorage.setItem("dark", e.target.checked);
  };

  React.useEffect(() => {
    isDark
      ? document.querySelector("html").classList.add("dark")
      : document.querySelector("html").classList.remove("dark");
  }, [isDark]);

  const [isOpen, setOpen] = React.useState("");
  const handle = () => {
    setOpen(isOpen === "" ? "l-header--open" : "");
  };
  return (
    <header className={"l-header user " + isOpen}>
      <div className="l-header__logo">
        <div className="l-header__image">
          <img src={logo} alt="Logotipo, Fica Facil" />
        </div>
        {isOpen === "" ? (
          <FaBars className="l-header__menu icon" onClick={() => handle()} />
        ) : (
          <FaTimes className="l-header__menu icon" onClick={() => handle()} />
        )}
      </div>
      <FormControlLabel
        control={
          <Tooltip
            title="Habilitar/desabilitar modo escuro"
            arrow
            placement="top"
          >
            <Switch
              inputProps={{ "aria-label": "DarkMode" }}
              checked={isDark}
              className="c-switch"
              onChange={(e) => dark(e)}
            />
          </Tooltip>
        }
        label="Modo escuro"
      />
      <NavbarUser />
    </header>
  );
}