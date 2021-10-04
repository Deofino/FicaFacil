import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Input,
  Button,
  RadioGroup,
  Radio,
} from "../Form/";
import { AlertSuccess, AlertError } from "../Alert/Modal";
import { ToastError, ToastInformation } from "../Alert/Toast";
import { Tooltip, IconButton } from "@material-ui/core";
import { FaListAlt, FaImages, FaFont } from "react-icons/fa";

export default function FormularioResposta() {

  const [selectedQuestao, setSelectedQuestao] = useState(0);
  const [certaResposta, setCertaResposta] = useState(null);

  const [TypeInputAlternativa, setTypeInputAlternativa] = useState("text");

  const [Resposta, setResposta] = useState([]);

  const [ErroResposta, setErroResposta] = useState(null);
  const [ErroQuestaoSelecionada, setErroQuestaoSelecionada] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/resposta/index/`)
      .then((value) => setResposta(value.data.data))
      .catch((error) => ToastError("Nenhuma resposta encontrada"));
  }, []);
  const [inputAlternativa, setInputAlternativa] = useState("");
  const [alternativas, setAlternativas] = useState([]);

  const submitForm = (e) => {
    e.preventDefault();

    if (selectedQuestao === 0 || selectedQuestao === -1) {
      setErroQuestaoSelecionada("Selecione uma questao");
    } else {
      setErroQuestaoSelecionada(null);
      if (alternativas !== null) {
        if (alternativas !== [] && alternativas.length === 5) {
          if (certaResposta !== null) {
            let data = null;
            if (TypeInputAlternativa === "text") {
              data = JSON.stringify({
                alternativas: alternativas,
                certaResposta: certaResposta,
                questao: selectedQuestao,
              });
            } else {
              let formData = new FormData(
                document.querySelector("#formResposta")
              );
              formData.append("certaResposta", certaResposta);
              formData.append("questao", selectedQuestao);
              data = formData;
            }

            setErroResposta(null);
            setAlternativas([]);
            setInputAlternativa("");
            setSelectedQuestao(0);
            setCertaResposta(null);

            axios
              .post(`${process.env.REACT_APP_API}/resposta/create/`, data)
              .then((value) => {
                if (value.data.status_code === 200) {
                  console.log(value.data);
                  AlertSuccess({
                    text: "Resposta inserida com sucesso",
                    title: "Sucesso...",
                  });
                } else {
                  console.error(value.data);
                  AlertError({
                    text: "Ocorreu algum erro ao adicionar a resposta",
                    title: "Ops...",
                  });
                }
              })
              .catch((error) => {
                AlertError({
                  text: "Parece que esta questao ja tem respostas...",
                  title: "Ops...",
                });
              });
          } else {
            setCertaResposta(null);
            setErroResposta("Marque uma alternativa correta");
          }
        } else {
          setErroResposta("Adicione 5 alternativas");
          setCertaResposta(null);
          /*    AlertError({ text: "Campo deve conter mais do que 4 caracteres", title: 'Atenção...' }); */
        }
      } else {
        setCertaResposta(null);
        setErroResposta("Adicione 5 alternativas");
      }
    }
  };

 /*  const colunas = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
    },
    {
      field: "resposta",
      headerName: "Resposta",
      width: 200,
    },
    {
      field: "certa",
      headerName: "Certa?",
      width: 100,
    },
    {
      field: "questao",
      headerName: "Questao",
      width: 200,
    },
  ]; 

   const linhas =
    Resposta !== undefined && Resposta.resposta !== undefined
      ? Resposta.resposta.map((resposta) => {
          return {
            id: resposta.idResposta,
            resposta: resposta.textoResposta,
            certa: +resposta.certaResposta === 0 ? "Não" : "Sim",
            questao:
              Resposta.questao.questao !== undefined &&
              Resposta.questao.questao.filter(
                (e) => e.idQuestao === resposta.idQuestao
              )[0].tituloQuestao,
          };
        })
      : []; */

  return (
    <React.Fragment>
        <h2 className="c-formResposta__title">Adicionar resposta</h2>
        <section className="c-formResposta">
          <form
            method="post"
            id="formResposta"
            className="c-formResposta"
            onSubmit={submitForm}
            encType='encType="multipart/form-data"'
          >
            <div className="c-formResposta__inpL">
              <Input
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
                      {TypeInputAlternativa === "text" ? (
                        <FaImages />
                      ) : (
                        <FaFont />
                      )}
                    </IconButton>
                  </Tooltip>
                }
                value={inputAlternativa}
                icon={<FaListAlt />}
                onChange={({ target }) => {
                  setInputAlternativa(target.value);
                }}
              />
            </div>
            <div className="c-formResposta__inpR">
              <Button
                type="button"
                styleButton={{ padding: 25 }}
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
                Adicionar
              </Button>
            </div>
            <section className="formResposta__alternativas">
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
                        }} >

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
            </section>
          </form>
        </section>
    </React.Fragment>
  );
}
