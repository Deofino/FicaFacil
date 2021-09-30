import axios from "axios";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { FaFont, FaImages, FaPlusCircle, FaListAlt } from "react-icons/fa";
import { AlertError, AlertSuccess } from "../Alert/Modal";
import { ToastError, ToastWarning, ToastInformation } from "../Alert/Toast";
import { Button, Input, MenuItem, Select, Table, RadioGroup,
  Radio } from "../Form";
import { Tooltip, IconButton } from "@material-ui/core";

export default function FormularioQuestao() {
  const [selectUniversidade, setselectUniversidade] = useState(0);
  const [selectAssuntoMateria, setselectAssuntoMateria] = useState(0);
  const [selectDificuldade, setselectDificuldade] = useState(0);
  const [selectAdministrador, setselectAdministrador] = useState(0);

  const [QtdeImgsSelect, setQtdeImgsSelect] = useState(0);
  const [ImgsSelect, setImgsSelect] = useState(null);


  const refTitulo = useRef(null);
  const refTexto = useRef(null);
  const refImage = useRef(null);
  const refSelectUniversidade = useRef(null);
  const refSelectAssuntoMateria = useRef(null);
  const refSelectDificuldade = useRef(null);
  const refSelectAdministrador = useRef(null);

  const [questoes, setQuestao] = useState([]);

  const [ErroTitulo, setErroTitulo] = useState(null);
  const [ErroTexto, setErroTexto] = useState(null);
  const [ErroUniversidade, setErroUniversidade] = useState(null);
  const [ErroAssuntoMateria, setErroAssuntoMateria] = useState(null);
  const [ErroDificuldade, setErroDificuldade] = useState(null);
  const [ErroAdministrador, setErroAdministrador] = useState(null);
/* 
  const [respostas, setRespostas] = useState([]);
  const [selectedQuestao, setSelectedQuestao] = useState(0);
  const [certaResposta, setCertaResposta] = useState(null);

  const [TypeInputAlternativa, setTypeInputAlternativa] = useState("text");

  const [Resposta, setResposta] = useState([]);

  const [ErroResposta, setErroResposta] = useState(null);
  const [ErroQuestaoSelecionada, setErroQuestaoSelecionada] = useState(null); */

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API + "/questao/index/")
      .then((value) => {
        setQuestao(value.data.data);
      })
      .catch((error) => ToastError({ text: `Ligue o XAMPP : ${error}` }));
  }, []);
  const [inputAlternativa, setInputAlternativa] = useState("");
  const [alternativas, setAlternativas] = useState([]);

  const submitForm = (e) => {
    e.preventDefault();

    /** */
    let formulario = document.getElementById("form");
    let formData = new FormData(formulario);

    let inputs = [
      refTitulo.current.value,
      refTexto.current.value,
      refImage.current.value,
    ];
    let errorMsg = "O campo precisa ter mais de 4 caracteres";

    // Seta erro nos input's contidos na questão
    if (refTitulo.current.value.length < 4) setErroTitulo(errorMsg);
    else setErroTitulo(null);

    if (refTexto.current.value.length < 4) setErroTexto(errorMsg);
    else setErroTexto(null);

    // Seta erro nos select's contidos na questão
    if (selectUniversidade === 0)
      setErroUniversidade("Selecione uma Universidade");
    else setErroUniversidade(null);

    if (selectDificuldade === 0)
      setErroDificuldade("Selecione uma Dificuldade");
    else setErroDificuldade(null);

    if (selectAssuntoMateria === 0)
      setErroAssuntoMateria("Selecione um Assunto Matéria");
    else setErroAssuntoMateria(null);

    if (selectAdministrador === 0)
      setErroAdministrador("Selecione um Administrador");
    else setErroAdministrador(null);

    // Verificação geral
    if (
      inputs.every((ipt) => ipt.trim().length > 4) &&
      selectUniversidade !== 0 &&
      selectAssuntoMateria !== 0 &&
      selectDificuldade !== 0 &&
      selectAdministrador !== 0
    ) {
      axios
        .post(`${process.env.REACT_APP_API}/questao/create/`, formData)

        .then(function (parametro) {
          if (parametro.data) refTitulo.current.value = "";
          refTexto.current.value = "";
          refImage.current.value = "";
          setselectUniversidade(0);
          setselectDificuldade(0);
          setselectAssuntoMateria(0);
          setselectAdministrador(0);
          AlertSuccess({
            text: "Questão inserida com sucesso",
            title: "Sucesso...",
          });

          setTimeout(() => {
            window.location.reload();
          }, 4000);
        })
        .catch(function () {
          AlertError({ text: "Ocorreram alguns erros...", title: "Ops..." });
        });
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
      field: "imagem",
      headerName: "Imagem Questão",
      width: 200,
    },
    {
      field: "certaResposta",
      headerName: "Resposta",
      width: 100,
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

  let linhas = [];

  linhas = questoes.questao
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
          certaResposta: 10,
          respostas: [1, 2, 3],
          sugestao: [],
        };
      })
    : [];

  return (
    <Fragment>
      <div className="formquestion">
        <div className="formquestion__title">
          <h2 className="formquestion__question">Questão</h2>
        </div>
        <div className="formquestion__quite">
        </div>
        <form method="post" id="form" onSubmit={(e) => submitForm(e)} encType="multipart/form-data">

          <Input className="formquestion__input"
            title="Titulo: *"
            id="titulo"
            name="titulo"
            type="text"
            error={ErroTitulo}
            ref={refTitulo}
            icon={<FaFont />}
            inputMode="text"
          />
          <Input className="formquestion__input"
            title="Texto: *"
            id="texto"
            name="texto"
            type="text"
            error={ErroTexto}
            ref={refTexto}
            icon={<FaFont />}
            inputMode="text"
          />

      <section className="formquestion__preview">

          <label htmlFor='image' className="formquestion__img inputFile">
            <FaPlusCircle  />
            <span>
              3 Imagens selecionadas
            </span>
          </label>

          {ImgsSelect === null ? (
          <React.Fragment>
              <div className="formquestion__img">

              </div>

              <div className="formquestion__img">

              </div>

              <div className="formquestion__img">

              </div>
            </React.Fragment>
              
          ) : ImgsSelect.map((val,i)=>{
            
            let img = URL.createObjectURL(val);

            return(
              <div className="formquestion__img" key={i}>
                <img src={img} alt={val.name} />
              </div>
            );
          }) }

      </section>
          
            <Input
              className="formquestion__input formquestion__input--invisible"
              title="Imagens:"
              id="image"
              accept="image/*"
              name="images[]"
              multiple={true}
              ref={refImage}
              type="file"
              onChange={(e)=>{
                setQtdeImgsSelect(e.target.files.length);
                let arr = [];
                for(let i = 0; i < e.target.files.length; i++){
                  arr.push(e.target.files[i]);
                }
                setImgsSelect(arr);
              }}
              icon={<FaImages />}
            />
            <section className="formquestion__fks">
            <div className="formquestion__fks__top">
              <Select
                label="Universidades: *"
                id="universidade"
                name="universidade"
                error={ErroUniversidade}
                ref={refSelectUniversidade}
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
                ref={refSelectDificuldade}
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
              <div className="formquestion__fks__bottom">
              <Select
                label="Assunto Matéria: *"
                id="assuntoMateria"
                name="assuntoMateria"
                error={ErroAssuntoMateria}
                ref={refSelectAssuntoMateria}
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
                ref={refSelectAdministrador}
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
          <Button type="submit" styleButton={{ marginTop: 30 }}>
            Enviar
          </Button>
        </form>
        <Table
          colunas={colunas}
          linhas={linhas || []}
          tabela="questao"
          nome="Questão"
          style={{
            marginTop: 20,
          }}
        />
      {/* 

      <form
        method="post"
        id="formResposta"
        className="c-formResposta"
        onSubmit={submitForm}
        encType='encType="multipart/form-data"'
      >
        <h2 className="c-formResposta__headline">Resposta</h2> */}
       {/*  <Select
          label="Questao"
          className="c-formResposta__select"
          name="questao"
          id="questao"
          error={ErroQuestaoSelecionada}
          value={selectedQuestao}
          onChange={({ target }) => {
            setSelectedQuestao(target.value);
            console.log(target.value);
          }}
        >
          <MenuItem value={-1}>Selecione</MenuItem>
          {respostas.questao !== undefined &&
            respostas.questao.map((item) => (
              <MenuItem value={item.idQuestao} key={item.idQuestao}>
                {item.tituloQuestao}
              </MenuItem>
            ))}
        </Select> */}
      {/*   <Input
          title="Alternativas"
          type={TypeInputAlternativa}
          multiple={true}
          id="alternativas"
          name={"alternativas[]"}
          error={ErroResposta}
          iconEnd={
            <Tooltip title="Mudar para imagem/texto" placement="left">
              <IconButton
                onClick={() => {
                  setTypeInputAlternativa(
                    TypeInputAlternativa === "text" ? "file" : "text"
                  );
                  ToastInformation({
                    text: "Selecione as 5 imagens de uma vez.",
                  });
                  setAlternativas([]);
                  setInputAlternativa("");
                }}
              >
                {TypeInputAlternativa === "text" ? <FaImages /> : <FaFont />}
              </IconButton>
            </Tooltip>
          }
          value={inputAlternativa}
          icon={<FaListAlt />}
          onChange={({ target }) => {
            setInputAlternativa(target.value);
          }}
        />
        <Button
          type="button"
          styleButton={{ marginTop: 20 }}
          onClick={() => {
            let input = document.querySelector("#alternativas");
            if (
              inputAlternativa !== "" &&
              alternativas !== null &&
              alternativas.length < 5
            ) {
              if (input.type === "text") {
                if (
                  !alternativas.includes(inputAlternativa) &&
                  inputAlternativa.length >= 3
                ) {
                  setErroResposta(null);
                  setAlternativas([...alternativas, inputAlternativa]);
                  setInputAlternativa("");
                } else
                  setErroResposta(
                    "O campo deve ter no minimo 3 caracteres e não deve ser igual a alguma outra"
                  );
              } else {
                if (input.files.length === 5) {
                  setErroResposta(null);
                  let images = [];
                  for (let i = 0; i < input.files.length; i++) {
                    let image = {
                      img: URL.createObjectURL(input.files[i]),
                      title: input.files[i].name,
                    };
                    images.push(image);
                  }
                  setAlternativas(images);
                } else {
                  setErroResposta(
                    "Selecione somente as 5 alternativas, nem mais nem menos."
                  );
                }
              }
            } else {
              setErroResposta(
                "Você tem que ter somente 5 alternativas, seja imagem ou texto"
              );
            }
          }}
        >
          Adicionar alternativa
        </Button>
        {alternativas !== [] &&
          alternativas.map((el, i) => (
            <RadioGroup
              key={i}
              onChange={(e) => {
                setCertaResposta(e.target.value);
              }}
              value={certaResposta}
            >
              {document.querySelector("#alternativas").type === "text" ? (
                <Radio
                  value={el}
                  label={`"${el}" é a resposta dessa questao?`}
                />
              ) : (
                <div
                  className="c-alternativa"
                  style={{
                    background: "#333",
                    padding: 8,
                    borderRadius: 8,
                    display: "flex",
                  }}
                >
                  <img
                    src={`${el.img}`}
                    alt={el.title}
                    style={{
                      width: 100,
                      height: 100,
                    }}
                  />
                  <Radio
                    value={el.title}
                    label={` é a resposta dessa questao?`}
                  />
                </div>
              )}
            </RadioGroup>
          ))}
        <Button
          className="c-formResposta__submit"
          styleButton={{ marginTop: 20 }}
          type="submit"
        >
          Cadastrar
        </Button>
      </form>
      <Table
        colunas={colunas}
        linhas={linhas}
        tabela="resposta"
        nome="Resposta"
      /> */}
      </div>
    </Fragment>
  );
}
