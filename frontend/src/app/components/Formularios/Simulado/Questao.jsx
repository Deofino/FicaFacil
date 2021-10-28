import React, { useState } from "react";
import songAcerto from "../../../../audio/certo.mp3";
import songErro from "../../../../audio/errada.mp3";
// import axios from "axios";
import { useSimulado } from "../../Context/SImuladoContext";
import { Button, Radio, RadioGroup } from "../../Form";
// import { ToastError } from "../../Alert/Toast";
import { MdContentCut, MdBugReport } from "react-icons/md";
import { IconButton, Tooltip } from "@material-ui/core";
import { ToastInformation } from "../../Alert/Toast";
const lorem =
  " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci repellat cumque debitis officia? Repellendus laborum totam rerum molestiae numquam incidunt, ipsam et, deleniti fugit pariatur maiores quaerat ipsa. Fuga, earum?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse amet, consequatur unde quis optio iure ipsa quas totam reiciendis modi voluptatibus ducimus eius possimus necessitatibus hic blanditiis recusandae deleniti excepturi.";
var regexURL = /(http|Https|Http|Https|blob:http|blob:https):\/\/?/;

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
    erros,
    acertos,
    setTerminado,
    setQuestoesSimulado,
    questoesSimulado,
  } = useSimulado();

  const [Selected, setSelected] = useState(-1);
  const [isAcertou, setAcertou] = useState("");
  const questao = props.questao || [];
  // console.log(questao);
  const Respostas = props.respostas || [];
  let CertaResposta = 0;
  let universidade = "";
  let materia = "";
  let assunto = "";
  let dificuldade = "";
  let imagens = [];
  if (reqQuestao !== [] && questao !== []) {
    dificuldade = reqQuestao.dificuldade.find(
      (el) => el.idDificuldade === questao.idDificuldade
    ).idDificuldade;
    universidade = reqQuestao.universidade.find(
      (el) => el.idUniversidade === questao.idUniversidade
    ).nomeUniversidade;
    assunto = reqQuestao.assuntoMateria.assuntoMateria.find(
      (el) => el.idAssuntoMateria === questao.idAssuntoMateria
    );
    materia = reqQuestao.assuntoMateria.materia.materia.find(
      (el) => el.idMateria === assunto.idMateria
    ).nomeMateria;
    imagens = JSON.parse(questao.imagensQuestao);
  }

  if (Respostas !== []) {
    CertaResposta = +Respostas.find((el) => +el.certaResposta === 1).idResposta;
  }

  return (
    <div
      page={props.questaoAtual}
      className={"c-questao " + props.index + " " + isAcertou}
      style={{ display: questaoAtual === props.index ? "block" : "none" }}
    >
      <audio src={songAcerto} id="song1" />
      <audio src={songErro} id="song2" />
      <span className="c-questao__number">Questão nº {questaoAtual + 1}</span>
      <span className="c-questao__number c-questao__number--right">
        {universidade} - {materia} - {assunto.nomeAssuntoMateria}
      </span>
      <div id="dificuldade" className={`nivel${dificuldade}`}>
        <span>Dificuldade:</span>
        <div></div>
      </div>
      <h2 className="c-questao__titulo">
        {(questao !== undefined && questao.tituloQuestao) || "Titulofoda"}
      </h2>
      <article>
        <span className="c-questao__texto">
          {(questao !== undefined && questao.textoQuestao) || lorem}
        </span>
      </article>
      {imagens.length > 0 && (
        <React.Fragment>
          <span>Imagens de apoio:</span>
          <div className="c-questao__imagens">
            {imagens.map((el, i) => (
              <img src={el} alt={`Imagem ${i}`} key={i} />
            ))}
          </div>
        </React.Fragment>
      )}
      <div className="c-questao__respostas">
        <RadioGroup
          onChange={(e) => {
            if (isAcertou === "") setSelected(e.target.value);
          }}
          value={Selected}
        >
          {Respostas.map((res, index) => {
            let add = "";
            if (isAcertou !== "") {
              if (isAcertou === "correct") {
                if (res.certaResposta === "0") {
                  add = "errada";
                } else {
                  add = "correta";
                }
              } else {
                let alternativa = document.querySelector(
                  `#alternativa${Selected}`
                );
                if (alternativa !== null)
                  alternativa.classList.toggle("errada");
              }
            }
            return (
              <label
                className={"c-questao__alternativa " + add}
                key={index}
                htmlFor={`radio${index}`}
                id={"alternativa" + res.idResposta}
              >
                <Tooltip title="Cortar questao" placement="left">
                  <IconButton
                    className="cut"
                    onClick={(e) => {
                      let questao = document.querySelector(
                        `#alternativa${res.idResposta}`
                      );
                      questao.classList.toggle("cortada");
                    }}
                  >
                    <MdContentCut />
                  </IconButton>
                </Tooltip>
                {regexURL.test(res.textoResposta) ? (
                  <div className="image">
                    <Radio
                      label={alfabeto[index]}
                      id={`radio${index}`}
                      value={res.idResposta}
                    />
                    <img
                      src={res.textoResposta}
                      alt={`Alternativa ${res.idResposta}`}
                    />
                  </div>
                ) : (
                  <Radio
                    label={alfabeto[index] + " " + res.textoResposta}
                    value={res.idResposta}
                    id={`radio${index}`}
                  />
                )}
              </label>
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
            if (isAcertou === "" && +Selected !== -1) {
              if (+Selected === CertaResposta) {
                AcertarQuestao();
                setAcertou("correct");
                questoesSimulado.push({ id: +questao.idQuestao, acertou: 1 });
                document.querySelector("#song1").play();
              } else {
                ErrarQuestao();
                setAcertou("errou");
                questoesSimulado.push({ id: +questao.idQuestao, acertou: 0 });
                document.querySelector("#song2").play();
              }
              setQuestoesSimulado(questoesSimulado);
              // setSelected(-1);
            } else {
              if (erros + acertos === props.quantidade) {
                setTerminado(true);
              } else {
                if (props.index + 1 < props.quantidade) {
                  setQuestaoAtual(questaoAtual + 1);
                } else {
                  ToastInformation({
                    text: "Ainda falta responder algumas questões",
                  });
                }
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
