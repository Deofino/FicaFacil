import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';
import { Input, Select, MenuItem, Button } from '../Form/';
export default function FormularioQuestao() {

    const [ areasMaterias, setAreasMaterias ] = useState([]);
    const [ selectedAreaMateria, setSelectedAreaMateria ] = useState(0);
    const refMateria = useRef(null);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/areaMateria/index/`)
            .then(value => setAreasMaterias(value.data.data))
            .catch(error => console.error(error));
    }, []);

    const submitForm = (e) => {
        e.preventDefault();

        axios.post(`${process.env.REACT_APP_API}/materia/create/`,
            JSON.stringify({
                materia: refMateria.current.value || null,
                area: selectedAreaMateria,
            }))
            .then(value => {
                console.log(value.data);
            })
            .catch(error => console.log(error));
    };

    return (
        <React.Fragment>
            <form id="formulario" className="c-formMateria" onSubmit={ submitForm }>
                <h2 className='c-formMateria__headline'>Materia</h2>
                <Input title="Materia" id="nomeMateria" className="c-formMateria__input" ref={ refMateria } name="materia" />
                <Select className='c-formMateria__select' name='areaMateria' id='areaMateria'
                    value={ selectedAreaMateria } onChange={ ({ target }) => setSelectedAreaMateria(target.value) }>
                    <MenuItem value='0'>Selecione</MenuItem>
                    { areasMaterias !== [] && areasMaterias.map(item =>
                        <MenuItem value={ item.idAreaMateria } key={ item.idAreaMateria }>{ item.nomeAreaMateria }</MenuItem>) }
                </Select>
                <Button className='c-formMateria__submit' type='submit'>Cadastrar</Button>
            </form>
        </React.Fragment>
    );
}

