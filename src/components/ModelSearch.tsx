import React, { useState, useEffect } from "react";
import { searchStreams } from "../speckleUtils";
import { DebounceInput } from "react-debounce-input";

interface Stream {
  id: string;
  name: string;
  updatedAt: string;
}

const ModelSearch = () => {
  const [search, setSearch] = useState<string>("");
  const [streams, setStreams] = useState<Stream[]>([]);
  const [selectedSearchResult, setSelectedSearchResult] =
    useState<Stream | null>(null);

  useEffect(() => {
    if (selectedSearchResult) {
      setSearch("");
      setStreams([]);
    }
  }, [selectedSearchResult]);

  const fetchSearchResults = async (query: string) => {
    if (!query || query.length < 3) return;
    const json = await searchStreams(query);
    setStreams(json.data.streams.items);
  };

  console.log(streams);

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
          <ul className="absolute w-full bg-white shadow-md max-h-60 overflow-auto rounded-lg">
            {streams.map((stream) => (
              <li
                key={stream.id}
                onClick={() => setSelectedSearchResult(stream)}
                className="p-2 hover:bg-gray-100 cursor-pointer grid grid-cols-6 text-black text-sm"
              >
                <div className="col-span-3 flex justify-start font-bold">
                  {stream.name}
                </div>
                <div className="col-span-3 flex justify-end font-bold">
                  id: {stream.id}
                </div>
                <div className="col-span-6 flex justify-start text-xs mb-4">
                  Updated at {new Date(stream.updatedAt).toLocaleDateString()}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ModelSearch;
