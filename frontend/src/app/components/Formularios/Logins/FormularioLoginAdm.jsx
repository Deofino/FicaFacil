import React, { Fragment, useState } from "react";
import { Input, Button } from "../../Form";
import axios from "axios";
import { FaAt, FaLock,} from "react-icons/fa";
import Logo from "../../../../img/project/logo-branca.png";
import { ToastError, ToastWarning } from "../../Alert/Toast";

export const regexEmail =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export default function FormularioLoginAdm() {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");

  const [errorLogin, setErrorLogin] = useState(null);
  const [errorSenha, setErrorSenha] = useState(null);
  const enter = (e) => {
    e.preventDefault();
    if (regexEmail.test(login) && senha > 4) {
      axios
        .post(
          `${process.env.REACT_APP_API}/administrador/login/`,
          JSON.stringify({
            email: login.trim(),
            senha: senha.trim(),
          })
        )
        .then(({ data }) => {
          if (data.status_code === 200) {
            let token = data.data.token;

            localStorage.removeItem("auth");
            localStorage.removeItem("user");

            localStorage.setItem("auth", token);

            window.location.reload();
          } else {
            ToastError({ text: data.data });
          }
        })
        .catch((err) => {
          ToastError({ text: err });
        });
    } else ToastWarning({ text: "Preencha todos os campos corretamente." });
  };

  return (
    <Fragment>
      <section className="login-main" style={{ background: "#0077b5" }}>
        <div className="login_field">
          <div className="login_field__logo" style={{ background: "#6f42c1" }}>
            <img src={Logo} alt="Fica Fácil" />
          </div>
          <div className="login_field__form">
            <form method="post" id="formLogin" onSubmit={(e) => enter(e)}>
              <h3 className="login_field__title">
                Seja bem-vindo administrador(a)!
              </h3>
              <Input
                title="E-mail: *"
                id="email"
                name="email"
                className="login_field__input"
                type="email"
                value={login}
                error={errorLogin}
                onChange={({ target }) => {
                  setLogin(target.value);
                  !regexEmail.test(login)
                    ? setErrorLogin("Insira um e-mail valido")
                    : setErrorLogin(null);
                  target.value.length === 0 && setErrorLogin(null);
                }}
                icon={<FaAt />}
                inputMode="email"
              />
              <Input
                title="Senha: *"
                className="login_field__input"
                id="passw"
                value={senha}
                error={errorSenha}
                type={"password"}
                onChange={({ target }) => {
                  setSenha(target.value);
                  target.value.length <= 4
                    ? setErrorSenha(
                        "A senha deve conter no minimo 5 caracteres"
                      )
                    : setErrorSenha(null);
                  target.value.length === 0 && setErrorSenha(null);
                }}
                name="password"
                type="password"
                icon={<FaLock />}
              />

              <Button className="login_field__button" type="submit">
                Entrar
              </Button>
            </form>
          </div>
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
