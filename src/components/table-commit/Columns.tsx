import { ColumnDef } from "@tanstack/react-table";

interface Commit {
  id: string;
  message: string;
  branchName: string;
  sourceApplication: string;
  referencedObject: string;
  authorName: string;
  createdAt: string;
}

export const columns: ColumnDef<Commit>[] = [
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
