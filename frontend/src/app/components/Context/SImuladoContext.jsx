import axios from "axios";
import React, { createContext, useState, useContext } from "react";
import { ToastError } from "../Alert/Toast";

export const propsContextSimulado = {
  reqQuestao: null,
  setReqQuestao: null,
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
  const [isTerminado, setTerminado] = useState(false);

  const AcertarQuestao = () => {
    setAcertos(acertos + 1);
  };
  const ErrarQuestao = () => {
    setErros(erros + 1);
  };

  React.useEffect(() => {
    if (acertos + erros === 10) {
      setTerminado(true);
    }
  }, [acertos, erros]);
  React.useEffect(() => {
    if (isTerminado === false) {
      axios
        .get(
          `${process.env.REACT_APP_API}/questao/index?${filter.replace(
            "?",
            ""
          )}&random=true`,
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
            // console.log(value.data.data.questao);
            // } else ToastWarning({ text: value.data.data });
          } else console.log(value.data);
        })
        .catch((err) => ToastError(err));
    } else {
      setReqQuestao([]);
      console.log("acabou");
    }
  }, [filter, isTerminado]);

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
        AcertarQuestao: AcertarQuestao,
        erros: erros,
        ErrarQuestao: ErrarQuestao,
        questaoAtual: questaoAtual,
        setQuestaoAtual: setQuestaoAtual,
        tempo: tempo,
        setTempo: setTempo,
        isTerminado: isTerminado,
        setTerminado: setTerminado,
      }}
    >
      {props.children}
    </contextSimulado.Provider>
  );
};
export const useSimulado = () => {
  return useContext(contextSimulado);
};
