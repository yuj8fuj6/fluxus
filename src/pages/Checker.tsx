import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { useActionContext } from "../contexts/ActionContext";
import { useAuthActions } from "../hooks/useAuthActions";
import { useLocation } from "react-router-dom";
import ModelViewer from "../components/viewer/Viewer";

const Checker = () => {
  const location = useLocation();
  const { state } = useActionContext();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get("access_code");

  const { fetchUser, handleExchangeAccessCode } = useAuthActions();

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

  const { user, serverInfo } = state;

  console.log(serverInfo);
  console.log(user);

  return (
    <div className="w-full h-full overflow-hidden">
      <Header />
      <ModelViewer />
    </div>
  );
};

export default Checker;
