import React, { useState, Fragment, useRef } from "react";
import axios from 'axios';
import { AlertSuccess } from '../Alert/Modal'; 
import { Input, Button, } from '../Form';
import { FaBookOpen } from 'react-icons/fa';

export default function FormularioUniversidade() {
    const [ ErroUniversidade, setErroUniversidade ] = useState(null);
    const refUniversidade = useRef(null);
    const refApagarTextoUniversidade = useRef(0);

    return (
        <Fragment>
                <form method="post" id='formU' onSubmit={ (e) => {
                    e.preventDefault();

                    if (refUniversidade !== null) {
                        if (refUniversidade.current.value !== '' && refUniversidade.current.value.length >= 3) {
                            setErroUniversidade(null);
                            axios.post(process.env.REACT_APP_API + '/universidade/create/',
                                JSON.stringify({
                                    universidade: refUniversidade.current.value
                                }))
                                .then(data => console.log(data));
                               
                                AlertSuccess({ text: "Universidade inserida com sucesso", title: 'Sucesso...' });
                        }else{
                            setErroUniversidade('O campo tem que ser maior que 3');
                        }
                    } else {
                        setErroUniversidade('O campo não pode estar vazio');
                    }
                } }>
                    <Input title='Universidade:' ref={ refUniversidade } error={ ErroUniversidade } id='universidade' name='universidade' type='text' icon={ <FaBookOpen /> } inputMode='text' />
                    <Button type='submit' styleButton={ { marginTop: 20 } } onClick={ () => {

                    } }>Adicionar Universidade</Button>
                </form>

        </Fragment >
    );
}