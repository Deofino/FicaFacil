import React, { Fragment, } from "react";
import { Input, Button, } from '../Form';
import { FaAt, FaLock, } from 'react-icons/fa';
import { Link } from "react-router-dom";

export default function FormularioLoginEmail() {
    return(
        <Fragment>
            <div className="login_field">
                <form method="post" id="formLogin">
                    <h3>Entrar com E-mail</h3>
                    <Input title="E-mail" id="email" name="email" type="text" icon={<FaAt />} inputMode='text' />
                    <Input title="Senha" id="passw" name="passw" type="password" icon={<FaLock />}/>
                    <label className="l_esenha">Esqueceu a senha? clique aqui!</label>
                    <Button type='submit'>Entrar</Button>
                   
                    <div className="voltar">
                        <Link to="/loginSocial">
                                Voltar
                        </Link>
                    </div>
                </form>
            </div>
        </Fragment>
    );

}