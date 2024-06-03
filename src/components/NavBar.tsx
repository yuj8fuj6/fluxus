import React from "react";
import { CloudDownload, ListChecks, Repeat } from "lucide-react";

import { cn } from "../lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const routes = [
  { icon: CloudDownload, label: "Import Model", href: "/import-model" },
  { icon: ListChecks, label: "Model Checker", href: "/check" },
  { icon: Repeat, label: "Export Model", href: "/export-model" },
];

const NavBar = () => {
  return (
    <div className="absolute mt-8 ml-10 w-26 z-10">
      <div className="grid grid-cols-1">
        {routes.map((route) => (
          <div
            onClick={() => console.log(route)}
            key={route.href}
            className="text-muted-foreground text-xs group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary drop-shadow-lg bg-white hover:bg-primary/10 rounded-lg transition"
          >
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger className="flex flex-col gap-y-2 items-center flex-1">
                  <route.icon className="h-5 w-5" />
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={20}>
                  <p>{route.label}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavBar;
