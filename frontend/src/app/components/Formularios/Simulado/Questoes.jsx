import React, { Fragment } from "react";
import { Questao } from "./Questao";
import { useSimulado } from "../../Context/SImuladoContext";
export const Questoes = (props) => {
  const simulado = useSimulado();
  const ReqQuestao = simulado.reqQuestao || [];

  return (
    <section className="l-questoes">
      {ReqQuestao.questao !== undefined ? (
        ReqQuestao.questao.map &&
        ReqQuestao.questao.map((el, index) => {
          let respostas = ReqQuestao.respostas.resposta.filter(
            (val) => val.idQuestao === el.idQuestao
          );
          return (
            <Questao
              key={index}
              index={index}
              questao={el}
              id={el.idQuestao}
              respostas={respostas}
            />
          );
        })
      ) : (
        <Fragment>
          <h1 className="l-questoes__headline">Nenhuma Questao encontrada</h1>
        </Fragment>
      )}
    </section>
  );
};
