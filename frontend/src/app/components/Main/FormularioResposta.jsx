import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';
import { Input, Select, MenuItem, Button } from '../Form/';
import { AlertSuccess, AlertError } from '../Alert/Modal';
import { FaListAlt } from 'react-icons/fa';
export default function FormularioResposta() {

    const [ respostas, setRespostas ] = useState([]);
    const [ selectedQuestao, setSelectedQuestao ] = useState(0);
    const refResposta = useRef(null);
    const [ ErroResposta, setErroResposta ] = useState(null);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/resposta/index/`)
            .then(value => setRespostas(value.data.data))
            .catch(error => console.error(error));
    }, []);
    const [ inputAlternativa, setInputAlternativa ] = useState('');
    const [ alternativas, setAlternativas ] = useState([]);
    const submitForm = (e) => {
        e.preventDefault();

        if (refResposta !== null) {
            if (refResposta.current.value !== '' && refResposta.current.value.length >= 5) {
                setErroResposta(null);
                axios.post(`${process.env.REACT_APP_API}/resposta/create/`,
                    JSON.stringify({
                        resposta: refResposta.current.value || null,
                        questao: selectedQuestao,
                    }))
                    .then(value => {
                        if (value.data.status_code === 200) {
                            AlertSuccess({ text: "Resposta inserida com sucesso", title: 'Sucesso...' });
                        } else {
                            AlertError({ text: "Ocorreu algum erro ao adicionar a resposta", title: 'Ops...' });
                        };
                    })
                    .catch(error => AlertError({ text: "Ocorreu algum erro ao adicionar a resposta "+ error, title: 'Ops...' }));

            } else {
                setErroResposta('O campo tem que ser maior que 4');
                /*    AlertError({ text: "Campo deve conter mais do que 4 caracteres", title: 'Atenção...' }); */
            }
        } else {
            setErroResposta('O campo não pode estar vazio');
        }

    };

    return (
        <React.Fragment>
            <form method="post" id="formRS" className="c-formResposta" onSubmit={ submitForm }>
                <h2 className='c-formResposta__headline'>Resposta</h2>
                <Input title="Resposta" id="resposta" error={ ErroResposta } className="c-formResposta__input" ref={ refResposta } name="resposta" />
                <Select className='c-formResposta__select' name='questao' id='questao'
                    value={ selectedQuestao } onChange={ ({ target }) => setSelectedQuestao(target.value) }>
                    <MenuItem value='0'>Selecione</MenuItem>
                    { respostas !== [] && respostas.map(item =>
                        <MenuItem value={ item.idQuestao } key={ item.idQuestao }>{ item.tituloQuestao }</MenuItem>) }
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
                <Button className='c-formResposta__submit' styleButton={ { marginTop: 20 } } type='submit'>Cadastrar</Button>
            </form>
        </React.Fragment>
    );
}