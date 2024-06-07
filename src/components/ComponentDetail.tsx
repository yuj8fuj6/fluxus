import React, { useState, useEffect } from "react";
import { useActionContext } from "../contexts/ActionContext";
import { useAuthActions } from "../hooks/useAuthActions";

import { DataTable } from "../components/table-commit/DataTable";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useToast } from "../components/ui/use-toast";
import { Input } from "../components/ui/input";


// TODO: to change the structure of the object once determined
interface Component {
  id: string;
  speckle_type: string;
  ifc_type: string;
}

const ComponentDetail = () => {
  return (
    <div className="absolute ml-[352px] w-[30rem] max-h-[800px] z-10 bg-white drop-shadow-lg rounded-lg grid grid-cols-1 content-start gap-y-4 p-4">
      <div className="flex justify-start font-bold text-md text-[#C71585]">
        Details
      </div>
    </div>
  );
};

export default ComponentDetail;
