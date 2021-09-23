import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import { AlertSuccess } from '../Alert/Modal'; 
import { Input, Button, Table } from '../Form';
import { FaBookOpen, FaTimes } from 'react-icons/fa';
import { Tooltip, IconButton } from "@material-ui/core";
import { ToastError, ToastSuccess } from "../Alert/Toast";

const Backdrop = (props) => {
    const [attAreaMateria, setAttAreaMateria] = useState(props.data[1] || ""); // State para atualizar o campo
    const [errAttAreaMateria, seterrAttAreaMateria] = useState(null); // State para atualizar o campo
    const updateEvent = (e) => { // na hora que clica no botao de atualizar
      e.preventDefault();
      if (
        attAreaMateria !== null &&
        attAreaMateria !== "" &&
        attAreaMateria.length > 4
      ) { // verificacao dos campos
        axios
          .post(
            `${process.env.REACT_APP_API}/areaMateria/update/`, // requisicao post backend/api/campo/update METHOD POST
            JSON.stringify({ // faz um json com 
              areaMateria: attAreaMateria, // o campo que deve ser atualizado
              id: props.data[0], // o id da universidade que deve ser atualizado no WHERE
            })
          )
          .then((value) => {
            if (value.data.status_code) { // verifica se status code retorna 200 = OK
              ToastSuccess({ text: value.data.data }); // mensagem de sucesso
              close() // fecha o backdrop
              setTimeout(() => {
                window.location.reload(); // atualiza a pagina dps de 4 segundos
              }, 4000);
            }
          })
          .catch((error) => ToastError({text: error})); // caso backend retorne erro aparece aqui
      } else { // previne e coloca os erros 
        seterrAttAreaMateria("O campo tem que ter no minimo 4 caracteres");
      }
    };
    const close = () => {
      let backdrop = document.querySelector("#backdrop");
      backdrop.classList.toggle("open");
      ReactDOM.unmountComponentAtNode(backdrop);
    };
    return (
      <section className="c-formularioUpdate" id="c-formularioUpdate">
        <Tooltip
          className="c-formularioUpdate__close"
          title="Fechar"
          enterDelay={400}
          enterNextDelay={200}
        >
          <IconButton onClick={() => close()}>
            <FaTimes />
          </IconButton>
        </Tooltip>
        <h1 className="c-formularioUpdate__headline">
          Atualizar Area Matéria: {props.data[1]}
        </h1>
        <form
          onSubmit={(e) => updateEvent(e)}
          encType="multipart/form-data"
          className="c-formularioUpdate__form"
          id="formUpdate"
        >
          <Input
            title={props.titles[1].headerName || "Input"}
            id={props.titles[1].field || null}
            className="c-formularioUpdate__item"
            name={props.titles[1].field || null}
            type={props.titles[1].type || "text"}
            value={attAreaMateria}
            error={errAttAreaMateria}
            onChange={(e) => {
              setAttAreaMateria(e.target.value);
            }}
            inputMode="text"
          />
          <Button type="submit">Atualizar</Button>
        </form>
      </section>
    );
  };

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

    const update = (id, tabela, nome, linhas, colunas) => {
        let data = linhas.filter((el) => el.id === id)[0]; //
        delete data.update;
        delete data.delete;
        let titles = colunas;
        data = Object.values(data);
    
        let div = document.querySelector("#backdrop");
        div.classList.toggle("open");
    
        ReactDOM.render(<Backdrop data={data} titles={titles} />, div);
      };
    
    return (
        <section>
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
                    }}
                >
                    <Input title='Area Matéria:' ref={ refAreaMateria } error={ ErroAreaMateria } id='areamateria' name='areamateria' type='text' icon={ <FaBookOpen /> } inputMode='text' />
                    <Button type='submit' styleButton={ { marginTop: 20 } } onClick={ () => {

                    } }>Adicionar Area Matéria</Button>
                </form>
                <Table colunas={ columns } linhas={ linhas } tabela={ "areaMateria" } nome="Área Matéria" style={{
                 marginTop: 20,}} functionUpdate={update} />
                 <div id="backdrop"></div>
        </section>
    );
}