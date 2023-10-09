import React, { Suspense } from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';
import { renderRoutes } from './routes';
import Loading from './components/Loading/Loading';
function App() {
  return (
    <Suspense fallback={<Loading/>}>
      <BrowserRouter>
        <Routes>
          {renderRoutes()}
        </Routes>
    </BrowserRouter>
    </Suspense>
    
  );
}

export default App;
