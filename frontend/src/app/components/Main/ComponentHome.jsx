import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Home from "../../../img/project/c-Esquerdo.svg";
import Curve from "../../../img/project/curve.png";

export default function ComponentHome(){
    return(
        <Fragment>
            <section className="container_home">
                <section className="container_home_home">
                    <div className="container_home_home__left">
                        <h1 className="container_home_home__left__title">Conheça sua nova forma de estudar</h1>
                        <h3 className="container_home_home__left__sub">Fácil, completa e eficaz!</h3>
                        <p className="container_home_home__left__text">FicaFácil é sua nova plataforma de estudos online, que permite que você teste seus conhecimentos acompanhando sua evolução e desempenho a cada simulado feito. Juntando tecnologia, educação e otimização de tempo, desenvolvemos o FicaFácil, a fim de auxiliar os estudantes, dando a eles mais autonomia na hora de estudar!</p>
                        <Link to="#" className="container_home_home__left__btn">FAZER SIMULADO</Link>
                    </div>
                    <div className="container_home_home__right">
                        <img src={Home} alt="LogoHome"/>
                    </div>
                </section>
                <section className="container_home__explanation">
                    <div className="container_home__explanation__img">
                        <img src={Curve} alt="ImageCurve"/>
                    </div>
                    <div className="container_home__explanation__cont">
                        <h2>kfjrbfilrjks</h2>
                    </div>
                </section>
            </section>
        </Fragment>
    )
}