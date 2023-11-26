import React from 'react';
import './App.css';
import Pages from './components/Pages/index';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {


  const searchResult = 'search result..';

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Pages  searchResult={searchResult} />} />
        <Route path="/search/:page" element={<Pages searchResult={searchResult} />} />
        <Route path="/details/:itemId" element={<Pages  searchResult={searchResult} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
