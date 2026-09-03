import { readFileSync } from "node:fs";
import path from "node:path";
import { parse } from "csv-parse/sync";

export class CsvReader {
    static read<T extends object>(fileName: string): T[] {
        const filePath = path.resolve(process.cwd(), "test-data", fileName);
        const contents = readFileSync(filePath, "utf8");

        return parse(contents, {
            columns: true,
            skip_empty_lines: true,
            trim: true,
        }) as T[];
    }
}