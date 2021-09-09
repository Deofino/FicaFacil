import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';
import { Input, Select, MenuItem, Button } from '../Form/';
import { AlertError } from '../Alert/Modal';
export default function FormularioAssuntoMateria() {

    const [ assuntoMateria, setAssuntoMateria ] = useState([]);
    const [ selectedMateria, setSelectedMateria ] = useState(0);
    const refAssuntoMateria = useRef(null);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/materia/index/`)
            .then(value => setAssuntoMateria(value.data.data))
            .catch(error => console.error(error));
    }, []);

    const submitForm = (e) => {
        e.preventDefault();

        axios.post(`${process.env.REACT_APP_API}/assuntoMateria/create/`,
            JSON.stringify({
                assuntomateria: refAssuntoMateria.current.value || null,
                materia: selectedMateria,
            }))
            .then(value => {
                console.log(value.data);
            })
            .catch(error => console.log(error));
    };

    return (
        <React.Fragment>
            <form id="formuAS" className="c-formAssuntoMateria" onSubmit={ submitForm }>
                <h2 className='c-formMateria__headline'>Assunto Matéria</h2>
                <Input title="Assunto Matéria" id="nomeassuntoMateria" className="c-formAssuntoMateria__input" ref={ refAssuntoMateria } name="assuntoMateria" />
                <Select className='c-formAssuntoMateria__select' name='assuntoMateria' id='assuntoMateria'
                    value={ selectedMateria } onChange={ ({ target }) => setSelectedMateria(target.value) }>
                    <MenuItem value='0'>Selecione</MenuItem>
                    { assuntoMateria !== [] && assuntoMateria.map(item =>
                        <MenuItem value={ item.idMateria } key={ item.idMateria }>{ item.nomeMateria }</MenuItem>) }
                </Select>
                <Button className='c-formAssuntoMateria__submit' styleButton={ { marginTop: 20 } } type='submit'>Cadastrar</Button>
            </form>
        </React.Fragment>
    );
}