import { readFileSync } from "node:fs";
import path from "node:path";
import * as XLSX from "xlsx";

export class ExcelReader {
    static read<T extends object>(
        fileName: string,
        sheetName?: string,
    ): T[] {
        const filePath = path.resolve(process.cwd(), "test-data", fileName);
        const workbook = XLSX.read(readFileSync(filePath), { type: "buffer" });
        const selectedSheet = sheetName ?? workbook.SheetNames[0];

        if (!selectedSheet || !workbook.Sheets[selectedSheet]) {
            throw new Error(
                `Worksheet "${selectedSheet ?? ""}" was not found in ${fileName}.`,
            );
        }

        return XLSX.utils.sheet_to_json<T>(workbook.Sheets[selectedSheet], {
            defval: "",
        });
    }
}