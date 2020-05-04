import { extractResponses, getSchemas } from "./formatResponse";
import * as fs from "fs";
import { join } from "path";

export function generateMock(swaggerUrl: string) {
    if (!!swaggerUrl) {
        process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
        const request = require("request");
        request.get(swaggerUrl, function (error, response) {
            if (error) {
                console.error(error);
                return;
            }
            if (!error && response.statusCode === 200) {
                console.log("################# generating mock ########################");
                const body = JSON.parse(response.body);
                const test = extractResponses(body);
                const schema = getSchemas(body);
                writeFiles(test, "");
                console.log("################# mock generated ########################");
            }
        });
    }
}

export const writeFiles = (
        data: any,
        outputPath: string
    ): void => {
        const fileName = `mock.json`;
        const path = join(outputPath || "./", fileName);
        const formatted = JSON.stringify(data, null, 2);
        fs.writeFileSync(path, formatted);
    };
