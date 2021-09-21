import React, { Fragment, } from "react";
import { Button, Input} from '../Form';
import { FaAt,  FaCalendarAlt, FaUser, FaLock } from 'react-icons/fa';
import { Link } from "react-router-dom";

export default function FormularioCriarConta() {
    return(
        <Fragment>      
            <div className="login_field">
            <h3 className="title_login">Crie sua conta</h3>
                <div className="formCreate">
                    <form action="" method="post" id="formC">
                        <Input title="Nome Completo" id="nameC" name="nameC" type="text" icon={<FaUser />} inputMode='text' />
                        <Input title="E-mail" id="email" name="email" type="text" icon={<FaAt />} inputMode='text' />
                        <Input title="Data de Nascimento" id="dtNasc" name="dtNasc" type="date" icon={<FaCalendarAlt />} inputMode='text' />
                        <Input title="Senha" id="passw" name="passw" type="password" icon={<FaLock />} />
                        <Input title="Confirmar senha" id="confPassw" name="confPassw" type="password" icon={<FaLock />} />
                        <Button type='submit'>Criar</Button>

                        <div className="voltar">
                            <Link to="/loginSocial">
                                Voltar
                            </Link>
                        </div>
                    </form>
                </div>
              
            </div> 
        </Fragment>
    );
}