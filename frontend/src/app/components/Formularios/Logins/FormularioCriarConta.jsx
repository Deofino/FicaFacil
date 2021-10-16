import React, { Fragment, useState } from "react";
import { Input, Button } from "../../Form";
import axios from "axios";
import { FaAt, FaUser, FaLock, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import Logo from "../../../../img/project/logo-branca.png";
import { ToastError, ToastSuccess } from "../../Alert/Toast";
import { regexEmail } from "./FormularioLoginAdm";
export default function FormularioCriarConta() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmacao_senha, setConfirmacao_senha] = useState("");

  const [Errornome, setErrorNome] = useState(null);
  const [Erroremail, setErrorEmail] = useState(null);
  const [Errorsenha, setErrorSenha] = useState(null);
  const [Errorconfirmacao_senha, setErrorConfirmacao_senha] = useState(null);

  //@ts-check
  /**
   * @description Criar conta do Usuario
   * @author Delfino
   * @date 14/10/2021
   * @param {Event} e
   */
  const create = (e) => {
    e.preventDefault();

    //if(){ as verificacoes dos campos aqui

    axios
      .post(
        `${process.env.REACT_APP_API}/cliente/create/`,
        JSON.stringify({
          nome: nome.trim(),
          email: email.trim(),
          senha: senha.trim(),
        })
      )
      .then(({ data }) => {
        console.log(data.data);
        if (data.status_code === 200) {
          ToastSuccess({
            text: `Cliente ${
              (nome.charAt(0).toUpperCase() + nome.slice(1, nome.length)).split(
                " "
              )[0]
            } inserido(a) com sucesso!`,
          });
          setNome("");
          setEmail("");
          setSenha("");
          setConfirmacao_senha("");
        } else {
          ToastError({ text: "Ops... Houve Algum erro ao inserir cliente..." });
          console.log(data);
        }
      })
      .catch((err) => {
        ToastError({ text: err });
      });

    //   }
  };
  return (
    <Fragment>
      <section className="login-main">
        <div className="login_field">
          <div className="login_field__logo">
            <img src={Logo} alt="Fica Fácil" />
          </div>
          <div className="login_field__form">
            <h3 className="login_field__title">Crie sua Conta</h3>
            <div className="formCreate">
              <form
                action=""
                method="post"
                id="formC"
                onSubmit={(e) => create(e)}
              >
                <Input
                  className="login_field__input"
                  title="Nome Completo"
                  id="name"
                  name="name"
                  type="text"
                  icon={<FaUser />}
                  inputMode="text"
                  value={nome}
                  error={Errornome}
                  onChange={(e) => {
                    const { value } = e.target;
                    setNome(value);
                    // verificacao de nome
                  }}
                />
                <Input
                  className="login_field__input"
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
                    // verificacao de email
                  }}
                />
                <Input
                  className="login_field__input"
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
                    // verificacao de senha
                  }}
                />
                <Input
                  className="login_field__input"
                  title="Confirmar senha"
                  id="confPassw"
                  name="confPassw"
                  type="password"
                  icon={<FaLock />}
                  value={confirmacao_senha}
                  error={Errorconfirmacao_senha}
                  onChange={(e) => {
                    const { value } = e.target;
                    setConfirmacao_senha(value);
                    // verificacao de confirmacao de senha
                  }}
                />

                <Button className="login_field__button btn" type="submit">
                  Criar
                </Button>
                <Button
                  className="login_field__button voltar"
                  icon={<FaArrowLeft size={15} />}
                >
                  <Link to="entrar/">Voltar</Link>
                </Button>
              </form>
            </div>
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
