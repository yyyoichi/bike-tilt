import type { Component } from 'solid-js';
import Top from './pages/index';
import Play from './pages/Play'
import { Route, Routes } from 'solid-app-router';

const App: Component = () => {
  return (
    <>
      <Routes>
        <Route path="" component={Top} />
        <Route path="" component={Play} />
      </Routes>
    </>
  );
};

export default App;
