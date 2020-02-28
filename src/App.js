import React from 'react';

import './App.css';
import { Route } from 'react-router-dom';
import Jeopardy from './components/Jeopardy';

function App() {
  return (
    <Route
      exact
      path="/"
      render={(props) => <Jeopardy {...props} />}
    />

  );
}

export default App;
