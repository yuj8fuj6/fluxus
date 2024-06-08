/**
 * Viewer.tsx
 * - Speckle Viewer to load Speckle streams
 */
import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import {
  CameraController,
  SpeckleLoader,
  Viewer,
  SelectionExtension,
  FilteringExtension,
  TreeNode,
} from "@speckle/viewer";
import { TOKEN, STREAM_ID, OBJECT_ID } from "../../speckleUtils.js";

interface ObjectSelectionProps {
  setObjectSelection: Dispatch<SetStateAction<boolean>>;
  objectSelection: boolean;
}
function getToken() {
  let token = localStorage.getItem(TOKEN) ?? "";
  if (token === undefined) {
    return "";
  }
  return token;
}

const ModelViewer: React.FC<ObjectSelectionProps> = ({
  objectSelection,
  setObjectSelection,
}) => {
  const streamId = localStorage.getItem(STREAM_ID);
  const objectId = localStorage.getItem(OBJECT_ID);
  const componentId = localStorage.getItem("fluxus.ComponentId");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const model_viewer = document.getElementById(
      "model-viewer",
    ) as HTMLDivElement;
    const spinner = document.getElementById("spinner") as HTMLDivElement;
    const token = getToken();
    async function loadViewer() {
      const viewer = new Viewer(model_viewer);
      await viewer.init();
      viewer.createExtension(CameraController);
      viewer.createExtension(SelectionExtension);
      const filterExtension = viewer.createExtension(FilteringExtension);

      // Object
      const objectUrl = `https://app.speckle.systems/streams/${streamId}/objects/${objectId}`;

      // Load Object
      const loader = new SpeckleLoader(viewer.getWorldTree(), objectUrl, token);
      await viewer.loadObject(loader, true);

      // Find and isolate the specific object
      if (componentId) {
        const meshNodes = viewer.getWorldTree().findAll((node: TreeNode) => {
          if (!node.model.raw.speckle_type) return;
          return node.model.raw.speckle_type.includes("Objects.Geometry.Mesh");
        });

        filterExtension.isolateObjects(
          meshNodes.map((node: TreeNode) => node.model.id),
        );
      }
      // const meshNodes = viewer.getWorldTree().findAll((node: TreeNode) => {
      //   if (!node.model.raw.speckle_type) return;
      //   return node.model.raw.speckle_type.includes("Objects.Geometry.Mesh");
      // });

      // filterExtension.isolateObjects(
      //   meshNodes.map((node: TreeNode) => node.model.id),
      // );

      // Doesn't work with isolation based on object ID
      // if (componentId) {
      //   const targetNode = viewer.getWorldTree().findId(componentId);
      //   if (targetNode) {
      //     filterExtension.isolateObjects([targetNode]);
      //     console.log("Isolated object with ID:", componentId);
      //   } else {
      //     console.error("No object found with the specified component ID.");
      //   }
      // }

      // Doesn't work for isolation with colour
      // if (meshNodes.length > 0) {
      //   filterExtension.setUserObjectColors([
      //     {
      //       objectIds: meshNodes.map((node: TreeNode) => node.model.id), // Ensure this uses `model.id`
      //       color: "#C71585", // Example color
      //     },
      //   ]);
      // }

      setIsLoading(false);
      if (spinner) {
        spinner.setAttribute("hidden", "");
      } else {
        console.error("Spinner element not found");
      }
    }
    loadViewer();
  }, [componentId]);

  return (
    <>
      {/** Loading spinner **/}
      {isLoading && (
        <div
          id="spinner"
          className="absolute inset-0 z-10 flex justify-center items-center"
        >
          <div className="text-center">
            <div role="status">
              <svg
                aria-hidden="true"
                className="inline w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 
              22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 
              27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 
              9.67226 50 9.67226C27.4013 
            9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 
              89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 
              1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 
              6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 
              10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 
              25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      )}

      {/** Container for Speckle Viewer**/}
      <div className="relative overflow-hidden" style={{ height: "100vh" }}>
        <div
          id="model-viewer"
          className="w-full h-full bg-slate-100 absolute top-0 left-0 z-0"
        ></div>
      </div>
    </>
  );
};

export default ModelViewer;
