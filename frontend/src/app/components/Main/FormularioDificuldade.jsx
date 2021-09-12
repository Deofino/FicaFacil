import React, { useState, Fragment, useRef } from "react";
import axios from 'axios';
import { AlertSuccess } from '../Alert/Modal'; 
import { Input, Button, } from '../Form';
import { FaBookOpen } from 'react-icons/fa';

export default function FormularioDificuldade() {
    const [ ErroDificuldade, setErroDificuldade ] = useState(null);
    const refDificuldade = useRef(null);

    return (
        <Fragment>
                <form method="post" id='formU' onSubmit={ (e) => {
                    e.preventDefault();

                    if (refDificuldade !== null) {
                        if (refDificuldade.current.value !== '' && refDificuldade.current.value.length > 4) {
                            setErroDificuldade(null);
                            axios.post(process.env.REACT_APP_API + '/dificuldade/create/',
                                JSON.stringify({
                                    dificuldade: refDificuldade.current.value
                                }))
                                /* .then(data => console.log(data)); */
                                .then(refDificuldade.current.value ='');
                               
                                AlertSuccess({ text: "Dificuldade inserida com sucesso", title: 'Sucesso...' });
                                                                 
                        }else{
                            setErroDificuldade('O campo tem que ser maior que 4');
                        }
                    } else {
                        setErroDificuldade('O campo não pode estar vazio');
                    }
                } }>
                    <Input title='Dificuldade:' ref={ refDificuldade } error={ ErroDificuldade } id='dificuldade' name='dificuldade' type='text' icon={ <FaBookOpen /> } inputMode='text' />
                    <Button type='submit' styleButton={ { marginTop: 20 } } onClick={ () => {

                    } }>Adicionar Dificuldade</Button>
                </form>

        </Fragment >
    );
}