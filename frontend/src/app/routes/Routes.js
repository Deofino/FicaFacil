import React from 'react';

// Components 
import Main from '../components/Main/Main';
import { Table } from '../components/Form/';
import FormularioQuestao from '../components/Main/FormularioQuestao';
import FormularioAreaMateria from '../components/Main/FormularioAreaMateria';
import FormularioMateria from '../components/Main/FormularioMateria';
import FormularioAssuntoMateria from '../components/Main/FormularioAssuntoMateria';
import FormularioUniversidade from '../components/Main/FormularioUniversidade';
import FormularioDificuldade from '../components/Main/FormularioDificuldade';
import FormularioResposta from '../components/Main/FormularioResposta';
import FormularioSugestaoVideo from '../components/Main/FormularioSugestaoVideo';
import { Route, Switch } from 'react-router-dom';


export default function Routes () {

    return (
        <Switch>
            <Route exact path='/'>
                <h1 style={ { color: 'white', fontSize: 22, margin: 20 } }>Pagina inicial</h1>
            </Route>
            <Route path='/questao'>
                <Main>
                    <FormularioQuestao />
                </Main>
            </Route>
            <Route path='/areamateria'>
                <Main>
                    <FormularioAreaMateria />
                </Main>
            </Route>
            <Route path='/materia'>
                <Main>
                    <FormularioMateria />
                </Main>
            </Route>
            <Route path='/assuntomateria'>
                <Main>
                    <FormularioAssuntoMateria />
                </Main>
            </Route>
            <Route path='/universidade'>
                <Main>
                    <FormularioUniversidade />
                </Main>
            </Route>
            <Route path='/dificuldade'>
                <Main>
                    <FormularioDificuldade />
                </Main>
            </Route>
            <Route path='/resposta'>
                <Main>
                    <FormularioResposta />
                </Main>
            </Route>
            <Route path='/sugestaoVideo'>
                <Main>
                    <FormularioSugestaoVideo />
                </Main>
            </Route>
            <Route path='/table'>
                <Main>
                    <Table />
                </Main>
            </Route>
            <Route path='*'>
                <Main>
                    <h1>Pagina nao encontrada</h1>
                </Main>
            </Route>

        </Switch>
    );
}