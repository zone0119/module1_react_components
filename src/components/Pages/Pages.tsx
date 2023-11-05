import React, { useState } from 'react';
import pageStyle from './Pages.module.css';
import { PagesProps } from '../../component_interfaces/myinterfaces';
import SearchResults from '../../components/SearchResults/index';
import ThrowError from '../../components/ThrowError';

const Pages = (props: PagesProps) => {
  const [searchResult] = useState('default');



  console.log(searchResult);

  return (
    <div className={pageStyle['page-container']}>
      <div className={pageStyle['top-section']}>
        
        <SearchResults/>

        <ThrowError />
      </div>
      <div className={pageStyle['bottom-section']}>
       
        <p>State: {searchResult}</p>
      </div>
    </div>
  );
};

export default Pages;
