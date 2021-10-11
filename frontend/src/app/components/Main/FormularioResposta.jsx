import React, { useState } from "react";
import { UseQuestion } from "../Context/QuestaoContext";
import { Input, Button, RadioGroup, Radio } from "../Form/";
import { ToastInformation } from "../Alert/Toast";
import { Tooltip, IconButton } from "@material-ui/core";
import { FaListAlt, FaImages, FaFont } from "react-icons/fa";

export default function FormularioResposta() {
  const {
    alternativa: {
      alternativas,
      setAlternativas,
      correta,
      setCorreta,
      erroAlterativa,
      setErroAlternativa,
    },
  } = UseQuestion();

  const [TypeInputAlternativa, setTypeInputAlternativa] = useState("text");

  const [inputAlternativa, setInputAlternativa] = useState("");

  return (
    <React.Fragment>
      <h2 className="c-formResposta__title">Adicionar resposta</h2>
      <section className="c-formResposta">
        <div
          method="post"
          id="formResposta"
          className="c-formResposta"
          encType='encType="multipart/form-data"'
        >
          <div className="c-formResposta__inpL">
            <Input
              title="Alternativas"
              type={TypeInputAlternativa}
              multiple={true}
              id="alternativas"
              name={"alternativas[]"}
              error={erroAlterativa}
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
                      setCorreta(null);
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
                TypeInputAlternativa !== "text" && setAlternativas([]);
              }}
            />
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
                      setErroAlternativa(null);
                      setAlternativas([...alternativas, inputAlternativa]);
                      setInputAlternativa("");
                    } else
                      setErroAlternativa(
                        "O campo deve ter no minimo 3 caracteres e não deve ser igual a alguma outra"
                      );
                  } else {
                    if (input.files.length === 5) {
                      setErroAlternativa(null);
                      let images = [];
                      for (let i = 0; i < input.files.length; i++) {
                        let image = {
                          img: URL.createObjectURL(input.files[i]),
                          title: input.files[i].name,
                          file: input.files[i],
                        };
                        images.push(image);
                      }
                      setAlternativas(images);
                    } else {
                      setErroAlternativa(
                        "Selecione somente as 5 alternativas, nem mais nem menos."
                      );
                    }
                  }
                } else {
                  setErroAlternativa(
                    "Você tem que ter somente 5 alternativas, seja imagem ou texto"
                  );
                }
              }}
            >
              Adicionar
            </Button>
          </div>
          <section
            className={"c-formResposta__alternativas " + TypeInputAlternativa}
          >
            {alternativas !== [] &&
              alternativas.map((el, i) => (
                <RadioGroup
                  key={i}
                  onChange={(e) => {
                    setCorreta(e.target.value);
                  }}
                  value={correta}
                >
                  {document.querySelector("#alternativas").type === "text" ? (
                    <div
                      className={
                        i % 2 === 0
                          ? "c-alternativa--texto par"
                          : "c-alternativa--texto impar"
                      }
                    >
                      <Radio
                        value={el}
                        label={`"${el}" é a resposta dessa questao?`}
                      />
                    </div>
                  ) : (
                    <div className="c-alternativa">
                      <img src={`${el.img}`} alt={el.title} />
                      <Radio
                        value={el.title}
                        label={` é a resposta dessa questao?`}
                      />
                    </div>
                  )}
                </RadioGroup>
              ))}
          </section>
        </div>
      </section>
    </React.Fragment>
  );
}
