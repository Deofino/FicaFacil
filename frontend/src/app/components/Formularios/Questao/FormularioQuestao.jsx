import axios from "axios";
import React, { Fragment, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import {
  FaAlignJustify,
  FaFont,
  FaImages,
  FaPlusCircle,
  FaSearch,
  FaTimes,
} from "react-icons/fa";
import { AlertError, AlertSuccess } from "../../Alert/Modal";
import {
  ToastError,
  ToastInformation,
  ToastSuccess,
  ToastWarning,
} from "../../Alert/Toast";
import { Button, Input, MenuItem, Select, Table, Radio } from "../../Form";
import FormularioSugestaoVideo from "./FormularioSugestaoVideo";
import FormularioResposta from "./FormularioResposta";
import { UseQuestion } from "../../Context/QuestaoContext";
import { IconButton, RadioGroup, Tooltip } from "@material-ui/core";

const Backdrop = (props) => {
  const [alternativas, setalternativas] = useState([]);
  const [correta, setcorreta] = useState(0);
  // Sugestao
  const [tituloSugestao, settituloSugestao] = useState("");
  const [thumbSugestao, setthumbSugestao] = useState("");
  const [urlSugestao, seturlSugestao] = useState("");
  var regexURL = /(http|Https|Http|Https|blob:http|blob:https):\/\/?/;
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API + `/resposta/index/${props.data[0]}/`, {
        headers: {
          Authorization: `Bearer ${
            localStorage.getItem("auth") || localStorage.getItem("user")
          }`,
        },
      })
      .then((value) => {
        if (value.data.status_code === 200) {
          setalternativas(value.data.data.resposta);
          setcorreta(
            value.data.data.resposta.find((e) => +e.certaResposta === 1)
              .textoResposta
          );
        } else ToastWarning({ text: value.data.data[0] || "Warning" });
        // } else console.log(value.data.data);
      });

    axios
      .get(
        process.env.REACT_APP_API + `/sugestaoVideo/index/${props.data[0]}/`,
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
          let sugestao = value.data.data.sugestaoVideo[0];
          settituloSugestao(sugestao.tituloSugestaoVideo || "");
          setthumbSugestao(sugestao.thumbnailSugestaoVideo || "");
          seturlSugestao(sugestao.urlSugestaoVideo || "");
        }
        // } else console.log(value.data.data);
      });
  }, [props.data]);

  const questoes = props.data[props.data.length - 1] || [];

  const [selectUniversidade, setselectUniversidade] = useState(
    questoes.universidade.find((e) => e.nomeUniversidade === props.data[4])
      .idUniversidade || 0
  );

  const [selectAssuntoMateria, setselectAssuntoMateria] = useState(
    questoes.assuntoMateria.assuntoMateria.find(
      (e) => e.nomeAssuntoMateria === props.data[6]
    ).idAssuntoMateria || 0
  );
  const [selectDificuldade, setselectDificuldade] = useState(
    questoes.dificuldade.find((e) => e.nivelDificuldade === props.data[5])
      .idDificuldade || 0
  );
  const [selectAdministrador, setselectAdministrador] = useState(
    questoes.administrador.find((e) => e.nomeAdministrador === props.data[7])
      .idAdministrador || 0
  );

  const [QtdeImgsSelect, setQtdeImgsSelect] = useState(
    JSON.parse(props.data[3]).length || 0
  );
  const [ImgsSelect, setImgsSelect] = useState(
    JSON.parse(props.data[3]) || null
  );

  const [titulo, settitulo] = useState(props.data[1] || "");
  const [texto, settexto] = useState(props.data[2] || "");
  const refImageUpdate = useRef(null);

  const updateEvent = (e) => {
    e.preventDefault();
    let form = document.querySelector("#formUpdate");
    let formData = new FormData(form);
    let ids = [];

    if (!regexURL.test(alternativas[0].textoResposta)) {
      // e texto
      let prev_alternativas = [];
      let alternativa_inputs = document.querySelectorAll(".alternativa-input");
      alternativa_inputs.forEach((el) => {
        if (
          el.value.trim() === "" ||
          el.value.trim() === null ||
          el.value.trim().length === 0
        ) {
          prev_alternativas.push({
            item: el.placeholder,
            value: el.placeholder,
            id: el.id,
          });
        } else
          prev_alternativas.push({
            item: el.placeholder,
            value: el.value,
            id: el.id,
          });
      });
      formData.append("alternativas", JSON.stringify(prev_alternativas));
    } else {
      document.querySelectorAll(".alternativa--image img").forEach((el) => {
        ids.push(el.id);
      });
      formData.append("alternativas-id", JSON.stringify(ids));
    }
    formData.append("correta", correta);
    formData.append("id", props.data[0] || 0);

    if (
      correta.length > 3 &&
      titulo.length >= 4 &&
      texto.length >= 4 &&
      selectAdministrador > 0 &&
      selectAssuntoMateria > 0 &&
      selectDificuldade > 0 &&
      selectUniversidade > 0
    ) {
      if (formData.get("alternativas-id") || formData.get("alternativas")) {
        if (
          tituloSugestao.length > 3 ||
          thumbSugestao.length > 3 ||
          urlSugestao.length > 3
        ) {
          if (
            tituloSugestao.length === 0 ||
            thumbSugestao.length === 0 ||
            urlSugestao.length === 0
          ) {
            ToastWarning({
              text: "Se você quer uma sugestão, preencha tudo corretamente",
            });
            return;
          }
        }
        axios
          .post(process.env.REACT_APP_API + "/questao/update/", formData, {
            headers: {
              Authorization: `Bearer ${
                localStorage.getItem("auth") || localStorage.getItem("user")
              }`,
            },
          })
          .then((el) => {
            if (el.data.status_code === 200) {
              ToastSuccess({ text: "Questao atualizada com sucesso!" });
              setTimeout(() => {
                window.location.reload();
              }, 4000);
            } else {
              ToastError({ text: `Ops... erro: ${el.data.data}` });
            }
          })
          .catch((err) => ToastError({ text: err }))
          .finally(() => close());
      } else ToastError({ text: "Preencha as alternativas" });
    } else {
      ToastError({ text: "Preencha todos os campos corretamente" });
    }
  };
  const close = () => {
    let backdrop = document.querySelector("#backdrop");
    backdrop.classList.toggle("open");
    ReactDOM.unmountComponentAtNode(backdrop);
  };
  return (
    <section className="c-formularioUpdate questao" id="c-formularioUpdate">
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
        Atualizar Questao: {props.data[1]}
      </h1>
      <form
        onSubmit={(e) => updateEvent(e)}
        encType="multipart/form-data"
        className="c-formularioUpdate__form--update"
        id="formUpdate"
      >
        <Input
          title="Titulo: *"
          id="titulo"
          name="titulo"
          type="text"
          value={titulo}
          onChange={(e) => settitulo(e.target.value)}
          inputMode="text"
        />
        <Input
          title="Texto: *"
          id="texto"
          icon={<FaAlignJustify />}
          rows={3}
          value={texto}
          onChange={(e) => settexto(e.target.value)}
          multiline
          name="texto"
          type="text"
          inputMode="text"
        />
        <div className="c-forms__preview">
          <label htmlFor="imageUpdate" className="c-forms__img inputFile">
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
              let img = "";
              if (typeof val === "string") {
                img = val;
              } else {
                img = URL.createObjectURL(val);
              }
              return (
                <div className="c-forms__img" key={i}>
                  <img src={img} alt={val.name || "Imagem"} />
                </div>
              );
            })
          )}
          <Input
            className="c-forms__input c-forms__input--invisible"
            title="Imagens:"
            id="imageUpdate"
            accept="image/*"
            name="imagesUpdate[]"
            multiple={true}
            ref={refImageUpdate}
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
        </div>

        <div className="c-forms__fks--update">
          <Select
            label="Universidades: *"
            id="universidade"
            name="universidade"
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
          <Select
            label="Assunto Matéria: *"
            id="assuntoMateria"
            name="assuntoMateria"
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
        <h2>Alternativas</h2>
        <p>Selecione a correta.</p>
        <div className="c-alternativas--update">
          {alternativas[0] !== undefined &&
          regexURL.test(alternativas[0].textoResposta) ? (
            <React.Fragment>
              <input
                type="file"
                className="input-file"
                multiple
                name="alternativas[]"
                accept="image/*"
                onChange={({ target }) => {
                  let images = target.files;
                  if (images.length === 5) {
                    let alternativas_por_imagem = [];
                    for (let i = 0; i < images.length; i++) {
                      const el = images[i];
                      let url = URL.createObjectURL(el);
                      let imagem = {
                        ...alternativas[i],
                        textoResposta: `${url}`,
                        nome: el.name,
                      };
                      alternativas_por_imagem.push(imagem);
                      setcorreta(null);
                    }
                    setalternativas(alternativas_por_imagem);
                  } else
                    ToastWarning({ text: "Selecione 5 imagens em seguida." });
                }}
              />
              <div className="alternativas--image">
                <RadioGroup
                  onChange={(e) => {
                    setcorreta(e.target.value);
                  }}
                  value={correta}
                >
                  {alternativas.map((el, i) => (
                    <div className="alternativa--image" key={i}>
                      <img
                        src={el.textoResposta}
                        alt={`Alternativa ${i}`}
                        id={el.idResposta}
                      />
                      <Radio value={el.nome || el.textoResposta} />
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </React.Fragment>
          ) : (
            <div>
              <RadioGroup
                onChange={(e) => {
                  setcorreta(e.target.value);
                }}
                value={correta}
              >
                {alternativas.map((el, i) => (
                  <div className="alternativa--texto" key={i}>
                    <input
                      placeholder={el.textoResposta}
                      className="alternativa-input"
                      id={el.idResposta}
                    />
                    <Radio value={el.textoResposta} />
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}
        </div>
        <br />
        <h2>Sugestao</h2>
        <Input
          title="Titulo:"
          id="tituloSugestao"
          value={tituloSugestao}
          onChange={(e) => settituloSugestao(e.target.value)}
          name="tituloSugestao"
          type="text"
          inputMode="text"
        />
        <Input
          title="Thumbnail:"
          id="thumb"
          value={thumbSugestao}
          onChange={(e) => setthumbSugestao(e.target.value)}
          name="thumb"
          type="text"
          inputMode="text"
        />
        <Input
          title="Url:"
          value={urlSugestao}
          onChange={(e) => seturlSugestao(e.target.value)}
          id="url"
          name="url"
          type="text"
          inputMode="text"
        />

        <Button
          className="c-forms__submit"
          styleButton={{ marginTop: 20 }}
          type="submit"
        >
          Atualizar
        </Button>
      </form>
    </section>
  );
};

export default function FormularioQuestao() {
  const { alternativa, sugestao, pesquisa, setPesquisa } = UseQuestion();

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

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_API +
          `/questao/index/?pesquisa=${pesquisa}&data=true`,
        {
          headers: {
            Authorization: `Bearer ${
              localStorage.getItem("auth") || localStorage.getItem("user")
            }`,
          },
        }
      )
      .then((value) => {
        // console.log(value.data);
        if (value.data.status_code === 200) {
          setQuestao(value.data.data);
        } else console.log(value.data.data);
        // } else ToastWarning({ text: value.data.data });
      })
      // .catch((err) => console.log(err));
      .catch((err) => ToastError({ text: err || "Warning" }));
  }, [pesquisa]);

  const update = (id, tabela, nome, linhas, colunas) => {
    let data = linhas.filter((el) => el.id === id)[0]; //
    delete data.update;
    delete data.delete;
    let titles = colunas;
    data = Object.values(data);

    let div = document.querySelector("#backdrop");
    div.classList.toggle("open");
    ToastInformation({ text: "Deixe o campo vazio para não atualiza-lo" });

    ReactDOM.render(<Backdrop data={data} titles={titles} />, div);
  };

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

    // Inputs obrigatorios
    inputs.forEach((val) =>
      val[0].length <= 4 ? val[1](errorMsg) : val[1](null)
    );
    // foreign keys
    selects.forEach((val) =>
      val[0] === 0 || val[0] === -1 ? val[1]("Campo obrigatorio") : val[1](null)
    );

    //alternativas
    if (alternativa.alternativas.length !== 5) {
      alternativa.setErroAlternativa("Você precisa das 5 alternativas.");
      return;
    }
    if (alternativa.correta === null) {
      alternativa.setErroAlternativa("Selecione umas das alternativas.");
      return;
    }
    alternativa.setErroAlternativa(null);

    //sugestao (opctional)
    let {
      thumbnail,
      titulo,
      url,
      setErroThumbVideo,
      setErroUrlVideo,
      setErroTituloSugestao,
    } = sugestao;
    const datas = [
      [titulo.trim(), setErroTituloSugestao],
      [thumbnail.trim(), setErroThumbVideo],
      [url.trim(), setErroUrlVideo],
    ];
    if (thumbnail.trim() !== "" || titulo.trim() !== "" || url.trim() !== "") {
      datas.forEach((val) =>
        val[0].length <= 4 ? val[1](errorMsg) : val[1](null)
      );
    } else {
      setErroThumbVideo(null);
      setErroUrlVideo(null);
      setErroTituloSugestao(null);
    }

    if (
      inputs.every((el) => el[0].trim().length > 4) &&
      selects.every((el) => el[0] > 0) &&
      alternativa.alternativas.length === 5 &&
      alternativa.correta !== null
    ) {
      let formulario = document.getElementById("form");
      let formData = new FormData(formulario);

      if (
        thumbnail.trim() === "" ||
        titulo.trim() === "" ||
        url.trim() === ""
      ) {
        formData.delete("url");
        formData.delete("tituloSugestao");
        formData.delete("thumbnail");
      } else {
        datas.forEach((el) => {
          if (el[0].trim() === "") {
            ToastWarning({ text: "Preencha todos os campos, Thumbnail" });
            return;
          }
        });
      }

      datas.forEach((el) => {
        el[1](null);
      });

      formData.append("correta", alternativa.correta);
      alternativa.alternativas.length > 0 &&
        formData.append(
          "alternativas",
          JSON.stringify(alternativa.alternativas)
        );

      axios
        .post(`${process.env.REACT_APP_API}/questao/create/`, formData, {
          headers: {
            Authorization: `Bearer ${
              localStorage.getItem("auth") || localStorage.getItem("user")
            }`,
          },
        })
        .then(function (parametro) {
          console.log(parametro.data);
          if (parametro.data.status_code === 200) {
            AlertSuccess({
              text: "Questão inserida com sucesso",
              title: "Sucesso...",
            });
          } else {
            AlertError({ text: "Ocorreram alguns erros...", title: "Ops..." });
          }
        })
        .catch(function (err) {
          AlertError({ text: "Ocorreram alguns erros...", title: "Ops..." });
        });
      setTimeout(() => {
        // window.location.reload();
      }, 4000);
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
      field: "resposta",
      headerName: "Resposta",
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
          resposta:
            questoes.respostas.resposta.filter((e) => {
              return (
                e.idQuestao === questao.idQuestao && e.certaResposta === "1"
              );
            })[0].textoResposta || "404",
          questao: questoes,
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
          className="c-form"
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
            rows={3}
            multiline
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
                  questoes.universidade.map &&
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
                  questoes.assuntoMateria.assuntoMateria !== undefined &&
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
        <div className="c-forms__table">
          <Input
            placeholder="Pesquise por algo..."
            icon={<FaSearch />}
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
            id="pesquisa"
            className="c-forms__inputSearch"
          />
          <Table
            style={{ marginTop: 25 }}
            colunas={colunas}
            linhas={linhas}
            tabela="questao"
            nome="Questão"
            functionUpdate={update}
          />
        </div>
        <div id="backdrop"></div>
      </div>
    </Fragment>
  );
}
