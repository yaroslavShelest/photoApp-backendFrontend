// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ObjectList from './components/ObjectList/ObjectList';
import ObjectPage from './components/ObjectPage/ObjectPage';
import AdminPage from './components/AdminPage/AdminPage';
import CustomCursor from './components/CustomCursor';

function App() {
  return (
    <div>
        <CustomCursor />
      <Header />
      <Routes>
  <Route
    path="/"
    element={
      <>
       
        <ObjectList />
      </>
    }
  />
  <Route path="/object/:id" element={<ObjectPage />} />
  <Route path="/admin" element={<AdminPage />} />
</Routes>

      <Footer />
    </div>
  );
}

export default App;
