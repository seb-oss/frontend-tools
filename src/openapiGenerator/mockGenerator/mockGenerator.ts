import { extractResponses } from "./formatResponse";
import { readFile, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";
import request from "request";

export function generateMock(swaggerUrl: string, outputPath: string) {
    if (!!swaggerUrl) {
        process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
        if (swaggerUrl.indexOf("http") > -1) {
            request.get(swaggerUrl, (error: any, response: any) => {
                formatJSON(error, response, outputPath);
            });
        } else {
            readFile(swaggerUrl, "utf-8", (error: any, response: any) => {
                formatJSON(error, response, outputPath);
            });
        }
    }
}

function formatJSON(error: any, response: any, outputPath: string) {
    if (error) {
        throw new Error(error);
    } else {
        if (response?.statusCode !== 200) {
            throw new Error(response.statusMessage);
        }
        console.log("################# generating mock ########################");
        const body = JSON.parse(response.body || response);
        const extractedBody: any = extractResponses(body);
        if (!existsSync(outputPath)){
            mkdirSync(outputPath, { recursive: true });
        }
        writeFiles(extractedBody, outputPath);
        console.log("################# mock generated ########################");
    }
}

export const writeFiles = (
        data: any,
        outputPath: string
    ): void => {
        const fileName = `mock.json`;
        const path = join(outputPath || "./", fileName);
        const formatted = JSON.stringify(data, null, 2);
        writeFileSync(path, formatted);
    };
