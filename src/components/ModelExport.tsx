import React, { useState, useEffect } from "react";
import { useActionContext } from "../contexts/ActionContext";
import { useAuthActions } from "../hooks/useAuthActions";

interface Stream {
  id: string;
  name: string;
  updatedAt: string;
}

interface Commit {
  id: string;
  message: string;
  branchName: string;
  sourceApplication: string;
  referencedObject: string;
  authorName: string;
  createdAt: string;
}

const ModelExport = () => {
  return (
    <div className="absolute mt-8 ml-32 w-[32rem] z-10 bg-white drop-shadow-lg rounded-lg grid grid-cols-1 content-start gap-y-4 p-4 text-[#C71585]">
      <div className="flex justify-start font-bold text-xl">Export Model</div>
    </div>
  );
};

export default ModelExport;
