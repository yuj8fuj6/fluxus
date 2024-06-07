import React, { useState, useEffect } from "react";
import { useActionContext } from "../contexts/ActionContext";
import { useAuthActions } from "../hooks/useAuthActions";
import { STREAM_ID, COMMIT_ID, OBJECT_ID } from "../speckleUtils";
import { Building2 } from "lucide-react";
import { ObjectLayers } from "@speckle/viewer";

import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { DataTable } from "../components/table-commit/DataTable";
import { useToast } from "../components/ui/use-toast";

const ModelChecker = () => {
  const { state } = useActionContext();
  const { currentCommit } = state;
  const { handleCommitSelection, fetchObject } = useAuthActions();
  const commitId = localStorage.getItem(COMMIT_ID);
  const streamId = localStorage.getItem(STREAM_ID);
  const objectId = localStorage.getItem(OBJECT_ID);

  const [model, setModel] = useState<any>();
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

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

  return (
    <div className="absolute mt-8 ml-32 w-[20rem] h-3/4 z-10 bg-white drop-shadow-lg rounded-lg grid grid-cols-1 content-start gap-y-4 p-4">
      <div className="flex justify-start font-bold text-xl text-[#C71585]">
        IFC-SG Checker
      </div>
      {model ? (
        <div className="grid grid-cols-6 gap-y-2 text-sm">
          <div className="col-span-3 text-[#C71585] flex justify-start font-semibold">
            Project:
          </div>
          <div className="col-span-3 flex justify-end">{model.name}</div>
          <div className="col-span-3 text-[#C71585] flex justify-start font-semibold">
            Commit Branch:
          </div>
          <div className="col-span-3 flex justify-end">
            {currentCommit?.branchName}
          </div>
          <div className="col-span-3 text-[#C71585] flex justify-start font-semibold">
            Model Type:
          </div>
          <div className="col-span-3 flex justify-end">
            {currentCommit?.sourceApplication}
          </div>
          <div className="col-span-3 text-[#C71585] flex justify-start font-semibold">
            Created At:
          </div>
          <div className="col-span-3 flex justify-end">
            {currentCommit?.createdAt
              ? new Date(currentCommit?.createdAt).toLocaleDateString("en-US")
              : "Invalid date"}
          </div>
          <div className="col-span-2 text-[#C71585] flex justify-start font-semibold">
            Upload File:
          </div>
          <div className="col-span-4">
            <input
              type="file"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setFile(e.target.files[0]);
                  console.log(file);
                }
              }}
              className="cursor-pointer file:border file:border-black file:text-x file:bg-white file:text-black file:rounded-lg"
            />
          </div>
          <Button
            size="sm"
            variant="select"
            className="col-span-2 text-xs"
            disabled={!file}
            onClick={async () => {
              try {
                toast({
                  variant: "success",
                  title: "Success!",
                  description: "Speckle commit loaded successfully.",
                });
              } catch (error) {
                toast({
                  variant: "destructive",
                  title: "Error",
                  description: "Failed to load the commit.",
                });
              } finally {
                setFile(null);
              }
            }}
          >
            Check Model
          </Button>
          <Separator className="col-span-6" />
        </div>
      ) : (
        <div className="text-gray-200 flex flex-col items-center gap-y-8 mt-40">
          <Building2 size={150} strokeWidth={1} />
          <div className="italic font-semibold">
            No model loaded.
            <br /> Load a model for validation.
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelChecker;
