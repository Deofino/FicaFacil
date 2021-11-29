import React, { useCallback } from "react";
import axios from "axios";
import Smiley from "../../../../img/project/smiley.svg";
import song from "../../../../audio/fim_simulado.mp3";
import { Button } from "../../Form";
import { FaArrowRight, FaHistory } from "react-icons/fa";
import { parseJwt } from "../../Header/NavBarUser";
import { useSimulado } from "../../Context/SImuladoContext";
import { ToastError } from "../../Alert/Toast";

export default function Resultados(props) {
  const { quantidade, comeco, fim /* reqQuestao */ } = props;
  let { acertos, erros, questoesSimulado, set } = useSimulado();
  const [Sair, setSair] = React.useState(false);
  // console.log(props);
  const [Refazer, setRefazer] = React.useState(false);
  document.querySelector("audio").play();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const inserir = useCallback(() => {
    let user = 0;
    if (localStorage.getItem("user")) {
      let data = parseJwt(localStorage.getItem("user"));
      user =
        data.idCliente !== undefined
          ? data.idCliente
          : data.id !== undefined
          ? data.id
          : 0;
    }
    if (user !== 0) {
      // console.log(user);
      return axios
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
        .then((val) => val.data);
    }
  });

  React.useEffect(() => {
    return () => {
      setSair(true);
    };
  }, []);
  if (Refazer) {
    console.log(props.reqQuestao);
    let user = parseJwt(localStorage.getItem("user"));
    if (user.id !== undefined) {
      inserir().finally(() => {
          
      });
    }
  }
  if (Sair) {
    inserir().then((val) => console.log(val));
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }

  return (
    <section className="c-results">
      <audio src={song} />
      <h2 className="c-results__headline">
        Parabéns, você realizou um Simulado de {quantidade} questões!
      </h2>
      <div className="c-results__headline__frame">
        <iframe
          className="c-results__headline__frame__conf"
          title="confete"
          src="https://embed.lottiefiles.com/animation/7893"
        ></iframe>
      </div>
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
            setSair(true);
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
