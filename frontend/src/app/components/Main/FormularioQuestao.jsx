import React, { useState, Fragment, useRef, useEffect } from "react";
import axios from 'axios';
import { Input, Button, Select, MenuItem } from '../Form';
import { FaUser, FaImages } from 'react-icons/fa';

export default function FormularioQuestao() {

    const [ selectUniversidade, setselectUniversidade ] = useState(0);
    const [ selectAssuntoMateria, setselectAssuntoMateria ] = useState(0);
    const [ selectDificuldade, setselectDificuldade ] = useState(0);
    const [ selectAdministrador, setselectAdministrador ] = useState(0);

    const refSelectUniversidade = useRef(null);
    const refSelectAssuntoMateria = useRef(null);
    const refSelectDificuldade = useRef(null);
    const refSelectAdministrador = useRef(null);

    const [ universidades, setUniversidades ] = useState(null);
    const [ assuntoMaterias, setAssuntoMaterias ] = useState(null);
    const [ dificuldades, setDificuldades ] = useState(null);
    const [ adms, setAdms ] = useState(null);

    useEffect(() => {
        axios.get(process.env.REACT_APP_API + '/universidade/index/')
            .then(data => setUniversidades(data.data))
            .catch(error => console.error(error));

        axios.get(process.env.REACT_APP_API + '/dificuldade/index/')
            .then(data => setDificuldades(data.data))
            .catch(error => console.error(error));

        axios.get(process.env.REACT_APP_API + '/assuntoMateria/index/')
            .then(data => setAssuntoMaterias(data.data))
            .catch(error => console.error(error));

        axios.get(process.env.REACT_APP_API + '/administrador/index/')
            .then(data => setAdms(data.data))
            .catch(error => console.error(error));
    }, []);

    function submitForm(e) {
        e.preventDefault();
        let formulario = document.getElementById('form');
        let formData = new FormData(formulario);

        axios.post(process.env.REACT_APP_API + '/questao/create/', formData)
            .then(el => console.log(el.data));


    }
    return (
        <Fragment>
            <form method="post" id='form' onSubmit={ (e) => submitForm(e) } encType="multipart/form-data">
                <Input title='Titulo:' id='titulo' name='titulo' type='text' icon={ <FaUser /> } inputMode='text' />
                <Input title='Texto:' id='texto' name='texto' type='text' icon={ <FaUser /> } inputMode='text' />
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
                <Select label='Dificuldades' id='dificuldades' name='dificuldade' ref={ refSelectDificuldade }
                    onChange={ e => {
                        // console.log(e.target);
                        setselectDificuldade(e.target.value);
                    } }
                    value={ selectDificuldade }
                >
                    <MenuItem value={ 0 }>Selecione</MenuItem>
                    { dificuldades && dificuldades.data.map((el, i) =>
                        <MenuItem key={ i } value={ el[ 'idDificuldade' ] }>{ el[ 'nivelDificuldade' ] }</MenuItem>
                    ) }
                </Select>

                <Select label='Assunto Matéria' id='assuntoMateria' name='assuntoMateria' ref={ refSelectAssuntoMateria }
                    onChange={ e => {
                        // console.log(e.target);
                        setselectAssuntoMateria(e.target.value);
                    } }
                    value={ selectAssuntoMateria }
                >
                    <MenuItem value={ 0 }>Selecione</MenuItem>
                    { assuntoMaterias && assuntoMaterias.data.map((el, i) =>
                        <MenuItem key={ i } value={ el[ 'idAssuntoMateria' ] }>{ el[ 'nomeAssuntoMateria' ] }</MenuItem>
                    ) }
                </Select>
                <Select label='Administrador' id='administrador' name='administrador' ref={ refSelectAdministrador }
                    onChange={ e => {
                        // console.log(e.target);
                        setselectAdministrador(e.target.value);
                    } }
                    value={ selectAdministrador }
                >
                    <MenuItem value={ 0 }>Selecione</MenuItem>
                    { adms && adms.data.map((el, i) =>
                        <MenuItem key={ i } value={ el[ 'idAdministrador' ] }>{ el[ 'nomeAdministrador' ] }</MenuItem>
                    ) }
                </Select>
                <Button type='submit' styleButton={ { marginTop: 30 } }>Enviar</Button>
            </form>
        </Fragment >
    );
}