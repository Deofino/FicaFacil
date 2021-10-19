import React, { createContext, useState, useContext } from "react";
export const initContext = {
  pesquisa: null,
  setPesquisa: null,

  alternativa: {
    alternativas: null,
    setAlternativas: null,
    correta: null,
    setCorreta: null,
    erroAlterativa: null,
    setErroAlternativa: null,
  },
  sugestao: {
    titulo: null,
    setTitulo: null,
    url: null,
    setUrl: null,
    thumbnail: null,
    setThumbnail: null,
    erroTituloSugestao: null,
    setErroTituloSugestao: null,
    ErroThumbVideo: null,
    setErroThumbVideo: null,
    ErroUrlVideo: null,
    setErroUrlVideo: null,
  },
};
const contextQuestion = createContext(initContext);
export const QuestaoProvider = ({ children }) => {
  const [pesquisa, setPesquisa] = useState([]);
  const [alternativas, setAlternativas] = useState([]);

  const [correta, setCorreta] = useState(null);
  const [erroAlterativa, setErroAlternativa] = useState(null);

  const [url, setUrl] = useState("");
  const [titulo, setTitulo] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [erroTituloSugestao, setErroTituloSugestao] = useState(null);
  const [ErroThumbVideo, setErroThumbVideo] = useState(null);
  const [ErroUrlVideo, setErroUrlVideo] = useState(null);

  return (
    <contextQuestion.Provider
      value={{
        pesquisa: pesquisa,
        setPesquisa: setPesquisa,

        alternativa: {
          alternativas: alternativas,
          setAlternativas: setAlternativas,
          correta: correta,
          setCorreta: setCorreta,
          erroAlterativa,
          setErroAlternativa,
        },
        sugestao: {
          titulo: titulo,
          setTitulo: setTitulo,
          url: url,
          setUrl: setUrl,
          thumbnail: thumbnail,
          setThumbnail: setThumbnail,
          erroTituloSugestao,
          setErroTituloSugestao,
          ErroThumbVideo,
          setErroThumbVideo,
          ErroUrlVideo,
          setErroUrlVideo,
        },
      }}
    >
      {children}
    </contextQuestion.Provider>
  );
};
export const UseQuestion = () => {
  return useContext(contextQuestion);
};
