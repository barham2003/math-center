import { h } from "vue";
import type { ColumnDef } from "@tanstack/vue-table";
import type { IAbsent } from "~/server/models/shift.ts";
import TutorPic from "../TutorPic.vue";

export const columns: ColumnDef<IAbsent>[] = [
  {
    accessorKey: "tutor.picture",
    header: "Picture",
    cell: ({ row }) => {
      return h(TutorPic, { tutor: row.original.tutor });
    },
  },
  {
    accessorKey: "tutor.name",
    header: "Name",
    id: "tutorName",
  },

  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      return new Date(row.original.date).toLocaleDateString();
    },
  },
  {
    accessorKey: "day",
    header: "Day",
    cell: ({ row }) => {
      return row.original.day.toUpperCase();
    },
  },
  {
    accessorKey: "fromTime",
    header: "From",
  },
  {
    accessorKey: "untilTime",
    header: "Until",
  },
];
