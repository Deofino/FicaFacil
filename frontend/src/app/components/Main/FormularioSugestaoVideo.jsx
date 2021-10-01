import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { Input, Select, MenuItem, Button, Table } from "../Form/";
import { AlertSuccess } from "../Alert/Modal";
import { Tooltip, IconButton } from "@material-ui/core";
import { ToastSuccess } from "../Alert/Toast";
import { FaTimes } from "react-icons/fa";

const Backdrop = (props) => {
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
  const [errAttTituloSugestoVideo, setErrTituloSugestaoVideo] = useState(null); // State para atualizar o campo
  const [errAttUrlSugestoVideo, setErrUrlSugestaoVideo] = useState(null); // State para atualizar o campo
  const [errAttThumbnailSugestoVideo, setErrThumbnailSugestaoVideo] =
    useState(null); // State para atualizar o campo
  const [attQuestao, setAttQuestao] = useState(null); // State para atualizar o campo
  const [attReqSugestaoVideo, setattReqSugestaoVideo] = useState([]); // State para atualizar o campo
  const [errAttQuestao, seterrAttQuestao] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/sugestaoVideo/index/`)
      .then((value) => {
        setattReqSugestaoVideo(value.data.data);
        console.log(value.data.data.questao.questao);
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
    if (
      attTituloSugestaoVideo !== null &&
      attTituloSugestaoVideo !== "" &&
      attTituloSugestaoVideo.length > 4
    ) {
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
    } else {
      // previne e coloca os erros
      setErrTituloSugestaoVideo("O campo tem que ter no minimo 4 caracteres");
      setErrThumbnailSugestaoVideo(
        "O campo tem que ter no minimo 4 caracteres"
      );
      setattUrlSugestaoVideo("O campo tem que ter no minimo 4 caracteres");
      seterrAttQuestao("O campo tem que ter no minimo 4 caracteres");
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

        <Select
          className="c-formQuestao__select"
          name="questao"
          title={props.titles[4].headerName || "Input"}
          id="questao"
          value={attQuestao}
          error={errAttQuestao}
          onChange={({ target }) => setAttQuestao(target.value)}
        >
          <MenuItem value={-1}>Selecione</MenuItem>
          {attReqSugestaoVideo.questao !== undefined &&
            attReqSugestaoVideo.questao.questao.map((item) => (
              <MenuItem value={item.idQuestao} key={item.idQuestao}>
                {item.tituloQuestao}
              </MenuItem>
            ))}
        </Select>
        <Button type="submit">Atualizar</Button>
      </form>
    </section>
  );
};

export default function FormularioSugestaoVideo() {
  const [questao, setQuestao] = useState([]);

  const [selectedQuestao, setSelectedQuestao] = useState(0);
  const refSugestaoVideo = useRef(null);
  const refThumbVideo = useRef(null);
  const refUrlVideo = useRef(null);

  const [SugestaoVideo, setSugestaoVideo] = useState([]);

  const [ErroSugestaoVideo, setErroSugestaoVideo] = useState(null);
  const [ErroThumbVideo, setErroThumbVideo] = useState(null);
  const [ErroUrlVideo, setErroUrlVideo] = useState(null);
  const [ErroQuestao, setErroQuestao] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/questao/index/`)
      .then((value) => setQuestao(value.data.data))
      .catch((error) => console.error(error));

    axios
      .get(`${process.env.REACT_APP_API}/sugestaoVideo/index/`)
      .then((value) => setSugestaoVideo(value.data.data))
      .catch((error) => console.error(error));
  }, []);

  const submitForm = (e) => {
    e.preventDefault();

    let inputs = [
      refSugestaoVideo.current.value,
      refThumbVideo.current.value,
      refUrlVideo.current.value,
    ];

    let errorMsg = "O campo precisa ter mais de 4 caracteres";

    // Seta erro no select questão
    if (selectedQuestao === 0) setErroQuestao("Selecione uma questao");
    else setErroQuestao(null);

    // Seta erro no input sugestão video
    if (refSugestaoVideo.current.value.length < 4)
      setErroSugestaoVideo(errorMsg);
    else setErroSugestaoVideo(null);

    // Seta erro no input thumbnail video
    if (refThumbVideo.current.value.length < 4) setErroThumbVideo(errorMsg);
    else setErroThumbVideo(null);

    // Seta erro no input url video
    if (refUrlVideo.current.value.length < 4) setErroUrlVideo(errorMsg);
    else setErroUrlVideo(null);

    // Verificação geral
    if (inputs.every((ipt) => ipt.trim().length > 4) && selectedQuestao !== 0) {
      axios
        .post(
          `${process.env.REACT_APP_API}/sugestaoVideo/create/`,
          JSON.stringify({
            sugestaoVideo: refSugestaoVideo.current.value || null,
            thumbVideo: refUrlVideo.current.value || null,
            urlVideo: refThumbVideo.current.value || null,
            questao: selectedQuestao,
          })
        )

        .then(function (parametro) {
          refSugestaoVideo.current.value = "";
          refThumbVideo.current.value = "";
          refUrlVideo.current.value = "";
          setSelectedQuestao(0);
        });
      console.log("Pode passar!");
      AlertSuccess({
        text: "Sugestao Video inserida com sucesso",
        title: "Sucesso...",
      });
    } else console.log("Não pode passar!");

    /*  if (refSugestaoVideo.current.value !== '' || refUrlVideo.current.value !== '' || refThumbVideo.current.value !== '' || questao !== 0) {
            setErroSugestaoVideo('O campo não pode ficar vazio');
                 if (refSugestaoVideo.current.value.length >= 4 ||  refUrlVideo.current.value.length >= 4 || refThumbVideo.current.value.length >= 4) {
                    setErroSugestaoVideo(null);
                    setErroUrlVideo(null);
                    setErroThumbVideo(null);
                    
                    AlertSuccess({ text: " Sugestão de vídeo inserida com sucesso", title: 'Sucesso...' });

            } else {
                setErroSugestaoVideo('O campo tem que ser maior que 4');
            } 
        } else {
            setErroSugestaoVideo('O campo esta vazio');
        } */
  };

  const colunas = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
    },
    {
      field: "titulo",
      headerName: "Titulo",
      width: 200,
    },
    {
      field: "thumbnail",
      headerName: "Thumbnail",
      width: 200,
    },
    {
      field: "url",
      headerName: "Url",
      width: 200,
    },
    {
      field: "questao",
      headerName: "Questao",
      width: 200,
    },
  ];
  //   console.log(SugestaoVideo);
  const linhas = SugestaoVideo.sugestaoVideo
    ? SugestaoVideo.sugestaoVideo.map((sugestao) => {
        return {
          id: sugestao.idSugestaoVideo,
          titulo: sugestao.tituloSujestaoVideo,
          thumbnail: sugestao.thumbnailSujestaoVideo,
          url: sugestao.urlSujestaoVideo,
          questao: SugestaoVideo.questao.questao.filter(
            (e) => e.idQuestao === sugestao.idQuestao
          )[0].tituloQuestao,
        };
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
      <form
        method="post"
        id="formSV"
        className="c-formSV c-form"
        onSubmit={submitForm}
      >
        <h2 className="c-formSVideo__headline">Sugestão de Vídeo</h2>
        <Input
          title="Titulo Sugestao de Video"
          id="sugestaoVideo"
          error={ErroSugestaoVideo}
          className="c-formSVideo__input"
          ref={refSugestaoVideo}
          name="sugestaoVideo"
        />
        <Input
          title="Thumbnail"
          id="thumbnailSugestaoVideo"
          error={ErroThumbVideo}
          className="c-formSVideo__input"
          ref={refThumbVideo}
          name="thumbnailSugestaoVideo"
        />
        <Input
          title="URL"
          id="urlSugestaoVideo"
          error={ErroUrlVideo}
          className="c-formSVideo__input"
          ref={refUrlVideo}
          name="urlSugestaoVideo"
        />
        <Select
          className="c-formSVideo__select"
          name="questao"
          id="questao"
          error={ErroQuestao}
          value={selectedQuestao}
          onChange={({ target }) => setSelectedQuestao(target.value)}
        >
          {<MenuItem value={-1}>Questão</MenuItem>}
          {questao.questao !== undefined &&
            questao.questao.map((item) => (
              <MenuItem value={item.idQuestao} key={item.idQuestao}>
                {item.tituloQuestao}
              </MenuItem>
            ))}
        </Select>
        <Button
          className="c-formSVideo__submit"
          styleButton={{ marginTop: 20 }}
          type="submit"
        >
          Cadastrar
        </Button>
      </form>
      <Table
        colunas={colunas}
        linhas={linhas || []}
        tabela="sugestaoVideo"
        nome="Sugestão Vídeo"
        style={{
          marginTop: 20,
        }}
        functionUpdate={update}
      />
      <div id="backdrop"></div>
    </section>
  );
}
