import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { AlertError, AlertSuccess } from "../../Alert/Modal";
import { Input, Button, Table } from "../../Form";
import { FaBookOpen, FaTimes } from "react-icons/fa";
import { Tooltip, IconButton } from "@material-ui/core";
import { ToastError, ToastSuccess } from "../../Alert/Toast";

const Backdrop = (props) => {
  const [attUniversidade, setAttUniversidade] = useState(props.data[1] || ""); // State para atualizar o campo
  const [errAttUniversidade, seterrAttUniversidade] = useState(null); // State para atualizar o campo
  const updateEvent = (e) => {
    // na hora que clica no botao de atualizar
    e.preventDefault();
    if (
      attUniversidade !== null &&
      attUniversidade !== "" &&
      attUniversidade.length > 3
    ) {
      // verificacao dos campos
      axios
        .post(
          `${process.env.REACT_APP_API}/${props.tabela}/update/`, // requisicao post backend/api/campo/update METHOD POST
          JSON.stringify({
            // faz um json com
            universidade: attUniversidade, // o campo que deve ser atualizado
            id: props.data[0], // o id da universidade que deve ser atualizado no WHERE
          })
        )
        .then((value) => {
          if (value.data.status_code === 200) {
            // verifica se status code retorna 200 = OK
            ToastSuccess({ text: value.data.data }); // mensagem de sucesso
            close(); // fecha o backdrop
            setTimeout(() => {
              window.location.reload(); // atualiza a pagina dps de 4 segundos
            }, 4000);
          } else {
            ToastError({
              text: `Ops... Ocorreu algum erro: ${value.data.data}`,
            });
          }
        })
        .catch((error) => ToastError({ text: error })); // caso backend retorne erro aparece aqui
    } else {
      // previne e coloca os erros
      seterrAttUniversidade("O campo tem que ter no minimo 3 caracteres");
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
        Atualizar Universidade: {props.data[1]}
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
          value={attUniversidade}
          error={errAttUniversidade}
          onChange={(e) => {
            setAttUniversidade(e.target.value);
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

export default function FormularioUniversidade() {
  const [ErroUniversidade, setErroUniversidade] = useState(null);
  const refUniversidade = useRef(null);

  const [universidades, setUniversidades] = React.useState([]);
  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/universidade/index/`)
      .then((value) => {
        setUniversidades(value.data.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 80,
    },
    {
      field: "nomeUniversidade",
      headerName: "Universidade",
      width: 200,
    },
  ];
  const linhas = universidades.map
    ? universidades.map((el) => {
        return { id: el.idUniversidade, nomeUniversidade: el.nomeUniversidade };
      })
    : [];

  // @ts-check
  /**
   * @description O que ira renderizar no click da tabela do update
   * @author Delfino
   * @date 22/09/2021
   * @param {number} id
   * @param {string} tabela
   * @param {string} nome
   * @param {Array} linhas  []
   * @param {Array} colunas  []
   */
  const update = (id, tabela, nome, linhas, colunas) => {
    let data = linhas.filter((el) => el.id === id)[0]; //
    delete data.update;
    delete data.delete;
    let titles = colunas;
    data = Object.values(data);

    let div = document.querySelector("#backdrop");
    div.classList.toggle("open");

    ReactDOM.render(
      <Backdrop data={data} titles={titles} tabela={tabela} nome={nome} />,
      div
    );
  };

  return (
    <section>
      <div className="c-forms">
        <div className="c-forms__title">
          <h2 className="c-forms__question">Universidade</h2>
        </div>
        <div className="c-forms__quite"></div>
        <form
          method="post"
          id="formU"
          className="c-form"
          onSubmit={(e) => {
            e.preventDefault();

            if (refUniversidade !== null) {
              if (
                refUniversidade.current.value.trim() !== "" &&
                refUniversidade.current.value.trim().length > 3
              ) {
                setErroUniversidade(null);
                axios
                  .post(
                    process.env.REACT_APP_API + "/universidade/create/",
                    JSON.stringify({
                      universidade: refUniversidade.current.value,
                    })
                  )
                  .then((data) => {
                    refUniversidade.current.value = "";
                    if (data.data.status_code === 200) {
                      AlertSuccess({
                        text: "Universidade inserida com sucesso",
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
                setErroUniversidade("O campo tem que ser maior que 3");
              }
            } else {
              setErroUniversidade("O campo não pode estar vazio");
            }
          }}
        >
          <Input
            title="Universidade: *"
            ref={refUniversidade}
            error={ErroUniversidade}
            id="universidade"
            class=" c-form__item"
            name="universidade"
            type="text"
            icon={<FaBookOpen />}
            inputMode="text"
          />
          <Button type="submit" styleButton={{ marginTop: 20 }}>
            Adicionar Universidade
          </Button>
        </form>
        <Table
          colunas={columns}
          linhas={linhas}
          tabela={"universidade"}
          nome="Universidade"
          style={{
            marginTop: 20,
          }}
          functionUpdate={update}
        />
        <div id="backdrop"></div>
      </div>
    </section>
  );
}
