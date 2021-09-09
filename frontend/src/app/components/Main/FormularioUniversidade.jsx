import React, { useState, Fragment, useRef, useEffect } from "react";
import axios from 'axios';
import { Input, Button } from '../Form';
import { AlertError } from '../Alert/Modal';
import { FaUniversity } from 'react-icons/fa';

export default function FormularioUniversidade() {
    const refUniversidade = useRef(null);
    const [ universidades, setUniversidades ] = useState(null);
    const [ ErroUniversidade, setErroUniversidade ] = useState(null);
    useEffect(() => {
        axios.get(process.env.REACT_APP_API + '/universidade/index/')
            .then(data => setUniversidades(data.data))
            .catch(error => console.error(error));  
    }, []);

    return (
        <Fragment>
                <form method="post" id='formU' onSubmit={ (e) => {
                    e.preventDefault();

                    if (refUniversidade !== null) {
                        if (refUniversidade.current.value !== '' && refUniversidade.current.value.length > 3) {
                            setErroUniversidade(null);
                            axios.post(process.env.REACT_APP_API + '/universidade/create/',
                                JSON.stringify({
                                    universidades: refUniversidade.current.value
                                }))
                                .then(data => console.log(data));

                        } else {
                            // setErroAreaMateria('O campo tem que ser maior que 4');
                            AlertError({ text: "Campo deve conter mais do que 3 caracteres", title: 'Atenção...' });
                        }
                    } else {
                        setErroUniversidade('O campo nao pode estar vazio');
                    }

                    } }>
                <Input title='Universidade:' ref={ refUniversidade } id='universidade' name='universidade' type='text' icon={ <FaUniversity /> } inputMode='text' />
                    <Button type='submit' styleButton={ { marginTop: 20 } }>Adicionar Universidade</Button>
                </form>
            </Fragment>
    );
}