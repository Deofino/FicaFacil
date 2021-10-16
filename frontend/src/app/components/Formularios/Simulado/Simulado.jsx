import axios from "axios";
import React, { useEffect } from "react";
import { Button, Radio, RadioGroup } from "../../Form";
import { SimuladoProvider, useSimulado } from "../../Context/SImuladoContext";

export const Questoes = (props) => {
  const [Selected, setSelected] = React.useState(0);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API}/questao/index/`).then((value) => {
      console.log(value);
    });
  }, []);

  return (
    <section
      style={{
        display: props.block || "none",
        padding: 20,
        borderWidth: 3,
        borderColor: "#888",
        borderStyle: "solid",
        borderRadius: 8,
        marginTop: 10,
      }}
    >
      <h1>titulo - ENEM - Biologia</h1>
      <br />
      <span>
        Texto Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
        nulla vitae, rem sequi aliquid placeat aliquam doloribus possimus.
        Cupiditate non repellendus doloribus praesentium veniam voluptas,
        impedit ex consequatur molestias reprehenderit? Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Labore maiores sed voluptatem,
        voluptates commodi recusandae officiis nesciunt ducimus, ratione error
        provident in, similique dignissimos. Ipsa perspiciatis veritatis
        distinctio blanditiis? Voluptates?
      </span>
      <hr />
      <br />
      <RadioGroup value={Selected} onChange={(val) => setSelected(val)}>
        <Radio label=" 10120" value={1}></Radio>
        <Radio label=" 10120" value={2}></Radio>
        <Radio label=" 10120" value={3}></Radio>
        <Radio label=" 10120" value={4}></Radio>
        <Radio label=" 10120" value={5}></Radio>
      </RadioGroup>
      <br />
      <hr />
      <br />
      <div
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button styleButton={{ width: 150, marginRight: 20 }}>Voltar</Button>
        <Button styleButton={{ width: 150 }}>Proxima</Button>
      </div>
    </section>
  );
};

/**
 * @description
 * @author Delfino
 * @date 16/10/2021
 * @param {int} qtdeQuestoes = 10 questoes ao total
 * @param {int} tempo = 30 minutos
 */
export function Simulado({ qtdeQuestoes = 10, tempo = 30 }) {
  const [start, setStart] = React.useState(false);
  const simulado = useSimulado();
  simulado.setTempo(tempo);
  simulado.setQtde(qtdeQuestoes);
  return (
    <SimuladoProvider>
      <div>
        {!start ? (
          <React.Fragment>
            <h1>Simulado bonito </h1>
            <br />
            <Button
              onClick={() => {
                setStart(true);
              }}
            >
              Comecar simulado
            </Button>
          </React.Fragment>
        ) : (
          <section>
            <Questoes questaoAtual={simulado.questaoAtual} />
          </section>
        )}
      </div>
    </SimuladoProvider>
  );
}
