import React from "react";
import { Routes, Route } from "react-router-dom";
import  Home from "./Component/Home"
import Navigation  from "./Component/Navigation"
import "./App.css";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="Navigation" element={<Navigation/>}/>



      </Routes>
    </div>
  );
}

export default App;
