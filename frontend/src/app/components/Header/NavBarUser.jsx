import React from "react";
import { Link, Redirect } from "react-router-dom";
import { Tooltip, IconButton, Zoom } from "@material-ui/core";
import {
  FaSearch,
  FaChartLine,
  FaUserAlt,
  FaSignOutAlt,
  FaEdit,
  FaHome
} from "react-icons/fa";
import axios from "axios";

export function parseJwt(token) {
  if (token) {
    let base64Url = token.split(".")[1];
    let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    let jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  }
}

export default function NavbarUser() {
  const [user, setUser] = React.useState({ nome: "Visitante" });

  React.useEffect(() => {
    if (localStorage.getItem("user")) {
      let user = parseJwt(localStorage.getItem("user"));
      // console.log(user);
      setUser(user);
    }
  }, []);
  if (user === null) return <Redirect to="/entrar" />;
  return (
    <nav className="c-navbar">
      <ul className="c-navbar__menu">
        <li className="c-navbar__menu-item sc">
          <div className="c-navbar__search">
            <FaSearch className="icon" />
          </div>
          <input
            type="text"
            className="c-navbar__input-search"
            placeholder="Pesquisar..."
          />
          <span className="c-navbar__tooltip">Pesquisar</span>
        </li>
        <li className="c-navbar__menu-item">
          <Link to="/">
            <div className="space">
              <FaHome className="icon" />
              <span className="c-navbar__links-name">Home</span>
            </div>
          </Link>
          <span className="c-navbar__tooltip">Home</span>
        </li>
        <li className="c-navbar__menu-item">
          <Link to="/dashboard">
            <div className="space">
              <FaChartLine className="icon" />
              <span className="c-navbar__links-name">Desempenho</span>
            </div>
          </Link>
          <span className="c-navbar__tooltip">Desempenho</span>
        </li>
        <li className="c-navbar__dropdown">
          <div className="c-navbar__menu-item">
            <Link to="/simulado">
              <div className="space">
                <FaEdit className="icon" />
                <span className="c-navbar__links-name">Simulado</span>
              </div>
            </Link>
            <span className="c-navbar__tooltip">Simulado</span>
          </div>
        </li>
        <li className="c-navbar__menu-item">
          <Link to="/perfil">
            <div className="space">
              <FaUserAlt className="icon" />
              <span className="c-navbar__links-name">Perfil</span>
            </div>
          </Link>
          <span className="c-navbar__tooltip">Perfil</span>
        </li>
        <li className="c-navbar__profile">
          <div className="c-navbar__image-profile">
            {user !== "" && user.foto !== "" && user.foto !== undefined ? (
              <img src={user.foto} alt={user.nome} />
            ) : (
              user.nome.charAt(0).toUpperCase()
            )}
          </div>
          <div className="c-navbar__name-job">
            <div className="name">{user.nome.split(" ")[0]}</div>
          </div>
          <Tooltip
            title="Sair"
            TransitionComponent={Zoom}
            className="c-navbar__log-out icon"
          >
            <IconButton
              style={{ background: "transparent" }}
              onClick={() => {
                if (user.id !== undefined) {
                  if (user.facebook !== undefined) {
                    axios
                      .post(
                        `${process.env.REACT_APP_API}/cliente/logoutFacebook?email=${user.email}`
                      )
                      .then((val) => console.log(val))
                      .finally(() => {
                        localStorage.removeItem("auth");
                        localStorage.removeItem("user");
                        window.location.reload();
                      });
                  }
                  localStorage.removeItem("auth");
                  localStorage.removeItem("user");
                  window.location.reload();
                } else {
                  setUser({ nome: "Visitante" });
                }
              }}
            >
              <FaSignOutAlt className="icon" />
            </IconButton>
          </Tooltip>
        </li>
      </ul>
    </nav>
  );
}
