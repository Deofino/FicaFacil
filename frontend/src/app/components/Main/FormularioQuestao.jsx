import React, { useState, Fragment, useRef } from "react";
import axios from 'axios';
import { Input, Button } from '../Form';
import { FaCalendar, FaUser, FaImages } from 'react-icons/fa';

export default function FormularioQuestao() {
    const [ alternativas, setAlternativas ] = useState([]);
    const [ inputAlternativa, setInputAlternativa ] = useState('');
    const refFile = useRef(null);
    function submitForm(e) {
        e.preventDefault();
        let formulario = document.getElementById('form');
        let formData = new FormData(formulario);
        formData.append('alternativas', JSON.stringify(alternativas));

        axios.post(process.env.REACT_APP_API + '/questao/index/', formData)
            .then(el => console.log(el.data));
    }
    React.useEffect(() => {
        console.log(refFile.current.value);
    }, [ refFile ]);
    return (
        <Fragment>
            <form method="post" id='form' onSubmit={ (e) => submitForm(e) } encType="multipart/form-data">
                <Input title='Nome:' id='nome' name='nome' type='text' icon={ <FaUser /> } inputMode='text' />
                <Input title='Data:' id='date' name='date' icon={ <FaCalendar /> } type='date' inputMode='date' />
                <Input title='images' ref={ refFile } accept='image/*' name='images[]' multiple={ true } type='file' icon={ <FaImages /> } />
                <Input title='Alternativa' value={ inputAlternativa } onChange={ ({ target }) => {
                    setInputAlternativa(target.value);
                } } />
                <Button type='button' onClick={ () => {
                    if (!alternativas.includes(inputAlternativa) && inputAlternativa !== '') {
                        setAlternativas([ ...alternativas, inputAlternativa ]);
                        setInputAlternativa('');
                    }
                } }>Adicionar alternativa</Button>
                <Button type='submit' styleButton={ { marginTop: 30 } }>Enviar</Button>
            </form>
        </Fragment >
    );
}

