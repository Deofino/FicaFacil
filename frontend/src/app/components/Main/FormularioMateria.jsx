import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';
import { Input, Select, MenuItem, Button } from '../Form/';
import { AlertSuccess } from '../Alert/Modal';

export default function FormularioMateria() {

    const [ areasMaterias, setAreasMaterias ] = useState([]);
    const [ selectedAreaMateria, setSelectedAreaMateria ] = useState(0);
    
    const refMateria = useRef(null);

    const [ ErroMateria, setErroMateria ] = useState(null);
    const [ ErroAreaMateria, setErroAreaMateria ] = useState(null);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/areaMateria/index/`)
            .then(value => setAreasMaterias(value.data.data))
            .catch(error => console.error(error));
    }, []);

    const submitForm = (e) => {
        e.preventDefault();

        let inputs = [
            refMateria.current.value,
        ];

        let errorMsg = 'O campo precisa ter mais de 4 caracteres';

        if (selectedAreaMateria === 0) setErroAreaMateria('Selecione uma Area Matéria');
        else setErroAreaMateria(null);

        if (refMateria.current.value.length < 4) setErroMateria(errorMsg);
        else setErroMateria(null);

            if (inputs.every(ipt => ipt.length > 4) && selectedAreaMateria !== 0) {
                axios.post(`${process.env.REACT_APP_API}/materia/create/`,
                JSON.stringify({
                         materia: refMateria.current.value || null,
                         area: selectedAreaMateria,
                    }))
                     /*  .then(data => {
                                    console.log(data.data.status_code);
                                }); */
                                .then(function(parametro){
                                    refMateria.current.value = '';
                                    setSelectedAreaMateria(0);
                                });
                                console.log('Pode passar!');
                                AlertSuccess({ text: "Matéria inserida com sucesso", title: 'Sucesso...' });
                    /* .catch(error => console.log(error)); */
                }else console.log('Não pode passar!');
    };
    

    return (
        <React.Fragment>
                <form method="post" id="formM" className="c-formMateria" onSubmit={ submitForm }>
                <h2 className='c-formMateria__headline'>Materia</h2>
                <Input title="Materia" id="nomeMateria"  error={ ErroMateria }className="c-formMateria__input" ref={ refMateria } name="materia" />
                <Select className='c-formMateria__select' name='areaMateria' id='areaMateria'
                    value={ selectedAreaMateria } error={ErroAreaMateria} onChange={ ({ target }) => setSelectedAreaMateria(target.value) }>
                    <MenuItem value='0'>Selecione</MenuItem>
                    { areasMaterias !== [] && areasMaterias.map(item =>
                        <MenuItem value={ item.idAreaMateria } key={ item.idAreaMateria }>{ item.nomeAreaMateria }</MenuItem>) }
                </Select>
                <Button className='c-formMateria__submit' styleButton={ { marginTop: 20 } } type='submit'>Cadastrar</Button>
            </form>
        </React.Fragment>
    );
}

