import React, { useState, Fragment, useRef, createElement } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { AlertSuccess } from "../Alert/Modal";
import { Input, Button, Table } from "../Form";
import { FaBookOpen } from "react-icons/fa";

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
  const linhas = universidades.map((el) => {
    return { id: el.idUniversidade, nomeUniversidade: el.nomeUniversidade };
  });

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
    let div = document.querySelector("#backdrop");
    if (div) {
    } else {
      let backdrop = document.createElement("div");
      backdrop.id = "backdrop";
      document.querySelector("#l-universidade").appendChild(backdrop);
    }

    let data = linhas.filter((el) => el.id === id)[0]; //
    delete data.update;
    delete data.delete;
    let titles = colunas.splice(0, colunas.length - 2);
    data = Object.values(data);

    const Back = ({ titles, data }) => {
      return (
        <section className="c-formularioUpdate" id="c-formularioUpdate">
          <form
            onSubmit={() => {}}
            encType="multipart/form-data"
            id="formUpdate"
          >
            {titles.map((val, i) => (
              <Input
                key={i}
                title={val.headerName || "Input"}
                id={val.field || null}
                name={val.field || null}
                type={val.type || "text"}
                value={data[i]}
                inputMode="text"
              />
            ))}
            <Button type="submit">Atualizar</Button>
          </form>
        </section>
      );
    };

    ReactDOM.render(
      <Back data={data} titles={titles} />,
      document.querySelector("#backdrop")
    );
  };

  return (
    <section id="l-universidade">
      <form
        method="post"
        id="formU"
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
                /* .then(data => console.log(data)); */
                .then((refUniversidade.current.value = ""));

              AlertSuccess({
                text: "Universidade inserida com sucesso",
                title: "Sucesso...",
              });
            } else {
              setErroUniversidade("O campo tem que ser maior que 3");
            }
          } else {
            setErroUniversidade("O campo não pode estar vazio");
          }
        }}
      >
        <Input
          title="Universidade:"
          ref={refUniversidade}
          error={ErroUniversidade}
          id="universidade"
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
    </section>
  );
}
