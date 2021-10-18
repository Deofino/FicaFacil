import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { AlertError, AlertSuccess } from "../../Alert/Modal";
import { Input, Button, Table } from "../../Form";
import { Tooltip, IconButton } from "@material-ui/core";
import { ToastError, ToastSuccess, ToastWarning } from "../../Alert/Toast";
import { FaChartArea, FaTimes } from "react-icons/fa";

const Backdrop = (props) => {
  const [attDificuldade, setAttDificuldade] = useState(props.data[1] || ""); // State para atualizar o campo
  const [errAttDificuldade, seterrAttDificuldade] = useState(null); // State para atualizar o campo
  const updateEvent = (e) => {
    // na hora que clica no botao de atualizar
    e.preventDefault();
    if (
      attDificuldade !== null &&
      attDificuldade !== "" &&
      attDificuldade.length > 4
    ) {
      // verificacao dos campos
      axios
        .put(
          `${process.env.REACT_APP_API}/dificuldade/update/`, // requisicao post backend/api/campo/update METHOD POST
          JSON.stringify({
            // faz um json com
            dificuldade: attDificuldade, // o campo que deve ser atualizado
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
      seterrAttDificuldade("O campo tem que ter no minimo 4 caracteres");
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
        Atualizar Dificuldade: {props.data[1]}
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
          value={attDificuldade}
          error={errAttDificuldade}
          onChange={(e) => {
            setAttDificuldade(e.target.value);
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

export default function FormularioDificuldade() {
  const [ErroDificuldade, setErroDificuldade] = useState(null);
  const refDificuldade = useRef(null);

  const [questoes, setQuestoes] = React.useState([]);
  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/dificuldade/index/`, {
        headers: {
          Authorization: `Bearer ${
            localStorage.getItem("auth") || localStorage.getItem("user")
          }`,
        },
      })
      .then((value) => {
          if (value.data.status_code === 200) {
            setQuestoes(value.data.data);
          }
      })
      .catch((error) => ToastError({ text: error || "Error" }));
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 80,
    },
    {
      field: "nivelDificuldade",
      headerName: "Dificuldade",
      width: 200,
    },
  ];
  const linhas = questoes.map
    ? questoes.map((el) => {
        return { id: el.idDificuldade, nivelDificuldade: el.nivelDificuldade };
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
      <div className="c-forms">
        <div className="c-forms__title">
          <h2 className="c-forms__question">Dificuldade</h2>
        </div>
        <div className="c-forms__quite"></div>
        <form
          method="post"
          id="formU"
          className="c-form"
          onSubmit={(e) => {
            e.preventDefault();

            if (refDificuldade !== null) {
              if (
                refDificuldade.current.value.trim() !== "" &&
                refDificuldade.current.value.trim().length > 4
              ) {
                setErroDificuldade(null);
                axios
                  .post(
                    process.env.REACT_APP_API + "/dificuldade/create/",
                    JSON.stringify({
                      dificuldade: refDificuldade.current.value,
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
                    refDificuldade.current.value = "";
                    if (data.data.status_code === 200) {
                      AlertSuccess({
                        text: "Dificuldade inserida com sucesso",
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
                setErroDificuldade("O campo tem que ser maior que 4");
              }
            } else {
              setErroDificuldade("O campo não pode estar vazio");
            }
          }}
        >
          <Input
            title="Dificuldade: *"
            ref={refDificuldade}
            error={ErroDificuldade}
            id="dificuldade"
            name="dificuldade"
            type="text"
            icon={<FaChartArea />}
            inputMode="text"
          />
          <Button
            type="submit"
            styleButton={{ marginTop: 20 }}
            onClick={() => {}}
          >
            Adicionar Dificuldade
          </Button>
        </form>

        <Table
          colunas={columns}
          linhas={linhas}
          tabela={"dificuldade"}
          nome="Dificuldade"
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
