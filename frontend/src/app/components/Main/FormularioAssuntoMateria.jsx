import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';
import { Input, Select, MenuItem, Button } from '../Form/';
import { AlertSuccess, AlertError } from '../Alert/Modal';
export default function FormularioAssuntoMateria() {

    const [ materias, setMaterias ] = useState([]);
    const [ selectedMateria, setSelectedMateria ] = useState(0);
    const refAssuntoMateria = useRef(null);

    const [ ErroAssuntoMateria, setErroAssuntoMateria ] = useState(null);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/materia/index/`)
            .then(value => setMaterias(value.data.data))
            .catch(error => console.error(error));
    }, []);

    const submitForm = (e) => {
        e.preventDefault();

        if (refAssuntoMateria !== null) {
            if (refAssuntoMateria.current.value !== '' && refAssuntoMateria.current.value.length >= 4) {
                setErroAssuntoMateria(null);
                axios.post(`${process.env.REACT_APP_API}/assuntoMateria/create/`,
                    JSON.stringify({
                        assuntoMateria: refAssuntoMateria.current.value || null,
                        materia: selectedMateria,
                    }))
                    .then(value => {
                        if (value.data.status_code === 200) {
                            AlertSuccess({ text: "Assunto da Matéria inserida com sucesso", title: 'Sucesso...' });
                        } else {
                            AlertError({ text: "Ocorreu algum erro ao adicionar o assunto materia", title: 'Ops...' });
                        };
                    })
                    .catch(error => AlertError({ text: "Ocorreu algum erro ao adicionar o assunto materia "+ error, title: 'Ops...' }));

            } else {
                setErroAssuntoMateria('O campo tem que ser maior que 4');
                /*    AlertError({ text: "Campo deve conter mais do que 4 caracteres", title: 'Atenção...' }); */
            }
        } else {
            setErroAssuntoMateria('O campo não pode estar vazio');
        }

    };

    return (
        <React.Fragment>
            <form method="post" id="formAS" className="c-formAssuntoMateria" onSubmit={ submitForm }>
                <h2 className='c-formAssuntoMateria__headline'>Assunto Matéria</h2>
                <Input title="Assunto Matéria" id="assuntomateria" error={ ErroAssuntoMateria } className="c-formAssuntoMateria__input" ref={ refAssuntoMateria } name="assuntomateria" />
                <Select className='c-formAssuntoMateria__select' name='materia' id='materia'
                    value={ selectedMateria } onChange={ ({ target }) => setSelectedMateria(target.value) }>
                    <MenuItem value='0'>Selecione</MenuItem>
                    { materias !== [] && materias.map(item =>
                        <MenuItem value={ item.idMateria } key={ item.idMateria }>{ item.nomeMateria }</MenuItem>) }
                </Select>
                <Button className='c-formAssuntoMateria__submit' styleButton={ { marginTop: 20 } } type='submit'>Cadastrar</Button>
            </form>
        </React.Fragment>
    );
}