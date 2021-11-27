import React, { useState } from "react";
import { Button, Select, option } from "../../Form";
import { SimuladoProvider, useSimulado } from "../../Context/SImuladoContext";
import { Questoes } from "./Questoes";
import { Backdrop } from "@material-ui/core";
import { AlertWarning } from "../../Alert/Modal";
import { MdContentCut } from "react-icons/md";
import { FaCircle, FaDotCircle, FaArrowRight } from "react-icons/fa";

/**
 * @description
 * @author Delfino
 * @date 16/10/2021
 */
export function Simulado(props) {
  function RemoveParameterFromUrl(url, parameter) {
    return url
      .replace(new RegExp("[?&]" + parameter + "=[^&#]*(#.*)?$"), "$1")
      .replace(new RegExp("([&])" + parameter + "=[^&]*&"), "$1");
  }

  const [start, setStart] = useState(props.started || false);

  const { reqQuestao, setFilter, filter } = useSimulado();

  const [quantidade, setQuantidade] = useState(10);
  const [dificuldade, setDificuldade] = useState(null);
  const [universidade, setUniversidade] = useState(null);
  const [materia, setMateria] = useState(null);
  const [assunto, setAssunto] = useState(null);
  if (reqQuestao !== [] && reqQuestao !== undefined) {
    return (
      <SimuladoProvider>
        <section className="l-simulado">
          {!start ? (
            <article>
              <div className="l-simulado__instructions">
                <h1 className="l-simulado__instructions__title">
                  Instruções para o simulado
                </h1>
                <h2 className="l-simulado__instructions__sub">Simulado:</h2>
                <h3 className="l-simulado__instructions__txt">
                  No simulado é obrigatório você escolher a quantidade de
                  questões que deseja, dentre 5 opções:
                </h3>
                <div className="l-simulado__instructions__s">
                  <p className="l-simulado__instructions__s__q">
                    - 15 questões com 45min para a finalização
                  </p>
                  <p className="l-simulado__instructions__s__q">
                    - 30 questões com 1h 30min para a finalização
                  </p>
                  <p className="l-simulado__instructions__s__q">
                    - 45 questões com 2h 30min para a finalização
                  </p>
                  <p className="l-simulado__instructions__s__q">
                    - 60 questões com 3h para a finalização
                  </p>
                  <p className="l-simulado__instructions__s__q">
                    - 90 questões com 4h e 30min para a finalização
                  </p>
                </div>
                <h2 className="l-simulado__instructions__sub">Filtros:</h2>
                <h3 className="l-simulado__instructions__txt">
                  Existem filtros para que o seu simulado criado seja o mais
                  próximo da sua necessidade, sendo assim, poderá escolher as
                  questões de certas universidades (ex.FATEC),
                  dificuldades(ex.Fácil), matéria (ex.Matemática) e o assunto
                  matéria (ex.Fração).
                </h3>
                <h2 className="l-simulado__instructions__sub">Respostas:</h2>
                <h3 className="l-simulado__instructions__txt">
                  As respostas são objetivas. Existe apenas UMA resposta correta
                  por questão. Questões passadas e não respondidas impedirão
                  você de terminar o simulado, sendo assim, todas as questões
                  devem ser respondidas.
                </h3>
                <h2 className="l-simulado__instructions__sub">
                  Ações em Respostas:
                </h2>
                <h3 className="l-simulado__instructions__txt">
                  Poderá voltar para a questão anterior, mas NÃO poderá mudar de
                  alternativa, já que no momento que passar para a próxima
                  questão, já mostrará a resposta certa.
                </h3>
                <h2 className="l-simulado__instructions__sub">Gabarito:</h2>
                <h3 className="l-simulado__instructions__txt">
                  Se você completou todo o simulado, respondendo todas as
                  questões, depois que visualizou seus erros e o que errou,
                  aparecerá a sua pontuação (número de erros e de acertos).
                </h3>
                <h2 className="l-simulado__instructions__sub">
                  Funcionalidade dos ícones:
                </h2>
                <h3 className="l-simulado__instructions__txt">
                  Os botões listados aqui aparecerão durante o seu simulado,
                  saiba qual a funcionalidade de cada um deles:
                </h3>
                <div className="l-simulado__instructions__icons">
                  <p className="l-simulado__instructions__icons__txt">
                    <MdContentCut className="l-simulado__instructions__icons__txt__t" />
                    - Neste ícone que aparecerá a esquerda das alternativas,
                    terá uma opção de você riscar a alternativa em que tenha
                    certeza de que está errada (essa opção não é absoluta, pode
                    fazer quando e em quantas quiser).
                  </p>
                  {/*  <p className="l-simulado__instructions__icons__txt">
                    <MdBugReport className="l-simulado__instructions__icons__txt__e" />
                    - Caso encontre algum erro na questão ou no próprio sistema,
                    pode reportá-lo.
                  </p> */}
                  <p className="l-simulado__instructions__icons__txt">
                    <FaCircle className="l-simulado__instructions__icons__txt__g" />
                    <FaCircle className="l-simulado__instructions__icons__txt__o" />
                    <FaCircle className="l-simulado__instructions__icons__txt__r" />
                    - Aqui mostra a dificuldade de cada questão, caso não tenha
                    filtrado essa parte do simulado, aparecerá alternadas
                    dificuldades.
                  </p>
                  <p className="l-simulado__instructions__icons__txt">
                    <FaDotCircle className="l-simulado__instructions__icons__txt__c" />
                    - Nesta circunferência ficará marcado a alternativa em que
                    você escolheu, certifique-se de que em cada questão você
                    marque uma opção desse ícone.
                  </p>
                </div>
              </div>
              <br />
              <h2>Filtrar Simulado</h2>
              <div className="l-simulado__filtro">
                <Select
                  id="qtde"
                  label="Quantidade de Questões *"
                  className="l-simulado__select"
                  value={quantidade}
                  onChange={({ target }) => {
                    setQuantidade(target.value);
                    if (target.value) {
                      if (filter.includes("limit")) {
                        setFilter(
                          RemoveParameterFromUrl("?" + filter, "limit") +
                            `&limit=${target.value}`
                        );
                      } else {
                        if (target.value.length > 1) {
                          setFilter(`${filter}&limit=${target.value}`);
                          return;
                        }
                      }
                    }
                  }}
                >
                  <option value={-1}>Selecione</option>
                  <option value={15}>10 questões</option>
                  <option value={20}>15 questões</option>
                  <option value={30}>20 questões</option>
                </Select>
                <Select
                  label="Dificuldade"
                  id="dificuldade"
                  className="l-simulado__select"
                  value={dificuldade}
                  onChange={({ target }) => {
                    setDificuldade(target.value);
                    if (filter.includes("dificuldade")) {
                      setFilter(
                        RemoveParameterFromUrl("?" + filter, "dificuldade") +
                          `&dificuldade=${target.value}`
                      );
                    } else {
                      if (target.value > 0) {
                        setFilter(`${filter}&dificuldade=${target.value}`);
                        return;
                      }
                    }
                  }}
                >
                  <option value={-1}>Aleatória</option>
                  {reqQuestao.dificuldade !== undefined &&
                    reqQuestao.dificuldade.map((el) => (
                      <option value={+el.idDificuldade} key={el.idDificuldade}>
                        {el.idDificuldade + " - " + el.nivelDificuldade}
                      </option>
                    ))}
                </Select>
                <Select
                  label="Universidade"
                  id="universidade"
                  className="l-simulado__select"
                  value={universidade}
                  onChange={({ target }) => {
                    setUniversidade(target.value);
                    if (filter.includes("universidade")) {
                      setFilter(
                        RemoveParameterFromUrl("?" + filter, "universidade") +
                          `&universidade=${target.value}`
                      );
                    } else {
                      if (target.value > 0) {
                        setFilter(`${filter}&universidade=${target.value}`);
                        return;
                      }
                    }
                  }}
                >
                  <option value={-1}>Aleatória</option>
                  {(reqQuestao !== undefined && reqQuestao) !== [] &&
                    reqQuestao.universidade !== undefined &&
                    reqQuestao.universidade.map((el) => (
                      <option value={el.idUniversidade} key={el.idUniversidade}>
                        {el.idUniversidade + " - " + el.nomeUniversidade}
                      </option>
                    ))}
                </Select>
                <Select
                  label="Materia"
                  id="materia"
                  className="l-simulado__select"
                  value={materia}
                  onChange={({ target }) => {
                    setMateria(target.value);
                    if (filter.includes("materia")) {
                      setFilter(
                        RemoveParameterFromUrl("?" + filter, "materia") +
                          `&materia=${target.value}`
                      );
                    } else {
                      if (target.value > 0) {
                        setFilter(`${filter}&materia=${target.value}`);
                        return;
                      }
                    }
                  }}
                >
                  <option value={-1}>Aleatória</option>
                  {reqQuestao !== undefined &&
                    reqQuestao !== [] &&
                    reqQuestao.assuntoMateria !== undefined &&
                    reqQuestao.assuntoMateria.materia !== undefined &&
                    reqQuestao.assuntoMateria.materia.materia.map((el) => (
                      <option value={el.idMateria} key={el.idMateria}>
                        {el.idMateria + " - " + el.nomeMateria}
                      </option>
                    ))}
                </Select>
                <Select
                  label="Assunto Materia"
                  className="l-simulado__select"
                  id="assunto"
                  value={assunto}
                  onChange={({ target }) => {
                    setAssunto(target.value);
                    if (filter.includes("assunto")) {
                      setFilter(
                        RemoveParameterFromUrl("?" + filter, "assunto") +
                          `&assunto=${target.value}`
                      );
                    } else {
                      if (target.value > 0) {
                        setFilter(`${filter}&assunto=${target.value}`);
                        return;
                      }
                    }
                  }}
                >
                  <option value={-1}>Aleatória</option>
                  {reqQuestao !== undefined &&
                    reqQuestao !== [] &&
                    reqQuestao.assuntoMateria !== undefined &&
                    reqQuestao.assuntoMateria.assuntoMateria !== undefined &&
                    reqQuestao.assuntoMateria.assuntoMateria.map((el) => (
                      <option
                        value={el.idAssuntoMateria}
                        key={el.idAssuntoMateria}
                      >
                        {el.idAssuntoMateria + " - " + el.nomeAssuntoMateria}
                      </option>
                    ))}
                </Select>
                <Button
                  icon={<FaArrowRight />}
                  onClick={() => {
                    if (reqQuestao.questao !== undefined) {
                      if (reqQuestao.questao.length < quantidade) {
                        AlertWarning({
                          title: "Ops...",
                          text: `Encontramos somente ${reqQuestao.questao.length} questões com esse filtro no nosso banco de dados. Deseja realizar o simulado mesmo assim?`,
                        }).then((el) => el.isConfirmed && setStart(true));
                      } else setStart(true);
                    } else {
                      AlertWarning({
                        title: "Eita...",
                        text: `Não encontramos nenhuma questão com esse tipo de filtro no nosso banco de dados, selecione outras!`,
                      });
                    }
                  }}
                >
                  Comecar simulado
                </Button>
              </div>
            </article>
          ) : (
            <section>
              <Questoes
                dificuldade={dificuldade}
                universidade={universidade}
                assunto={assunto}
                materia={materia}
                questoes={reqQuestao}
                comeco={
                  new Date().toISOString().split("T")[0] +
                  " " +
                  new Date().toTimeString().split(" ")[0]
                }
                quantidade={reqQuestao.questao.length}
              />
            </section>
          )}
        </section>
      </SimuladoProvider>
    );
  } else {
    return <Backdrop />;
  }
}
