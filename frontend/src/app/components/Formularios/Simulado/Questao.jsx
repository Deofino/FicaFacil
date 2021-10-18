import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { useSimulado } from "../../Context/SImuladoContext";
import { Button, Radio, RadioGroup } from "../../Form";
import { ToastError } from "../../Alert/Toast";
const lorem =
  " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci repellat cumque debitis officia? Repellendus laborum totam rerum molestiae numquam incidunt, ipsam et, deleniti fugit pariatur maiores quaerat ipsa. Fuga, earum?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse amet, consequatur unde quis optio iure ipsa quas totam reiciendis modi voluptatibus ducimus eius possimus necessitatibus hic blanditiis recusandae deleniti excepturi.";

const alfabeto = ["A", "B", "C", "D", "E"];
// @ts-check
/**
 *
 * @param {import("react").Props} props
 */
export const Questao = (props) => {
  const { questaoAtual, setQuestaoAtual } = useSimulado();
  const [Selected, setSelected] = useState(0);
  const [questao, setQuestao] = useState([]);
  const [Respostas, setRespostas] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/resposta/index/${props.id}/`)
      .then((value) => {
        if (value.data.status_code === 200) {
          setRespostas(value.data.data.resposta);
          setQuestao(value.data.data.questao);
          console.log(value.data.data.questao.questao.titu);
        }
      })
      .catch((err) => ToastError(err));
  }, [props.id]);

  return (
    <div
      page={props.questaoAtual}
      className="c-questao"
      style={{ display: questaoAtual === props.index ? "block" : "none" }}
    >
      <span className="c-questao__number">Questão nº {questaoAtual + 1}</span>
      <h2 className="c-questao__titulo">
        {(questao.questao !== undefined && questao.questao[0].tituloQuestao) ||
          "Titulofoda"}
      </h2>
      <article>
        <span className="c-questao__texto">
          {(questao.questao !== undefined && questao.questao[0].textoQuestao) ||
            lorem}
        </span>
      </article>
      <div className="c-questao__respostas">
        <RadioGroup>
          {Respostas.map((res, index) => {
            return (
              
              <div className="c-questao__alternativa" key={index}>
                <span>{alfabeto[index]}) -</span>
                <Radio label={res.textoResposta} value={res.idResposta} />
              </div>
            );
          })}
        </RadioGroup>
      </div>

      <div className="c-questao__actions">
        {questaoAtual !== 0 && (
          <Button
            onClick={() => {
              setQuestaoAtual(questaoAtual - 1);
            }}
          >
            Voltar
          </Button>
        )}
        <Button
          onClick={() => {
            setQuestaoAtual(questaoAtual + 1);
          }}
        >
          Proximo
        </Button>
      </div>
    </div>
  );
};
