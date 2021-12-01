import React from "react";
import Slider from "@material-ui/core/Slider";
import { Radio, Button, Input } from "../../Form";
import { RadioGroup } from "@material-ui/core";
import { FaPen } from "react-icons/fa";
import CustomAlertInput from "../../Alert/CustomAlertInput";
import axios from "axios";
import { parseJwt } from "../../Header/NavBarUser";
import { ToastInformation } from "../../Alert/Toast";
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
  // const [aler, setDnone] = React.useState(true);
  function alterarBackdrop(value, setter) {
    setter(!value);
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
    parseJwt(userjwt).foto !== "" && setImagePreview(parseJwt(userjwt).foto);
  }, []);

  React.useEffect(() => {
    if (isDark === 1) {
      html.classList.remove("dark");
      localStorage.setItem("dark", "false");
    }
    if (isDark === 2) {
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
      <div>
        <div className="capa"></div>
        <div className="infos">
          <div className="infos__foto">
            <form id="formImage" method="POST">
              <input
                name="id"
                type="text"
                className="d-none"
                defaultValue={user.id}
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
                    .then((val) => console.log(val.data))
                    .catch((err) => console.log(err));

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
              <p className="txtNome">Paulo</p>
            </div>
            <div className="infos__texto__aluno">
              <p className="txtAluno">Aluno desde 11/11/2021</p>
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
                <p className="var">Paulo Moreira #2323</p>
              </div>
              <Button
                className="pequeno"
                onClick={() => alterarBackdrop(alertNome, setAlertNome)}
              >
                alterar
              </Button>
              <CustomAlertInput
                dnone={alertNome}
                close={() => setAlertNome(false)}
              >
                <form action="">
                  <Input
                    title={"Nome"}
                    id={"nome"}
                    label="foasae"
                    className=""
                    name={"nome"}
                    type={"text"}
                    onChange={(e) => {}}
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
                <p className="var">nagatogts@hotmail.com</p>
              </div>
              <Button
                className="pequeno"
                onClick={() => alterarBackdrop(alertEmail, setAlertEmail)}
              >
                alterar
              </Button>
              <CustomAlertInput dnone={alertEmail}>
                <form action="">
                  <Input
                    title={"E-mail"}
                    id={"email"}
                    label="foasae"
                    className=""
                    name={"email"}
                    type={"email"}
                    onChange={(e) => {}}
                    inputMode="text"
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
                <p className="var">08/01/2004</p>
              </div>
              <Button
                className="pequeno"
                onClick={() =>
                  alterarBackdrop(alertNascimento, setAlertNascimento)
                }
              >
                alterar
              </Button>
              <CustomAlertInput dnone={alertNascimento}>
                <form action="">
                  <Input
                    title={"Nascimento"}
                    id={"datanasc"}
                    label="foasae"
                    className=""
                    name={"datanasc"}
                    type={"datanasc"}
                    onChange={(e) => {}}
                    inputMode="text"
                  />
                  <Button type="submit" className="pequeno">
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
              <CustomAlertInput dnone={alertSenha}>
                <form action="">
                  <Input
                    title={"Senha"}
                    id={"senha"}
                    label="foasae"
                    className=""
                    name={"Senha"}
                    type={"senha"}
                    onChange={(e) => {}}
                    inputMode="text"
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
                value={isDark}
                onChange={() => {
                  setDark(isDark === 1 ? 2 : 1);
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
                  console.log(number);
                }}
                step={20}
                min={80}
                max={120}
                marks={marks}
                value={isFont}
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
                  console.log(number);
                }}
                step={20}
                min={80}
                max={120}
                value={isZoom}
                marks={marksZoom}
                color="primary"
              />
            </div>
          </div>
        </div>
      </div>
    );
}
