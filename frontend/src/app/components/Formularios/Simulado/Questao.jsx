import React, { useState } from "react";
// import axios from "axios";
import { useSimulado } from "../../Context/SImuladoContext";
import { Button, Radio, RadioGroup } from "../../Form";
// import { ToastError } from "../../Alert/Toast";
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
  let {
    questaoAtual,
    setQuestaoAtual,
    reqQuestao,
    AcertarQuestao,
    ErrarQuestao,
    // acertos,
    // erros,
    // terminado,
  } = useSimulado();
  const [Selected, setSelected] = useState(-1);
  const [isAcertou, setAcertou] = useState("");
  const questao = props.questao || [];
  const Respostas = props.respostas || [];
  let CertaResposta = 0;
  let universidade = "";
  let materia = "";
  let assunto = "";
  let dificuldade = "";
  if (reqQuestao !== [] && questao !== []) {
    dificuldade = reqQuestao.dificuldade.find(
      (el) => el.idDificuldade === questao.idDificuldade
    ).nivelDificuldade;
    universidade = reqQuestao.universidade.find(
      (el) => el.idUniversidade === questao.idUniversidade
    ).nomeUniversidade;
    assunto = reqQuestao.assuntoMateria.assuntoMateria.find(
      (el) => el.idAssuntoMateria === questao.idAssuntoMateria
    );
    materia = reqQuestao.assuntoMateria.materia.materia.find(
      (el) => el.idMateria === assunto.idMateria
    ).nomeMateria;
  }

  // console.log(reqQuestao);

  if (Respostas !== []) {
    CertaResposta = +Respostas.find((el) => +el.certaResposta === 1).idResposta;
  }

  return (
    <div
      page={props.questaoAtual}
      className={"c-questao " + props.index + " " + isAcertou}
      style={{ display: questaoAtual === props.index ? "block" : "none" }}
    >
      <span className="c-questao__number">Questão nº {questaoAtual + 1}</span>
      <span className="c-questao__number c-questao__number--right">
        {universidade} - {materia} - {assunto.nomeAssuntoMateria} -{" "}
        {dificuldade}
      </span>
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
            if (isAcertou === "") setSelected(e.target.value);
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
            if (Selected !== -1) {
              if (+Selected === CertaResposta) {
                AcertarQuestao();
                setAcertou("correct");
                alert("acertou");
              } else {
                ErrarQuestao();
                setAcertou("errou");
                alert("errou");
              }
              setSelected(-1);
            } else {
              if (questaoAtual < reqQuestao.questao.length - 1) {
                setQuestaoAtual(questaoAtual + 1);
              } else {
                alert("Voce ainda tem questoes ha responder");
              }
            }
          }}
        >
          Proximo
        </Button>
      </div>
    </div>
  );
};
