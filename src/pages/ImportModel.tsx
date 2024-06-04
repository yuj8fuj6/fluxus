import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { useActionContext } from "../contexts/ActionContext";
import { useAuthActions } from "../hooks/useAuthActions";
import { useNavigate } from "react-router-dom";
import ModelViewer from "../components/viewer/Viewer";
import NavBar from "../components/NavBar";
import ModelSearch from "../components/ModelSearch";
import { TOKEN } from "../speckleUtils";

const ImportModel = () => {
  const navigate = useNavigate();
  const { state } = useActionContext();
  const { user } = state;
  const [token, setToken] = useState<string | null>();

  const { fetchUser } = useAuthActions();
  const isAuthenticated = token !== null;

  useEffect(() => {
    setToken(localStorage.getItem(TOKEN));
    fetchUser();
    if (!isAuthenticated) {
      navigate("/");
    }
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <Header name={user?.name} />
      <NavBar />
      <ModelSearch />
      <ModelViewer />
    </div>
  );
};

export default ImportModel;
