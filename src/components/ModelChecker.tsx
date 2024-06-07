import React, { useState, useEffect } from "react";
import { useActionContext } from "../contexts/ActionContext";
import { useAuthActions } from "../hooks/useAuthActions";
import { STREAM_ID, COMMIT_ID, OBJECT_ID } from "../speckleUtils";
import {
  Building2,
  Filter,
  ChevronDown,
  RotateCcw,
  ChevronUp,
} from "lucide-react";
import { ObjectLayers } from "@speckle/viewer";

import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { DataTable } from "../components/table-commit/DataTable";
import { useToast } from "../components/ui/use-toast";

const ModelChecker = () => {
  const { state } = useActionContext();
  const { currentCommit } = state;
  const { handleCommitSelection, fetchObject } = useAuthActions();
  const [model, setModel] = useState<any>();
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();
  const [checkModel, setCheckModel] = useState<boolean>(true);
  const [showCompliantDropdown, setShowCompliantDropdown] =
    useState<boolean>(false);
  const [showNonCompliantDropdown, setShowNonCompliantDropdown] =
    useState<boolean>(false);
  const [showIssueDropdown, setShowIssueDropdown] = useState<boolean>(false);

  const commitId = localStorage.getItem(COMMIT_ID);
  const streamId = localStorage.getItem(STREAM_ID);
  const objectId = localStorage.getItem(OBJECT_ID);

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
    <div className="absolute mt-8 ml-32 w-[20rem] max-h-[800px] z-10 bg-white drop-shadow-lg rounded-lg grid grid-cols-1 content-start gap-y-4 p-4">
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
                setCheckModel(true);
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
          {checkModel ? (
            <div className="col-span-6 space-y-3">
              <div className="col-span-3 text-[#C71585] flex justify-start font-semibold">
                Validator Results:
              </div>
              <div className="col-span-6 grid grid-cols-3 gap-x-3 text-[#C71585] ">
                <Button
                  size="sm"
                  variant="outlined"
                  className="text-xs"
                  onClick={() => {}}
                >
                  Filter <Filter size={15} className="ml-3" />
                </Button>
                <Button
                  size="sm"
                  variant="outlined"
                  className="text-xs"
                  onClick={() => {}}
                >
                  Sort <ChevronDown size={15} className="ml-3" />
                </Button>
                <Button
                  size="sm"
                  variant="outlined"
                  className="text-xs"
                  onClick={() => {}}
                >
                  Reset <RotateCcw size={15} className="ml-3" />
                </Button>
              </div>
              <button
                className="w-full inline-flex items-center justify-between whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-2 border-red-500 bg-background hover:bg-red-500 hover:text-white p-2 text-red-500"
                disabled={showCompliantDropdown || showIssueDropdown}
                onClick={() =>
                  setShowNonCompliantDropdown(!showNonCompliantDropdown)
                }
              >
                Non-Compliant{" "}
                <div className="flex">
                  5000 items
                  {showNonCompliantDropdown ? (
                    <ChevronUp className="ml-2" />
                  ) : (
                    <ChevronDown className="ml-2" />
                  )}
                </div>
              </button>
              {showNonCompliantDropdown && (
                <div className="absolute z-10 w-72 bg-white shadow-lg max-h-72 overflow-auto mt-1 animate-slideDown rounded-xl">
                  <ul>
                    {Array.from({ length: 10 }).map((_, index) => (
                      <li key={index} className="p-2 hover:bg-gray-100">
                        Item {index + 1}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <button
                className="w-full inline-flex items-center justify-between whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-2 border-[#FFA800] bg-background hover:bg-[#FFA800] hover:text-white p-2 text-[#FFA800]"
                disabled={showCompliantDropdown || showNonCompliantDropdown}
                onClick={() => setShowIssueDropdown(!showIssueDropdown)}
              >
                Possible Issue{" "}
                <div className="flex">
                  5000 items{" "}
                  {showIssueDropdown ? (
                    <ChevronUp className="ml-2" />
                  ) : (
                    <ChevronDown className="ml-2" />
                  )}
                </div>
              </button>
              {showIssueDropdown && (
                <div className="absolute z-10 w-72 bg-white shadow-lg max-h-72 overflow-auto mt-1 animate-slideDown rounded-xl">
                  <ul>
                    {Array.from({ length: 10 }).map((_, index) => (
                      <li key={index} className="p-2 hover:bg-gray-100">
                        Item {index + 1}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <button
                className="w-full inline-flex items-center justify-between whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-2 border-green-400 bg-background hover:bg-green-400 hover:text-white p-2 text-green-400"
                disabled={showNonCompliantDropdown || showIssueDropdown}
                onClick={() => setShowCompliantDropdown(!showCompliantDropdown)}
              >
                Compliant{" "}
                <div className="flex">
                  5000 items{" "}
                  {showCompliantDropdown ? (
                    <ChevronUp className="ml-2" />
                  ) : (
                    <ChevronDown className="ml-2" />
                  )}
                </div>
              </button>
              {showCompliantDropdown && (
                <div className="absolute z-10 w-72 bg-white shadow-lg max-h-72 overflow-auto mt-1 animate-slideDown rounded-xl">
                  <ul>
                    {Array.from({ length: 10 }).map((_, index) => (
                      <li key={index} className="p-2 hover:bg-gray-100">
                        Item {index + 1}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="text-gray-400 col-span-6 flex justify-center items-center italic">
              Upload IFC-SG mapping file and check model for validation.
            </div>
          )}
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
