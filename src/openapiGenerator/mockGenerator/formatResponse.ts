import { OpenAPI, OpenAPIV3, OpenAPIV2 } from "openapi-types";
import { generateData, generateModelsWithData } from "./generateData";

export const APPLICATION_JSON: string = "application/json";
export type ApplicationJson = "application/json";

export type ResponsesType<T extends string = ApplicationJson> = {
    [path: string]: {
        [k in T]: { schema: any };
    };
};

export const extractResponses = (obj: OpenAPI.Document): ResponsesType => {
    const extracted: any = {};
    const modelSchemas: any = generateModelsWithData(obj);
    Object.keys(obj.paths).forEach(path => {
        const methods: any = obj.paths[path];
        Object.keys(methods).forEach((method: string) => {
            const api: OpenAPI.Operation  = methods[method];
            const { responses, operationId } = api;
            let methodName: string = operationId;
            if (methodName) {
                methodName = methodName.replace(/^\w/, (c: string) => c.toLowerCase());
            }
            const key: string = methodName ? methodName : `${path}_${method}`;
            extracted[key] = {};
            Object.keys(responses).forEach((statusCode: string) => {
                const response: OpenAPIV3.ParameterObject | OpenAPIV2.ParameterObject = responses[statusCode];
                const defaultReturn: string = response.description;
                let mock: any = response.schema || defaultReturn;
                if (response.content && response.content[APPLICATION_JSON]?.example) {
                    mock = response.content[APPLICATION_JSON].example;
                } else if (response.content && response.content[APPLICATION_JSON]?.schema) {
                    mock = response.content[APPLICATION_JSON].schema;
                    mock = typeof(mock) === "string" ? mock : generateData("", mock, modelSchemas);
                }
                extracted[key][statusCode] = mock;
            });
        });
    });
    return extracted;
};
