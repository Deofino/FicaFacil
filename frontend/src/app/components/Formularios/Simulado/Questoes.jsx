import React, { Fragment } from "react";
import { Questao } from "./Questao";
import { useSimulado } from "../../Context/SImuladoContext";
export const Questoes = (props) => {
  let { acertos, isTerminado, erros, quantidade } = useSimulado();

  let reqQuestao = props.questoes;

  if (isTerminado) {
    return (
      <section className="c-results">
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
