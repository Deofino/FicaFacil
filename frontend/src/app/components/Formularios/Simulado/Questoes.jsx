import React, { Fragment } from "react";
import { Questao } from "./Questao";
import song from "../../../../audio/fim_simulado.mp3";
import { useSimulado } from "../../Context/SImuladoContext";
import { Backdrop } from "@material-ui/core";
import { ToastInformation } from "../../Alert/Toast";
export const Questoes = (props) => {
  let { acertos, isTerminado, erros, setTerminado } = useSimulado();
  let quantidade = props.quantidade;
  let reqQuestao = props.questoes;
  const [tempo, setTempo] = React.useState(quantidade * 10);
  const [segundos, setsSegundos] = React.useState("00");
  const [minutos, setMinuto] = React.useState("00");
  React.useEffect(() => {
    let interval = setTimeout(() => {
      setMinuto(Math.floor(tempo / 60));
      setsSegundos(tempo % 60);
      setTempo(tempo - 1);
      console.log(tempo);
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
        <audio src={song} />
        <h2 className="c-results__headline">Parabens, voce realizou o</h2>
        <br />
        <h3 className="c-results__dados">Dados:</h3>
        <span className="c-results__dado acerto">
          Acertos: {acertos} / {quantidade}{" "}
        </span>
        <span className="c-results__dado erro">
          Erros: {erros} / {quantidade}{" "}
        </span>
        <br />
        <button className="c-results__sair">Sair</button>
        <button className="c-results__refazer">Refazer</button>
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
        <span>
          Tempo restante: {minutos}:{segundos}
        </span>
      </div>
    </section>
  );
};
