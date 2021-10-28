import React, { Fragment } from "react";
import { Questao } from "./Questao";
import { Resultados } from ".";
import { useSimulado } from "../../Context/SImuladoContext";
import { FaClock } from "react-icons/fa";
import { Backdrop } from "@material-ui/core";

export const Questoes = (props) => {
  let { isTerminado, setTerminado } = useSimulado();
  let quantidade = props.quantidade;
  let reqQuestao = props.questoes;

  const comeco = props.comeco || "";
  const [fim, setFim] = React.useState(new Date().getTime());

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
      setFim(
        new Date().toISOString().split("T")[0] +
          " " +
          new Date().toTimeString().split(" ")[0]
      );
    }
  }, [tempo, minutos, setTerminado, isTerminado]);

  if (isTerminado) {
    document.querySelector("audio").play();
    return <Resultados quantidade={quantidade} comeco={comeco} fim={fim} />;
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
