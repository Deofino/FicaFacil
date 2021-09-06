import React from 'react';

// Components 
import Main from '../components/Main/Main';
import FormularioQuestao from '../components/Main/FormularioQuestao';
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
        </>
    );
}