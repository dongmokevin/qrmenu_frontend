import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContex";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Places from "../pages/Places";
import PrivateRoute from "./PrivateRoute";
import Register from "../pages/Register";
import Place from "../pages/Place";
import Menu from "../pages/Menu";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/menu/:id/:table" element={<Menu />}></Route>
          <Route path="/places" element={<PrivateRoute />}>
            <Route path="/places/:id" element={<Place />} />
            <Route path="/places" element={<Places />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;
