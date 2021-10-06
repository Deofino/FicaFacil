import React, { createContext, useContext, useState } from 'react';

import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

// Components 
import Main from '../components/Main/Main';
import FormularioQuestao from '../components/Main/FormularioQuestao';
import FormularioMateria from '../components/Main/FormularioMateria';
import FormularioUniversidade from '../components/Main/FormularioUniversidade';
import FormularioDificuldade from '../components/Main/FormularioDificuldade';
import FormularioLoginEmail from '../components/Main/FormularioLoginEmail';
import FormularioLoginSocial from '../components/Main/FormularioLoginSocial';
import FormularioCriarConta from '../components/Main/FormularioCriarConta';
import ComponentCookie from '../components/Main/ComponentCookie';git
import { Route, Switch, Redirect } from 'react-router-dom';


const tryLogin = async (e, emial) => {
    e.preventDefault();
    let req = await fetch(`${process.env.REACT_APP_API}/administrador/login/`,
        {
            method: 'POST',
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify({
                email: 'GuilhermeDelfino@gmail.com',
                senha: '12345678',
            })
            ,
            headers: { 'authorization': `Bearer ${localStorage.getItem('auth')}` }
        }
    );
    let res = await req.json();
    console.log(res);
    if (res.data.token === null)
    {
        alert(res.data);
    } else
    {
        let token = res.data.token;
        localStorage.setItem('auth', token);
        alert('login efetuado com sucesso');
    }
};
const authContext = createContext();

function ProvideAuth ({ children }) {
    const [ auth, setAuth ] = useState(null);
    React.useEffect(() => {
        let auth = (localStorage.getItem("auth"));
        setAuth(auth);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ localStorage.getItem("auth") ]);
    return (
        <authContext.Provider value={ auth }>
            { children }
        </authContext.Provider>
    );
}


const useAuth = () => {
    return useContext(authContext);
};

function PrivateRoute ({ children, ...rest }) {
    let auth = useAuth();
    return (
        <Route
            { ...rest }
            render={ ({ location }) =>

                auth !== null ? (
                    children
                ) : (
                    <Redirect

                        to={ {
                            pathname: "/login/adm",
                            state: { from: location }
                        } }
                    />
                )
            }
        />
    );
}

export default function Routes () {

    return (
        <ProvideAuth>

            <Switch>
                <Route exact path='/'>
                    <Header />
                    <h1 style={ { color: 'white', fontSize: 22, margin: 20 } }>Pagina inicial</h1>
                    <Footer />
                </Route>
                <PrivateRoute path='/questao'>
                    <Header />
                    <Main>
                        <FormularioQuestao />
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
                <Route path='/loginEmail'>
                    <FormularioLoginEmail />
                </Route>
                <Route path='/loginSocial'>
                    <FormularioLoginSocial />
                </Route>
                <Route path='/criarConta'>
                    <FormularioCriarConta />
                </Route>
                <Route path='/login/adm'>

                    <Header />
                    <Main>
                        <form onSubmit={ (e) => tryLogin(e) } style={ { padding: '15px 25px', background: '#777' } }>
                            <input type='text' placeholder='E-mail' style={ { background: '#555', padding: '5px 10px', borderRadius: '8px' } } />
                            <input type='password' placeholder='Senha' style={ { background: '#555', padding: '5px 10px', borderRadius: '8px' } } />
                            <button type='submit' style={ { background: '#555', padding: '5px 10px', borderRadius: '8px' } } >Entrar</button>
                        </form>
                        <br />

                        <button type='button' style={ { background: '#555', padding: '5px 10px', borderRadius: '8px' } }
                            onClick={ (e) => {
                                localStorage.removeItem('auth');

                            } }
                        >Sair da conta</button>

                    </Main>
                    <Footer />

                </Route>
                <Route path='*'>
                    <Header />
                    <Main>
                        <h1>Pagina nao encontrada</h1>
                    </Main>
                    <Footer />
                </Route>


            </Switch>
        </ProvideAuth >
    );
}