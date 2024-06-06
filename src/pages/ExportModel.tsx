import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { useActionContext } from "../contexts/ActionContext";
import { useAuthActions } from "../hooks/useAuthActions";
import { useNavigate } from "react-router-dom";
import ModelViewer from "../components/viewer/Viewer";
import NavBar from "../components/NavBar";
import ModelExport from "../components/ModelExport";
import { TOKEN } from "../speckleUtils";

const ExportModel = () => {
  const navigate = useNavigate();
  const { state } = useActionContext();
  const { user } = state;
  const [token, setToken] = useState<string | null>();

  const { fetchUser } = useAuthActions();
  const isAuthenticated = token !== null;

  useEffect(() => {
    setToken(localStorage.getItem(TOKEN));
    if (isAuthenticated) {
      fetchUser();
    }
    if (!isAuthenticated) {
      navigate("/");
    }
  }, []);

  return (
    <div className="relative w-full h-full overflow-auto">
      <Header name={user?.name} />
      <NavBar />
      <ModelExport />
      <ModelViewer />
    </div>
  );
};

export default ExportModel;
