import React from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Header from './CoffeeShop/Components/Header';
import About from './CoffeeShop/Components/About';
import Indexpage from './Indexpage';
import HeaderNext from './headerNext';
import CoffeeProvider from './API';

function Routess() {
  return (
    <CoffeeProvider>
      <BrowserRouter>
        <MainContent />
      </BrowserRouter>
    </CoffeeProvider>
  );
}

function MainContent() {
  const location = useLocation();

  return (
    <>
      {location.pathname === '/' && <Header />}
      {location.pathname === '/About' && <HeaderNext />}
      <Routes>
        <Route path="/" element={<Indexpage />} />
        <Route path="/About" element={<About />} />
      </Routes>
    </>
  );
}

export default Routess;
