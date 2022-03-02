import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;