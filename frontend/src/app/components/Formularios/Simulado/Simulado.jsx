import React, { Fragment, useState } from "react";
import { Button } from "../../Form";
import { SimuladoProvider, useSimulado } from "../../Context/SImuladoContext";
import { Questoes } from "./Questoes";

/**
 * @description
 * @author Delfino
 * @date 16/10/2021
 * @param {int} qtdeQuestoes = 10 questoes ao total
 * @param {int} tempo = 30 minutos
 */
export function Simulado({ qtdeQuestoes = 10, tempo = 30 }) {
  const [start, setStart] = useState(false);
  const simulado = useSimulado();
  simulado.setTempo(tempo);
  simulado.setQtde(qtdeQuestoes);
  return (
    <SimuladoProvider>
      <div>
        {!start ? (
          <Fragment>
            <h1>Simulado bonito </h1>
            <br />
            <Button
              onClick={() => {
                setStart(true);
              }}
            >
              Comecar simulado
            </Button>
          </Fragment>
        ) : (
          <section>
            <Questoes />
          </section>
        )}
      </div>
    </SimuladoProvider>
  );
}
