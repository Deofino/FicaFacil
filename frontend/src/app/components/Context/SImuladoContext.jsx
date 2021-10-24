import axios from "axios";
import React, { createContext, useState, useContext } from "react";
import { ToastError, ToastWarning } from "../Alert/Toast";

export const propsContextSimulado = {
  reqQuestao: null,
  setReqQuestao: null,
  filter: "",
  setFilter: null,
  quantidade: null,
  setQuantidade: null,
  acertos: 0,
  setAcertos: null,
  erros: 0,
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
  const [quantidade, setQuantidade] = useState(10);
  const [filter, setFilter] = useState("limit=10");
  const [reqQuestao, setReqQuestao] = useState([]);
  const [acertos, setAcertos] = useState(0);
  const [erros, setErros] = useState(0);
  const [questaoAtual, setQuestaoAtual] = useState(0);
  const [tempo, setTempo] = useState(30);

  React.useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API}/questao/index?${filter.replace("?", "")}`,
        {
          headers: {
            Authorization: `Bearer ${
              localStorage.getItem("auth") || localStorage.getItem("user")
            }`,
          },
        }
      )
      .then((value) => {
        if (value.data.status_code === 200) {
          setReqQuestao(value.data.data);

          // } else ToastWarning({ text: value.data.data });
        } else console.log(value.data);
      })
      .catch((err) => ToastError(err));
  }, [filter]);

  return (
    <contextSimulado.Provider
      value={{
        quantidade: quantidade,
        setQuantidade: setQuantidade,
        filter: filter,
        setFilter: setFilter,
        reqQuestao: reqQuestao,
        setReqQuestao: setReqQuestao,
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
