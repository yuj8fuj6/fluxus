import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { useActionContext } from "../contexts/ActionContext";
import { useAuthActions } from "../hooks/useAuthActions";
import { useLocation } from "react-router-dom";

const Checker = () => {
  const location = useLocation();
  const { state } = useActionContext();

  const { fetchUser, handleExchangeAccessCode } =
    useAuthActions();

    useEffect(() => {
      // Check if there's an authorization code in the URL
      const queryParams = new URLSearchParams(location.search);
      const code = queryParams.get("access_code");
      if (code) {
        handleExchangeAccessCode(code);
      }
      fetchUser();
    }, []);

  const { user, serverInfo } = state;

  console.log(state);
  console.log(user);

  return (
    <div className="w-full h-full overflow-hidden">
      <Header />
      <div>Checker Page</div>
    </div>
  );
};

export default Checker;
