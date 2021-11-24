import React, { Fragment} from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { Button, } from "../Form";
import { FaTimes } from "react-icons/fa";
import { Tooltip, IconButton } from "@material-ui/core";
import Cookie from "../../../img/project/cookie.svg";

const Backdrop = () => {
  console.log("ejfeijfe");
  
  const close = () => {
    let backdrop = document.querySelector("#backdrop");
    backdrop.classList.toggle("open");
    ReactDOM.unmountComponentAtNode(backdrop);
  };
    return (
    <section className="c-formularioUpdate" id="c-formularioUpdate">
      <Tooltip
        className="c-formularioUpdate__close"
        title="Fechar"
        enterDelay={400}
        enterNextDelay={200}
      >
        <IconButton onClick={() => close()}>
          <FaTimes />
        </IconButton>
      </Tooltip>
      <h2>Seja pdfojseoif</h2>
      <p>KEBFIEWNOEMWIFODNWEOIFMEKL</p>
    </section>
    );
}


export default function ComponentCookie() {
    return(
      <Fragment>
      <div className="c-cookie">
        <div className="c-cookie__img">
          <img src={Cookie} alt="Cookie"/>
        </div>
      <div className="c-cookie__content">
        <h3 className="c-cookie__content__title">Cookies | Fica Fácil</h3>
        <p className="c-cookie__content__text">Nós armazenamos dados temporariamente para melhorar a sua experiência e para obter conteúdos de seu interesse. Ao utilizar nossos serviços, você concorda com tal monitoramento.</p>
        <span onClick={Backdrop}className="c-cookie__content__politica">Política de Privacidade</span>
        </div>
        <div className="c-cookie__buttons">
          <Button className="c-cookie__buttons accept">Aceitar</Button>
          <Link to="#" className="c-cookie__buttons noaccept">Rejeitar</Link>
        </div> 
        <div id="backdrop"></div>   
    </div>
    </Fragment>
    );
}