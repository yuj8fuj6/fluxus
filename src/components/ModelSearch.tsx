import React, { useState, useEffect } from "react";
import { searchStreams } from "../speckleUtils";
import { DebounceInput } from "react-debounce-input";
import { useActionContext } from "../contexts/ActionContext";
import { useAuthActions } from "../hooks/useAuthActions";

import { columns } from "../components/table-commit/Columns";
import { DataTable } from "../components/table-commit/DataTable";
import { Button } from "./ui/button";

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

const ModelSearch = () => {
  const [search, setSearch] = useState<string>("");
  const [streams, setStreams] = useState<Stream[]>([]);
  const [selectedStream, setSelectedStream] = useState<Stream | null>(null);
  const [selectedCommit, setSelectedCommit] = useState<Commit | null>(null);
  // const [commits, setCommits] = useState<Commit[]>([]);
  const { state, dispatch } = useActionContext();
  const { latestCommits, currentCommit } = state;
  const { handleStreamSelection, handleCommitSelection } = useAuthActions();

  useEffect(() => {
    if (selectedStream) {
      setSearch("");
      setStreams([]);
    }
  }, [selectedStream]);

  const fetchSearchResults = async (query: string) => {
    if (!query || query.length < 3) return;
    const json = await searchStreams(query);
    setStreams(json.data.streams.items);
  };

  useEffect(() => {
    if (selectedStream) {
      handleStreamSelection(selectedStream);
    }
  }, [selectedStream]);

  console.log(currentCommit);

  return (
    <div className="absolute mt-8 ml-32 w-[32rem] z-10 bg-white drop-shadow-lg rounded-lg grid grid-cols-1 content-start gap-y-4 p-4 text-[#C71585]">
      <div className="flex justify-start font-bold text-xl">Import Model</div>
      <div className="flex justify-start font-bold">Speckle Stream Search</div>
      <DebounceInput
        minLength={3}
        debounceTimeout={300}
        onChange={(e) => fetchSearchResults(e.target.value)}
        value={search}
        className="relative flex h-8 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-black"
        placeholder="Search for Speckle Stream here"
      />
      <div>
        {streams.length > 0 && (
          <ul className="absolute w-full bg-white shadow-md max-h-60 overflow-auto rounded-lg gap-y-4">
            {streams.map((stream) => (
              <li
                key={stream.id}
                onClick={() => setSelectedStream(stream)}
                className="p-4 hover:bg-gray-100 cursor-pointer grid grid-cols-6 text-black text-sm"
              >
                <div className="col-span-3 flex justify-start font-bold">
                  {stream.name}
                </div>
                <div className="col-span-3 flex justify-end font-bold">
                  id: {stream.id}
                </div>
                <div className="col-span-6 flex justify-start text-xs">
                  Updated at {new Date(stream.updatedAt).toLocaleDateString()}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex justify-start font-bold">Commit Selection</div>
      {latestCommits && latestCommits.length > 0 ? (
        <div className=" mx-auto w-full">
          <DataTable
            columns={columns}
            data={latestCommits}
            setSelectedCommit={setSelectedCommit}
          />
          <div className="flex justify-start font-bold mt-4">
            Selected Commit
          </div>
          <div className="border border-gray-300 p-4 rounded-lg text-xs mt-4">
            {selectedCommit ? (
              <div className="text-black italic grid grid-cols-3">
                <p className="col-span-1 text-start">id:</p>
                <p className="col-span-2 text-start">{selectedCommit.id}</p>
                <p className="col-span-1 text-start">Referenced Object:</p>
                <p className="col-span-2 text-start">
                  {selectedCommit.referencedObject}
                </p>
                <p className="col-span-1 text-start">Source Application:</p>
                <p className="col-span-2 text-start">
                  {selectedCommit.sourceApplication}
                </p>
                <p className="col-span-1 text-start">Branch Name:</p>
                <p className="col-span-2 text-start">
                  {selectedCommit.branchName}
                </p>
                <p className="col-span-1 text-start">Message:</p>
                <p className="col-span-2 text-start">
                  {selectedCommit.message}
                </p>
                <p className="col-span-1 text-start">Author:</p>
                <p className="col-span-2 text-start">
                  {selectedCommit.authorName}
                </p>
                <p className="col-span-1 text-start">Created at:</p>
                <p className="col-span-2 text-start">
                  {new Date(selectedCommit.createdAt).toLocaleDateString()}
                </p>
              </div>
            ) : (
              <div className="text-gray-400 italic text-sm">
                No selected commit
              </div>
            )}
          </div>
          <div className="flex justify-start mt-4 gap-x-2">
            <Button
              size="sm"
              variant="select"
              disabled={!selectedCommit}
              onClick={() => {
                dispatch({ type: "SET_COMMITS", payload: null });
                if (selectedCommit && selectedStream)
                  handleCommitSelection(
                    selectedStream.id,
                    selectedCommit.id,
                  );
                setSelectedCommit(null);
              }}
            >
              Load
            </Button>
            <Button
              size="sm"
              variant="select"
              onClick={() => {
                dispatch({ type: "SET_COMMITS", payload: null });
                setSelectedCommit(null);
              }}
            >
              Clear All
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-gray-400 italic">
          No commits currently available.
        </div>
      )}
    </div>
  );
};

export default ModelSearch;
