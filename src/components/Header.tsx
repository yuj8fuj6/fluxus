import React from "react";
import { AudioWaveform } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Separator } from "../components/ui/separator";

interface UserProps {
  name?: string;
}

const Header: React.FC<UserProps> = ({ name }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full mt-5 space-y-5">
      <div className="flex justify-between mx-8">
        <div
          className="flex justify-start space-x-3 font-semibold text-3xl hover:opacity-75"
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
        <div className="flex items-center text-[#2C8BFA] font-semibold">Welcome {name}!</div>
      </div>
      <Separator />
    </div>
  );
};

export default Header;
