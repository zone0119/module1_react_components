import React, { useState } from 'react';
import pageStyle from './Pages.module.css';
import { PagesProps } from '../../component_interfaces/myinterfaces';
import SearchResults from '../../components/SearchResults/index';
import ThrowError from '../../components/ThrowError';
import PokemonList from '../../components/SearchResults/PokemonList';

const Pages = (props: PagesProps) => {
  const [searchResult, setSearchResult] = useState('default');

  const handleSetSearchResult = (result: unknown) => {
    setSearchResult(result);
  };

  console.log(searchResult);

  return (
    <>
      <div className={pageStyle['page-container']}>
        <div className={pageStyle['top-section']}>
          <h1>Top</h1>
          <SearchResults setSearchResultProps={handleSetSearchResult} />
          <ThrowError />
        </div>
        <div className={pageStyle['bottom-section']}>
          <h2>Bottom</h2>
          <p>State: {searchResult}</p>
        </div>
      </div>
    </>
  );
};

export default Pages;
