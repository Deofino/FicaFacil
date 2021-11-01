import React, { useEffect } from "react";
import axios from "axios";
import Smiley from "../../../../img/project/smiley.svg";
import song from "../../../../audio/fim_simulado.mp3";
import { Button } from "../../Form";
import { FaArrowRight, FaHistory } from "react-icons/fa";
import { parseJwt } from "../../Header/NavBarUser";
import { useSimulado } from "../../Context/SImuladoContext";

export default function Resultados(props) {
  const { quantidade, comeco, fim, reqQuestao } = props;
  let { acertos, erros, questoesSimulado } = useSimulado();
  const [Sair, setSair] = React.useState(false);
  const [Refazer, setRefazer] = React.useState(false);
  document.querySelector("audio").play();

  const inserir = () => {
    let user = 0;
    if (localStorage.getItem("user")) {
      let data = parseJwt(localStorage.getItem("user"));
      user = data.idCliente || 0;
    }

    if (user > 0) {
      axios
        .post(
          process.env.REACT_APP_API + `/simulado/create/`,
          JSON.stringify({
            comeco: comeco,
            fim: fim,
            user: +user,
            questoes: questoesSimulado,
          }),
          {
            headers: {
              Authorization: `Bearer ${
                localStorage.getItem("auth") || localStorage.getItem("user")
              }`,
            },
          }
        )
        .then((val) => console.log(val.data))
        .finally(() => {
          setSair(true);
        });
    }
  };
  if (Refazer) {
    // refazer as questoes
  }
  if (Sair) {
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  return (
    <section className="c-results">
      <audio src={song} />
      <h2 className="c-results__headline">
        Parabéns, você realizou um Simulado de {quantidade} questões!
      </h2>
      <div className="c-results__headline__img">
        <img src={Smiley} alt="Imagem Sorrindo" />
      </div>
      <br />
      <div className="c-results__dados">
        <h2 className="c-results__dados__title"> ~ Dados ~ </h2>
        <span className="c-results__dados acerto">
          Acertos: {acertos} / {quantidade}{" "}
        </span>
        <span className="c-results__dados erro">
          Erros: {erros} / {quantidade}{" "}
        </span>
      </div>
      <div className="c-results__dados__btns">
        <Button
          className="c-results__dados__btns__s__b"
          onClick={() => {
            inserir();
          }}
        >
          Sair <FaArrowRight style={{ marginLeft: 10 }} />
        </Button>
        <Button
          className="c-results__dados__btns__r__b"
          onClick={() => {
            setRefazer(true);
          }}
        >
          Refazer <FaHistory style={{ marginLeft: 10 }} />
        </Button>
      </div>
    </section>
  );
}
