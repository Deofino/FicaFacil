import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { Input, Select, Button, Table } from "../../Form/";
import { AlertError, AlertSuccess } from "../../Alert/Modal";
import { Tooltip, IconButton } from "@material-ui/core";
import { ToastError, ToastSuccess, ToastWarning } from "../../Alert/Toast";
import { FaTimes, FaBookOpen, FaSearch } from "react-icons/fa";

const Backdrop = (props) => {
  const [attMateria, setAttMateria] = useState(props.data[1] || ""); // State para atualizar o campo
  const [errAttMateria, seterrAttMateria] = useState(null); // State para atualizar o campo
  const [attAreaMateria, setAttAreaMateria] = useState(null); // State para atualizar o campo
  const [attReqMateria, setattReqMateria] = useState([]); // State para atualizar o campo
  const [errAttAreaMateria, seterrAreaAttMateria] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/materia/index/`, {
        headers: {
          Authorization: `Bearer ${
            localStorage.getItem("auth") || localStorage.getItem("user")
          }`,
        },
      })
      .then((value) => {
        if (value.data.status_code === 200) {
          setattReqMateria(value.data.data);
          setAttAreaMateria(
            value.data.data.area.find(
              (el) => el.nomeAreaMateria === props.data[2]
            ).idAreaMateria
          );
        }
      })
      .catch((error) => ToastError({ text: error || "Error" }));
  }, [props.data]);
  const updateEvent = (e) => {
    // na hora que clica no botao de atualizar
    e.preventDefault();
    if (attMateria !== null && attMateria !== "" && attMateria.length > 4) {
      // verificacao dos campos
      axios
        .put(
          `${process.env.REACT_APP_API}/materia/update/`, // requisicao post backend/api/campo/update METHOD POST
          JSON.stringify({
            // faz um json com
            materia: attMateria, // o campo que deve ser atualizado
            id: props.data[0], // o id da materia que deve ser atualizado no WHERE
            area: attAreaMateria, // o id da area materia que deve ser atualizado no WHERE
          }),
          {
            headers: {
              Authorization: `Bearer ${
                localStorage.getItem("auth") || localStorage.getItem("user")
              }`,
            },
          }
        )
        .then((value) => {
          if (value.data.status_code === 200) {
            // verifica se status code retorna 200 = OK
            ToastSuccess({ text: value.data.data }); // mensagem de sucesso
            close(); // fecha o backdrop
            setTimeout(() => {
              window.location.reload(); // atualiza a pagina dps de 4 segundos
            }, 4000);
          } else ToastWarning({ text: value.data.data || "Warning" });
        });
    } else {
      // previne e coloca os erros
      seterrAttMateria("O campo tem que ter no minimo 4 caracteres");
      seterrAreaAttMateria("O campo tem que ter no minimo 4 caracteres");
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
        Atualizar Matéria: {props.data[1]}
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
          value={attMateria}
          error={errAttMateria}
          onChange={(e) => {
            setAttMateria(e.target.value);
          }}
          inputMode="text"
        />

        <Select
          className="c-formMateria__select"
          name="areaMateria"
          title={props.titles[2].headerName || "Input"}
          id="areaMateria"
          value={attAreaMateria}
          error={errAttAreaMateria}
          onChange={({ target }) => setAttAreaMateria(target.value)}
        >
          <option value={-1}>Selecione</option>
          {attReqMateria.area !== undefined &&
            attReqMateria.area.map((item) => (
              <option value={item.idAreaMateria} key={item.idAreaMateria}>
                {item.idAreaMateria + " - " + item.nomeAreaMateria}
              </option>
            ))}
        </Select>
        <Button type="submit" className="c-formularioUpdate__item">
          Atualizar
        </Button>
      </form>
    </section>
  );
};

export default function FormularioMateria() {
  const [pesquisa, setPesquisa] = useState("");

  const [areasMaterias, setAreasMaterias] = useState([]);
  const [selectedAreaMateria, setSelectedAreaMateria] = useState(0);

  const [materias, setMaterias] = useState([]);

  const refMateria = useRef(null);

  const [ErroMateria, setErroMateria] = useState(null);
  const [ErroAreaMateria, setErroAreaMateria] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/areaMateria/index/`, {
        headers: {
          Authorization: `Bearer ${
            localStorage.getItem("auth") || localStorage.getItem("user")
          }`,
        },
      })
      .then((value) => {
        if (value.data.status_code === 200) {
          setAreasMaterias(value.data.data);
        }
      })
      .catch((error) => ToastError({ text: error || "Error" }));

    axios
      .get(`${process.env.REACT_APP_API}/materia/index/?pesquisa=${pesquisa}`, {
        headers: {
          Authorization: `Bearer ${
            localStorage.getItem("auth") || localStorage.getItem("user")
          }`,
        },
      })
      .then((value) => {
        if (value.data.status_code === 200) {
          setMaterias(value.data.data);
        }
      })
      .catch((error) => ToastError({ text: error || "Error" }));
  }, [pesquisa]);

  const submitForm = (e) => {
    e.preventDefault();

    let inputs = [refMateria.current.value];

    let errorMsg = "O campo precisa ter mais de 4 caracteres";

    if (selectedAreaMateria <= 0)
      setErroAreaMateria("Selecione uma Area Matéria");
    else setErroAreaMateria(null);

    if (refMateria.current.value.length < 4) setErroMateria(errorMsg);
    else setErroMateria(null);

    if (
      inputs.every((ipt) => ipt.trim().length > 4) &&
      selectedAreaMateria > 0
    ) {
      axios
        .post(
          `${process.env.REACT_APP_API}/materia/create/`,
          JSON.stringify({
            materia: refMateria.current.value || null,
            area: selectedAreaMateria,
          }),
          {
            headers: {
              Authorization: `Bearer ${
                localStorage.getItem("auth") || localStorage.getItem("user")
              }`,
            },
          }
        )
        .then((data) => {
          refMateria.current.value = "";
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
      field: "materia",
      headerName: "Matéria",
      width: 200,
    },
    {
      field: "area",
      headerName: "Área Matéria",
      width: 200,
    },
  ];

  const linhas = materias.materia
    ? materias.materia.map((materia) => {
        return {
          id: materia.idMateria,
          materia: materia.nomeMateria,
          area: materias.area.filter(
            (e) => e.idAreaMateria === materia.idAreaMateria
          )[0].nomeAreaMateria,
        };
      })
    : null;

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
      <form method="post" id="formM" className="c-form" onSubmit={submitForm}>
        <Input
          title="Materia: *"
          id="nomeMateria"
          error={ErroMateria}
          className="c-formMateria__input"
          ref={refMateria}
          name="materia"
          icon={<FaBookOpen />}
        />
        <Select
          name="areaMateria"
          label="Área: *"
          className="c-formMateria__select"
          id="areaMateria"
          value={selectedAreaMateria}
          error={ErroAreaMateria}
          onChange={({ target }) => setSelectedAreaMateria(target.value)}
        >
          <option value="0">Selecione</option>
          {areasMaterias !== [] &&
            areasMaterias.map &&
            areasMaterias.map((item) => (
              <option value={item.idAreaMateria} key={item.idAreaMateria}>
                {item.idAreaMateria + " - " + item.nomeAreaMateria}
              </option>
            ))}
        </Select>

        <Button
          className="c-formMateria__submit"
          styleButton={{ marginTop: 20 }}
          type="submit"
        >
          Cadastrar
        </Button>
      </form>
      <div className="c-forms__table">
        <Input
          placeholder="Pesquise pelo nome da matéria ou área"
          icon={<FaSearch />}
          value={pesquisa}
          onChange={(e) => setPesquisa(e.target.value)}
          id="pesquisa"
          className="c-forms__inputSearch"
        />

        <Table
          colunas={colunas}
          linhas={linhas || []}
          tabela="materia"
          nome="Matéria"
          style={{
            marginTop: 20,
          }}
          functionUpdate={update}
        />
      </div>
      <div id="backdrop"></div>
    </section>
  );
}
