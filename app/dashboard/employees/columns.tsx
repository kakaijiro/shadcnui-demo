"use client";
import { ColumnDef } from "@tanstack/react-table";
import { type Props as Employee } from "@/lib/employees";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: "avatar",
    header: "",
    cell: ({ row }) => {
      const avatar: string = row.getValue("avatar");
      const firstName: string = row.getValue("firstName");
      const lastName: string = row.getValue("lastName");
      return (
        <Avatar className="h-10 w-10">
          {!!avatar && (
            <Image
              src={avatar}
              alt={`${firstName} ${lastName} avatar`}
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
          )}
          <AvatarFallback className="uppercase">
            {firstName[0]} {lastName[0]}
          </AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "teamName",
    header: "Team",
  },
  {
    accessorKey: "isTeamLeader",
    header: "",
    cell: ({ row }) => {
      const isTeamLeader = row.getValue("isTeamLeader");
      return isTeamLeader && <Badge variant="success">Team Leader</Badge>;
    },
  },
];
