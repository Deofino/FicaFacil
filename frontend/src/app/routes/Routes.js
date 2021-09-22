import React from 'react';

import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

// Components 
import Main from '../components/Main/Main';
import FormularioQuestao from '../components/Main/FormularioQuestao';
import FormularioAreaMateria from '../components/Main/FormularioAreaMateria';
import FormularioMateria from '../components/Main/FormularioMateria';
import FormularioAssuntoMateria from '../components/Main/FormularioAssuntoMateria';
import FormularioUniversidade from '../components/Main/FormularioUniversidade';
import FormularioDificuldade from '../components/Main/FormularioDificuldade';
import FormularioResposta from '../components/Main/FormularioResposta';
import FormularioSugestaoVideo from '../components/Main/FormularioSugestaoVideo';
import FormularioLoginEmail from '../components/Main/FormularioLoginEmail';
import FormularioLoginSocial from '../components/Main/FormularioLoginSocial';
import FormularioCriarConta from '../components/Main/FormularioCriarConta';
import { Route, Switch } from 'react-router-dom';


export default function Routes () {

    return (
        <Switch>
            <Route exact path='/'>
                <Header />
                <h1 style={ { color: 'white', fontSize: 22, margin: 20 } }>Pagina inicial</h1>
                <Footer />
            </Route>
            <Route path='/questao'>
                <Header />
                <Main>
                    <FormularioQuestao />
                </Main>
                <Footer />
            </Route>
            <Route path='/areamateria'>
                <Header />
                <Main>
                    <FormularioAreaMateria />
                </Main>
                <Footer />
            </Route>
            <Route path='/materia'>
                <Header />
                <Main>
                    <FormularioMateria />
                </Main>
                <Footer />
            </Route>
            <Route path='/assuntomateria'>
                <Header />
                <Main>
                    <FormularioAssuntoMateria />
                </Main>
                <Footer />
            </Route>
            <Route path='/universidade'>
                <Header />
                <Main>
                    <FormularioUniversidade />
                </Main>
                <Footer />
            </Route>
            <Route path='/dificuldade'>
                <Header />
                <Main>
                    <FormularioDificuldade />
                </Main>
                <Footer />
            </Route>
            <Route path='/resposta'>
                <Header />
                <Main>
                    <FormularioResposta />
                </Main>
                <Footer />
            </Route>
            <Route path='/sugestaoVideo'>
                <Header />
                <Main>
                    <FormularioSugestaoVideo />
                </Main>
                <Footer />
            </Route>
            <Route path='/loginEmail'>
                <FormularioLoginEmail />
            </Route>
            <Route path='/loginSocial'>
                <FormularioLoginSocial />
            </Route>
            <Route path='/criarConta'>
                <FormularioCriarConta />
            </Route>
            <Route path='*'>
                <Header />
                <Main>
                    <h1>Pagina nao encontrada</h1>
                </Main>
                <Footer />
            </Route>


        </Switch>
    );
}