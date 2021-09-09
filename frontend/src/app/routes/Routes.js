import React from 'react';

// Components 
import Main from '../components/Main/Main';
import FormularioQuestao from '../components/Main/FormularioQuestao';
import FormularioMateria from '../components/Main/FormularioMateria';
import { Route } from 'react-router-dom';

export default function Routes() {

    return (
        <>
            <Route exact path='/'>
                <h1>ola</h1>
            </Route>
            <Route path='/questao'>
                <Main>
                    <FormularioQuestao />
                </Main>
            </Route>
            <Route path='/materia'>
                <Main>
                    <FormularioMateria />
                </Main>
            </Route>
        </>
    );
}