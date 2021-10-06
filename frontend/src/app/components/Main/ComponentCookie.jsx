import React, { Fragment} from "react";
import { Link } from "react-router-dom";
import { Button, } from "../Form";
import Cookie from "../../../img/project/cookie.svg";

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
        <span className="c-cookie__content__politica">Política de Privacidade</span>
        </div>
        <div className="c-cookie__buttons">
          <Button className="c-cookie__buttons accept">Eu aceito</Button>
          <Link to="#" className="c-cookie__buttons noaccept">Rejeitar</Link>
        </div>
    
    </div>
    </Fragment>
    );
}