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
import ComponentDetail from "./ComponentDetail";

import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useToast } from "../components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

interface FilterState {
  name: string;
  category: string;
}

// TODO: to change the structure of the object once determined
interface Component {
  id: string;
  name: string;
  speckle_type: string;
  ifc_type: string;
  property_set: any;
}

const ModelChecker = () => {
  const { state } = useActionContext();
  const { currentCommit } = state;
  const { handleCommitSelection, fetchObject } = useAuthActions();
  const [model, setModel] = useState<any>();
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();
  // TODO: Reminder to change this to false when done with this component
  const [checkModel, setCheckModel] = useState<boolean>(false);
  const [showCompliantDropdown, setShowCompliantDropdown] =
    useState<boolean>(false);
  const [showNonCompliantDropdown, setShowNonCompliantDropdown] =
    useState<boolean>(false);
  const [showIssueDropdown, setShowIssueDropdown] = useState<boolean>(false);
  const [filters, setFilters] = useState<FilterState>({
    name: "",
    category: "",
  });
  const [selectedObject, setSelectedObject] = useState<Component | null>(null);
  // TODO: To create a state containing all the objects of the model.
  const [modelObjects, setModelObjects] = useState<any>();
  const [objectSelection, setObjectSelection] = useState<boolean>(false);

  const commitId = localStorage.getItem(COMMIT_ID);
  const streamId = localStorage.getItem(STREAM_ID);
  const objectId = localStorage.getItem(OBJECT_ID);

  useEffect(() => {
    const initializeObject = async () => {
      if (commitId && streamId && objectId) {
        await handleCommitSelection(streamId, commitId);
        const object = await fetchObject(streamId, objectId);
        setModel(object);
        setModelObjects(object.object.children.objects);
      }
    };
    initializeObject();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // TODO: once category and names are determined
  const handleSaveFilters = () => {
    console.log("Filters:", filters);
    // Additional logic to handle the saved data
  };

  // TODO: Sample data to be deleted later.
  const sampleData: any = {
    "001a2a6e44d6043e380197c9c315bdc4": {
      "WorkingLoad_DA1-1": {
        is_pass: false,
        reason: { type: "NOPSET" },
        dataType: "IFCFORCEMEASURE",
        value: null,
      },
      "WorkingLoad_DA1-2": {
        is_pass: false,
        reason: { type: "NOPSET" },
        dataType: "IFCFORCEMEASURE",
        value: null,
      },
    },
    "001f57017bc0531a276ed51b20834d18": {
      "WorkingLoad_DA1-1": {
        is_pass: true,
        reason: null,
        dataType: "IFCFORCEMEASURE",
        value: "20",
      },
      "WorkingLoad_DA1-2": {
        is_pass: true,
        reason: null,
        dataType: "IFCFORCEMEASURE",
        value: "20",
      },
    },
    "0027a6db0494de8c841cfc40ce3069ab": {
      "WorkingLoad_DA1-1": {
        is_pass: false,
        reason: { type: "NOPSET" },
        dataType: "IFCFORCEMEASURE",
        value: null,
      },
      "WorkingLoad_DA1-2": {
        is_pass: false,
        reason: { type: "NOPSET" },
        dataType: "IFCFORCEMEASURE",
        value: null,
      },
    },
  };

  // TODO: To correct if necessary
  const handleObjectSelection = (object: any) => {
    if (sampleData) {
      const selectedKeys = Object.keys(sampleData).filter(
        (key) => key === object.id,
      );
      const selectedPSet = selectedKeys.map((key) => sampleData[key]);
      console.log(selectedPSet);
      const properties = Object.keys(selectedPSet[0]).map((propKey) => {
        const propData = selectedPSet[0][propKey];
        return {
          name: propKey,
          is_pass: propData.is_pass,
          reason: propData.reason.type,
          dataType: propData.dataType,
          value: propData.value,
        };
      });
      console.log(properties);
      setSelectedObject({
        id: object.id,
        name: properties[0].dataType,
        speckle_type: object.speckle_type,
        ifc_type: properties[0].dataType,
        property_set: selectedPSet,
      });
    }
  };

  // console.log(modelObjects)

  return (
    <div className="absolute mt-8 ml-32 w-[24rem] max-h-[800px] z-10 bg-white drop-shadow-lg rounded-lg grid grid-cols-1 content-start gap-y-4 p-4">
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
            Upload IDS:
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
                  description: "Model checked successfully.",
                });
                setCheckModel(true);
              } catch (error) {
                toast({
                  variant: "destructive",
                  title: "Error",
                  description: "Failed to check the model.",
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
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outlined" className="text-xs">
                      Filter <Filter size={15} className="ml-3" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Filter Results</DialogTitle>
                      <DialogDescription>
                        Filter the validator results by the following
                        selections.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Search by Name
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={filters.name}
                          onChange={handleInputChange}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Search by Category
                        </Label>
                        <Input
                          id="category"
                          name="category"
                          value={filters.category}
                          onChange={handleInputChange}
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button
                          type="submit"
                          variant="select"
                          onClick={handleSaveFilters}
                        >
                          Save filters
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                {/* <Button
                  size="sm"
                  variant="outlined"
                  className="text-xs"
                  onClick={() => {}}
                >
                  Sort <ChevronDown size={15} className="ml-3" />
                </Button> */}
                <Button
                  size="sm"
                  variant="outlined"
                  className="text-xs"
                  onClick={() => {}}
                >
                  {/*TODO: Once state containing array of checklist items is made*/}
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
                  {/*TODO: To update the number of items in the list for all categories. */}
                  {modelObjects.length} items
                  {showNonCompliantDropdown ? (
                    <ChevronUp className="ml-2" />
                  ) : (
                    <ChevronDown className="ml-2" />
                  )}
                </div>
              </button>
              {showNonCompliantDropdown && (
                <div className="absolute z-10 w-[350px] bg-white shadow-lg max-h-72 overflow-auto mt-1 animate-slideDown rounded-xl">
                  {/*TODO: To update the arrays for the list for all categories. */}
                  <ul>
                    {modelObjects.map((object: any) => (
                      <li
                        key={object.data.id}
                        className="m-2 p-2 hover:bg-red-100 flex flex-col text-sm items-start border rounded"
                        onClick={() => {
                          handleObjectSelection(object.data);
                          setObjectSelection(true);
                        }}
                      >
                        {object.data.speckle_type}
                        <span className="text-[10px]">
                          id: {object.data.id}
                        </span>
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
                  {/*TODO: To update the number of items in the list for all categories. */}
                  {modelObjects.length} items
                  {showIssueDropdown ? (
                    <ChevronUp className="ml-2" />
                  ) : (
                    <ChevronDown className="ml-2" />
                  )}
                </div>
              </button>
              {showIssueDropdown && (
                <div className="absolute z-10 w-[350px] bg-white shadow-lg max-h-72 overflow-auto mt-1 animate-slideDown rounded-xl">
                  {/*TODO: To update the arrays for the list for all categories. */}
                  <ul>
                    {modelObjects.map((object: any) => (
                      <li
                        key={object.data.id}
                        className="m-2 p-2 hover:bg-orange-100 flex flex-col text-sm items-start border rounded"
                        onClick={() => {
                          handleObjectSelection(object.data);
                          setObjectSelection(true);
                        }}
                      >
                        {object.data.speckle_type}
                        <span className="text-[10px]">
                          id: {object.data.id}
                        </span>
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
                  {/*TODO: To update the number of items in the list for all categories. */}
                  {modelObjects.length} items
                  {showCompliantDropdown ? (
                    <ChevronUp className="ml-2" />
                  ) : (
                    <ChevronDown className="ml-2" />
                  )}
                </div>
              </button>
              {showCompliantDropdown && (
                <div className="absolute z-10 w-[350px] bg-white shadow-lg max-h-72 overflow-auto mt-1 animate-slideDown rounded-xl">
                  {/*TODO: To update the arrays for the list for all categories. */}
                  <ul>
                    {modelObjects.map((object: any) => (
                      <li
                        key={object.data.id}
                        className="m-2 p-2 hover:bg-green-100 flex flex-col text-sm items-start border rounded"
                        onClick={() => {
                          handleObjectSelection(object.data);
                          setObjectSelection(true);
                        }}
                      >
                        {object.data.speckle_type}
                        <span className="text-[10px]">
                          id: {object.data.id}
                        </span>
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
        <div className="text-gray-200 flex flex-col items-center gap-y-8 mt-10">
          <Building2 size={150} strokeWidth={1} />
          <div className="italic font-semibold">
            No model loaded.
            <br /> Load a model for validation.
          </div>
        </div>
      )}
      {objectSelection && (
        <ComponentDetail
          selectedObject={selectedObject}
          setSelectedObject={setSelectedObject}
          setObjectSelection={setObjectSelection}
        />
      )}
    </div>
  );
};

export default ModelChecker;
