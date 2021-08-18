import React from 'react';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import Routes from './routes/Routes'; // Controla as telas e chama os layouts

import { BrowserRouter as Router, Switch } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Routes />
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;
