import React from 'react';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import Routes from './routes/Routes'; // Controla as telas e chama os layouts

import { BrowserRouter as Router } from 'react-router-dom';

function App () {
  if (localStorage.getItem('dark') === null)
  {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
    {
      localStorage.setItem('dark', true);
    } else
    {
      localStorage.setItem('dark', false);
    }

  }
  return (
    <>
      <Router>
        <Header />
        <Routes />
        <Footer />
      </Router>
    </>
  );
}

export default App;
