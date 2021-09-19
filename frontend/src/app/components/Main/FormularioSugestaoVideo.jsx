import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';
import { Input, Select, MenuItem, Button, Table } from '../Form/';
import { AlertSuccess } from '../Alert/Modal';

export default function FormularioSugestaoVideo() {

    const [ questao, setQuestao ] = useState([]);

    const [ selectedQuestao, setSelectedQuestao ] = useState(0);
    const refSugestaoVideo = useRef(null);
    const refThumbVideo = useRef(null);
    const refUrlVideo = useRef(null);

    const [ SugestaoVideo, setSugestaoVideo ] = useState([]);

    const [ ErroSugestaoVideo, setErroSugestaoVideo ] = useState(null);
    const [ ErroThumbVideo, setErroThumbVideo ] = useState(null);
    const [ ErroUrlVideo, setErroUrlVideo ] = useState(null);
    const [ ErroQuestao, setErroQuestao ] = useState(null);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/questao/index/`)
            .then(value => setQuestao(value.data.data))
            .catch(error => console.error(error));

            axios.get(`${process.env.REACT_APP_API}/sugestaoVideo/index/`)
            .then(value => setSugestaoVideo(value.data.data))
            .catch(error => console.error(error));    
    }, []);


    const submitForm = (e) => {
        e.preventDefault();

        let inputs = [
            refSugestaoVideo.current.value,
            refThumbVideo.current.value,
            refUrlVideo.current.value
        ];

        let errorMsg = 'O campo precisa ter mais de 4 caracteres';

        // Seta erro no select questão
        if (selectedQuestao === 0) setErroQuestao('Selecione uma questao');
        else setErroQuestao(null);
 
        // Seta erro no input sugestão video
        if (refSugestaoVideo.current.value.length < 4) setErroSugestaoVideo(errorMsg);
        else setErroSugestaoVideo(null);

        // Seta erro no input thumbnail video
        if (refThumbVideo.current.value.length < 4) setErroThumbVideo(errorMsg);
        else setErroThumbVideo(null);

        // Seta erro no input url video
        if (refUrlVideo.current.value.length < 4) setErroUrlVideo(errorMsg);
        else setErroUrlVideo(null);

            // Verificação geral
            if (inputs.every(ipt => ipt.trim().length > 4) && selectedQuestao !== 0) {
                
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
                        console.log('Pode passar!');
                        AlertSuccess({ text: "Sugestao Video inserida com sucesso", title: 'Sucesso...' });
                    } else console.log('Não pode passar!');
        
       /*  if (refSugestaoVideo.current.value !== '' || refUrlVideo.current.value !== '' || refThumbVideo.current.value !== '' || questao !== 0) {
            setErroSugestaoVideo('O campo não pode ficar vazio');
                 if (refSugestaoVideo.current.value.length >= 4 ||  refUrlVideo.current.value.length >= 4 || refThumbVideo.current.value.length >= 4) {
                    setErroSugestaoVideo(null);
                    setErroUrlVideo(null);
                    setErroThumbVideo(null);
                    
                    AlertSuccess({ text: " Sugestão de vídeo inserida com sucesso", title: 'Sucesso...' });

            } else {
                setErroSugestaoVideo('O campo tem que ser maior que 4');
            } 
        } else {
            setErroSugestaoVideo('O campo esta vazio');
        } */
    };

    const colunas = [
        {
            field: "id",
            headerName: "ID",
            width: 90,
        },
        {
            field: "titulo",
            headerName: "Titulo",
            width: 200,
        },
        {
            field: "questao",
            headerName: "Questao",
            width: 200,
        }
    ];

    const linhas = SugestaoVideo.sugestaoVideo ? SugestaoVideo.sugestaoVideo.map(sugestao => {
        return {
            id: sugestao.idSugestaoVideo,
            titulo: sugestao.tituloSugestaoVideo,
            questao: SugestaoVideo.questao.questao.filter(e => e.idQuestao === sugestao.idQuestao)[ 0 ].tituloQuestao,
        };
    }) : [];

    return (
        <React.Fragment>
            <form method="post" id="formSV" className="c-formSV" onSubmit={ submitForm }>
                <h2 className='c-formSVideo__headline'>Sugestão de Vídeo</h2>
                <Input title="Titulo Sugestao de Video" id="sugestaoVideo" error={ ErroSugestaoVideo } className="c-formSVideo__input" ref={ refSugestaoVideo } name="sugestaoVideo" />
                <Input title="Thumbnail" id="thumbnailSugestaoVideo" error={ ErroThumbVideo } className="c-formSVideo__input" ref={ refThumbVideo } name="thumbnailSugestaoVideo" />
                <Input title="URL" id="urlSugestaoVideo" error={ ErroUrlVideo } className="c-formSVideo__input" ref={ refUrlVideo } name="urlSugestaoVideo"/>
                <Select className='c-formSVideo__select' name='questao' id='questao' error={ ErroQuestao }
                    value={ selectedQuestao } onChange={ ({ target }) => setSelectedQuestao(target.value) }>
                    { <MenuItem value='0'>Questão</MenuItem> }
                    { questao !== [] && questao.map(item =>
                        <MenuItem value={ item.idQuestao } key={ item.idQuestao }>{ item.tituloQuestao }</MenuItem>) }
                </Select>
                <Button className='c-formSVideo__submit' styleButton={ { marginTop: 20 } } type='submit'>Cadastrar</Button>
            </form>
            <Table colunas={ colunas } linhas={ linhas } tabela='sugestaoVideo' />
        </React.Fragment>
    );
}