import React from "react";
import Box from "@material-ui/core/Box";
import Slider from "@material-ui/core/Slider";
import { Radio } from "../../Form";
import { RadioGroup } from "@material-ui/core";
import { FaPen } from "react-icons/fa";

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

function valuetext(value) {
  return `${value}%`;
}

export default function Perfil() {
  const storage = localStorage.getItem("dark"); 
  const [isDark, setDark] = React.useState(
    storage === "true" ? 2 : 1 || 1
  );

  const fonte = localStorage.getItem("fonte");
  const [isFont, setFont] = React.useState(
    fonte || 100
  );

  const zoom = localStorage.getItem("zoom");
  const [isZoom, setZoom] = React.useState(
    zoom || 100
  );

    React.useEffect(() => {
    isDark === 2
      ? document.querySelector("html").classList.add("dark")
      : document.querySelector("html").classList.remove("dark");
  }, [isDark]);

  
  React.useEffect(() => {
    isFont === 80
      ? document.querySelector("html").classList.add("small")
      : document.querySelector("html").classList.remove("small");
  }, [isFont]);

  React.useEffect(() => {
    isFont === 100
      ? document.querySelector("html").classList.add("medium")
      : document.querySelector("html").classList.remove("medium");
  }, [isFont]);

  React.useEffect(() => {
    isFont === 120
      ? document.querySelector("html").classList.add("large")
      : document.querySelector("html").classList.remove("large");
  }, [isFont]);

  React.useEffect(() => {
    isZoom === 80
      ? document.querySelector("html").classList.add("zoom-small")
      : document.querySelector("html").classList.remove("zoom-small");
  }, [isZoom]);

  React.useEffect(() => {
    isZoom === 100
      ? document.querySelector("html").classList.add("zoom-medium")
      : document.querySelector("html").classList.remove("zoom-medium");
  }, [isZoom]);

  React.useEffect(() => {
    isZoom === 120
      ? document.querySelector("html").classList.add("zoom-large")
      : document.querySelector("html").classList.remove("zoom-large");
  }, [isZoom]);

  return (
    <div>
      <div className="capa"></div>
      <div className="infos">
        <div className="infos__foto">
          <FaPen />
          {/* <img src="" alt="" /> */}
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
            <div className="btnEditar">
              <p>Alterar</p>
            </div>
          </div>

          <div className="dados">
            <div className="emailUsuario">
              <p className="fixo">Email</p>
              <p className="var">nagatogts@hotmail.com</p>
            </div>
            <div className="btnEditar">
              <p>Alterar</p>
            </div>
          </div>

          <div className="dados">
            <div className="dataNascUsuario">
              <p className="fixo">Data de Nascimento</p>
              <p className="var">08/01/2004</p>
            </div>
            <div className="btnEditar">
              <p>Alterar</p>
            </div>
          </div>

          <div className="dados">
            <div className="dataNascUsuario">
              <p className="fixo">Senha da Conta</p>
              <p className="var">Altere sua senha</p>
            </div>
            <div className="btnEditar">
              <p>Alterar</p>
            </div>
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
                localStorage.setItem("dark", isDark === 2 ? "true" : "false");
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
          <Box sx={{ width: "100%" }}>
            <Slider
              onChange={(val, number) => {
                if(number===80){
                  setFont(80);
                  localStorage.setItem('fonte', 80);
                }else if(number===100){
                  setFont(100);
                  localStorage.setItem('fonte', 100);
                }else {
                  setFont(120);
                  localStorage.setItem('fonte', 120);
                }
                console.log(number);
              }}
              aria-label="Custom marks"
              // defaultValue={localStorage.getItem('fonte') || 100}
              valueLabelDisplay="auto"
              step={20}
              min={80}
              max={120}
              marks={marks}
              color="primary"
            />
            <br></br>
            <br></br>
            <p className="fonte">Zoom</p>
            <Slider
              onChange={(val, number) => {
                if(number===80){
                  setZoom(80);
                  localStorage.setItem('zoom', 80);
                }else if(number===100){
                  setZoom(100);
                  localStorage.setItem('zoom', 100);
                }else {
                  setZoom(120);
                  localStorage.setItem('zoom', 120);
                }
                console.log(number);
              }}
              aria-label="Custom marks"
              // defaultValue={localStorage.getItem('fonte') || 100}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
              step={20}
              min={80}
              max={120}
              marks={marksZoom}
              color="primary"
            />
          </Box>
        </div>
      </div>
    </div>
  );
}
