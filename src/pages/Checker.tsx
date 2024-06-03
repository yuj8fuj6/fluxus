import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { useActionContext } from "../contexts/ActionContext";
import { useAuthActions } from "../hooks/useAuthActions";
import { useLocation } from "react-router-dom";
import ModelViewer from "../components/viewer/Viewer";
import NavBar from "../components/NavBar";

const Checker = () => {
  const location = useLocation();
  const { state } = useActionContext();
  const { user, serverInfo } = state;
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get("access_code");

  const { fetchUser, handleExchangeAccessCode } = useAuthActions();
  const isAuthenticated = state.user !== null;

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

  console.log(serverInfo);
  console.log(user);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <Header name={user?.name} />
      <NavBar />
      <ModelViewer />
    </div>
  );
};

export default Checker;
