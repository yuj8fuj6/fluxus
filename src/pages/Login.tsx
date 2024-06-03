import React from "react";
import { AudioWaveform } from "lucide-react";
import { useAuthActions } from "../hooks/useAuthActions";

import { Button } from "../components/ui/button";

const Login = () => {
  const { redirectToAuth } = useAuthActions();

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-[#C71585]  to-white bg-[length:200%_200%] animate-gradient">
      <div className="bg-white p-8 rounded-lg shadow-lg min-w-[320px] h-1/2 flex flex-col font-semibold text-3xl">
        <svg width="0" height="0">
          <defs>
            <linearGradient
              id="iconGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="40%" stopColor="#C71585" />
              <stop offset="100%" stopColor="#051931" />
            </linearGradient>
          </defs>
        </svg>
        <AudioWaveform
          size={48}
          style={{ stroke: "url(#iconGradient)" }}
          className="mx-auto"
        />
        <div
          style={{
            background: "linear-gradient(to right, #C71585, #051931)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Fluxus
        </div>
        <h2 className="text-xl font-semibold text-center mt-3 text-[#C71585]">
          IFC-SG Validator
        </h2>
        <h2 className="text-lg font-light text-center mt-24 mb-5 text-[#C71585]">
          Login with Speckle
        </h2>
        <Button
          size="lg"
          variant="login"
          className="w-1/2 mx-auto"
          onClick={redirectToAuth}
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default Login;
