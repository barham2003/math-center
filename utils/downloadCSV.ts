import { download, generateCsv, mkConfig } from "export-to-csv";

export default function downloadCSV(data: any[]) {
  console.log("GOT HERE");
  if (window) {
    const csvConfig = mkConfig({ useKeysAsHeaders: true });
    const csv = generateCsv(csvConfig)(data);
    const downloadEvent = download(csvConfig)(csv);
    return downloadEvent;
  }
}
