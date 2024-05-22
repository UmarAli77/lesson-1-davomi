import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import GeneralLayout from './pages/GeneralLayout';

const Login = React.lazy(() => import('./pages/Login'));
const Admin = React.lazy(() => import('./pages/Admin'));
const Client = React.lazy(() => import('./pages/Client'));

function App() {
  return (
      <BrowserRouter>
        <React.Suspense fallback={<div>Loading....</div>}>
          <Routes>
            <Route path='/' element={<GeneralLayout />}>
              <Route path="/" element={<Client />} />
              <Route path='/admin' element={<Admin />} />
            </Route>
            <Route path='/login' element={<Login />} />
          </Routes>
        </React.Suspense>
      </BrowserRouter>
  );
}

export default App;
