import React, { Fragment, } from "react";
import { Input, } from '../Form';
import { FaAt, FaLock, FaFont} from 'react-icons/fa';
import { Link } from "react-router-dom";
import Logo from "../../../img/project/logo-branca.png";

export default function FormularioLoginAdm() {
  return (
    <Fragment>
      <section className="login-main" style={{background: '#0077b5'}}>
        <div className="login_field">
          <div className="login_field__logo" style={{background: '#6f42c1'}}>
            <img src={Logo} alt="Fica Fácil" />
          </div>
          <div className="login_field__form">
            <form method="post" id="formLogin">
              <h3 className="login_field__title">Seja bem-vindo administrador!</h3>
              <Input
                title="Nome"
                id="nome"
                name="nome"
                type="text"
                icon={<FaFont />}
                inputMode="text"
              />
               <Input
                title="E-mail"
                id="email"
                name="email"
                type="text"
                icon={<FaAt />}
                inputMode="text"
              />
              <Input
                title="Senha"
                id="passw"
                name="passw"
                type="password"
                icon={<FaLock />}
              />

              <Link to="#" className="login_field__esenha">
                Esqueceu a senha? clique aqui!
              </Link>

              <div className="login_field btn" style={{background: '#6f42c1'}}>
                <Link className="login_field__link" to="#" style={{background: '#6f42c1'}}>
                  <span className="login_field__btn" style={{background: '#6f42c1'}}>Entrar</span>
                </Link>
              </div>
            </form>
          </div>
        </div>
        <div className="wave">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path d="M0,256L60,240C120,224,240,192,360,165.3C480,139,600,117,720,138.7C840,160,960,224,1080,245.3C1200,267,1320,245,1380,234.7L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
          </svg>
        </div>
      </section>
    </Fragment>
  );
}
