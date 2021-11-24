import React from "react";

import { QuestaoProvider } from "../components/Context/QuestaoContext";
import { SimuladoProvider } from "../components/Context/SImuladoContext";
import { ProvideAuth } from "../components/Context/AuthContext";

import { GuestRoute, UserRoute, PrivateRoute } from "./CustomRoutes";
import { Route, Switch } from "react-router-dom";
// Components
import Header from "../components/Header/Header";
import HeaderUser from "../components/Header/HeaderUser";
import Footer from "../components/Footer/Footer";


import {
  FormularioCriarConta,
  FormularioLoginAdm,
  FormularioLoginEmail,
  FormularioLoginSocial,
} from "../components/Formularios/Logins";
import { FormularioMaterias } from "../components/Formularios/Materia";
import {
  FormularioDificuldade,
  FormularioUniversidade,
  NotFound,
  DashboardAdm,
  Perfil
} from "../components/Formularios/Outros";

import ComponentHome from "../components/Main/ComponentHome";

import { FormularioQuestao } from "../components/Formularios/Questao";
import { Simulado } from "../components/Formularios/Simulado";


export default function Routes () {
  return (
    <ProvideAuth>
      <Switch>
        <Route exact path="/">
          { localStorage.getItem("auth") !== null ? (
            <Header />
          ) : (
            <HeaderUser />
          ) }
          <ComponentHome />
          <Footer />
        </Route>

        <UserRoute path="/perfil">
            <Perfil />
        </UserRoute>
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
        <PrivateRoute path="/dashboardAdm">
          <DashboardAdm />
        </PrivateRoute>
        <UserRoute path="/simulado">
          <SimuladoProvider>
            <Simulado />
          </SimuladoProvider>
        </UserRoute>
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
