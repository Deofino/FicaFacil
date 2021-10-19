import React, { Fragment } from "react";
import reactDOM from "react-dom";
import { Button } from "../../Form";
import Cookie from "../../../../img/project/cookie.png";

import Termos from "./ComponentTermos";

export default function ComponentCookie() {
  const ModalTerms = () => {
    let termos = document.querySelector("#termos");
    termos.classList.add("open");
    reactDOM.render(<Termos />, termos);
  };

  return (
    <section id="cookie">
      <div className="c-cookie">
        <div className="c-cookie__img">
          <img src={Cookie} alt="Cookie" />
        </div>
        <div className="c-cookie__content">
          <h3 className="c-cookie__content__title">Cookies | Fica Fácil</h3>
          <p className="c-cookie__content__text">
            Nós armazenamos dados temporariamente para melhorar a sua
            experiência e para obter conteúdos de seu interesse. Ao utilizar
            nossos serviços, você concorda com tal monitoramento.
          </p>
          <span
            className="c-cookie__content__politica"
            onClick={() => ModalTerms()}
          >
            Política de Privacidade
          </span>
        </div>
        <div className="c-cookie__buttons">
          <Button
            className="c-cookie__buttons accept"
            onClick={() => {
              let cookie = document.querySelector("#cookie");
              cookie.firstChild.classList.toggle("close");
              setTimeout(() => {
                cookie.parentNode.removeChild(cookie);
                localStorage.setItem("cookie", true);
              }, 2000);
            }}
          >
            Aceitar
          </Button>
          <Button
            className="c-cookie__buttons noaccept"
            onClick={() => {
              let cookie = document.querySelector("#cookie");
              cookie.firstChild.classList.toggle("close");
              setTimeout(() => {
                cookie.parentNode.removeChild(cookie);
                localStorage.setItem("cookie", false);
              }, 2000);
            }}
          >
            Rejeitar
          </Button>
        </div>
      </div>
      <section className="l-termos" id="termos"></section>
    </section>
  );
}
