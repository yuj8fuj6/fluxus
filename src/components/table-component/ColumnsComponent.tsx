import { ColumnDef } from "@tanstack/react-table";

interface Component {
  id: string;
  speckle_type: string;
  revit_type: string;
  ifc_type: string;
  agency: string;
  component: string;
  ifc_subtype: string;
  property_set: string;
  property_name: string;
  property_type: string;
  ifc_material_set: string;
  compliance_status: string;
}

export const columns: ColumnDef<Component>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "message",
    header: "Message",
  },
  {
    accessorKey: "branchName",
    header: "Branch Name",
  },
  {
    accessorKey: "sourceApplication",
    header: "Source Application",
  },
  {
    accessorKey: "referencedObject",
    header: "Referenced Object",
  },
  {
    accessorKey: "authorName",
    header: "Author",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
];


