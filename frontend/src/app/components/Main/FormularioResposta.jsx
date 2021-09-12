import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';
import { Input, Select, MenuItem, Button, RadioGroup, Radio } from '../Form/';
import { AlertSuccess, AlertError } from '../Alert/Modal';
import { FaListAlt } from 'react-icons/fa';
export default function FormularioResposta() {

    const [ respostas, setRespostas ] = useState([]);
    const [ selectedQuestao, setSelectedQuestao ] = useState(0);
    const [ certaResposta, setCertaResposta ] = useState(null);
    const [ ErroResposta, setErroResposta ] = useState(null);
    const [ ErroQuestaoSelecionada, setErroQuestaoSelecionada ] = useState(null);


    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/questao/index/`)
            .then(value => setRespostas(value.data.data))
            .catch(error => console.error(error));
    }, []);
    const [ inputAlternativa, setInputAlternativa ] = useState('');
    const [ alternativas, setAlternativas ] = useState([]);
    const submitForm = (e) => {
        e.preventDefault();


        if (selectedQuestao === 0) {
            setErroQuestaoSelecionada('Selecione uma questao');
        } else setErroQuestaoSelecionada(null);

        if (alternativas !== null) {
            if (alternativas !== [] && alternativas.length === 5) {
                if (certaResposta !== null) {
                    setErroResposta(null);
                    axios.post(`${process.env.REACT_APP_API}/resposta/create/`,
                        JSON.stringify({
                            alternativas: alternativas,
                            certaResposta: certaResposta,
                            questao: selectedQuestao
                        }))
                        .then(value => {
                            // if (value.data.status_code === 200) {
                            console.log(value.data);
                            setInputAlternativa('');
                            AlertSuccess({ text: "Resposta inserida com sucesso", title: 'Sucesso...' });
                            // } else {
                            //     AlertError({ text: "Ocorreu algum erro ao adicionar a resposta", title: 'Ops...' });
                            // };
                        })
                        .catch(error => AlertError({ text: "Ocorreu algum erro ao adicionar a resposta " + error, title: 'Ops...' }));
                } else setErroResposta('Marque uma alternativa correta');

            } else {
                setErroResposta('Adicione 5 alternativas');
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
                <Select label='Questao' className='c-formResposta__select' name='questao' id='questao' error={ ErroQuestaoSelecionada }
                    value={ selectedQuestao } onChange={ ({ target }) => setSelectedQuestao(target.value) }>
                    <MenuItem value='0'>Selecione</MenuItem>
                    { respostas !== [] && respostas.map(item =>
                        <MenuItem value={ item.idQuestao } key={ item.idQuestao }>{ item.tituloQuestao }</MenuItem>) }
                </Select>
                <Input title='Alternativas' error={ ErroResposta } value={ inputAlternativa } icon={ <FaListAlt /> } onChange={ ({ target }) => {
                    setInputAlternativa(target.value);
                } } />
                <Button type='button' styleButton={ { marginTop: 20 } } onClick={ () => {
                    if (!alternativas.includes(inputAlternativa) && inputAlternativa !== '' && alternativas.length < 5) {
                        setAlternativas([ ...alternativas, inputAlternativa ]);
                        setInputAlternativa('');
                    }
                } }>Adicionar alternativa</Button>
                {
                    alternativas !== [] &&
                    alternativas.map(el => (
                        <RadioGroup key={ el } onChange={ (e) => { setCertaResposta(e.target.value); } } value={ certaResposta } >
                            <Radio value={ el } label={ `${el} é a resposta dessa questao!` } />
                        </RadioGroup>
                    ))
                }
                <Button className='c-formResposta__submit' styleButton={ { marginTop: 20 } } type='submit'>Cadastrar</Button>
            </form>
        </React.Fragment >
    );
}