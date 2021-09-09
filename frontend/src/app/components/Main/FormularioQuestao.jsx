import React, { useState, Fragment, useRef, useEffect } from "react";
import axios from 'axios';
import { Input, Button, Select, MenuItem } from '../Form';
import { FaCalendar, FaUser, FaImages, FaUniversity, FaListAlt } from 'react-icons/fa';

export default function FormularioQuestao() {
    const [ alternativas, setAlternativas ] = useState([]);
    const [ selectUniversidade, setselectUniversidade ] = useState(0);
    const refSelectUniversidade = useRef(null);
    const [ universidades, setUniversidades ] = useState(null);
    useEffect(() => {
        axios.get(process.env.REACT_APP_API + '/universidade/index/')
            .then(data => setUniversidades(data.data))
            .catch(error => console.error(error));  
    }, []);

    const [ inputAlternativa, setInputAlternativa ] = useState('');
    const refUniversidade = useRef(null);

    function submitForm(e) {
        e.preventDefault();
        let formulario = document.getElementById('form');
        let formData = new FormData(formulario);
        formData.append('alternativas', JSON.stringify(alternativas));

        axios.post(process.env.REACT_APP_API + '/questao/index/', formData)
            .then(el => console.log(el.data));
    }
    return (
        <Fragment>
            <form method="post" id='form' onSubmit={ (e) => submitForm(e) } encType="multipart/form-data">
                <Input title='Nome:' id='nome' name='nome' type='text' icon={ <FaUser /> } inputMode='text' />
                <Input title='Data:' id='date' name='date' icon={ <FaCalendar /> } type='date' inputMode='date' />
                <Input title='images' accept='image/*' name='images[]' multiple={ true } type='file' icon={ <FaImages /> } />
                <Select label='Universidades' id='universidade' name='universidade' ref={ refSelectUniversidade }
                    onChange={ e => {
                        // console.log(e.target);
                        setselectUniversidade(e.target.value);
                    } }
                    value={ selectUniversidade }
                >
                    <MenuItem value={ 0 }>Selecione</MenuItem>
                    { universidades && universidades.data.map((el, i) =>
                        <MenuItem key={ i } value={ el[ 'idUniversidade' ] }>{ el[ 'nomeUniversidade' ] }</MenuItem>
                    ) }
                </Select>
                <Input title='Alternativa' value={ inputAlternativa } icon={ <FaListAlt /> } onChange={ ({ target }) => {
                    setInputAlternativa(target.value);
                } } />
                <Button type='button' styleButton={ { marginTop: 20 } } onClick={ () => {
                    if (!alternativas.includes(inputAlternativa) && inputAlternativa !== '') {
                        setAlternativas([ ...alternativas, inputAlternativa ]);
                        setInputAlternativa('');
                    }
                } }>Adicionar alternativa</Button>
                <Button type='submit' styleButton={ { marginTop: 30 } }>Enviar</Button>
            </form>

            <Fragment>
                <form method="post" id='formU' onSubmit={ (e) => {
                    e.preventDefault();
                    axios.post(process.env.REACT_APP_API + '/universidade/create/',
                        JSON.stringify({
                            universidade: refUniversidade.current.value
                        }))
                        .then(data => console.log(data));

                } }>
                    <Input title='Universidade:' ref={ refUniversidade } id='universidade' name='universidade' type='text' icon={ <FaUniversity /> } inputMode='text' />
                    <Button type='submit' styleButton={ { marginTop: 20 } }>Adicionar Universidade</Button>
                </form>
            </Fragment>

        </Fragment >
    );
}

