import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';
import { Input, Select, MenuItem, Button } from '../Form/';
import { AlertSuccess } from '../Alert/Modal';

export default function FormularioSugestaoVideo() {

    const [ questao, setQuestao ] = useState([]);

    const [ selectedQuestao, setSelectedQuestao ] = useState(0);
    const refSugestaoVideo = useRef(null);
    const refThumbVideo = useRef(null);
    const refUrlVideo = useRef(null);

    const [ ErroSugestaoVideo, setErroSugestaoVideo ] = useState(null);
    const [ ErroThumbVideo, setErroThumbVideo ] = useState(null);
    const [ ErroUrlVideo, setErroUrlVideo ] = useState(null);
    const [ ErroQuestao, setErroQuestao ] = useState(null);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/questao/index/`)
            .then(value => setQuestao(value.data.data))
            .catch(error => console.error(error));
    }, []);

    const submitForm = (e) => {
        e.preventDefault();

        if (questao === 0) {
            setErroQuestao('Selecione uma questao');
        } else setErroQuestao(null);

        if(refSugestaoVideo.current.value !== '' || refSugestaoVideo.current.value !== null && refSugestaoVideo.current.value < 4) {
            setErroSugestaoVideo('O campo precisa ter mais de 4 caracteres');
            console.log(refSugestaoVideo.current.value);
        }else {
            setErroSugestaoVideo('');
        }
       /*  if (refSugestaoVideo.current.value !== '' || refUrlVideo.current.value !== '' || refThumbVideo.current.value !== '' || questao !== 0) {
            setErroSugestaoVideo('O campo não pode ficar vazio');
                 if (refSugestaoVideo.current.value.length >= 4 ||  refUrlVideo.current.value.length >= 4 || refThumbVideo.current.value.length >= 4) {
                    setErroSugestaoVideo(null);
                    setErroUrlVideo(null);
                    setErroThumbVideo(null);
                    axios.post(`${process.env.REACT_APP_API}/sugestaoVideo/create/`,
                        JSON.stringify({
                            sugestaoVideo: refSugestaoVideo.current.value || null,
                            thumbVideo: refUrlVideo.current.value || null,
                            urlVideo: refThumbVideo.current.value || null,
                            questao: selectedQuestao,
                        }))
                        
                        .then(function(parametro){
                            refSugestaoVideo.current.value = '';
                            refThumbVideo.current.value = '';
                            refUrlVideo.current.value = '';
                            setSelectedQuestao(0);
                        });
                    AlertSuccess({ text: " Sugestão de vídeo inserida com sucesso", title: 'Sucesso...' });

            } else {
                setErroSugestaoVideo('O campo tem que ser maior que 4');
            } 
        } else {
            setErroSugestaoVideo('O campo esta vazio');
        } */
    };

    return (
        <React.Fragment>
            <form method="post" id="formSV" className="c-formSV" onSubmit={ submitForm }>
                <h2 className='c-formSVideo__headline'>Sugestão de Vídeo</h2>
                <Input title="Titulo Sugestao de Video" id="sugestaoVideo" error={ ErroSugestaoVideo } className="c-formSVideo__input" ref={ refSugestaoVideo } name="sugestaoVideo" />
                <Input title="Thumbnail" id="thumbnailSugestaoVideo" error={ ErroThumbVideo } className="c-formSVideo__input" ref={ refThumbVideo } name="thumbnailSugestaoVideo" />
                <Input title="URL" id="urlSugestaoVideo" error={ ErroUrlVideo } className="c-formSVideo__input" ref={ refUrlVideo } name="urlSugestaoVideo"/>
                <Select className='c-formSVideo__select' name='questao' id='questao'
                    value={ selectedQuestao } onChange={ ({ target }) => setSelectedQuestao(target.value) }>
                    { <MenuItem value='0'>Questão</MenuItem> }
                    { questao !== [] && questao.map(item =>
                        <MenuItem value={ item.idQuestao } key={ item.idQuestao }>{ item.tituloQuestao }</MenuItem>) }
                </Select>
                <Button className='c-formSVideo__submit' styleButton={ { marginTop: 20 } } type='submit'>Cadastrar</Button>
            </form>
        </React.Fragment>
    );
}