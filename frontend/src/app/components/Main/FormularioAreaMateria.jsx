import React, { useState, Fragment, useRef, useEffect } from "react";
import axios from 'axios';
import { Input, Button, Select, MenuItem } from '../Form';
import { FaBookOpen } from 'react-icons/fa';

export default function FormularioAreaMateria() {
    const [ alternativas, setAlternativas ] = useState([]);
    const [ selectAreaMateria, setselectAreaMateria ] = useState(0);
    const refSelectAreaMateria = useRef(null);
    const [ areamaterias, setAreaMaterias ] = useState(null);
    useEffect(() => {
        axios.get(process.env.REACT_APP_API + '/areamateria/index/')  
        .then(data => setAreaMaterias(data.data))
        .catch(error => console.error(error));  
    }, []);

    const refAreaMateria = useRef(null);

    function submitForm(e) {
        e.preventDefault();
        let formulario = document.getElementById('formAM');
        let formData = new FormData(formulario);
        formData.append('alternativas', JSON.stringify(alternativas));

        axios.post(process.env.REACT_APP_API + '/questao/index/', formData)
            .then(el => console.log(el.data));
    }

    return (
        <Fragment>
             <Fragment>
                <form method="post" id='formAM' onSubmit={ (e) => {
                    e.preventDefault();
                    axios.post(process.env.REACT_APP_API + '/areaMateria/create/',
                        JSON.stringify({
                            areaMateria: refAreaMateria.current.value
                        }))
                        .then(data => console.log(data));

                } }>
                    <Input title='Area Matéria:' ref={ refAreaMateria } id='areamateria' name='areamateria' type='text' icon={ <FaBookOpen /> } inputMode='text' />
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
                    <Button type='submit' styleButton={ { marginTop: 20 } } onClick={ () => {

                    } }>Adicionar Area Matéria</Button>
                </form>
            </Fragment>

            <Fragment>

            </Fragment>


        </Fragment >
    );
}