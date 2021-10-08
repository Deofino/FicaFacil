import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { Input, Button } from "../Form/";
import { AlertSuccess } from "../Alert/Modal";
import { Tooltip, IconButton } from "@material-ui/core";
import { ToastSuccess } from "../Alert/Toast";
import { FaTimes, FaLink, FaImage } from "react-icons/fa";
import { UseQuestion } from "../Context/QuestaoContext";

const BackdropSugestao = (props) => {
  console.log(props.data);
  const [attTituloSugestaoVideo, setattTituloSugestaoVideo] = useState(
    props.data[1] || ""
  ); // State para atualizar campo
  const [attThumbnailSugestaoVideo, setattThumbnailSugestaoVideo] = useState(
    props.data[2] || ""
  ); // State para atualizar campo
  const [attUrlSugestaoVideo, setattUrlSugestaoVideo] = useState(
    props.data[3] || ""
  ); // State para atualizar campo

  const refTituloVideo = useRef(null);
  const refThumbVideo = useRef(null);
  const refUrlVideo = useRef(null);

  const [errAttTituloSugestoVideo, setErrTituloSugestaoVideo] = useState(null); // State para atualizar o campo
  const [errAttUrlSugestoVideo, setErrUrlSugestaoVideo] = useState(null); // State para atualizar o campo
  const [errAttThumbnailSugestoVideo, setErrThumbnailSugestaoVideo] =
    useState(null); // State para atualizar o campo
  const [attQuestao, setAttQuestao] = useState(null); // State para atualizar o campo
  const [attReqSugestaoVideo, setattReqSugestaoVideo] = useState([]); // State para atualizar o campo

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/sugestaoVideo/index/`)
      .then((value) => {
        setattReqSugestaoVideo(value.data.data);
        setAttQuestao(
          value.data.data.questao.questao.find(
            (el) => el.tituloQuestao === props.data[4]
          ).idQuestao
        );
      })
      .catch((error) => console.error(error));
  }, [props.data]);
  const updateEvent = (e) => {
    // na hora que clica no botao de atualizar
    e.preventDefault();
    let inputs = [
      refTituloVideo.current.value,
      refThumbVideo.current.value,
      refUrlVideo.current.value,
    ];
    let errorMsg = "O campo precisa ter mais de 4 caracteres";

    // Seta erro nos input's contidos na questão
    if (attTituloSugestaoVideo.current.value.length < 4)
      setErrTituloSugestaoVideo(errorMsg);
    else setErrTituloSugestaoVideo(null);

    if (attThumbnailSugestaoVideo.current.value.length < 4)
      setErrThumbnailSugestaoVideo(errorMsg);
    else setErrThumbnailSugestaoVideo(null);

    if (attUrlSugestaoVideo.current.value.length < 4)
      setErrUrlSugestaoVideo(errorMsg);
    else setErrUrlSugestaoVideo(null);

    if (inputs.every((ipt) => ipt.trim().length > 4)) {
      // verificacao dos campos
      axios
        .post(
          `${process.env.REACT_APP_API}/sugestaoVideo/update/`, // requisicao post backend/api/campo/update METHOD POST
          JSON.stringify({
            // faz um json com
            titulosugestaoVideo: attTituloSugestaoVideo,
            thumbnailsugestaoVideo: attThumbnailSugestaoVideo,
            urlsugestaoVideo: attUrlSugestaoVideo,
            id: props.data[0], // o id dao sugestão video que deve ser atualizado no WHERE
            questao: attQuestao, // o id da questão que deve ser atualizado no WHERE
          })
        )
        .then((value) => {
          if (value.data.status_code) {
            // verifica se status code retorna 200 = OK
            ToastSuccess({ text: value.data.data }); // mensagem de sucesso
            close(); // fecha o backdrop
            setTimeout(() => {
              window.location.reload(); // atualiza a pagina dps de 4 segundos
            }, 4000);
          } else {
            console.log(value.data);
          }
        });
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
        Atualizar Sugestão Vídeo: {props.data[1]}
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
          value={attTituloSugestaoVideo}
          error={errAttTituloSugestoVideo}
          onChange={(e) => {
            setattTituloSugestaoVideo(e.target.value);
          }}
          inputMode="text"
        />

        <Input
          title={props.titles[2].headerName || "Input"}
          id={props.titles[2].field || null}
          className="c-formularioUpdate__item"
          name={props.titles[2].field || null}
          type={props.titles[2].type || "text"}
          value={attThumbnailSugestaoVideo}
          error={errAttThumbnailSugestoVideo}
          onChange={(e) => {
            setattThumbnailSugestaoVideo(e.target.value);
          }}
          inputMode="text"
        />

        <Input
          title={props.titles[3].headerName || "Input"}
          id={props.titles[3].field || null}
          className="c-formularioUpdate__item"
          name={props.titles[3].field || null}
          type={props.titles[3].type || "text"}
          value={attUrlSugestaoVideo}
          error={errAttUrlSugestoVideo}
          onChange={(e) => {
            setattThumbnailSugestaoVideo(e.target.value);
          }}
          inputMode="text"
        />
        <Button type="submit">Atualizar</Button>
      </form>
    </section>
  );
};

export default function FormularioSugestaoVideo(props) {
  const {
    sugestao: { setThumbnail, setTitulo, setUrl, thumbnail, titulo, url },
  } = UseQuestion();

  const [ErroSugestaoVideo, setErroSugestaoVideo] = useState(null);
  const [ErroThumbVideo, setErroThumbVideo] = useState(null);
  const [ErroUrlVideo, setErroUrlVideo] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/sugestaoVideo/index/`)
      .then((value) => {})
      .catch((error) => {});
  }, []);

  return (
    <section className={props.className || ""}>
      <div method="post" id="formSV" className="c-formSV c-form">
        <h2 className="c-formSVideo__headline">Sugestão de Vídeo</h2>
        <Input
          title="Titulo Sugestao de Video"
          id="sugestaoVideo"
          icon="T"
          error={ErroSugestaoVideo}
          className="c-formSVideo__input"
          value={titulo}
          onChange={(val) => setTitulo(val.target.value)}
          name="tituloSugestao"
        />
        <Input
          title="Thumbnail"
          icon={<FaImage />}
          id="thumbnailSugestaoVideo"
          error={ErroThumbVideo}
          className="c-formSVideo__input"
          value={thumbnail}
          onChange={(val) => setThumbnail(val.target.value)}
          name="thumbnail"
        />
        <Input
          title="URL"
          id="urlSugestaoVideo"
          icon={<FaLink />}
          error={ErroUrlVideo}
          className="c-formSVideo__input"
          value={url}
          onChange={(val) => setUrl(val.target.value)}
          name="url"
        />
      </div>
    </section>
  );
}
