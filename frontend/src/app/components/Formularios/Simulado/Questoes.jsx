import React, { Fragment } from "react";
import { Questao } from "./Questao";
import { useSimulado } from "../../Context/SImuladoContext";
import { Button } from "../../Form";
import { FaArrowRight, FaHistory } from "react-icons/fa";
import Smiley from "../../../../img/project/smiley.svg";
import {Link} from "react-router-dom";

export const Questoes = (props) => {
  let { acertos, isTerminado, erros, quantidade } = useSimulado();

  let reqQuestao = props.questoes;

  if (isTerminado) {
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
                  Acertos:  {acertos} / {quantidade}{" "} 
              </span>
              <span className="c-results__dados erro">
                  Erros:  {erros} / {quantidade}{" "} 
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
                  Refazer  <FaHistory />{" "}
              </Button>
              </div>
          </div>
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
