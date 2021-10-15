import React, { createContext, useContext, useState } from 'react';

import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import axios from 'axios';
import { QuestaoProvider } from "../components/Context/QuestaoContext";

// Components 
import Main from '../components/Main/Main';
import FormularioQuestao from '../components/Main/FormularioQuestao';
import FormularioMateria from '../components/Main/FormularioMateria';
import FormularioUniversidade from '../components/Main/FormularioUniversidade';
import FormularioDificuldade from '../components/Main/FormularioDificuldade';
import FormularioMaterias from '../components/Main/FormularioMaterias';
import FormularioLoginEmail from '../components/Main/FormularioLoginEmail';
import FormularioLoginSocial from '../components/Main/FormularioLoginSocial';
import FormularioCriarConta from '../components/Main/FormularioCriarConta';
import FormularioLoginAdm from '../components/Main/FormularioLoginAdm';
import NotFound from '../components/Main/NotFound';
import ComponentCookie from '../components/Main/ComponentCookie';
import { Route, Switch, Redirect } from 'react-router-dom';

const authContext = createContext();

function ProvideAuth ({ children }) {
    const [ auth, setAuth ] = useState(null);
    React.useEffect(() => {
        let auth = (localStorage.getItem("auth")) || null;
        setAuth(auth);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ localStorage.getItem("auth") ]);
    const [ user, setUser ] = useState(null);
    React.useEffect(() => {
        let user = (localStorage.getItem("user")) || null;
        setUser(user);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ localStorage.getItem("user") ]);
    return (
        <authContext.Provider value={ { auth, user } }>
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

                auth.auth === null ? (
                    <Redirect
                        to={ {
                            pathname: "/entrar/administrador",
                            state: { from: location }
                        } }
                    />
                ) : (
                    children
                )
            }
        />
    );
}
function UserRoute ({ children, ...rest }) {
    let auth = useAuth();
    return (
        <Route
            { ...rest }
            render={ ({ location }) =>

                auth.user !== null ? (
                    children
                ) : (
                    <Redirect

                        to={ {
                            pathname: "/entrar",
                            state: { from: location }
                        } }
                    />
                )
            }
        />
    );
}
function GuestRoute ({ children, ...rest }) {
    let auth = useAuth();
    return (
        <Route
            { ...rest }
            render={ ({ location }) =>
                auth.user === null && auth.auth === null ? (
                    children
                ) : (
                    <Redirect
                        to={ {
                            pathname: location.state !== undefined ? location.state.from.pathname : '/',
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