import React, { Fragment, useState, useEffect } from "react";
import { Button, Select, MenuItem } from "../../Form";
import { SimuladoProvider, useSimulado } from "../../Context/SImuladoContext";
import { Questoes } from "./Questoes";
import axios from "axios";
import { ToastError, ToastWarning } from "../../Alert/Toast";
import { Backdrop } from "@material-ui/core";

/**
 * @description
 * @author Delfino
 * @date 16/10/2021
 * @param {int} qtdeQuestoes = 10 questoes ao total
 * @param {int} tempo = 30 minutos
 */
export function Simulado() {
  function removeURLParameter(url, parameter) {
    //prefer to use l.search if you have a location/link object
    var urlparts = url.split("?");
    if (urlparts.length >= 2) {
      var prefix = encodeURIComponent(parameter) + "=";
      var pars = urlparts[1].split(/[&;]/g);

      //reverse iteration as may be destructive
      for (var i = pars.length; i-- > 0; ) {
        //idiom for string.startsWith
        if (pars[i].lastIndexOf(prefix, 0) !== -1) {
          pars.splice(i, 1);
        }
      }

      return urlparts[0] + (pars.length > 0 ? "?" + pars.join("&") : "");
    }
    return url;
  }
  const [start, setStart] = useState(false);

  const { reqQuestao, setFilter, filter } = useSimulado();

  const [quantidade, setQuantidade] = useState(null);
  const [dificuldade, setDificuldade] = useState(null);
  const [universidade, setUniversidade] = useState(null);
  const [materia, setMateria] = useState(null);
  const [assunto, setAssunto] = useState(null);

  console.log(reqQuestao);

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
                  if (!filter.includes("limit")) {
                    if (target.value > 0) {
                      setFilter(`${filter}&limit=${target.value}`);
                      return;
                    }
                  }
                  // setFilter(removeURLParameter("?" + filter, "limit")+);
                }}
              >
                <MenuItem value={0}>Selecione</MenuItem>
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
                  console.log(target.value);
                  if (!filter.includes("dificuldade")) {
                    if (target.value > 0) {
                      setFilter(`${filter}&dificuldade=${target.value}`);
                      return;
                    }
                  }
                  let params = new URLSearchParams(filter);
                  console.log(params.delete("dificuldade"));
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
                  if (!filter.includes("universidade")) {
                    if (target.value > 0) {
                      setFilter(`${filter}&universidade=${target.value}`);
                      return;
                    }
                  }
                  let params = new URLSearchParams(filter);
                  params.delete("universidade");
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
                  if (!filter.includes("materia")) {
                    if (target.value > 0) {
                      setFilter(`${filter}&materia=${target.value}`);
                      return;
                    }
                  }
                  let params = new URLSearchParams(filter);
                  params.delete("materia");
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
                  if (!filter.includes("assunto")) {
                    if (target.value > 0) {
                      setFilter(`${filter}&assunto=${target.value}`);
                      return;
                    }
                  }
                  let params = new URLSearchParams(filter);
                  params.delete("assunto");
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
                  console.log(filter);
                  // setStart(true);
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
