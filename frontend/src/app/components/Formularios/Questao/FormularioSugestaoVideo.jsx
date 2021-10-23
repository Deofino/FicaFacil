import React, { useEffect } from "react";
import axios from "axios";
import { Input } from "../../Form/";
import { FaLink, FaImage } from "react-icons/fa";
import { UseQuestion } from "../../Context/QuestaoContext";
import { ToastError, ToastWarning } from "../../Alert/Toast";

export default function FormularioSugestaoVideo(props) {
  const {
    sugestao: {
      setThumbnail,
      setTitulo,
      setUrl,
      thumbnail,
      titulo,
      url,
      erroTituloSugestao,
      ErroThumbVideo,
      ErroUrlVideo,
    },
  } = UseQuestion();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/sugestaoVideo/index/`, {
        headers: {
          Authorization: `Bearer ${
            localStorage.getItem("auth") || localStorage.getItem("user")
          }`,
        },
      })
      .then((value) => {
        // console.log(value.data);
        if (value.data.status_code !== 200)
          ToastWarning({ text: value.data.data || "Warning" });
      })
      .catch((error) => ToastError(error));
  }, []);

  return (
    <section className={props.className || ""}>
      <div method="post" id="formSV" className="c-formSV c-form">
        <h2 className="c-formSVideo__headline">Sugestão de Vídeo</h2>
        <Input
          title="Titulo Sugestao de Video"
          id="sugestaoVideo"
          icon="T"
          error={erroTituloSugestao}
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
