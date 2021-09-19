    import React, { useState, Fragment, useRef } from "react";
import axios from 'axios';
import { AlertSuccess } from '../Alert/Modal'; 
import { Input, Button, Table } from '../Form';
import { FaBookOpen } from 'react-icons/fa';

export default function FormularioAreaMateria() {
    const [ ErroAreaMateria, setErroAreaMateria ] = useState(null);
    const refAreaMateria = useRef(null);

    const [ areaMaterias, setareaMaterias ] = React.useState([]);
    React.useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/areaMateria/index/`)
            .then(value => { setareaMaterias(value.data.data); })
            .catch(error => console.error(error));
    }, []);

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 80,
        },
        {
            field: 'nomeAreaMateria',
            headerName: 'Area Materia',
            width: 200,
        },
    ];
    const linhas = areaMaterias.map(el => {
        return { id: el.idAreaMateria, nomeAreaMateria: el.nomeAreaMateria };
    });
    
    return (
        <Fragment>
                <form method="post" id='formAM' onSubmit={ (e) => {
                    e.preventDefault();

                    if (refAreaMateria !== null) {
                        if (refAreaMateria.current.value.trim() !== '' && refAreaMateria.current.value.trim().length >= 4) {
                            setErroAreaMateria(null);
                            axios.post(process.env.REACT_APP_API + '/areaMateria/create/',
                                JSON.stringify({
                                    areaMateria: refAreaMateria.current.value
                                }))
                               /*  .then(data => {
                                    console.log(data.data.status_code);
                                }); */
                                .then(refAreaMateria.current.value ='');
                               
                                AlertSuccess({ text: "Área da Matéria inserida com sucesso", title: 'Sucesso...' });
                        }else{
                            setErroAreaMateria('O campo tem que ser maior que 4');
                         /*    AlertError({ text: "Campo deve conter mais do que 4 caracteres", title: 'Atenção...' }); */
                        }
                    } else {
                        setErroAreaMateria('O campo não pode estar vazio');
                    }
                } }>
                    <Input title='Area Matéria:' ref={ refAreaMateria } error={ ErroAreaMateria } id='areamateria' name='areamateria' type='text' icon={ <FaBookOpen /> } inputMode='text' />
                    <Button type='submit' styleButton={ { marginTop: 20 } } onClick={ () => {

                    } }>Adicionar Area Matéria</Button>
                </form>
                <Table colunas={ columns } linhas={ linhas } tabela={ "areaMateria" } />
            </Fragment>

    );
}