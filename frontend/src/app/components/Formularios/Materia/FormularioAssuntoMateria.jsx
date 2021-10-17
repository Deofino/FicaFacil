import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { Input, Select, MenuItem, Button, Table } from "../../Form/";
import { AlertError, AlertSuccess } from "../../Alert/Modal";
import { Tooltip, IconButton } from "@material-ui/core";
import { ToastSuccess, ToastWarning } from "../../Alert/Toast";
import { FaTimes, FaBookOpen } from "react-icons/fa";

const Backdrop = (props) => {
  const [attAssuntoMateria, setAttAssuntoMateria] = useState(
    props.data[1] || ""
  ); // State para atualizar o campo
  const [errAttAssuntoMateria, seterrAttAssuntoMateria] = useState(null); // State para atualizar o campo
  const [attMateria, setAttMateria] = useState(null); // State para atualizar o campo
  const [attReqAssuntoMateria, setattReqAssuntoMateria] = useState([]); // State para atualizar o campo
  const [errAttMateria, seterrAttMateria] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/assuntoMateria/index/`)
      .then((value) => {
        setattReqAssuntoMateria(value.data.data);
        setAttMateria(
          value.data.data.materia.materia.find(
            (el) => el.nomeMateria === props.data[2]
          ).idMateria
        );
      })
      .catch((error) => console.error(error));
  }, [props.data]);
  const updateEvent = (e) => {
    // na hora que clica no botao de atualizar
    e.preventDefault();
    if (attAssuntoMateria.length <= 4) {
      seterrAttAssuntoMateria("Campo precisa de no minimo 4 caracteres");
      return;
    } else {
      seterrAttAssuntoMateria(null);
    }
    if (attMateria <= 0) {
      seterrAttMateria("Você precisa selecionar uma matéria");
      return;
    } else seterrAttMateria(null);
    if (
      attAssuntoMateria !== null &&
      attAssuntoMateria !== "" &&
      attAssuntoMateria.length > 4 &&
      attMateria > 0
    ) {
      // verificacao dos campos
      axios
        .post(
          `${process.env.REACT_APP_API}/assuntoMateria/update/`, // requisicao post backend/api/campo/update METHOD POST
          JSON.stringify({
            // faz um json com
            assuntoMateria: attAssuntoMateria, // o campo que deve ser atualizado
            id: props.data[0], // o id dao assunto materia que deve ser atualizado no WHERE
            materia: attMateria, // o id da materia que deve ser atualizado no WHERE
          })
        )
        .then((value) => {
          if (value.data.status_code) {
            // verifica se status code retorna 200 = OK
            ToastSuccess({ text: value.data.data }); // mensagem de sucesso
            close(); // fecha o backdrop
            setTimeout(() => {
              window.location.reload(); // atualiza a pagina dps de 4 segundos
            }, 4000);
          } else {
            console.log(value.data);
          }
        });
    } else {
      ToastWarning({ text: "Preencha os campos corretamente" });
    }
  };
  const close = () => {
    let backdrop = document.querySelector("#backdrop");
    backdrop.classList.toggle("open");
    ReactDOM.unmountComponentAtNode(backdrop);
  };
  return (
    <section className="c-formularioUpdate" id="c-formularioUpdateD">
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
        Atualizar Assunto Matéria: {props.data[1]}
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
          value={attAssuntoMateria}
          error={errAttAssuntoMateria}
          onChange={(e) => {
            setAttAssuntoMateria(e.target.value);
          }}
          inputMode="text"
        />

        <Select
          className="c-formMateria__select"
          name="materia"
          title={props.titles[2].headerName || "Input"}
          id="materia"
          value={attMateria}
          error={errAttMateria}
          onChange={({ target }) => setAttMateria(target.value)}
        >
          <MenuItem value={-1}>Selecione</MenuItem>
          {attReqAssuntoMateria.materia !== undefined &&
            attReqAssuntoMateria.materia.materia.map((item) => (
              <MenuItem value={item.idMateria} key={item.idMateria}>
                {item.nomeMateria}
              </MenuItem>
            ))}
        </Select>
        <Button type="submit" className="c-formularioUpdate__item">
          Atualizar
        </Button>
      </form>
    </section>
  );
};

export default function FormularioAssuntoMateria() {
  const [materias, setMaterias] = useState([]);
  const [selectedMateria, setSelectedMateria] = useState(0);

  const [AssuntoMateria, setAssuntoMateria] = useState([]);

  const refAssuntoMateria = useRef(null);

  const [ErroAssuntoMateria, setErroAssuntoMateria] = useState(null);
  const [ErroMateria, setErroMateria] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/materia/index/`)
      .then((value) => setMaterias(value.data.data))
      .catch((error) => console.error(error));

    axios
      .get(`${process.env.REACT_APP_API}/assuntoMateria/index/`)
      .then((value) => setAssuntoMateria(value.data.data))
      .catch((error) => console.error(error));
  }, []);

  const submitForm = (e) => {
    e.preventDefault();

    let inputs = [refAssuntoMateria.current.value];

    let errorMsg = "O campo precisa ter mais de 4 caracteres";

    // Seta erro nos input's contidos no Assunto Materia
    if (selectedMateria <= 0) setErroMateria("Selecione uma Matéria");
    else setErroMateria(null);

    // Seta erro nos select's contidos na Assunto Materia
    if (refAssuntoMateria.current.value.length < 4)
      setErroAssuntoMateria(errorMsg);
    else setErroAssuntoMateria(null);

    if (inputs.every((ipt) => ipt.trim().length > 4) && selectedMateria > 0) {
      axios
        .post(
          `${process.env.REACT_APP_API}/assuntoMateria/create/`,
          JSON.stringify({
            assuntoMateria: refAssuntoMateria.current.value || null,
            materia: selectedMateria,
          })
        )
        .then((data) => {
          refAssuntoMateria.current.value = "";
          if (data.data.status_code === 200) {
            AlertSuccess({
              text: "Materia inserida com sucesso",
              title: "Sucesso...",
            });
            setTimeout(() => {
              window.location.reload();
            }, 4000);
          } else {
            AlertError({
              text: "Ops... Erros encontrados",
              title: "Erro!!",
            });
          }
        })
        .catch((err) => AlertError({ title: "Erro!!", text: err }));
    } else ToastWarning({ text: "Preencha todos os campos" });
  };

  const colunas = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
    },
    {
      field: "assunto",
      headerName: "Assunto",
      width: 200,
    },
    {
      field: "materia",
      headerName: "Matéria",
      width: 200,
    },
  ];

  const linhas = AssuntoMateria.assuntoMateria
    ? AssuntoMateria.assuntoMateria.map((assunto) => {
        return {
          id: assunto.idAssuntoMateria,
          assunto: assunto.nomeAssuntoMateria,
          materia: AssuntoMateria.materia.materia.filter(
            (e) => e.idMateria === assunto.idMateria
          )[0].nomeMateria,
        };
      })
    : [];

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
      <form
        method="post"
        id="formAS"
        className="c-formAssuntoMateria c-form"
        onSubmit={submitForm}
      >
        <Input
          title="Assunto Matéria: *"
          id="assuntomateria"
          error={ErroAssuntoMateria}
          className="c-formAssuntoMateria__input"
          ref={refAssuntoMateria}
          name="assuntomateria"
          icon={<FaBookOpen />}
        />
        <Select
          className="c-formAssuntoMateria__select"
          name="materia"
          id="materia"
          label="Matéria: *"
          value={selectedMateria}
          error={ErroMateria}
          onChange={({ target }) => setSelectedMateria(target.value)}
        >
          <MenuItem value="0">Selecione</MenuItem>
          {materias.materia !== undefined &&
            materias.materia.map((item) => (
              <MenuItem value={item.idMateria} key={item.idMateria}>
                {item.nomeMateria}
              </MenuItem>
            ))}
        </Select>
        <Button
          className="c-formAssuntoMateria__submit"
          styleButton={{ marginTop: 20 }}
          type="submit"
        >
          Cadastrar
        </Button>
      </form>
      <Table
        colunas={colunas}
        linhas={linhas}
        tabela="assuntoMateria"
        nome="Assunto Matéria"
        style={{
          marginTop: 20,
        }}
        functionUpdate={update}
      />
      <div id="backdrop"></div>
    </section>
  );
}