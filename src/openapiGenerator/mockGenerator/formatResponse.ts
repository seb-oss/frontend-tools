// import { OpenAPIObject, PathItemObject } from "openapi3-ts";

import { generateData, generateModelsWithData } from "./generateData";

export const APPLICATION_JSON = "application/json";

export type ResponsesType = {
    [path: string]: {
        [APPLICATION_JSON]: { schema: any };
    };
};

export const extractResponses = (obj: any): ResponsesType => {
    const extracted: any = {};
    const modelSchemas = generateModelsWithData(obj);
    Object.keys(obj.paths).forEach(path => {
        const methods: any = obj.paths[path];
        Object.keys(methods).forEach((method: string) => {
            const api: any = methods[method];
            const { responses, operationId } = api;
            let methodName: string = operationId;
            if (methodName) {
                methodName = methodName.replace(/^\w/, (c: string) => c.toLowerCase());
            }
            const key: string = methodName ? methodName : `${path}_${method}`;
            extracted[key] = {};
            Object.keys(responses).forEach((statusCode: string) => {
                const response = responses[statusCode];
                const { content, schema, description } = response;
                const defaultReturn: string = description;
                let mock: any = schema || defaultReturn;
                if (content && content[APPLICATION_JSON]?.schema) {
                    mock = content[APPLICATION_JSON].schema;
                }
                mock = typeof(mock) === "string" ? mock : generateData("", mock, modelSchemas);
                extracted[key][statusCode] = mock;
            });
        });
    });
    return extracted;
};
