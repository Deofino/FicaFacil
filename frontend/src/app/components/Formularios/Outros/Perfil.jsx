import React from "react";
import Slider from "@material-ui/core/Slider";
import { Radio, Button, Input } from "../../Form";
import { RadioGroup } from "@material-ui/core";
import { FaPen } from "react-icons/fa";
import CustomAlertInput from "../../Alert/CustomAlertInput";
import axios from "axios";
import { parseJwt } from "../../Header/NavBarUser";
import {
  ToastError,
  ToastInformation,
  ToastSuccess,
  ToastWarning,
} from "../../Alert/Toast";
import { regexEmail } from "../Logins/FormularioLoginAdm";
const marks = [
  {
    value: 80,
    label: "P",
  },
  {
    value: 100,
    label: "M",
  },
  {
    value: 120,
    label: "G",
  },
];

const marksZoom = [
  {
    value: 80,
    label: "80%",
  },
  {
    value: 100,
    label: "100%",
  },
  {
    value: 120,
    label: "120%",
  },
];

export default function Perfil() {
  const [user, setUser] = React.useState([]);

  const [isDark, setDark] = React.useState(1);

  const [isFont, setFont] = React.useState(100);

  const [isZoom, setZoom] = React.useState(100);

  const html = document.querySelector("html");

  const [imagePreview, setImagePreview] = React.useState();

  const [alertNome, setAlertNome] = React.useState(true);
  const [alertEmail, setAlertEmail] = React.useState(true);
  const [alertSenha, setAlertSenha] = React.useState(true);
  const [alertNascimento, setAlertNascimento] = React.useState(true);

  const [idUser, setIdUser] = React.useState(0);

  const [nomeUser, setnomeUser] = React.useState("");
  const [emailUser, setemailUser] = React.useState("");
  const [nascUser, setnascUser] = React.useState("");
  const [senhaUser, setsenhaUser] = React.useState("");
  const [confirmSenhaUser, setconfirmSenhaUser] = React.useState("");
  const [senhaAntiga, setsenhaAntiga] = React.useState("");

  // const [aler, setDnone] = React.useState(true);
  function alterarBackdrop(value, setter) {
    setter(!value);
  }
  function alterarNome(ev) {
    ev.preventDefault();

    let { nome } = ev.target;

    if (nome.value.trim() !== null && nome.value.trim().length > 3) {
      let formData = new FormData(ev.target);

      axios
        .post(`${process.env.REACT_APP_API}/cliente/update/`, formData, {
          headers: {
            Authorization: `Bearer ${
              localStorage.getItem("auth") || localStorage.getItem("user")
            }`,
          },
        })
        .then((val) =>
          ToastSuccess({
            text: "Atualizado com sucesso, entre novamente no site para atualizar os dados!",
          })
        )
        .catch((err) => ToastError({ text: err }));
    } else {
      ToastWarning({ text: "Preencha o campo corretamente." });
    }
  }
  function alterarEmail(ev) {
    ev.preventDefault();

    let { email } = ev.target;
    if (
      email.value.trim() !== null &&
      email.value.trim().length > 5 &&
      regexEmail.test(email.value.trim())
    ) {
      let formData = new FormData(ev.target);

      axios
        .post(`${process.env.REACT_APP_API}/cliente/update/`, formData, {
          headers: {
            Authorization: `Bearer ${
              localStorage.getItem("auth") || localStorage.getItem("user")
            }`,
          },
        })
        .then((val) =>
          ToastSuccess({
            text: "Atualizado com sucesso, entre novamente no site para atualizar os dados!",
          })
        )
        .catch((err) => ToastError({ text: err }));
    } else {
      ToastWarning({ text: "Preencha o campo corretamente." });
    }
  }
  function alterarSenha(ev) {
    ev.preventDefault();

    let { old_senha, conf_senha, senha } = ev.target;
    if (
      old_senha.value.trim() !== null &&
      old_senha.value.trim().length >= 5 &&
      conf_senha.value.trim() !== null &&
      conf_senha.value.trim().length >= 5 &&
      senha.value.trim() !== null &&
      senha.value.trim().length >= 5
    ) {
      if (conf_senha.value.trim() === senha.value.trim()) {
        let formData = new FormData(ev.target);

        axios
          .post(`${process.env.REACT_APP_API}/cliente/update/`, formData, {
            headers: {
              Authorization: `Bearer ${
                localStorage.getItem("auth") || localStorage.getItem("user")
              }`,
            },
          })
          .then((val) => {
            console.log(val);
            ToastSuccess({
              text: "Atualizado com sucesso, entre novamente no site para atualizar os dados!",
            });
          })
          .catch((err) => ToastError({ text: err }));
      } else {
        ToastWarning({ text: "Confirmação de senha incorreta." });
      }
    } else {
      ToastWarning({ text: "Preencha o campo corretamente." });
    }
  }
  function alterarNasc(ev) {
    ev.preventDefault();

    let { datanasc } = ev.target;

    let date = new Date(datanasc.value);
    if (
      datanasc.value !== null &&
      datanasc.value.length > 3 &&
      date < new Date()
    ) {
      let formData = new FormData(ev.target);

      axios
        .post(`${process.env.REACT_APP_API}/cliente/update/`, formData, {
          headers: {
            Authorization: `Bearer ${
              localStorage.getItem("auth") || localStorage.getItem("user")
            }`,
          },
        })
        .then((val) =>
          ToastSuccess({
            text: "Atualizado com sucesso, entre novamente no site para atualizar os dados!",
          })
        )
        .catch((err) => ToastError({ text: err }));
    } else {
      ToastWarning({ text: "Preencha o campo corretamente." });
    }
  }

  React.useEffect(() => {
    let userjwt = localStorage.getItem("user");
    let fonte = +localStorage.getItem("fonte") || 100;
    let zoom = +localStorage.getItem("zoom") || 100;
    let storage = localStorage.getItem("dark") || 1;
    setUser(parseJwt(userjwt));
    setDark(storage === "true" ? 2 : 1);
    setFont(fonte);
    setZoom(zoom);
    userjwt = parseJwt(userjwt);
    userjwt.foto !== "" && setImagePreview(userjwt.foto);
    userjwt.nome !== "" && setnomeUser(userjwt.nome);
    userjwt.email !== "" && setemailUser(userjwt.email);
    userjwt.nascimento !== "" && setnascUser(userjwt.nascimento);
    userjwt.id !== "" && setIdUser(userjwt.id);
  }, []);

  React.useEffect(() => {
    html.classList.remove("dark");
    if (+isDark === 1) {
      html.classList.remove("dark");
      localStorage.setItem("dark", "false");
    }
    if (+isDark === 2) {
      html.classList.add("dark");
      localStorage.setItem("dark", "true");
    }
  }, [isDark, html]);

  React.useEffect(() => {
    html.classList.remove("small");
    html.classList.remove("medium");
    html.classList.remove("large");
    if (isFont === 80) {
      html.classList.add("small");
    }
    if (isFont === 100) {
      html.classList.add("medium");
    }
    if (isFont === 120) {
      html.classList.add("large");
    }
    localStorage.setItem("fonte", isFont);
  }, [isFont, html]);

  React.useEffect(() => {
    html.classList.remove("zoom-large");
    html.classList.remove("zoom-medium");
    html.classList.remove("zoom-small");
    if (isZoom === 80) {
      html.classList.add("zoom-small");
    }
    if (isZoom === 100) {
      html.classList.add("zoom-medium");
    }
    if (isZoom === 120) {
      html.classList.add("zoom-large");
    }
    localStorage.setItem("zoom", isZoom);
  }, [isZoom, html]);

  if (user === undefined) return <h1>Carregando...</h1>;
  else
    return (
      <section className="l-perfil">
        <div className="capa"></div>
        <div className="infos">
          <div className="infos__foto">
            <form id="formImage" method="POST">
              <input
                name="id"
                type="text"
                className="d-none"
                defaultValue={idUser || user.id}
              />
              <input
                type="file"
                id="imageID"
                accept="image/*"
                name="imagem"
                onChange={(e) => {
                  let preview = URL.createObjectURL(e.target.files[0]);
                  setImagePreview(preview);

                  let formData = new FormData(
                    document.querySelector("#formImage")
                  );
                  axios
                    .post(
                      `${process.env.REACT_APP_API}/cliente/update/`,
                      formData,
                      {
                        headers: {
                          Authorization: `Bearer ${
                            localStorage.getItem("auth") ||
                            localStorage.getItem("user")
                          }`,
                        },
                      }
                    )
                    .then((val) =>
                      ToastSuccess({
                        text: "Atualizado com sucesso, entre novamente no site para atualizar os dados!",
                      })
                    )
                    .catch((err) => ToastError({ text: err }));

                  ToastInformation({
                    text: "Entre e saia da sua conta para atualizar a foto de perfil!",
                  });
                }}
                className="d-none"
              />
              <label htmlFor="imageID">
                {imagePreview !== undefined ? (
                  <img src={imagePreview} alt="Imagem de perfil" />
                ) : (
                  <FaPen />
                )}
              </label>
            </form>
          </div>
          <div className="infos__texto">
            <div className="infos__texto__nome">
              <p className="txtNome">{nomeUser || "NOME"}</p>
            </div>
            <div className="infos__texto__aluno">
              {/* <p className="txtAluno">Aluno desde 11/11/2021</p> */}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card__body">
            <div className="meusDados">
              <p>Meus Dados</p>
            </div>

            <div className="dados">
              <div className="nomeUsuario">
                <p className="fixo">Nome de Usuário</p>
                <p className="var">
                  {nomeUser || ""} #{idUser || user.id}
                </p>
              </div>
              <Button
                className="pequeno"
                onClick={() => alterarBackdrop(alertNome, setAlertNome)}
              >
                alterar
              </Button>
              <CustomAlertInput
                dnone={alertNome}
                close={() => setAlertNome(true)}
              >
                <form action="" onSubmit={(e) => alterarNome(e)}>
                  <input
                    name="id"
                    type="text"
                    className="d-none"
                    defaultValue={idUser || user.id}
                  />
                  <Input
                    title={"Nome"}
                    id={"nome"}
                    name={"nome"}
                    value={nomeUser || ""}
                    type={"text"}
                    onChange={(e) => {
                      setnomeUser(e.target.value);
                    }}
                    inputMode="text"
                  />
                  <Button type="submit" className="mt">
                    Atualizar Nome
                  </Button>
                </form>
              </CustomAlertInput>
            </div>

            <div className="dados">
              <div className="emailUsuario">
                <p className="fixo">Email</p>
                <p className="var">{user.email}</p>
              </div>
              <Button
                className="pequeno"
                onClick={() => alterarBackdrop(alertEmail, setAlertEmail)}
              >
                alterar
              </Button>
              <CustomAlertInput
                dnone={alertEmail}
                close={() => {
                  setAlertEmail(true);
                }}
              >
                <form action="" onSubmit={(e) => alterarEmail(e)}>
                  <input
                    name="id"
                    type="text"
                    className="d-none"
                    defaultValue={idUser || user.id}
                  />
                  <Input
                    title={"E-mail"}
                    id={"email"}
                    name={"email"}
                    value={emailUser || ""}
                    type={"email"}
                    onChange={(e) => {
                      setemailUser(e.target.value);
                    }}
                    inputMode="email"
                  />
                  <Button type="submit" className="mt">
                    Atualizar E-mail
                  </Button>
                </form>
              </CustomAlertInput>
            </div>

            <div className="dados">
              <div className="dataNascUsuario">
                <p className="fixo">Data de Nascimento</p>
                <p className="var">
                  {nascUser.replaceAll("-", "/") ||
                  user.nascimento !== undefined
                    ? user.nascimento.replaceAll("-", "/")
                    : "0000/00/00"}
                </p>
              </div>
              <Button
                className="pequeno"
                onClick={() =>
                  alterarBackdrop(alertNascimento, setAlertNascimento)
                }
              >
                alterar
              </Button>
              <CustomAlertInput
                dnone={alertNascimento}
                close={() => {
                  setAlertNascimento(true);
                }}
              >
                <form action="" onSubmit={(e) => alterarNasc(e)}>
                  <input
                    name="id"
                    type="text"
                    className="d-none"
                    defaultValue={idUser || user.id}
                  />
                  <Input
                    // title={"Nascimento"}
                    id={"datanasc"}
                    value={nascUser || ""}
                    name={"datanasc"}
                    type={"date"}
                    onChange={(e) => {
                      setnascUser(e.target.value);
                    }}
                    inputMode="date"
                  />
                  <Button type="submit" className="mt">
                    Atualizar Data nasc.
                  </Button>
                </form>
              </CustomAlertInput>
            </div>

            <div className="dados">
              <div className="dataNascUsuario">
                <p className="fixo">Senha da Conta</p>
                <p className="var">Altere sua senha</p>
              </div>
              <Button
                className="pequeno"
                onClick={() => alterarBackdrop(alertSenha, setAlertSenha)}
              >
                alterar
              </Button>
              <CustomAlertInput
                dnone={alertSenha}
                close={() => {
                  setAlertSenha(true);
                }}
              >
                <form action="" onSubmit={(e) => alterarSenha(e)}>
                  <input
                    name="id"
                    type="text"
                    className="d-none"
                    defaultValue={idUser || user.id}
                  />
                  <Input
                    title={"Senha antiga"}
                    id={"old_senha"}
                    name={"old_senha"}
                    type={"password"}
                    value={senhaAntiga || ""}
                    onChange={(e) => {
                      setsenhaAntiga(e.target.value);
                    }}
                    inputMode="password"
                  />
                  <Input
                    title={"Senha"}
                    id={"senha"}
                    className="mt"
                    name={"senha"}
                    type={"password"}
                    value={senhaUser || ""}
                    onChange={(e) => {
                      setsenhaUser(e.target.value);
                    }}
                    inputMode="password"
                  />
                  <Input
                    title={"Confirmar"}
                    id={"conf_senha"}
                    className="mt"
                    value={confirmSenhaUser || ""}
                    name={"conf_senha"}
                    type={"password"}
                    onChange={(e) => {
                      setconfirmSenhaUser(e.target.value);
                    }}
                    inputMode="password"
                  />
                  <Button type="submit" className="mt">
                    Atualizar Senha
                  </Button>
                </form>
              </CustomAlertInput>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card__body">
            <div className="meusDados">
              <p>Aparência</p>
            </div>
            <p className="itensAparencia">Tema</p>
            <div className="aparencia">
              <RadioGroup
                className="radioGrupo"
                defaultValue={isDark}
                onChange={(e) => {
                  setDark(+e.target.value);
                }}
              >
                <Radio value={1} className="aparencia__radio" label="Claro" />
                <Radio value={2} className="aparencia__radio" label="Escuro" />
              </RadioGroup>
            </div>
            <br />
            <p className="itensAparencia">Visual</p>
            <br></br>
            <p className="fonte">Escala de fonte</p>
            <div>
              <Slider
                onChange={(val, number) => {
                  if (number === 80) {
                    setFont(80);
                  } else if (number === 100) {
                    setFont(100);
                  } else {
                    setFont(120);
                  }
                  ToastError({ text: number });
                }}
                step={20}
                min={80}
                max={120}
                marks={marks}
                defaultValue={isFont}
                color="primary"
              />
              <br></br>
              <br></br>
              <p className="fonte">Zoom</p>
              <Slider
                onChange={(val, number) => {
                  if (number === 80) {
                    setZoom(80);
                  } else if (number === 100) {
                    setZoom(100);
                  } else {
                    setZoom(120);
                  }
                  ToastError({ text: number });
                }}
                step={20}
                min={80}
                max={120}
                defaultValue={isZoom}
                marks={marksZoom}
                color="primary"
              />
            </div>
          </div>
        </div>
      </section>
    );
}
