import React, { createContext, useState, useContext } from "react";

export const propsContextSimulado = {
  qtde: null,
  setQtde: null,
  acertos: null,
  setAcertos: null,
  erros: null,
  setErros: null,
  questaoAtual: null,
  setQuestaoAtual: null,
  tempo: null,
  setTempo: null,
};
const contextSimulado = createContext(propsContextSimulado);

// @ts-check
/**
 * @description
 * @author Delfino
 * @date 16/10/2021
 * @param {import("react").Props} props
 */
export const SimuladoProvider = (props) => {
  const [qtde, setQtde] = useState(10);
  const [acertos, setAcertos] = useState(0);
  const [erros, setErros] = useState(0);
  const [questaoAtual, setQuestaoAtual] = useState(0);
  const [tempo, setTempo] = useState(30);
  return (
    <contextSimulado.Provider
      value={{
        qtde: qtde,
        setQtde: setQtde,
        acertos: acertos,
        setAcertos: setAcertos,
        erros: erros,
        setErros: setErros,
        questaoAtual: questaoAtual,
        setQuestaoAtual: setQuestaoAtual,
        tempo: tempo,
        setTempo: setTempo,
      }}
    >
      {props.children}
    </contextSimulado.Provider>
  );
};
export const useSimulado = (props) => {
  return useContext(contextSimulado);
};
