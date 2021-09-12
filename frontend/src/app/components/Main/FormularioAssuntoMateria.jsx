import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';
import { Input, Select, MenuItem, Button } from '../Form/';
import { AlertSuccess } from '../Alert/Modal';
export default function FormularioAssuntoMateria() {

    const [ materias, setMaterias ] = useState([]);
    const [ selectedMateria, setSelectedMateria ] = useState(0);

    const refAssuntoMateria = useRef(null);

    const [ ErroAssuntoMateria, setErroAssuntoMateria ] = useState(null);
    const [ ErroMateria, setErroMateria ] = useState(null);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/materia/index/`)
            .then(value => setMaterias(value.data.data))
            .catch(error => console.error(error));
    }, []);

    const submitForm = (e) => {
        e.preventDefault();

        let inputs = [
            refAssuntoMateria.current.value,
        ];

        let errorMsg = 'O campo precisa ter mais de 4 caracteres';
        
        // Seta erro nos input's contidos no Assunto Materia
        if (selectedMateria === 0) setErroMateria('Selecione uma Matéria');
        else setErroMateria(null);

        // Seta erro nos select's contidos na Assunto Materia
        if (refAssuntoMateria.current.value.length < 4) setErroAssuntoMateria(errorMsg);
        else setErroAssuntoMateria(null);

            if (inputs.every(ipt => ipt.length > 4) && selectedMateria !== 0) {
                axios.post(`${process.env.REACT_APP_API}/assuntoMateria/create/`,
                JSON.stringify({
                         assuntoMateria: refAssuntoMateria.current.value || null,
                         materia: selectedMateria,
                    }))
                     /*  .then(data => {
                                    console.log(data.data.status_code);
                                }); */
                                .then(function(parametro){
                                    refAssuntoMateria.current.value = '';
                                    setSelectedMateria(0);
                                });
                                console.log('Pode passar!');
                                AlertSuccess({ text: "Assunto Matéria inserida com sucesso", title: 'Sucesso...' });
                    /* .catch(error => console.log(error)); */
                }else console.log('Não pode passar!');
    };

    return (
        <React.Fragment>
            <form method="post" id="formAS" className="c-formAssuntoMateria" onSubmit={ submitForm }>
                <h2 className='c-formAssuntoMateria__headline'>Assunto Matéria</h2>
                <Input title="Assunto Matéria" id="assuntomateria" error={ ErroAssuntoMateria } className="c-formAssuntoMateria__input" ref={ refAssuntoMateria } name="assuntomateria" />
                <Select className='c-formAssuntoMateria__select' name='materia' id='materia'
                    value={ selectedMateria } error={ ErroMateria } onChange={ ({ target }) => setSelectedMateria(target.value) }>
                    <MenuItem value='0'>Selecione</MenuItem>
                    { materias !== [] && materias.map(item =>
                        <MenuItem value={ item.idMateria } key={ item.idMateria }>{ item.nomeMateria }</MenuItem>) }
                </Select>
                <Button className='c-formAssuntoMateria__submit' styleButton={ { marginTop: 20 } } type='submit'>Cadastrar</Button>
            </form>
        </React.Fragment>
    );
}