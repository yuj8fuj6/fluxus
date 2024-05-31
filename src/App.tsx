import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Checker from "./pages/Checker";
import ExportModel from "./pages/ExportModel";
import ImportModel from "./pages/ImportModel";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import ActionProvider from "./contexts/ActionContext";

const App = () => {
  return (
    <div className="App">
      <ActionProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/check" element={<Checker />} />
          <Route path="/export-model" element={<ExportModel />} />
          <Route path="/import-model" element={<ImportModel />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ActionProvider>
    </div>
  );
};

export default App;
