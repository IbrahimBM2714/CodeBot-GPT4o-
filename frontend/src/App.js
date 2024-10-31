// App.js
import React, { useState } from 'react';
import './App.css';
import Navbar from './Navbar';
import Main from './Main';
import Home from './Home';
import { Outlet } from 'react-router-dom';

const App = () => {

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column"
      }}>
      <Navbar />

      <Outlet />

    </div>

  );
};

export default App;
