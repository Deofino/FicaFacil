import React from "react";

import Routes from "./routes/Routes"; // Controla as telas e chama os layouts
import Cookie from "./components/Formularios/Outros/ComponentCookie";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  if (localStorage.getItem("dark") === null) {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      localStorage.setItem("dark", "true");
    } else {
      localStorage.setItem("dark", "false");
    }
  }

  React.useEffect(() => {
    const html = document.querySelector("html");

    html.classList.remove("dark");
    html.classList.add(localStorage.getItem("dark") === "true" && "dark");
    // let dark =
    let fonte = localStorage.getItem("fonte");
    let zoom = localStorage.getItem("zoom");

    if (fonte !== null) {
      html.classList.remove("small");
      html.classList.remove("medium");
      html.classList.remove("large");
      if (+fonte === 80) html.classList.add("small");
      if (+fonte === 100) html.classList.add("medium");
      if (+fonte === 120) html.classList.add("large");
    }

    if (zoom !== null) {
      html.classList.remove("zoom-small");
      html.classList.remove("zoom-medium");
      html.classList.remove("zoom-large");
      if (+zoom === 80) html.classList.add("zoom-small");
      if (+zoom === 100) html.classList.add("zoom-medium");
      if (+zoom === 120) html.classList.add("zoom-large");
    }
  }, []);

  return (
    <>
      <Router>
        {localStorage.getItem("cookie") === null && <Cookie />}
        <Routes />
      </Router>
    </>
  );
}

export default App;
