<script lang="ts" setup>
import { ArrowDownToLine } from "lucide-vue-next";
import { download, generateCsv, mkConfig } from "export-to-csv";
const props = withDefaults(defineProps<{ data: any[]; name?: string }>(), {
  name: "generated.csv",
});

const data = computed(() => props.data);

const csvConfig = mkConfig({
  useKeysAsHeaders: true,
  filename: props.name + " " + new Date().toLocaleDateString(),
});

const csv = computed(() => {
  return data.value.length > 0 ? generateCsv(csvConfig)(data.value) : undefined;
});

function createError() {
  throw new Error("error")

}

</script>

<template>

  <Button @click="download(csvConfig)(csv)" class="my-2">
    <ArrowDownToLine />
    Download CSV
  </Button>
</template>
