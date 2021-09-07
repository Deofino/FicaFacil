import React, { useState, Fragment } from "react";
import axios from 'axios';
import { Input, Button } from '../Form';
import { FaCalendar, FaUser, FaImages, FaUniversity, FaBookOpen, FaOptinMonster, FaXbox, FaListAlt } from 'react-icons/fa';

export default function FormularioQuestao() {
    const [ alternativas, setAlternativas ] = useState([]);
    const [ inputAlternativa, setInputAlternativa ] = useState('');
    function submitForm(e) {
        e.preventDefault();
        let formulario = document.getElementById('form');
        let formData = new FormData(formulario);
        formData.append('alternativas', JSON.stringify(alternativas));

        axios.post(process.env.REACT_APP_API + '/questao/index/', formData)
            .then(el => console.log(el.data));
    }
    React.useEffect(() => {
        console.log(alternativas);
    }, [ alternativas ]);
    return (
        <Fragment>
            <form method="post" id='form' onSubmit={ (e) => submitForm(e) } encType="multipart/form-data">
                <Input title='Nome:' id='nome' name='nome' type='text' icon={ <FaUser /> } inputMode='text' />
                <Input title='Data:' id='date' name='date' icon={ <FaCalendar /> } type='date' inputMode='date' />
                <Input title='images' accept='image/*' name='images[]' multiple={ true } type='file' icon={ <FaImages /> } />
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
            <form method="post" id='formU' onSubmit={ (e) => submitForm(e) }>
                <Input title='Universidade:' id='universidade' name='universidade' type='text' icon={ <FaUniversity /> } inputMode='text' />
                <Button type='button' styleButton={ { marginTop: 20 } } onClick={ () => {

                } }>Adicionar Universidade</Button>
            </form>
        </Fragment>
        
        <Fragment>
            <form method="post" id='formAM' onSubmit={ (e) => submitForm(e) }>
                <Input title='Area Matéria:' id='areamateria' name='areamateria' type='text' icon={ <FaBookOpen /> } inputMode='text' />
                <Button type='button' styleButton={ { marginTop: 20 } } onClick={ () => {

                } }>Adicionar Area Matéria</Button>
            </form>
        </Fragment>
            

        </Fragment >
    );
}

