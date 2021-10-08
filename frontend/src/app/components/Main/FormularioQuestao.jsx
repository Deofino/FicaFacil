import axios from "axios";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { FaAlignJustify, FaFont, FaImages, FaPlusCircle } from "react-icons/fa";
import { AlertError, AlertSuccess } from "../Alert/Modal";
import { ToastWarning } from "../Alert/Toast";
import { Button, Input, MenuItem, Select, Table } from "../Form";
import FormularioSugestaoVideo from "./FormularioSugestaoVideo";
import FormularioResposta from "./FormularioResposta";
import { UseQuestion } from "../Context/QuestaoContext";

export default function FormularioQuestao() {
  const { alternativa, sugestao } = UseQuestion();
  const [selectUniversidade, setselectUniversidade] = useState(0);
  const [selectAssuntoMateria, setselectAssuntoMateria] = useState(0);
  const [selectDificuldade, setselectDificuldade] = useState(0);
  const [selectAdministrador, setselectAdministrador] = useState(0);

  const [QtdeImgsSelect, setQtdeImgsSelect] = useState(0);
  const [ImgsSelect, setImgsSelect] = useState(null);

  const refTitulo = useRef(null);
  const refTexto = useRef(null);
  const refImage = useRef(null);

  const [questoes, setQuestao] = useState([]);

  const [ErroTitulo, setErroTitulo] = useState(null);
  const [ErroTexto, setErroTexto] = useState(null);
  const [ErroUniversidade, setErroUniversidade] = useState(null);
  const [ErroAssuntoMateria, setErroAssuntoMateria] = useState(null);
  const [ErroDificuldade, setErroDificuldade] = useState(null);
  const [ErroAdministrador, setErroAdministrador] = useState(null);

  const errorMsg = "O campo precisa ter mais de 4 caracteres";
  const clean = (inputs, selects) => {
    inputs.forEach((val) => (val[0] = ""));
    selects.forEach((val) => val[2](0));
  };
  useEffect(() => {
    axios.get(process.env.REACT_APP_API + "/questao/index/").then((value) => {
      setQuestao(value.data.data);
    });
  }, []);

  const submitForm = (e) => {
    e.preventDefault();

    const inputs = [
      [refTitulo.current.value.trim(), setErroTitulo],
      [refTexto.current.value.trim(), setErroTexto],
    ];
    const selects = [
      [selectUniversidade, setErroUniversidade, setselectUniversidade],
      [selectDificuldade, setErroDificuldade, setselectDificuldade],
      [selectAssuntoMateria, setErroAssuntoMateria, setselectAssuntoMateria],
      [selectAdministrador, setErroAdministrador, setselectAdministrador],
    ];

    inputs.forEach((val) =>
      val[0].length <= 4 ? val[1](errorMsg) : val[1](null)
    );
    selects.forEach((val) =>
      val[0] === 0 || val[0] === -1 ? val[1]("Campo obrigatorio") : val[1](null)
    );

    let formulario = document.getElementById("form");

    let formData = new FormData(formulario);
    formData.append("correta", alternativa.correta);
    alternativa.alternativas.length > 0 &&
      formData.append("alternativas", alternativa.alternativas);

    axios
      .post(`${process.env.REACT_APP_API}/questao/create/`, formData)
      .then((val) => console.log(val.data));
    // Verificação geral
    if (
      inputs.every((ipt) => ipt[0].length > 4) &&
      selectUniversidade !== 0 &&
      selectAssuntoMateria !== 0 &&
      selectDificuldade !== 0 &&
      selectAdministrador !== 0
    ) {
      // axios
      //   .post(`${process.env.REACT_APP_API}/questao/create/`, formData)
      //   .then(function (parametro) {
      //     if (parametro.data) {
      //       clean(inputs, selects);
      //       AlertSuccess({
      //         text: "Questão inserida com sucesso",
      //         title: "Sucesso...",
      //       });
      //       setTimeout(() => {
      //         window.location.reload();
      //       }, 4000);
      //     }
      //   })
      //   .catch(function () {
      //     AlertError({ text: "Ocorreram alguns erros...", title: "Ops..." });
      //   });
    } else ToastWarning({ text: "Preencha todos os campos" });
  };

  const colunas = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
    },
    {
      field: "titulo",
      headerName: "Titulo Questão",
      width: 250,
    },
    {
      field: "texto",
      headerName: "Texto Questão",
      width: 200,
    },
    {
      field: "universidade",
      headerName: "Universidade",
      width: 150,
    },
    {
      field: "dificuldade",
      headerName: "Dificuldade",
      width: 150,
    },
    {
      field: "assuntoMateria",
      headerName: "Assunto Matéria",
      width: 150,
    },
    {
      field: "administrador",
      headerName: "Administrador",
      width: 150,
    },
  ];

  let linhas = questoes.questao
    ? questoes.questao.map((questao) => {
        return {
          id: questao.idQuestao,
          titulo: questao.tituloQuestao,
          texto: questao.textoQuestao,
          imagem: questao.imagensQuestao,
          universidade: questoes.universidade.filter(
            (e) => e.idUniversidade === questao.idUniversidade
          )[0].nomeUniversidade,
          dificuldade: questoes.dificuldade.filter(
            (e) => e.idDificuldade === questao.idDificuldade
          )[0].nivelDificuldade,
          assuntoMateria: questoes.assuntoMateria.assuntoMateria.filter(
            (e) => e.idAssuntoMateria === questao.idAssuntoMateria
          )[0].nomeAssuntoMateria,
          administrador: questoes.administrador.filter(
            (e) => e.idAdministrador === questao.idAdministrador
          )[0].nomeAdministrador,
        };
      })
    : [];

  return (
    <Fragment>
      <div className="c-forms">
        <div className="c-forms__title">
          <h2 className="c-forms__question">Questão</h2>
        </div>
        <div className="c-forms__quite"></div>
        <form
          method="post"
          id="form"
          onSubmit={(e) => submitForm(e)}
          encType="multipart/form-data"
        >
          <Input
            title="Titulo: *"
            id="titulo"
            name="titulo"
            type="text"
            error={ErroTitulo}
            ref={refTitulo}
            icon={<FaFont />}
            inputMode="text"
          />
          <Input
            title="Texto: *"
            id="texto"
            name="texto"
            type="text"
            error={ErroTexto}
            ref={refTexto}
            icon={<FaAlignJustify />}
            inputMode="text"
          />
          <section className="c-forms__preview">
            <label htmlFor="image" className="c-forms__img inputFile">
              <FaPlusCircle />
              {QtdeImgsSelect === 0 ? (
                <span>Procurar Imagens...</span>
              ) : (
                <span>{QtdeImgsSelect} imagem(s) selecionada(s)</span>
              )}
            </label>

            {ImgsSelect === null ? (
              <React.Fragment>
                <div className="c-forms__img"></div>
              </React.Fragment>
            ) : (
              ImgsSelect.map((val, i) => {
                let img = URL.createObjectURL(val);

                return (
                  <div className="c-forms__img" key={i}>
                    <img src={img} alt={val.name} />
                  </div>
                );
              })
            )}
          </section>

          <Input
            className="c-forms__input c-forms__input--invisible"
            title="Imagens:"
            id="image"
            accept="image/*"
            name="images[]"
            multiple={true}
            ref={refImage}
            type="file"
            onChange={(e) => {
              setQtdeImgsSelect(e.target.files.length);
              let arr = [];
              for (let i = 0; i < e.target.files.length; i++) {
                arr.push(e.target.files[i]);
              }
              setImgsSelect(arr);
            }}
            icon={<FaImages />}
          />
          <section className="c-forms__fks">
            <div className="c-forms__fks__top">
              <Select
                label="Universidades: *"
                id="universidade"
                name="universidade"
                error={ErroUniversidade}
                onChange={(e) => {
                  setselectUniversidade(e.target.value);
                }}
                value={selectUniversidade}
              >
                <MenuItem value={-1}>Selecione</MenuItem>
                {questoes.universidade !== undefined &&
                  questoes.universidade.map((el, i) => (
                    <MenuItem key={i} value={el["idUniversidade"]}>
                      {el["nomeUniversidade"]}
                    </MenuItem>
                  ))}
              </Select>

              <Select
                label="Dificuldades: *"
                id="dificuldades"
                name="dificuldade"
                error={ErroDificuldade}
                onChange={(e) => {
                  setselectDificuldade(e.target.value);
                }}
                value={selectDificuldade}
              >
                <MenuItem value={-1}>Selecione</MenuItem>
                {questoes.dificuldade !== undefined &&
                  questoes.dificuldade.map((el, i) => (
                    <MenuItem key={i} value={el["idDificuldade"]}>
                      {el["nivelDificuldade"]}
                    </MenuItem>
                  ))}
              </Select>
            </div>
            <div className="c-forms__fks__bottom">
              <Select
                label="Assunto Matéria: *"
                id="assuntoMateria"
                name="assuntoMateria"
                error={ErroAssuntoMateria}
                onChange={(e) => {
                  setselectAssuntoMateria(e.target.value);
                }}
                value={selectAssuntoMateria}
              >
                <MenuItem value={-1}>Selecione</MenuItem>
                {questoes.assuntoMateria !== undefined &&
                  questoes.assuntoMateria.assuntoMateria.map((el, i) => (
                    <MenuItem key={i} value={el["idAssuntoMateria"]}>
                      {el["nomeAssuntoMateria"]}
                    </MenuItem>
                  ))}
              </Select>
              <Select
                label="Administrador: *"
                id="administrador"
                name="administrador"
                error={ErroAdministrador}
                onChange={(e) => {
                  setselectAdministrador(e.target.value);
                }}
                value={selectAdministrador}
              >
                <MenuItem value={-1}>Selecione</MenuItem>
                {questoes.administrador !== undefined &&
                  questoes.administrador.map((el, i) => (
                    <MenuItem key={i} value={el["idAdministrador"]}>
                      {el["nomeAdministrador"]}
                    </MenuItem>
                  ))}
              </Select>
            </div>
          </section>

          <FormularioResposta alternativa={alternativa} />
          <FormularioSugestaoVideo className="mt" />

          <Button
            className="c-forms__submit"
            styleButton={{ marginTop: 20 }}
            type="submit"
          >
            Cadastrar Questão
          </Button>
        </form>

        {/* ------------------ TABELA DE DADOS (SELECT) ----------------------- */}
        <Table
          style={{ marginTop: 25 }}
          colunas={colunas}
          linhas={linhas}
          tabela="questao"
          nome="Questão"
        />
      </div>
    </Fragment>
  );
}
