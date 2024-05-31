import React, {useEffect} from "react";
import { useActionContext } from "../contexts/ActionContext";
import { useAuthActions } from "../hooks/useAuthActions";

import { Button } from "../components/ui/button";

const Login = () => {
  const { state } = useActionContext();
  const isAuthenticated = state.user !== null;

  const { redirectToAuth } = useAuthActions();
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500">
      <div className="bg-white p-8 rounded-lg shadow-lg min-w-[320px]">
        <h2 className="text-2xl font-bold text-center mb-6">Login to Fluxus</h2>
        <Button size="sm" onClick={redirectToAuth}>
          Return back to Login
        </Button>
      </div>
    </div>
  );
};

export default Login;
