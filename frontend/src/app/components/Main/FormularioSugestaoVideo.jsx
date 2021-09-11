import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';
import { Input, Select, MenuItem, Button } from '../Form/';
import { AlertSuccess } from '../Alert/Modal';

export default function FormularioSugestaoVideo() {

    const [ questao, setQuestao ] = useState([]);

    const [ selectedQuestao, setSelectedQuestao ] = useState(0);
    const refSugestaoVideo = useRef(null);

    const [ ErroSugestaoVideo, setErroSugestaoVideo ] = useState(null);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/questao/index/`)
            .then(value => setQuestao(value.data.data))
            .catch(error => console.error(error));
    }, []);

    const submitForm = (e) => {
        e.preventDefault();

            if (refSugestaoVideo !== null) {
                if (refSugestaoVideo.current.value !== '' && refSugestaoVideo.current.value.length >= 4) {
                    setErroSugestaoVideo(null);
                    axios.post(`${process.env.REACT_APP_API}/sugestaoVideo/create/`,
                    JSON.stringify({
                         sugestao: refSugestaoVideo.current.value || null,
                         questao: selectedQuestao,
                    }))
                    .then(value => {
                        console.log(value.data);
                    })
                    .catch(error => console.log(error));
                       
                        AlertSuccess({ text: " Sugestão de vídeo inserida com sucesso", title: 'Sucesso...' });
                }else{
                    setErroSugestaoVideo('O campo tem que ser maior que 4');
                }
            } else {
                setErroSugestaoVideo('O campo não pode estar vazio');
            }
    };

    return (
        <React.Fragment>
                <form method="post" id="formSV" className="c-formSV" onSubmit={ submitForm }>
                <h2 className='c-formSVideo__headline'>Sugestão de Vídeo</h2>
                <Input title="Titulo Sugestao de Video" id="sugestaoVideo"  error={ ErroSugestaoVideo }className="c-formSVideo__input" ref={ refSugestaoVideo } name="sugestaoVideo" />
                <Input title="Thumbnail " id="thumbnailsugestaoVideo"  error={ ErroSugestaoVideo }className="c-formSVideo__input" ref={ refSugestaoVideo } name="sugestaoVideo" />
                <Input title="URL" id="urlsugestaoVideo"  error={ ErroSugestaoVideo }className="c-formSVideo__input" ref={ refSugestaoVideo } name="sugestaoVideo" />
                <Select className='c-formSVideo__select' name='questao' id='questao'
                    value={ selectedQuestao } onChange={ ({ target }) => setSelectedQuestao(target.value) }>
                    {<MenuItem value='0'>Selecione</MenuItem>}
                    { questao !== [] && questao.map(item =>
                        <MenuItem value={ item.idQuestao } key={ item.idQuestao }>{ item.tituloQuestao }</MenuItem>) }
                </Select>
                <Button className='c-formSVideo__submit' styleButton={ { marginTop: 20 } } type='submit'>Cadastrar</Button>
            </form>
        </React.Fragment>
    );
}

