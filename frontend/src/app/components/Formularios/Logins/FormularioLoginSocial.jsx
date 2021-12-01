import React, { useState, useEffect, Fragment } from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../../../img/project/logo-branca.png";
import axios from "axios";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function FormularioLoginSocial() {
  const [facebookUrl, setFacebookUrl] = useState("");
  const [googleUrl, setGoogleUrl] = useState("");
  let query = useQuery();
  useEffect(() => {
    if (query.get("code")) {
      let code = query.get("code");
      axios
        .post(`${process.env.REACT_APP_API}/cliente/loginFacebook?code=${code}`)
        .then((val) => {
          console.log(val.data);
          if (val.data.data !== undefined) {
            localStorage.removeItem("auth");
            localStorage.removeItem("user");

            localStorage.setItem("user", val.data.data.token);
            window.location.reload();
          }
        })
        .catch((err) => console.err(err))
        .finally(() => {
          query.delete("code");
        });
    }

    axios
      .get(`${process.env.REACT_APP_API}/cliente/getFacebookUrl/`)
      .then((val) => setFacebookUrl(val.data));

    return () => {
      setFacebookUrl("");
    };
  }, [query]);

  useEffect(() => {
    if (query.get("code")) {
      let code = query.get("code");
      axios
        .post(`${process.env.REACT_APP_API}/cliente/loginGoogle?code=${code}`)
        .then((val) => {
          if (val.data.data !== undefined) {
            localStorage.removeItem("auth");
            localStorage.removeItem("user");
            localStorage.setItem("user", val.data.data.token);
            window.location.reload();
          }
        })
        .finally(() => {
          query.delete("code");
        });
    }

    axios
      .get(`${process.env.REACT_APP_API}/cliente/getGoogleUrl/`)
      .then((val) => setGoogleUrl(val.data));

    return () => {
      setGoogleUrl("");
    };
  }, [query]);
  return (
    <Fragment>
      <section className="login-main">
        <div className="login_field">
          <div className="login_field__logo">
            <img src={Logo} alt="Fica Fácil" />
          </div>
          <h3 className="login_field__title">Novo por aqui? Entre agora!</h3>
          <div className="login_field facebook">
            <a className="login_field__link" href={facebookUrl}>
              <FaFacebook />
              <span>Entrar com Facebook</span>
            </a>
          </div>
          <div className="login_field google">
            <a className="login_field__link" href={googleUrl}>
              <FaGoogle />
              <span>Entrar com Google</span>
            </a>
          </div>

          <h5 className="login_field__line">ou</h5>

          <div className="login_field email">
            <Link className="login_field__link" to="/entrar/email">
              Entrar com o E-mail
            </Link>
          </div>
          <div className="login_field conta">
            <Link className="login_field__link" to="/criar">
              Criar uma nova conta
            </Link>
          </div>

          <Link to="#" className="login_field__terms"></Link>
        </div>
        <div className="wave">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path d="M0,256L60,240C120,224,240,192,360,165.3C480,139,600,117,720,138.7C840,160,960,224,1080,245.3C1200,267,1320,245,1380,234.7L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
          </svg>
        </div>
      </section>
    </Fragment>
  );
}
