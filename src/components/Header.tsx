import React from "react";
import { AudioWaveform } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthActions } from "../hooks/useAuthActions";

import { Separator } from "../components/ui/separator";
import { Button } from "./ui/button";

interface UserProps {
  name?: string;
}

const Header: React.FC<UserProps> = ({ name }) => {
  const navigate = useNavigate();
  const { logout } = useAuthActions();

  return (
    <div className="w-full mt-5 space-y-5">
      <div className="flex justify-between mx-8">
        <div
          className="flex justify-start space-x-3 font-semibold text-3xl hover:opacity-75"
          onClick={() => {
            navigate("/check");
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
                <stop offset="40%" stopColor="#C71585" />
                <stop offset="100%" stopColor="#051931" />
              </linearGradient>
            </defs>
          </svg>
          <AudioWaveform size={36} style={{ stroke: "url(#iconGradient)" }} />
          <div
            style={{
              background: "linear-gradient(to right, 	#C71585, #051931)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Fluxus
          </div>
        </div>
        <div className="flex items-center text-[#C71585] font-semibold justify-between w-[18rem]">
          Welcome {name}!
          <Button
            size="sm"
            variant="logout"
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            Logout
          </Button>
        </div>
      </div>
      <Separator />
    </div>
  );
};

export default Header;
