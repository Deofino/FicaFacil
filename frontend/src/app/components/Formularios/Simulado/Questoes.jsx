import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { ToastError } from "../../Alert/Toast";
import { Questao } from "./Questao";
export const Questoes = (props) => {
  const [ReqQuestao, setReqQuestao] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/questao/index/`)
      .then((value) => {
        if (value.data.status_code === 200) {
          setReqQuestao(value.data.data);
        }
      })
      .catch((err) => ToastError(err));
  }, []);

  return (
    <section
      className="l-questoes"
      style={{
        padding: 20,
        borderWidth: 3,
        borderColor: "#888",
        borderStyle: "solid",
        borderRadius: 8,
        marginTop: 10,
      }}
    >
      {ReqQuestao.questao !== undefined ? (
        ReqQuestao.questao.map &&
        ReqQuestao.questao.map((el, index) => {
          return <Questao key={index} index={index} id={el.idQuestao} />;
        })
      ) : (
        <Fragment>
          <h1 className="l-questoes__headline">Nenhuma Questao encontrada</h1>
        </Fragment>
      )}
    </section>
  );
};
