import React, { useState, Fragment, useRef, useEffect } from "react";
import axios from 'axios';
import { Input, Button, Select, MenuItem } from '../Form';
import { FaCalendar, FaUser, FaImages, FaUniversity, FaBookOpen, FaListAlt } from 'react-icons/fa';

export default function FormularioQuestao() {
    const [ alternativas, setAlternativas ] = useState([]);
    const [ selectUniversidade, setselectUniversidade ] = useState(0);
    const [ selectAreaMateria, setselectAreaMateria ] = useState(0);
    const refSelectUniversidade = useRef(null);
    const refSelectAreaMateria = useRef(null);
    const [ universidades, setUniversidades ] = useState(null);
    const [ areamaterias, setAreaMaterias ] = useState(null);
    useEffect(() => {
        axios.get(process.env.REACT_APP_API + '/universidade/index/')
            .then(data => setUniversidades(data.data))
            .catch(error => console.error(error));
        axios.get(process.env.REACT_APP_API + '/areamateria/index/')  
        .then(data => setAreaMaterias(data.data))
        .catch(error => console.error(error));  
    }, []);


    const [ inputAlternativa, setInputAlternativa ] = useState('');
    const refUniversidade = useRef(null);
    const refAreaMateria = useRef(null);
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
                <Select label='Area Matéria' id='areamateria' name='areamateria' ref={ refSelectAreaMateria }
                    onChange={ e => {
                        // console.log(e.target);
                        setselectAreaMateria(e.target.value);
                    } }
                    value={ selectAreaMateria }
                >
                    <MenuItem value={ 0 }>Selecione</MenuItem>
                    { areamaterias && areamaterias.data.map((el, i) =>
                        <MenuItem key={ i } value={ el[ 'idAreamateria' ] }>{ el[ 'nomeAreaMateria' ] }</MenuItem>
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

            <Fragment>
                <form method="post" id='formAM' onSubmit={ (e) => {
                    e.preventDefault();
                    axios.post(process.env.REACT_APP_API + '/areamateria/create/',
                        JSON.stringify({
                            areaMateria: refAreaMateria.current.value
                        }))
                        .then(data => console.log(data));

                } }>
                    <Input title='Area Matéria:' ref={ refAreaMateria } id='areamateria' name='areamateria' type='text' icon={ <FaBookOpen /> } inputMode='text' />
                    <Button type='button' styleButton={ { marginTop: 20 } } onClick={ () => {

                    } }>Adicionar Area Matéria</Button>
                </form>
            </Fragment>

            <Fragment>

            </Fragment>


        </Fragment >
    );
}

