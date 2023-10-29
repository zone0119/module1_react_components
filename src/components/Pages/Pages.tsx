
import React, { ReactNode } from 'react';

import pageStyle from './Pages.module.css';
import { PagesProps } from '../../component_interfaces/myinterfaces.ts';
import SearchResults from '../../components/SearchResults/index.tsx'



class Pages extends React.Component<PagesProps> {
    render(): ReactNode {
        return (
        <>
        <div className={pageStyle["page-container"]} >
          <div className={pageStyle["top-section"]}>
            <h1>Top Section</h1>
            
          </div>
          <div className={pageStyle["bottom-section"]}>
            <h2>Bottom Section</h2>
            
            <SearchResults/>
          </div>
        </div>
      </>
        );
    }
}



  export default Pages
