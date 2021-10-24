import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import {
  FaAngleDoubleRight,
  FaSquareRootAlt,
  FaDna,
  FaGlobeAmericas,
  FaUsers,
  FaSpellCheck,
  FaFeather,
  FaFont,
  FaLandmark,
  FaAtom,
  FaBong,
  FaPalette,
  FaQuoteLeft,
  FaItalic,
  FaEtsy,
} from "react-icons/fa";
import Home from "../../../img/project/c-Esquerdo.svg";
import Curve from "../../../img/project/curve1.png";
import Simulates from "../../../img/project/elipse1.svg";
import Progress from "../../../img/project/elipse2.svg";
import Evolution from "../../../img/project/elipse3.svg";
import Enfeite from "../../../img/project/enfeite.png";
import Enem from "../../../img/project/ENEM.png";
import Banner from "../../../img/project/Banner1.png";
import Fuvest from "../../../img/project/fuvest.png";
import Aura from "../../../img/project/icon-aura.svg";

import Slider from "./Slider";

const images = [
  {
    path: Banner,
    alt: "Banner Fica Fácil",
    title: "FICA FÁCIL",
  },
  {
    path: Enem,
    alt: "Banner ENEM",
    title: "ENEM",
  },
  {
    path: Fuvest,
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
            <Link to="/simulado" className="container_home_home__left__btn">
              FAZER SIMULADO
            </Link>
          </div>
          <div className="container_home_home__right">
            <img src={Home} alt="LogoHome" />
          </div>
        </section>
        {/* NOTICES */}
        <section className="container_home__notices">
          <Slider
            images={images}
            className="container_home__notices__slider"
            bullets
            perView={2}
          />
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
              tecnologia. Que desenvolve programas para empresas de pequeno e
              médio porte. Conheça mais sobre a Aura e seus desenvolvedores no
              site!
            </p>
            <div className="container_home__aura__left__link">
              <Link
                to="https://paulowarren.github.io/AURA/"
                target="_blank"
                className="container_home__aura__left__link__l"
              >
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

        {/* SUBJECTS */}
        <section className="container_home__subjects">
          <div className="container_home__subjects__math">
            <div className="container_home__subjects__math__icon">
              <FaSquareRootAlt />
            </div>
            <h3 className="container_home__subjects__math__title">
              Matemática
            </h3>
          </div>

          <div className="container_home__subjects__bio">
            <div className="container_home__subjects__bio__icon">
              <FaDna />
            </div>
            <h3 className="container_home__subjects__bio__title">Biologia</h3>
          </div>

          <div className="container_home__subjects__geo">
            <div className="container_home__subjects__geo__icon">
              <FaGlobeAmericas />
            </div>
            <h3 className="container_home__subjects__geo__title">Geografia</h3>
          </div>

          <div className="container_home__subjects__lite">
            <div className="container_home__subjects__lite__icon">
              <FaFeather />
            </div>
            <h3 className="container_home__subjects_lite_math__title">
              Literatura
            </h3>
          </div>
          <div className="container_home__subjects__gram">
            <div className="container_home__subjects__gram__icon">
              <FaSpellCheck />
            </div>
            <h3 className="container_home__subjects__gram__title">Gramática</h3>
          </div>
          <div className="container_home__subjects__quim">
            <div className="container_home__subjects__quim__icon">
              <FaBong />
            </div>
            <h3 className="container_home__subjects__quim__title">Química</h3>
          </div>
          <div className="container_home__subjects__his">
            <div className="container_home__subjects__his__icon">
              <FaLandmark />
            </div>
            <h3 className="container_home__subjects__hist__title">História</h3>
          </div>
          <div className="container_home__subjects__art">
            <div className="container_home__subjects__art__icon">
              <FaPalette />
            </div>
            <h3 className="container_home__subjects__art__title">Artes</h3>
          </div>
          <div className="container_home__subjects__esp">
            <div className="container_home__subjects__esp__icon">
              <FaEtsy />
            </div>
            <h3 className="container_home__subjects__esp__title">Espanhol</h3>
          </div>
          <div className="container_home__subjects__eng">
            <div className="container_home__subjects__eng__icon">
              <FaItalic />
            </div>
            <h3 className="container_home__subjects__eng__title">Inglês</h3>
          </div>
          <div className="container_home__subjects__filo">
            <div className="container_home__subjects__filo__icon">
              <FaQuoteLeft />
            </div>
            <h3 className="container_home__subjects__filo__title">Filosofia</h3>
          </div>
          <div className="container_home__subjects__socio">
            <div className="container_home__subjects__socio__icon">
              <FaUsers />
            </div>
            <h3 className="container_home__subjects__socio__title">
              Sociologia
            </h3>
          </div>
          <div className="container_home__subjects__atua">
            <div className="container_home__subjects__atua__icon">
              <FaFont />
            </div>
            <h3 className="container_home__subjects__atua__title">
              Atualidades
            </h3>
          </div>
          <div className="container_home__subjects__fisi">
            <div className="container_home__subjects__fisi__icon">
              <FaAtom />
            </div>
            <h3 className="container_home__subjects__fisi__title">Física</h3>
          </div>
        </section>

        {/* AURA */}
        <section className="container_home__difficulty">
          <h2 className="container_home__difficulty__title">Dificuldades</h2>
          <div className="container_home__difficulty__cont">
            <div className="container_home__difficulty__cont__f">
              <div className="container_home__difficulty__cont__f__ret"></div>
              <h2 className="container_home__difficulty__cont__f__desc">Fácil</h2>
            </div>
            <div className="container_home__difficulty__cont__m">
              <div className="container_home__difficulty__cont__m__ret"></div>
              <h2 className="container_home__difficulty__cont__m__desc">Médio</h2>
            </div>
            <div className="container_home__difficulty__cont__d">
              <div className="container_home__difficulty__cont__d__ret"></div>
              <h2 className="container_home__difficulty__cont__d__desc">Difícil</h2>
            </div>
          </div>
        </section>
      </section>
    </Fragment>
  );
}
