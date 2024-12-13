import React, { Suspense, lazy } from 'react';

import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const Home = lazy(() => import('./components/landing/home'));

const renderLoader = () => <p>Loading</p>;


function App() {
  return (
    <div className="App">
      <Suspense fallback={renderLoader()}>
        <Home />
      </Suspense>
    </div>
  );
}

export default App;
