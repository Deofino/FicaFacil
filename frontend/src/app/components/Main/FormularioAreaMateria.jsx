import React, { useState, Fragment, useRef } from "react";
import axios from 'axios';
import { AlertError } from '../Alert/Modal';
import { Input, Button, } from '../Form';
import { FaBookOpen } from 'react-icons/fa';

export default function FormularioAreaMateria() {
    const [ ErroAreaMateria, setErroAreaMateria ] = useState(null);
    const refAreaMateria = useRef(null);

    return (
        <Fragment>
            <Fragment>
                <form method="post" id='formAM' onSubmit={ (e) => {
                    e.preventDefault();

                    if (refAreaMateria !== null) {
                        if (refAreaMateria.current.value !== '' && refAreaMateria.current.value.length >= 4) {
                            setErroAreaMateria(null);
                            axios.post(process.env.REACT_APP_API + '/areaMateria/create/',
                                JSON.stringify({
                                    areaMateria: refAreaMateria.current.value
                                }))
                                .then(data => console.log(data));

                        } else {
                            // setErroAreaMateria('O campo tem que ser maior que 4');
                            AlertError({ text: "Tenha mais que 4 caracteres", title: 'Ops...' });
                        }
                    } else {
                        setErroAreaMateria('O campo nao pode estar vazio');
                    }
                } }>
                    <Input title='Area Matéria:' ref={ refAreaMateria } error={ ErroAreaMateria } id='areamateria' name='areamateria' type='text' icon={ <FaBookOpen /> } inputMode='text' />
                    <Button type='submit' styleButton={ { marginTop: 20 } } onClick={ () => {

                    } }>Adicionar Area Matéria</Button>
                </form>
            </Fragment>

            <Fragment>

            </Fragment>


        </Fragment >
    );
}