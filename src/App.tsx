import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Checker from "./pages/Checker";
import ExportModel from "./pages/ExportModel";
import ImportModel from "./pages/ImportModel";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="index.html" element={<Checker/>}/>
        <Route path="index.html/export-model" element={<ExportModel/>}/>
        <Route path="index.html/import-model" element={<ImportModel/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </div>
  );
};

export default App;
