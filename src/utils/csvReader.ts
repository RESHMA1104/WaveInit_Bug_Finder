import fs from "node:fs";
import path from "node:path";
import { parse } from "csv-parse/sync";

export class CsvReader {
    static read<T extends object>(fileName: string): T[] {
        const filePath = path.resolve(process.cwd(), "test-data", fileName);
        const contents = fs.readFileSync(filePath, "utf8");

        return parse(contents, {
            columns: true,
            skip_empty_lines: true,
            trim: true,
        }) as T[];
    }
}
export interface LearnerProjectData {
    projectTitle: string;
    technologies: string;
    githubUrl: string;
    liveDemoUrl: string;
    description: string;
    projectTitleWarningMessage: string;
}

export function readLearnerProjectData(): LearnerProjectData {
    const filePath = path.resolve(process.cwd(), "test-data/learnerProjectData.csv");
    const fileContent = fs.readFileSync(filePath, "utf8");
    const rows = parse(fileContent, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
    }) as LearnerProjectData[];

    if (rows.length === 0) {
        throw new Error(`No learner project data found in ${filePath}`);
    }

    return rows[0];
}
