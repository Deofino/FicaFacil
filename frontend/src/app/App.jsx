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
      localStorage.setItem("dark", true);
    } else {
      localStorage.setItem("dark", false);
    }
  }

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
