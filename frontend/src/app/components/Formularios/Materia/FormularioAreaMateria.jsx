import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { AlertError, AlertSuccess } from "../../Alert/Modal";
import { Input, Button, Table } from "../../Form";
import { FaBookOpen, FaTimes, FaSearch } from "react-icons/fa";
import { Tooltip, IconButton } from "@material-ui/core";
import { ToastError, ToastSuccess, ToastWarning } from "../../Alert/Toast";

const Backdrop = (props) => {
  const [attAreaMateria, setAttAreaMateria] = useState(props.data[1] || ""); // State para atualizar o campo
  const [errAttAreaMateria, seterrAttAreaMateria] = useState(null); // State para atualizar o campo
  const updateEvent = (e) => {
    // na hora que clica no botao de atualizar
    e.preventDefault();
    if (
      attAreaMateria !== null &&
      attAreaMateria !== "" &&
      attAreaMateria.length > 4
    ) {
      // verificacao dos campos
      axios
        .put(
          `${process.env.REACT_APP_API}/areaMateria/update/`, // requisicao post backend/api/campo/update METHOD POST

          JSON.stringify({
            // faz um json com
            areaMateria: attAreaMateria, // o campo que deve ser atualizado
            id: props.data[0], // o id da universidade que deve ser atualizado no WHERE
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
        })
        .catch((error) => ToastError({ text: error })); // caso backend retorne erro aparece aqui
    } else {
      // previne e coloca os erros
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
        <Button type="submit" className="c-formularioUpdate__item">
          Atualizar
        </Button>
      </form>
    </section>
  );
};

export default function FormularioAreaMateria() {

  const [pesquisa, setPesquisa] = useState("");

  const [ErroAreaMateria, setErroAreaMateria] = useState(null);
  const refAreaMateria = useRef(null);

  const [areaMaterias, setareaMaterias] = React.useState([]);
  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/areaMateria/index/?pesquisa=${pesquisa}&data=true`, {
        headers: {
          Authorization: `Bearer ${
            localStorage.getItem("auth") || localStorage.getItem("user")
          }`,
        },
      })
      .then((value) => {
        console.log(value.data)
        if (value.data.status_code === 200) {
          setareaMaterias(value.data.data);
        } else ToastWarning({ text: value.data.data[0] || "Warning" });
      })
      .catch((error) => ToastError({ text: error || "Warning" }));
  }, [pesquisa]);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 80,
    },
    {
      field: "nomeAreaMateria",
      headerName: "Area Materia",
      width: 200,
    },
  ];
  const linhas = areaMaterias.map
    ? areaMaterias.map((el) => {
        return { id: el.idAreaMateria, nomeAreaMateria: el.nomeAreaMateria };
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
        id="formAM"
        className="c-form"
        onSubmit={(e) => {
          e.preventDefault();

          if (refAreaMateria !== null) {
            if (
              refAreaMateria.current.value.trim() !== "" &&
              refAreaMateria.current.value.trim().length >= 4
            ) {
              setErroAreaMateria(null);
              axios
                .post(
                  process.env.REACT_APP_API + "/areaMateria/create/",
                  JSON.stringify({
                    areaMateria: refAreaMateria.current.value,
                  }),
                  {
                    headers: {
                      Authorization: `Bearer ${
                        localStorage.getItem("auth") ||
                        localStorage.getItem("user")
                      }`,
                    },
                  }
                )
                .then((data) => {
                  refAreaMateria.current.value = "";
                  if (data.data.status_code === 200) {
                    AlertSuccess({
                      text: "Area da Materia inserida com sucesso",
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
            } else {
              setErroAreaMateria("O campo tem que ser maior que 4");
            }
          } else {
            setErroAreaMateria("O campo não pode estar vazio");
          }
        }}
      >
        <Input
          title="Area Matéria: *"
          ref={refAreaMateria}
          error={ErroAreaMateria}
          id="areamateria"
          name="areamateria"
          type="text"
          icon={<FaBookOpen />}
          inputMode="text"
        />
        <Button
          type="submit"
          styleButton={{ marginTop: 20 }}
          onClick={() => {}}
        >
          Adicionar Area Matéria
        </Button>
      </form>

      <div className="c-forms__table">
        <Input
          placeholder="Pesquise pelo nome da área"
          icon={<FaSearch />}
          value={pesquisa}
          onChange={(e) => setPesquisa(e.target.value)}
          id="pesquisa"
          className="c-forms__inputSearch"
        />   
      <Table
        colunas={columns}
        linhas={linhas}
        tabela={"areaMateria"}
        nome="Área Matéria"
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
