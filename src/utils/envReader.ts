
import dotenv from "dotenv";
import path from "path";

const env = process.env.TEST_ENV || "qa";

dotenv.config({
    path: path.resolve(process.cwd(), `env/.env.${env}`)
});

export const ENV = {
    BASE_URL: process.env.BASE_URL!,
}