<script setup lang="ts" generic="TData, TValue">
import type { ColumnDef, ColumnFiltersState } from "@tanstack/vue-table";
import valueUpdater from "~/utils/valueUpdater";
import type { IAttendance } from "~/server/models/attendance";
import { Input } from "@/components/ui/input";
import {
  FlexRender,
  getCoreRowModel,
  useVueTable,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/vue-table";
import type { IUser } from "~/server/models/user.js";

const props = defineProps<{
  columns: ColumnDef<any, any>[];
  data: IAttendance[];
  filterKey?: string;
}>();

const columnFilters = ref<ColumnFiltersState>([]);
const table = useVueTable({
  get data() {
    return props.data;
  },
  get columns() {
    return props.columns;
  },
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel({ initialSync: true }),
  onColumnFiltersChange: (updaterOrValue) =>
    valueUpdater(updaterOrValue, columnFilters),
  getFilteredRowModel: getFilteredRowModel(),
  state: {
    get columnFilters() {
      return columnFilters.value;
    },
  },
});
</script>

<template>
  <div class="rounded-md border bg-background">
    <div class="flex items-center px-2 py-4" v-if="props.filterKey">
      <Input
        class="max-w-sm"
        placeholder="Search"
        :model-value="
          table.getColumn(props.filterKey)?.getFilterValue() as string
        "
        @update:model-value="
          table.getColumn(props.filterKey)?.setFilterValue($event)
        "
      />
    </div>
    <Table>
      <TableHeader>
        <TableRow
          v-for="headerGroup in table.getHeaderGroups()"
          :key="headerGroup.id"
        >
          <TableHead v-for="header in headerGroup.headers" :key="header.id">
            <FlexRender
              v-if="!header.isPlaceholder"
              :render="header.column.columnDef.header"
              :props="header.getContext()"
            />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <template v-if="table.getRowModel().rows?.length">
          <TableRow
            v-for="row in table.getRowModel().rows"
            :key="row.id"
            :data-state="row.getIsSelected() ? 'selected' : undefined"
          >
            <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
              <FlexRender
                :render="cell.column.columnDef.cell"
                :props="cell.getContext()"
              />
            </TableCell>
          </TableRow>
        </template>
        <template v-else>
          <TableRow>
            <TableCell :colspan="columns.length" class="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        </template>
      </TableBody>
    </Table>
    <div class="flex items-center justify-end space-x-2 p-4">
      <Button
        variant="outline"
        size="sm"
        :disabled="!table.getCanPreviousPage()"
        @click="table.previousPage()"
      >
        Previous
      </Button>
      <Button
        variant="outline"
        size="sm"
        :disabled="!table.getCanNextPage()"
        @click="table.nextPage()"
      >
        Next
      </Button>
    </div>
  </div>
</template>
