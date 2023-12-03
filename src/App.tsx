// App.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import ReactHookFormComponent from './components/ReactHookFormComponent';
import UncontrolledFormComponent from './components/UncontrolledFormComponent';
import MainPageComponent from './components/MainPageComponent';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Main</Link>
            </li>
            <li>
              <Link to="/uncontrolled-form">Uncontrolled Form</Link>
            </li>
            <li>
              <Link to="/react-hook-form">React Hook Form</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/uncontrolled-form">
            <UncontrolledFormComponent />
          </Route>
          <Route path="/react-hook-form">
            <ReactHookFormComponent />
          </Route>
          <Route path="/">
            <MainPageComponent />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
