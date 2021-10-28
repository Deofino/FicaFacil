import React, { useEffect } from "react";
import axios from "axios";
import Smiley from "../../../../img/project/smiley.svg";
import song from "../../../../audio/fim_simulado.mp3";
import { Button } from "../../Form";
import { FaArrowRight, FaHistory } from "react-icons/fa";
import { parseJwt } from "../../Header/NavBarUser";
import { useSimulado } from "../../Context/SImuladoContext";

export default function Resultados(props) {
  const { quantidade, comeco, fim } = props;
  let { acertos, erros, questoesSimulado } = useSimulado();
  const [idUser, setidUser] = React.useState(0);
  //   console.log(questoesSimulado);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      let user = parseJwt(localStorage.getItem("user"));
      setidUser(user.idCliente);
    }

    if (idUser > 0) {
      axios
        .post(
          process.env.REACT_APP_API + `/simulado/create/`,
          JSON.stringify({
            comeco: comeco,
            fim: fim,
            user: +idUser,
            questoes: questoesSimulado,
          }),
          {
            headers: {
              Authorization: `Bearer ${
                localStorage.getItem("auth") || localStorage.getItem("user")
              }`,
            },
          }
        )
        .then((val) => console.log(val.data));
    }
  }, [comeco, fim, idUser, questoesSimulado]);

  return (
    <section className="c-results">
      <audio src={song} />
      <h2 className="c-results__headline">
        Parabéns, você realizou um Simulado de {quantidade} questões!
      </h2>
      <div className="c-results__headline__img">
        <img src={Smiley} alt="Imagem Sorrindo" />
      </div>
      <br />
      <div className="c-results__dados">
        <h2 className="c-results__dados__title"> ~ Dados ~ </h2>
        <span className="c-results__dados acerto">
          Acertos: {acertos} / {quantidade}{" "}
        </span>
        <span className="c-results__dados erro">
          Erros: {erros} / {quantidade}{" "}
        </span>
      </div>
      <div className="c-results__dados__btns">
        <div className="c-results__dados__btns__s">
          <Button className="c-results__dados__btns__s__b">
            Sair <FaArrowRight />
          </Button>
        </div>
        <div className="c-results__dados__btns__r">
          <Button className="c-results__dados__btns__r__b">
            Refazer <FaHistory />{" "}
          </Button>
        </div>
      </div>
    </section>
  );
}
