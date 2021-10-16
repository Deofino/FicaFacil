import React from "react";

import { QuestaoProvider } from "../components/Context/QuestaoContext";
import { SimuladoProvider } from "../components/Context/SImuladoContext";
import { ProvideAuth } from "../components/Context/AuthContext";

import { GuestRoute, UserRoute, PrivateRoute } from "./CustomRoutes";
import { Route, Switch } from "react-router-dom";
// Components
import Header from "../components/Header/Header";
import HeaderUser from "../components/Header/NavBarUser";
import Footer from "../components/Footer/Footer";

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

export default function Routes() {
  return (
    <ProvideAuth>
      <Switch>
        <Route exact path="/">
          {localStorage.getItem("auth") !== null ? (
            <Header />
          ) : (
            <HeaderUser></HeaderUser>
          )}
          <h1 style={{ color: "white", fontSize: 22, margin: 20 }}>
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
