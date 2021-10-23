import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { useSimulado } from "../../Context/SImuladoContext";
import { Button, Radio, RadioGroup } from "../../Form";
import { ToastError } from "../../Alert/Toast";
import { MdContentCut, MdBugReport } from "react-icons/md";
import { IconButton, Tooltip } from "@material-ui/core";
const lorem =
  " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci repellat cumque debitis officia? Repellendus laborum totam rerum molestiae numquam incidunt, ipsam et, deleniti fugit pariatur maiores quaerat ipsa. Fuga, earum?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse amet, consequatur unde quis optio iure ipsa quas totam reiciendis modi voluptatibus ducimus eius possimus necessitatibus hic blanditiis recusandae deleniti excepturi.";

const alfabeto = ["a)", "b)", "c)", "d)", "e)"];
// @ts-check
/**
 *
 * @param {import("react").Props} props
 */
export const Questao = (props) => {
  const { questaoAtual, setQuestaoAtual, reqQuestao } = useSimulado();
  const [Selected, setSelected] = useState(null);
  const questao = props.questao || [];
  const Respostas = props.respostas || [];
  let CertaResposta = 0;

  if (Respostas !== []) {
    CertaResposta = +Respostas.find((el) => +el.certaResposta === 1).idResposta;
  }

  return (
    <div
      page={props.questaoAtual}
      className="c-questao"
      style={{ display: questaoAtual === props.index ? "block" : "none" }}
    >
      <span className="c-questao__number">Questão nº {questaoAtual + 1}</span>
      <h2 className="c-questao__titulo">
        {(questao !== undefined && questao.tituloQuestao) || "Titulofoda"}
      </h2>
      <article>
        <span className="c-questao__texto">
          {(questao !== undefined && questao.textoQuestao) || lorem}
        </span>
      </article>
      <div className="c-questao__respostas">
        <RadioGroup
          onChange={(e) => {
            setSelected(e.target.value);
          }}
          value={Selected}
        >
          {Respostas.map((res, index) => {
            return (
              <div className="c-questao__alternativa" key={index}>
                <Tooltip title="Cortar questao" placement="left">
                  <IconButton
                    className="cut"
                    onClick={() => {
                      console.log("cut");
                    }}
                  >
                    <MdContentCut />
                  </IconButton>
                </Tooltip>
                <Radio
                  label={alfabeto[index] + " " + res.textoResposta}
                  value={res.idResposta}
                />
              </div>
            );
          })}
        </RadioGroup>
      </div>

      <div className="c-questao__actions">
        <a href="/" className="err">
          Reportar Erro <MdBugReport />
        </a>
        {questaoAtual !== 0 && (
          <Button
            className="prev"
            onClick={() => {
              setQuestaoAtual(questaoAtual - 1);
            }}
          >
            Voltar
          </Button>
        )}
        <Button
          className="prox"
          onClick={() => {
            if (Selected !== null) {
              if (+Selected === CertaResposta) {
                console.log("acertou");
              } else {
                console.log("errou");
              }
            }
            if (questaoAtual < reqQuestao.questao.length - 1) {
              setQuestaoAtual(questaoAtual + 1);
            } else {
              console.log("fim do simulado");
            }
          }}
        >
          Proximo
        </Button>
      </div>
    </div>
  );
};
