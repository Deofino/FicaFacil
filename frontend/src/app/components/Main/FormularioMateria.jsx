import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';
import { Input, Select, MenuItem, Button } from '../Form/';
import { AlertSuccess } from '../Alert/Modal';

export default function FormularioMateria() {

    const [ areasMaterias, setAreasMaterias ] = useState([]);
    const [ selectedAreaMateria, setSelectedAreaMateria ] = useState(0);
    const refMateria = useRef(null);

    const [ ErroMateria, setErroMateria ] = useState(null);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/areaMateria/index/`)
            .then(value => setAreasMaterias(value.data.data))
            .catch(error => console.error(error));
    }, []);

    const submitForm = (e) => {
        e.preventDefault();

            if (refMateria !== null) {
                if (refMateria.current.value !== '' && refMateria.current.value.length >= 4) {
                    setErroMateria(null);
                    axios.post(`${process.env.REACT_APP_API}/materia/create/`,
                    JSON.stringify({
                         materia: refMateria.current.value || null,
                         area: selectedAreaMateria,
                    }))
                    .then(value => {
                        console.log(value.data);
                    })
                    .catch(error => console.log(error));
                       
                        AlertSuccess({ text: " Matéria inserida com sucesso", title: 'Sucesso...' });
                }else{
                    setErroMateria('O campo tem que ser maior que 4');
                }
            } else {
                setErroMateria('O campo não pode estar vazio');
            
            }
    };

    return (
        <React.Fragment>
                <form method="post" id="formM" className="c-formMateria" onSubmit={ submitForm }>
                <h2 className='c-formMateria__headline'>Materia</h2>
                <Input title="Materia" id="nomeMateria"  error={ ErroMateria }className="c-formMateria__input" ref={ refMateria } name="materia" />
                <Select className='c-formMateria__select' name='areaMateria' id='areaMateria'
                    value={ selectedAreaMateria } onChange={ ({ target }) => setSelectedAreaMateria(target.value) }>
                    <MenuItem value='0'>Selecione</MenuItem>
                    { areasMaterias !== [] && areasMaterias.map(item =>
                        <MenuItem value={ item.idAreaMateria } key={ item.idAreaMateria }>{ item.nomeAreaMateria }</MenuItem>) }
                </Select>
                <Button className='c-formMateria__submit' styleButton={ { marginTop: 20 } } type='submit'>Cadastrar</Button>
            </form>
        </React.Fragment>
    );
}

