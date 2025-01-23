import { h } from "vue";
import type { ColumnDef } from "@tanstack/vue-table";
import DropdownAction from "./DataTableDropDown.vue";
import type { IUser } from "~/server/models/user.js";
import TutorPic from "../TutorPic.vue";

export const columns: ColumnDef<IUser>[] = [
  {
    accessorKey: "picture",
    header: "Picture",
    cell: ({ row }) => {
      return h(TutorPic, { tutor: row.original });
    },
  },

  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const tutorName = row.original.name || "Not signed yet";
      return tutorName;
    },
  },
  {
    accessorKey: "email",
    header: () => {
      return h("span", {
        class: "hidden md:block",
      }, "Email");
    },
    cell: ({ row }) => {
      return h("span", {
        class: "hidden md:block",
      }, row.original.email);
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => {
      return h("span", { class: "hidden md:block" });
    },
    cell: ({ row }) => {
      const tutor = row.original;
      return h(
        "div",
        { class: "relative" },
        h(DropdownAction, {
          class: "hidden md:block",
          tutor,
        }),
      );
    },
  },
];
