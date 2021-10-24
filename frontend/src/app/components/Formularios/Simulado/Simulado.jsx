import React, { Fragment, useState } from "react";
import { Button, Select, MenuItem } from "../../Form";
import { SimuladoProvider, useSimulado } from "../../Context/SImuladoContext";
import { Questoes } from "./Questoes";
import axios from "axios";
import { ToastError, ToastWarning } from "../../Alert/Toast";
import { Backdrop } from "@material-ui/core";
import { AlertWarning } from "../../Alert/Modal";

/**
 * @description
 * @author Delfino
 * @date 16/10/2021
 * @param {int} qtdeQuestoes = 10 questoes ao total
 * @param {int} tempo = 30 minutos
 */
export function Simulado() {
  function RemoveParameterFromUrl(url, parameter) {
    return url
      .replace(new RegExp("[?&]" + parameter + "=[^&#]*(#.*)?$"), "$1")
      .replace(new RegExp("([&])" + parameter + "=[^&]*&"), "$1");
  }

  const [start, setStart] = useState(false);

  const { reqQuestao, setFilter, filter } = useSimulado();

  const [quantidade, setQuantidade] = useState(null);
  const [dificuldade, setDificuldade] = useState(null);
  const [universidade, setUniversidade] = useState(null);
  const [materia, setMateria] = useState(null);
  const [assunto, setAssunto] = useState(null);

  if (reqQuestao !== []) {
    return (
      <SimuladoProvider>
        <section className="l-simulado">
          {!start ? (
            <Fragment>
              <h1>Simulado bonito </h1>
              <Select
                label="Quantidade de Questões *"
                className="l-simulado__select"
                value={quantidade}
                onChange={({ target }) => {
                  setQuantidade(target.value);
                  if (filter.includes("limit")) {
                    setFilter(
                      RemoveParameterFromUrl("?" + filter, "limit") +
                        `&limit=${target.value}`
                    );
                  } else {
                    if (target.value > 0) {
                      setFilter(`${filter}&limit=${target.value}`);
                      return;
                    }
                  }
                }}
              >
                <MenuItem value={-1}>Selecione</MenuItem>
                <MenuItem value={10}>10 questões - 1:30 horas</MenuItem>
                <MenuItem value={15}>15 questões - 3:00 horas</MenuItem>
                <MenuItem value={20}>20 questões - 4:30 horas</MenuItem>
              </Select>
              <Select
                label="Dificuldade"
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
                <MenuItem value={-1}>Aleatória</MenuItem>
                {reqQuestao !== [] &&
                  reqQuestao.dificuldade !== undefined &&
                  reqQuestao.dificuldade.map((el) => (
                    <MenuItem value={+el.idDificuldade} key={el.idDificuldade}>
                      {el.nivelDificuldade}
                    </MenuItem>
                  ))}
              </Select>
              <Select
                label="Universidade"
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
                <MenuItem value={-1}>Aleatória</MenuItem>
                {reqQuestao !== [] &&
                  reqQuestao.universidade !== undefined &&
                  reqQuestao.universidade.map((el) => (
                    <MenuItem value={el.idUniversidade} key={el.idUniversidade}>
                      {el.nomeUniversidade}
                    </MenuItem>
                  ))}
              </Select>
              <Select
                label="Materia"
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
                <MenuItem value={-1}>Aleatória</MenuItem>
                {reqQuestao !== [] &&
                  reqQuestao.assuntoMateria !== undefined &&
                  reqQuestao.assuntoMateria.materia !== undefined &&
                  reqQuestao.assuntoMateria.materia.materia.map((el) => (
                    <MenuItem value={el.idMateria} key={el.idMateria}>
                      {el.nomeMateria}
                    </MenuItem>
                  ))}
              </Select>
              <Select
                label="Assunto Materia"
                className="l-simulado__select"
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
                <MenuItem value={-1}>Aleatória</MenuItem>
                {reqQuestao !== [] &&
                  reqQuestao.assuntoMateria !== undefined &&
                  reqQuestao.assuntoMateria.assuntoMateria !== undefined &&
                  reqQuestao.assuntoMateria.assuntoMateria.map((el) => (
                    <MenuItem
                      value={el.idAssuntoMateria}
                      key={el.idAssuntoMateria}
                    >
                      {el.nomeAssuntoMateria}
                    </MenuItem>
                  ))}
              </Select>
              <br />
              <Button
                onClick={() => {
                  // console.log(filter.replaceAll("?", ""));
                  if (reqQuestao.questao.length < quantidade) {
                    AlertWarning({
                      title: "Ops...",
                      text: `Encontramos somente ${reqQuestao.questao.length} questões com esse filtro no nosso banco de dados. Deseja realizar o simulado mesmo assim?`,
                    }).then((el) => el.isConfirmed && setStart(true));
                  } else setStart(true);
                }}
              >
                Comecar simulado
              </Button>
            </Fragment>
          ) : (
            <section>
              <Questoes
                quantidade={quantidade}
                dificuldade={dificuldade}
                universidade={universidade}
                assunto={assunto}
                materia={materia}
                questoes={reqQuestao}
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
