import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Smiley from "../../../../img/project/smiley.svg";
import song from "../../../../audio/fim_simulado.mp3";
import { Button } from "../../Form";
import { Link } from "react-router-dom";
import { FaArrowRight, FaHistory } from "react-icons/fa";
import { parseJwt } from "../../Header/NavBarUser";
import { useSimulado } from "../../Context/SImuladoContext";
import { ChartPie, ChartArea, ChartBar } from "../../Main/Charts";
import { FaChartPie } from "react-icons/fa";

export default function Resultados(props) {
  const { quantidade, comeco, fim, reqQuestao } = props;
  let { acertos, erros, questoesSimulado, setRefazer } = useSimulado();
  const [Sair, setSair] = React.useState(false);
  console.log(props);
  const [Refazer, setRefazerS] = React.useState(false);
  document.querySelector("audio").play();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const inserir = useCallback(() => {
    let user = 0;
    if (localStorage.getItem("user")) {
      let data = parseJwt(localStorage.getItem("user"));
      user =
        data.idCliente !== undefined
          ? data.idCliente
          : data.id !== undefined
            ? data.id
            : 0;
    }
    if (user !== 0) {
      // console.log(user);
      return axios
        .post(
          process.env.REACT_APP_API + `/simulado/create/`,
          JSON.stringify({
            comeco: comeco,
            fim: fim,
            user: +user,
            questoes: questoesSimulado,
          }),
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("auth") || localStorage.getItem("user")
                }`,
            },
          }
        )
        .then((val) => val.data);
    }
  });

  React.useEffect(() => {
    return () => {
      // setSair(true);
    };
  }, []);
  if (Refazer) {
    let user = parseJwt(localStorage.getItem("user"));
    if (user.id !== undefined) {
      inserir().finally(() => {
        console.log({ reqQuestao });
        setRefazer(true);
      });
    }
  }
  if (Sair) {
    inserir().then((val) => console.log(val));
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }

  const [acertosTotal, setAcertosTotal] = useState(
    [
      {
        acertos: 1,
        name: 'Acertos'
      },

      {
        acertos: 1,
        name: 'Erros'
      },

    ]
  );

  useEffect(() => {
    setAcertosTotal([
      {
        name: "Acertos",
        Acertos: acertos || 0,
        color: "#5f76de",
      },
      {
        name: "Erros",
        Acertos: erros || 0,
        color: "#51348766",
      },
    ]);
  }, [acertosTotal])

  return (
    <section className="c-results">
      <audio src={song} />
      <h2 className="c-results__headline">
        Parabéns, você realizou um Simulado de {quantidade} questões!
      </h2>
      <div className="c-results__headline__frame">
        <iframe
          className="c-results__headline__frame__conf"
          title="confete"
          src="https://embed.lottiefiles.com/animation/7893"
        ></iframe>
      </div>
      <div className="c-results__headline__img">
        <img src={Smiley} alt="Imagem Sorrindo" />
      </div>
      <br />
      <div className="c-results__dados">
        <div className="esquerda">
          <h2 className="c-results__dados__title"> Meus Resultados: </h2>
          <span className="c-results__dados acerto">
            {/* Acertos: {acertos} / {quantidade}{" "} */}
            <ChartPie
              data={acertosTotal}
              dataKey="Acertos"
              outerRadius={90}
              innerRadius={65}
            />
          </span>
          <div className="c-results__dados erro">
            <span className="grande">
              {Math.ceil(acertos / quantidade * 100)}{"%"}
            </span>
            <span className="pequeno">
              {acertos + "/" + (acertos + erros)}
            </span>
          </div>
        </div>
        <div className="direita">
          <Button
            className="c-results__dados__btns__r__b"
            onClick={() => {
              setRefazerS(true);
            }}
          >
            Refazer <FaHistory style={{ marginLeft: 10 }} />
          </Button>
          <Button
            className="c-results__dados__btns__s__b"
            onClick={() => {
              setSair(true);
            }}
          >
            Sair <FaArrowRight style={{ marginLeft: 10 }} />
          </Button>
          <Link className="dash" to="/dashboard">
            <FaChartPie className="icon" />
          </Link>
        </div>
      </div>
    </section>
  );
}
