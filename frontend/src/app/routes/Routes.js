import React from 'react';

// Components 
import Main from '../components/Main/Main';
import Form from '../components/Form/Form';
import { Route } from 'react-router-dom';

export default function Routes() {

    React.useEffect(() => {

        (async () => {
            let req = await fetch(`http://${window.location.hostname}/FicaFacil/backend/api/`);
            let res = await req.text();

            console.log(res);
        })();
    }, []);

    return (
        <>
            <Route exact path='/'>
                <Main>
                    <Form />
                    <div className='l-main__image'>
                        <img src={ __dirname + 'img/svg/svg-login.svg' } alt='Mulher usando celular, cadeado, seguranca' />
                    </div>
                </Main>
            </Route>

            <Route path='/produtos'>
                <Main>
                    <h1>produtos</h1>
                </Main>
            </Route>

            <Route path='/sobre'>
                <Main>
                    <h1>Sobre</h1>
                </Main>
            </Route>

            <Route path='/contato'>
                <Main>
                    <h1>Contato</h1>
                </Main>
            </Route>
        </>
    );
}