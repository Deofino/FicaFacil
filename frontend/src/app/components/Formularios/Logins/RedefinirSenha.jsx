import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Main from "../../Main/Main";
import { Button, Input } from "../../Form";
import {
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaLockOpen,
} from "react-icons/fa";
import { regexEmail } from "./FormularioLoginAdm";
import axios from "axios";
import { ToastError } from "../../Alert/Toast";
import { AlertSuccess } from "../../Alert/Modal";
function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}
export default function ComponentRedefinirSenha() {
  const query = useQuery();
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [Erroremail, setErrorEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [olhoL, setOlhoL] = useState(false);
  const [Errorsenha, setErrorSenha] = useState(null);
  const [confsenha, setconfSenha] = useState("");
  const [olhoconf, setOlhoconf] = useState(false);
  const [Errorsenhaconf, setErrorSenhaconf] = useState(null);
  useEffect(() => {
    setAuth(query.get("auth"));
  }, [query]);

  /**
   * @description
   * @author Delfino
   * @date 18/11/2021
   * @param {Event} e
   */
  function submit(e) {
    e.preventDefault();
    if (email.trim() !== null && email.trim().length > 0) {
      setEmail("");
      setLoading(true);
      axios
        .post(
          `${process.env.REACT_APP_API}/cliente/resendPassword`,
          JSON.stringify({
            email: email.trim(),
          })
        )
        .then(({ data }) => {
          setLoading(false);
          console.log(data);
          if (data.status_code === 200) {
            AlertSuccess({
              title: "E-mail enviado!",
              text: "Nossa equipe enviou um e-mail para você! Siga os passos para alterar sua senha e volte aqui já já!",
            });
          } else {
            ToastError({ text: "E-mail informado nao existe." });
          }
        })
        .catch((err) => ToastError({ text: err }));
    }
  }
  /**
   * @description
   * @author Delfino
   * @date 18/11/2021
   * @param {Event} e
   */
  function update(e) {
    e.preventDefault();
    if (
      senha.trim() !== null &&
      senha.trim().length > 0 &&
      confsenha === senha
    ) {
      setSenha("");
      setconfSenha("");
      setLoading(true);
      axios
        .put(
          `${process.env.REACT_APP_API}/cliente/redefinir`,
          JSON.stringify({
            senha: senha.trim(),
            auth: query.get("auth"),
          })
        )
        .then(({ data }) => {
          setLoading(false);
          console.log(data);
          if (data.status_code === 200) {
            AlertSuccess({
              text: data.data + ". \nEssa tela ira fechar automaticamente....",
            }).then((val) => {
              window.close();
            });
            setTimeout(() => {
              window.close();
            }, 2000);
          } else {
            ToastError({ text: "E-mail informado nao existe." });
          }
        })
        .catch((err) => ToastError({ text: err }));
    }
  }
  return auth == null ? (
    <Main style={{ maxWidth: 690, paddingTop: 60, paddingBottom: 60 }}>
      <form onSubmit={(e) => submit(e)}>
        <h1 className="mb">
          Coloque seu email para te enviarmos o link para você poder redefinir
          sua senha.
        </h1>
        <Input
          title="E-mail"
          id="email"
          name="email"
          type="email"
          icon={<FaEnvelope />}
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
        />{" "}
        <Button className="mt" type="submit" isLoading={loading}>
          Enviar
        </Button>
      </form>
    </Main>
  ) : (
    <Main style={{ maxWidth: 690, paddingTop: 30, paddingBottom: 30 }}>
      <form onSubmit={(e) => update(e)}>
        <h1 className="mb">
          Digite uma nova senha segura
        </h1>
        <Input
          title="Nova senha"
          id="senha"
          name="senha"
          icon={<FaLock />}
          type={!olhoL ? "password" : "text"}
          iconEnd={
            olhoL ? (
              <FaEye onClick={() => setOlhoL(!olhoL)} />
            ) : (
              <FaEyeSlash onClick={() => setOlhoL(!olhoL)} />
            )
          }
          inputMode="password"
          value={senha}
          error={Errorsenha}
          onChange={(e) => {
            const { value } = e.target;
            setSenha(value);
            value.length <= 4
              ? setErrorSenha("Nova senha muito fraca.")
              : setErrorSenha(null);
            value.length === 0 && setErrorSenha(null);
          }}
        />
        <Input
          title="Confirmação de senha"
          id="conf-senha"
          name="conf-senha"
          className="mt"
          icon={<FaLockOpen />}
          type={!olhoconf ? "password" : "text"}
          iconEnd={
            olhoconf ? (
              <FaEye onClick={() => setOlhoconf(!olhoconf)} />
            ) : (
              <FaEyeSlash onClick={() => setOlhoconf(!olhoconf)} />
            )
          }
          inputMode="password"
          value={confsenha}
          error={Errorsenhaconf}
          onChange={(e) => {
            const { value } = e.target;
            setconfSenha(value);
            value.length <= 4
              ? setErrorSenhaconf("Nova senha muito fraca.")
              : setErrorSenhaconf(null);
            value.length === 0 && setErrorSenhaconf(null);
            value !== senha
              ? setErrorSenhaconf("As senhas nao correspondem")
              : setErrorSenhaconf(null);
          }}
        />{" "}
        <Button className="mt" type="submit" isLoading={loading}>
          Enviar
        </Button>
      </form>
    </Main>
  );
}
