import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useActionContext } from "../contexts/ActionContext";
import { useAuthActions } from "../hooks/useAuthActions";
import { useLocation, useNavigate } from "react-router-dom";
import ModelViewer from "../components/viewer/Viewer";
import NavBar from "../components/NavBar";
import { TOKEN } from "../speckleUtils";

const Checker = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = useActionContext();
  const { user } = state;
  const [token, setToken] = useState<string | null>();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get("access_code");

  const { fetchUser, handleExchangeAccessCode } = useAuthActions();
  const isAuthenticated = token !== null;

  useEffect(() => {
    // Check if there's an authorization code in the URL
    const initialize = async () => {
      if (code) {
        const tokenSet = await handleExchangeAccessCode(code);
        if (tokenSet) {
          fetchUser();
        }
      }
    };
    initialize();
  }, [code]);

  useEffect(() => {
    setToken(localStorage.getItem(TOKEN));
    if (!isAuthenticated) {
      navigate("/");
    }
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <Header name={user?.name} />
      <NavBar />
      <ModelViewer />
    </div>
  );
};

export default Checker;
