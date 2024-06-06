import React, { useState, useEffect } from "react";
import { useActionContext } from "../contexts/ActionContext";
import { useAuthActions } from "../hooks/useAuthActions";
import { STREAM_ID, COMMIT_ID, OBJECT_ID } from "../speckleUtils";
import { ObjectLayers } from "@speckle/viewer";

const ModelChecker = () => {
  const { state } = useActionContext();
  const { currentCommit } = state;
  const { handleCommitSelection, fetchObject } = useAuthActions();
  const commitId = localStorage.getItem(COMMIT_ID);
  const streamId = localStorage.getItem(STREAM_ID);
  const objectId = localStorage.getItem(OBJECT_ID);

  const [model, setModel] = useState<any>();

  useEffect(() => {
    const initializeObject = async () => {
      if (commitId && streamId && objectId) {
        await handleCommitSelection(streamId, commitId);
        const object = await fetchObject(streamId, objectId);
        setModel(object);
      }
    };
    initializeObject();
  }, []);

  console.log(currentCommit?.id);
  console.log(model);

  return (
    <div className="absolute mt-8 ml-32 w-[20rem] h-3/4 z-10 bg-white drop-shadow-lg rounded-lg grid grid-cols-1 content-start gap-y-4 p-4 text-[#C71585]">
      <div className="flex justify-start font-bold text-xl">IFC-SG Checker</div>
    </div>
  );
};

export default ModelChecker;
