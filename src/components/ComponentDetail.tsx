import React, { useState, useEffect, Dispatch, SetStateAction } from "react";

import { Button } from "./ui/button";
import { useToast } from "../components/ui/use-toast";

// TODO: to change the structure of the object once determined
interface Component {
  id: string;
  name: string;
  speckle_type: string;
  ifc_type: string;
  property_set: any;
}

interface ComponentProps {
  selectedObject: Component | null;
  setSelectedObject: Dispatch<SetStateAction<Component | null>>;
  setObjectSelection: Dispatch<SetStateAction<boolean>>;
}

interface Property {
  property: string;
  value: string | null;
  compliance_status: boolean;
  reason: string | null;
  updated_value: string | null;
  update: boolean;
}

interface PropertySet {
  [key: string]: {
    is_pass: boolean;
    reason: { type: string | null };
  };
}

const ComponentDetail: React.FC<ComponentProps> = ({
  selectedObject,
  setSelectedObject,
  setObjectSelection,
}) => {
  const [objectData, setObjectData] = useState<Property[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (selectedObject) {
      const dataSet = selectedObject.property_set[0];
      const object = Object.keys(dataSet).map((key) => ({
        property: key,
        value: null,
        compliance_status: dataSet[key].is_pass,
        reason: dataSet[key].reason.type,
        updated_value: null,
        update: false,
      }));
      setObjectData(object);
    }
  }, [selectedObject, setSelectedObject]);

  const handleCheckboxChange = (property: string) => {
    const updatedData = objectData.map((item) => {
      if (item.property === property) {
        return { ...item, update: !item.update };
      }
      return item;
    });
    setObjectData(updatedData);
  };

  const handleInputChange = (property: string, value: string) => {
    const updatedData = objectData.map((item) => {
      if (item.property === property) {
        return { ...item, updated_value: value };
      }
      return item;
    });
    setObjectData(updatedData);
  };

  // TODO: Just for POC, will change the compliance status to true/ pass

  useEffect(() => {
    if (selectedObject) {
      const propertySet = selectedObject.property_set[0]; // Ensure this structure exists
      const newData = Object.keys(propertySet).map((key) => ({
        property: key,
        value: propertySet[key].updated_value,
        compliance_status: propertySet[key].is_pass,
        reason: propertySet[key].reason.type,
        updated_value: propertySet[key].updated_value,
        update: false,
      }));
      setObjectData(newData);
    }
  }, [selectedObject]);

  // // Simplifying update logic
  // const handleUpdateObjectData = () => {
  //   setObjectData((prevObjectData) => {
  //     const updatedData = prevObjectData.map((item) => ({
  //       ...item,
  //       value: item.update ? item.updated_value : item.value,
  //       compliance_status: item.update ? true : item.compliance_status,
  //       reason: item.update ? null : item.reason,
  //       update: false, // Reset update flag
  //     }));
  //     // Prepare to update the main object
  //     if (selectedObject) {
  //       const updatedPropertySet = updatedData.reduce(
  //         (acc, item) => ({
  //           ...acc,
  //           [item.property]: {
  //             is_pass: item.compliance_status,
  //             reason: { type: item.reason },
  //           },
  //         }),
  //         {},
  //       );

  //       const updatedObject = {
  //         ...selectedObject,
  //         property_set: [updatedPropertySet],
  //       };

  //       setSelectedObject(updatedObject);
  //     }
  //     console.log(updatedData)
  //     return updatedData;
  //   });
  // };
  const handleUpdateObjectData = () => {
    console.log("Before update:", objectData);

    setObjectData((prevObjectData) => {
      const updatedData = prevObjectData.map((item) => {
        if (item.update) {
          console.log(`Updating ${item.property}: ${item.updated_value}`);
          return {
            ...item,
            value: item.updated_value, // Ensure this isn't null unless intended
            compliance_status: true,
            reason: null,
            update: false,
          };
        }
        return item;
      });

      return updatedData;
    });

    console.log("After update:", objectData);
  };

  console.log(objectData);
  return (
    <div className="absolute ml-[420px] w-[30rem] max-h-[800px] z-10 bg-white drop-shadow-lg rounded-lg grid grid-cols-6 content-start gap-y-3 p-4">
      <div className="flex justify-start font-bold text-md text-[#C71585] col-span-6">
        Details
      </div>
      <div className="col-span-4 grid grid-cols-3 gap-y-1">
        <div className="flex justify-start text-[#C71585] text-sm font-semibold col-span-1">
          id:
        </div>
        <div className="flex justify-start text-sm col-span-2">
          {selectedObject?.id}
        </div>
        <div className="flex justify-start text-[#C71585] text-sm font-semibold col-span-1">
          Name:
        </div>
        <div className="flex justify-start text-sm col-span-2">
          {selectedObject?.name}
        </div>
        <div className="flex justify-start text-[#C71585] text-sm font-semibold col-span-1">
          Speckle Type:
        </div>
        <div className="flex justify-start text-sm col-span-2">
          {selectedObject?.speckle_type}
        </div>
        <div className="flex justify-start text-[#C71585] text-sm font-semibold col-span-1">
          IFC Type:
        </div>
        <div className="flex justify-start text-sm col-span-2">
          {selectedObject?.ifc_type}
        </div>
      </div>
      <div className="flex justify-start font-bold text-md text-[#C71585] col-span-6">
        IFC-SG Parameters
      </div>
      <table className="text-[10px] w-full col-span-6 h-full">
        <thead className="text-[#C71585] border-b-2">
          <tr>
            <th className="w-1/6">Property</th>
            <th className="w-1/6">Value</th>
            <th className="w-1/6">Compliance Status</th>
            <th className="w-1/6">Reason</th>
            <th className="w-1/6">Updated Value</th>
            <th className="w-1/6">Update</th>
          </tr>
        </thead>
        <tbody>
          {objectData.map((item) => (
            <tr key={item.property} className="hover:bg-gray-100">
              <td className="w-1/6 text-left align-middle">{item.property}</td>
              <td className="w-1/6 align-middle">
                {!item.value ? "Null" : item.value}
              </td>
              <td className="w-1/6 align-middle">
                {item.compliance_status ? "PASS" : "FAIL"}
              </td>
              <td className="w-1/6 align-middle">{item.reason}</td>
              <td className="w-1/6 text-left align-middle">
                <input
                  type="text"
                  value={!item.updated_value ? "" : item.updated_value}
                  onChange={(e) =>
                    handleInputChange(item.property, e.target.value)
                  }
                  className="bg-white border-2 rounded-lg indent-2"
                />
              </td>
              <td className="w-1/6">
                <input
                  type="checkbox"
                  checked={item.update}
                  onChange={() => handleCheckboxChange(item.property)}
                  className="text-white"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button
        size="sm"
        variant="select"
        className="col-span-2 text-sm"
        disabled={!objectData.some((item) => item.update)}
        onClick={async () => {
          try {
            handleUpdateObjectData();
            toast({
              variant: "success",
              title: "Success!",
              description: "Model parameters updated successfully.",
            });
          } catch (error) {
            toast({
              variant: "destructive",
              title: "Error",
              description: "Failed to update model parameters.",
            });
          }
        }}
      >
        Update Parameters
      </Button>
    </div>
  );
};

export default ComponentDetail;
