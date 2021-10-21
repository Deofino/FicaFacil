import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { FaAngleDoubleRight } from "react-icons/fa";
import Home from "../../../img/project/c-Esquerdo.svg";
import Curve from "../../../img/project/curve.png";
import Simulates from "../../../img/project/elipse1.svg";
import Progress from "../../../img/project/elipse2.svg";
import Evolution from "../../../img/project/elipse3.svg";
import Enfeite from "../../../img/project/enfeite.png";
import Teste from "../../../img/project/teste.png";
import Aura from "../../../img/project/icon-aura.svg";

import Slider from "./Slider";

const images = [

        {
            path: Teste, 
            alt: "Banner Fica Fácil",
            title: "FICA FÁCIL",
        },
         {
            path: Teste, 
            alt: "Banner ENEM",
            title: "ENEM",
        },
         {
            path: Teste, 
            alt: "Banner FUVEST",
            title: "FUVEST",
        },
    ];

export default function ComponentHome() {
  return (
    <Fragment>
        {/* HOME */}
      <section className="container_home">
        <section className="container_home_home">
          <div className="container_home_home__left">
            <h1 className="container_home_home__left__title">
              Conheça sua nova forma de estudar
            </h1>
            <h3 className="container_home_home__left__sub">
              Fácil, completa e eficaz!
            </h3>
            <p className="container_home_home__left__text">
              FicaFácil é sua nova plataforma de estudos online, que permite que
              você teste seus conhecimentos acompanhando sua evolução e
              desempenho a cada simulado feito. Juntando tecnologia, educação e
              otimização de tempo, desenvolvemos o FicaFácil, a fim de auxiliar
              os estudantes, dando a eles mais autonomia na hora de estudar!
            </p>
            <Link to="#" className="container_home_home__left__btn">
              FAZER SIMULADO
            </Link>
          </div>
          <div className="container_home_home__right">
            <img src={Home} alt="LogoHome" />
          </div>
        </section>
        {/* NOTICES */}
        <section className="container_home__notices">
            <Slider images={ images } className="container_home__notices__slider" bullets perView={2} />

        </section>
         {/* EXPLANATION */}
        <section className="container_home__explanation">
          <div className="container_home__explanation__img">
            <img src={Curve} alt="ImageCurve" />
          </div>
          <div className="container_home__explanation__cont">
            <div className="container_home__explanation__cont__s">
              <div className="container_home__explanation__cont__s__img">
                <img src={Simulates} alt="Simulados" />
              </div>
              <h3 className="container_home__explanation__cont__s__title">
                Simulados
              </h3>
              <p className="container_home__explanation__cont__s__text">
                Faça simulados práticos dos vestibulares em que deseja passar
              </p>
            </div>

            <div className="container_home__explanation__cont__p">
              <div className="container_home__explanation__cont__p__img">
                <img src={Progress} alt="Progresso" />
              </div>
              <h3 className="container_home__explanation__cont__p__title">
                Progresso
              </h3>
              <p className="container_home__explanation__cont__p__text">
                Após a prática, você poderá visualizar o seu desempenho
                percorrido
              </p>
            </div>

            <div className="container_home__explanation__cont__e">
              <div className="container_home__explanation__cont__e__img">
                <img src={Evolution} alt="Evolução" />
              </div>
              <h3 className="container_home__explanation__cont__e__title">
                Evolução
              </h3>
              <p className="container_home__explanation__cont__e__text">
                Estudos garantem que com esforço e o FicaFácil a aprovação vem!
              </p>
            </div>
          </div>
        </section>
      
         {/* AURA */}
        <section className="container_home__aura">
          <div className="container_home__aura__left">
            <div className="container_home__aura__left__enf">
              <img src={Enfeite} alt="Enfeite" />
            </div>
            <h3 className="container_home__aura__left__title">
              Conheça nossa empresa
            </h3>
            <h2 className="container_home__aura__left__sub">
              A Corporação Aura!
            </h2>
            <p className="container_home__aura__left__text">
              O banco de dados diversificado FicaFácil, foi projetado e criado
              pela Aura, uma empresa desenvolvedora atuante no ramo da
              tecnologia. Que desenvolve programas para empresas de pequeno e médio porte. Conheça mais sobre a Aura e seus desenvolvedores no site!
            </p>
            <div className="container_home__aura__left__link">
              <Link
                to="https://paulowarren.github.io/AURA/"
                target="_blank"
                className="container_home__aura__left__link__l">
                Saiba tudo agora mesmo sobre a Aura
              </Link>
              <div className="container_home__aura__left__link__i">
                <FaAngleDoubleRight />
              </div>
            </div>
          </div>
          <div className="container_home__aura__right">
            <div className="container_home__aura__right__img">
              <img src={Aura} alt="Aura" />
            </div>
          </div>
        </section>
      </section>
    </Fragment>
  );
}
