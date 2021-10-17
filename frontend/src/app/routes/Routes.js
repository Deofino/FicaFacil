import React from "react";

<<<<<<< HEAD
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
=======
>>>>>>> 7a818b7bfc195f36a858fa62749d0309abda21ff
import { QuestaoProvider } from "../components/Context/QuestaoContext";
import { SimuladoProvider } from "../components/Context/SImuladoContext";
import { ProvideAuth } from "../components/Context/AuthContext";

<<<<<<< HEAD
// Components 
import Main from '../components/Main/Main';
import FormularioQuestao from '../components/Main/FormularioQuestao';
import FormularioMateria from '../components/Main/FormularioMateria';
import FormularioUniversidade from '../components/Main/FormularioUniversidade';
import FormularioDificuldade from '../components/Main/FormularioDificuldade';
import FormularioMaterias from '../components/Main/FormularioMaterias';
import ComponentCookie from '../components/Main/ComponentCookie';
import ComponentHome from '../components/Main/ComponentHome';
import FormularioLoginEmail from '../components/Main/FormularioLoginEmail';
import FormularioLoginSocial from '../components/Main/FormularioLoginSocial';
import FormularioCriarConta from '../components/Main/FormularioCriarConta';
import FormularioLoginAdm from '../components/Main/FormularioLoginAdm';
import NotFound from '../components/Main/NotFound';
import { Route, Switch, Redirect } from 'react-router-dom';
=======
import { GuestRoute, UserRoute, PrivateRoute } from "./CustomRoutes";
import { Route, Switch } from "react-router-dom";
// Components
import Header from "../components/Header/Header";
import HeaderUser from "../components/Header/NavBarUser";
import Footer from "../components/Footer/Footer";
>>>>>>> 7a818b7bfc195f36a858fa62749d0309abda21ff

import {
  FormularioCriarConta,
  FormularioLoginAdm,
  FormularioLoginEmail,
  FormularioLoginSocial,
} from "../components/Formularios/Logins";
import { FormularioMaterias } from "../components/Formularios/Materia";
import {
  ComponentCookie,
  FormularioDificuldade,
  FormularioUniversidade,
  NotFound,
} from "../components/Formularios/Outros";

import { FormularioQuestao } from "../components/Formularios/Questao";
import { Simulado } from "../components/Formularios/Simulado";

export default function Routes () {
<<<<<<< HEAD

    return (
        <ProvideAuth>

            <Switch>
                <Route exact path='/'>
                    { localStorage.getItem('auth') !== null ? <Header /> : <h1>Menu user</h1> }

                    <h1 style={ { color: 'white', fontSize: 22, margin: 20 } }>Pagina inicial</h1>
                    <Footer />
                </Route>
                <PrivateRoute path='/questao'>
                    <Header />
                    <Main>
                        <QuestaoProvider>
                            <FormularioQuestao />
                        </QuestaoProvider>
                    </Main>
                    <Footer />
                </PrivateRoute>
                <PrivateRoute path='/materia'>
                    <Header />
                    <Main>
                        <FormularioMateria />
                    </Main>
                    <Footer />
                </PrivateRoute>
                <PrivateRoute path='/universidade'>
                    <Header />
                    <Main>
                        <FormularioUniversidade />
                    </Main>
                    <Footer />
                </PrivateRoute>
                <PrivateRoute path='/dificuldade'>
                    <Header />
                    <Main>
                        <FormularioDificuldade />
                    </Main>
                    <Footer />
                </PrivateRoute>
                <PrivateRoute path='/materias'>
                    <Header />
                    <Main>
                        <FormularioMaterias />
                    </Main>
                    <Footer />
                </PrivateRoute>
                <GuestRoute path='/cookie'>
                    <ComponentCookie />
                </GuestRoute>
                <GuestRoute path='/home'>
                <Header />
                    <ComponentHome />
                 <Footer />
                </GuestRoute>
                <GuestRoute path='/entrar/email'>
                    <FormularioLoginEmail />
                </GuestRoute>
                <GuestRoute exact path='/entrar'>
                    <FormularioLoginSocial />
                </GuestRoute>
                <GuestRoute exact path='/criar'>
                    <FormularioCriarConta />
                </GuestRoute>
                <GuestRoute exact path='/entrar/adm'>
                    <FormularioLoginAdm />
                </GuestRoute>
                <GuestRoute path='/entrar/administrador'>
                    <FormularioLoginAdm />
                </GuestRoute>
                <Route path='*'>
                    <NotFound />
                </Route>
            </Switch>
        </ProvideAuth >
    );
}
=======
  return (
    <ProvideAuth>
      <Switch>
        <Route exact path="/">
          { localStorage.getItem("auth") !== null ? (
            <Header />
          ) : (
            <HeaderUser />
          ) }
          <h1 style={ { color: "white", fontSize: 22, margin: 20 } }>
            Pagina inicial
          </h1>
          <Footer />
        </Route>
        <PrivateRoute path="/questao">
          <QuestaoProvider>
            <FormularioQuestao />
          </QuestaoProvider>
        </PrivateRoute>
        <PrivateRoute path="/universidade">
          <FormularioUniversidade />
        </PrivateRoute>
        <PrivateRoute path="/dificuldade">
          <FormularioDificuldade />
        </PrivateRoute>
        <PrivateRoute path="/materias">
          <FormularioMaterias />
        </PrivateRoute>
        <UserRoute path="/simulado">
          <SimuladoProvider>
            <Simulado />
          </SimuladoProvider>
        </UserRoute>
        <GuestRoute path="/cookie">
          <ComponentCookie />
        </GuestRoute>
        <GuestRoute path="/entrar/email">
          <FormularioLoginEmail />
        </GuestRoute>
        <GuestRoute exact path="/entrar">
          <FormularioLoginSocial />
        </GuestRoute>
        <GuestRoute exact path="/criar">
          <FormularioCriarConta />
        </GuestRoute>
        <GuestRoute exact path="/entrar/adm">
          <FormularioLoginAdm />
        </GuestRoute>
        <GuestRoute path="/entrar/administrador">
          <FormularioLoginAdm />
        </GuestRoute>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </ProvideAuth>
  );
}
>>>>>>> 7a818b7bfc195f36a858fa62749d0309abda21ff
