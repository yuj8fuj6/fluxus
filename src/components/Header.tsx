import React from "react";
import { AudioWaveform } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Separator } from "../components/ui/separator";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full my-5 space-y-5">
      <div
        className="flex justify-start space-x-3 font-semibold text-3xl mx-8 hover:opacity-75"
        onClick={() => {
          navigate("/index.html");
        }}
      >
        <svg width="0" height="0">
          <defs>
            <linearGradient
              id="iconGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="40%" stopColor="#2C8BFA" />
              <stop offset="100%" stopColor="#051931" />
            </linearGradient>
          </defs>
        </svg>
        <AudioWaveform size={36} style={{ stroke: "url(#iconGradient)" }} />
        <div
          style={{
            background: "linear-gradient(to right, #2C8BFA, #051931)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Fluxus
        </div>
      </div>
      <Separator />
    </div>
  );
};

export default Header;
