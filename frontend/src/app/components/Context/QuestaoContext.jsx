import React, { createContext, useState, useContext } from "react";
export const initContext = {
  alternativa: {
    alternativas: null,
    setAlternativas: null,
    correta: null,
    setCorreta: null,
  },
  sugestao: {
    titulo: null,
    setTitulo: null,
    url: null,
    setUrl: null,
    thumbnail: null,
    setThumbnail: null,
  },
};
const contextQuestion = createContext(initContext);
export const QuestaoProvider = ({ children }) => {
  const [alternativas, setAlternativas] = useState([]);
  const [correta, setCorreta] = useState(null);

  const [url, setUrl] = useState("");
  const [titulo, setTitulo] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  return (
    <contextQuestion.Provider
      value={{
        alternativa: {
          alternativas: alternativas,
          setAlternativas: setAlternativas,
          correta: correta,
          setCorreta: setCorreta,
        },
        sugestao: {
          titulo: titulo,
          setTitulo: setTitulo,
          url: url,
          setUrl: setUrl,
          thumbnail: thumbnail,
          setThumbnail: setThumbnail,
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
