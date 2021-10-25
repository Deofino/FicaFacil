import React, { Fragment } from "react";
import { Questao } from "./Questao";
import song from "../../../../audio/fim_simulado.mp3";
import { useSimulado } from "../../Context/SImuladoContext";
import { Button } from "../../Form";
import { FaArrowRight, FaHistory, FaClock } from "react-icons/fa";
import { Backdrop } from "@material-ui/core";
import Smiley from "../../../../img/project/smiley.svg";
import { Link } from "react-router-dom";

export const Questoes = (props) => {
  let { acertos, isTerminado, erros, setTerminado } = useSimulado();
  let quantidade = props.quantidade;
  let reqQuestao = props.questoes;
  const [tempo, setTempo] = React.useState(quantidade * 180);
  const [segundos, setsSegundos] = React.useState("00");
  const [minutos, setMinuto] = React.useState("00");
  React.useEffect(() => {
    let interval = setTimeout(() => {
      setMinuto(Math.floor(tempo / 60));
      setsSegundos(tempo % 60);
      setTempo(tempo - 1);
    }, 1000);
    if (tempo === 0 || isTerminado) {
      clearTimeout(interval);
      setTempo(0);
      setTerminado(true);
      setsSegundos("00");
      setMinuto("00");
    }
  }, [tempo, minutos, setTerminado, isTerminado]);
  if (isTerminado) {
    document.querySelector("audio").play();
    return (
      <section className="c-results">
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
          <div className="c-results__dados__btns__s">
            <Button className="c-results__dados__btns__s__b">
              Sair <FaArrowRight />
            </Button>
          </div>
          <div className="c-results__dados__btns__r">
            <Button className="c-results__dados__btns__r__b">
              Refazer <FaHistory />{" "}
            </Button>
          </div>
        </div>
      </section>
    );
  }
  if (reqQuestao.questao === undefined) {
    return <Backdrop />;
  }

  return (
    <section className="l-questoes">
      {reqQuestao.questao !== undefined ? (
        reqQuestao.questao.map &&
        reqQuestao.questao.map((el, index) => {
          let respostas = reqQuestao.respostas.resposta.filter(
            (val) => val.idQuestao === el.idQuestao
          );
          return (
            <Questao
              key={index}
              index={index}
              questao={el}
              id={el.idQuestao}
              respostas={respostas}
              quantidade={quantidade}
            />
          );
        })
      ) : (
        <Fragment>
          <h1 className="l-questoes__headline">Nenhuma Questao encontrada</h1>
        </Fragment>
      )}
      <div className="c-cronometro">
        <FaClock />
        <span>
          Tempo restante: {minutos}:{segundos}
        </span>
      </div>
    </section>
  );
};
