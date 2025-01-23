import { h } from "vue";
import type { ColumnDef } from "@tanstack/vue-table";
import type { IAttendance } from "~/server/models/attendance.ts";
import TutorPic from "../TutorPic.vue";

export const columns: ColumnDef<IAttendance>[] = [
  {
    accessorKey: "shift.tutor.picture",
    header: "Picture",
    cell: ({ row }) => {
      return h(TutorPic, { tutor: row.original.shift.tutor });
    },
  },
  {
    id: "tutorName",
    accessorKey: "shift.tutor.name",
    header: "Name",
    filterFn: "includesString",
  },
  {
    accessorKey: "checkinTime",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.original.checkinTime).toLocaleDateString();
      return date;
    },
  },
  {
    accessorKey: "shift.day",
    header: "Day",
    cell: ({ row }) => {
      return row.original.shift.day.toUpperCase();
    },
  },
  {
    accessorKey: "checkinTime",
    header: "Check In",
    cell: ({ row }) => {
      const value = new Date(row.original.checkinTime).toLocaleTimeString();
      return value;
    },
  },
  {
    accessorKey: "checkoutTime",
    header: "Check Out",
    cell: ({ row }) => {
      const checkoutTime = row.original.checkoutTime;
      let value: string;
      if (checkoutTime) {
        value = new Date(row.original.checkoutTime).toLocaleTimeString();
      } else {
        value = "Not Checked Out";
      }
      return value;
    },
    // header: () => {
    //   return h("span", {
    //     class: "hidden md:block",
    //   }, "Email");
    // },
    // cell: ({ row }) => {
    //   return h("span", {
    //     class: "hidden md:block",
    //   }, row.original.shift);
    // },
  },
  // {
  //   id: "actions",
  //   enableHiding: false,
  //   header: () => {
  //     return h("span", { class: "hidden md:block" });
  //   },
  //   cell: ({ row }) => {
  //     const tutor = row.original;
  //     return h(
  //       "div",
  //       { class: "relative" },
  //       h(DropdownAction, {
  //         class: "hidden md:block",
  //         tutor,
  //       }),
  //     );
  //   },
  // },
];
