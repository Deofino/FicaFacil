import React, { Fragment, useState } from "react";
import { Input, Button } from "../../Form";
import { FaAt, FaLock, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import Logo from "../../../../img/project/logo-branca.png";
import axios from "axios";
import { ToastError, ToastWarning } from "../../Alert/Toast";
import { regexEmail } from "./FormularioLoginAdm";

export default function FormularioLoginEmail() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [Erroremail, setErrorEmail] = useState(null);
  const [Errorsenha, setErrorSenha] = useState(null);
  // @ts-check
  /**
   * @description Logar na conta do cliente / usuario
   * @author Delfino
   * @date 14/10/2021
   * @param {Event} e
   */
  const login = (e) => {
    e.preventDefault();
    if (regexEmail.test(email) && senha >= 4) {
      axios
        .post(
          `${process.env.REACT_APP_API}/cliente/login/`,
          JSON.stringify({
            email: email.trim(),
            senha: senha.trim(),
          })
        )
        .then(({ data }) => {
          if (data.status_code === 200) {
            let token = data.data.token;

            localStorage.removeItem("auth");
            localStorage.removeItem("user");

            localStorage.setItem("user", token);

            window.location.reload();
          } else {
            ToastError({ text: data.data });
          }
        })
        .catch((err) => ToastError({ text: err }));
    } else ToastWarning({ text: "Preencha todos os campos corretamente..." });
  };
  return (
    <Fragment>
      <section className="login-main">
        <div className="login_field">
          <div className="login_field__logo">
            <img src={Logo} alt="Fica Fácil" />
          </div>
          <div className="login_field__form">
            <form method="post" id="formLogin" onSubmit={(e) => login(e)}>
              <h3 className="login_field__title">Entrar com E-mail</h3>
              <Input
                title="E-mail"
                id="email"
                name="email"
                type="email"
                icon={<FaAt />}
                inputMode="email"
                value={email}
                error={Erroremail}
                onChange={(e) => {
                  const { value } = e.target;
                  setEmail(value);
                  !regexEmail.test(value)
                    ? setErrorEmail("Insira um e-mail valido")
                    : setErrorEmail(null);
                  value.length === 0 && setErrorEmail(null);
                }}
              />
              <Input
                title="Senha"
                id="passw"
                name="password"
                type="password"
                icon={<FaLock />}
                value={senha}
                error={Errorsenha}
                onChange={(e) => {
                  const { value } = e.target;
                  setSenha(value);
                  value.length <= 4
                    ? setErrorSenha(
                        "A senha deve conter no minimo 4 caracteres"
                      )
                    : setErrorSenha(null);
                  value.length === 0 && setErrorSenha(null);
                }}
              />
              <Link to="#" className="login_field__esenha">
                Esqueceu a senha? clique aqui!
              </Link>
              <Button className="login_field__button btn" type="submit">
                Entrar
              </Button>

              <Button
                icon={<FaArrowLeft size={15} />}
                className="login_field__button voltar"
              >
                <Link to="/entrar">Voltar</Link>
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
