import axios from "axios";
import React, { createContext, useState, useContext } from "react";
import { ToastError } from "../Alert/Toast";
import { parseJwt } from "../Header/NavBarUser";

export const propsContextSimulado = {
  reqQuestao: null,
  setReqQuestao: null,
  refazer: null,
  setRefazer: null,
  filter: "",
  setFilter: null,
  quantidade: null,
  setQuantidade: null,
  acertos: 0,
  AcertarQuestao: null,
  erros: 0,
  ErrarQuestao: null,
  questaoAtual: null,
  setQuestaoAtual: null,
  tempo: null,
  setTempo: null,
  isTerminado: null,
  setTerminado: null,
  questoesSimulado: [],
  setQuestoesSimulado: null,
  setAcertos: null,
  setErros: null,
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
  const [filter, setFilter] = useState("limit=10");
  const [reqQuestao, setReqQuestao] = useState([]);
  const [questoesSimulado, setQuestoesSimulado] = useState([]);
  const [acertos, setAcertos] = useState(0);
  const [erros, setErros] = useState(0);
  const [questaoAtual, setQuestaoAtual] = useState(0);
  const [tempo, setTempo] = useState(30);
  const [isTerminado, setTerminado] = useState(false);
  const [refazer, setRefazer] = useState(false);

  const AcertarQuestao = () => {
    setAcertos(acertos + 1);
  };
  const ErrarQuestao = () => {
    setErros(erros + 1);
  };

  React.useEffect(() => {
    let user = parseJwt(localStorage.getItem("user")).id;
    if (!isTerminado) {
      axios
        .get(
          `${process.env.REACT_APP_API}/questao/index?${filter.replace(
            "?",
            ""
          )}&cliente=${user}&random=true`,
          {
            headers: {
              Authorization: `Bearer ${
                localStorage.getItem("auth") || localStorage.getItem("user")
              }`,
            },
          }
        )
        .then((value) => {
          console.log(value.data);
          if (value.data.status_code === 200) {
            setReqQuestao(value.data.data);
          } else {
            setReqQuestao(value.data.data);
          }
        })
        .catch((err) => ToastError(err));
    }
    if (refazer) {
      setAcertos(0);
      setErros(0);
      setQuestaoAtual(0);
      setQuestoesSimulado([]);
    }
  }, [filter, isTerminado, refazer]);

  return (
    <contextSimulado.Provider
      value={{
        refazer: refazer,
        setRefazer: setRefazer,
        filter: filter,
        setFilter: setFilter,
        reqQuestao: reqQuestao,
        setReqQuestao: setReqQuestao,
        acertos: acertos,
        AcertarQuestao: AcertarQuestao,
        erros: erros,
        ErrarQuestao: ErrarQuestao,
        questaoAtual: questaoAtual,
        setQuestaoAtual: setQuestaoAtual,
        tempo: tempo,
        setTempo: setTempo,
        isTerminado: isTerminado,
        setTerminado: setTerminado,
        questoesSimulado: questoesSimulado,
        setQuestoesSimulado: setQuestoesSimulado,
        setAcertos: setAcertos,
        setErros: setErros,
      }}
    >
      {props.children}
    </contextSimulado.Provider>
  );
};
export const useSimulado = () => {
  return useContext(contextSimulado);
};
