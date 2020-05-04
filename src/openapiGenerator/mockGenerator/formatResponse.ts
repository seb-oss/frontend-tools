// import { OpenAPIObject, PathItemObject } from "openapi3-ts";

export const APPLICATION_JSON = "application/json";

export type ResponsesType = {
    [path: string]: {
        [APPLICATION_JSON]: { schema: any };
    };
};

export const extractResponses = (obj: any): ResponsesType => {
    const extracted: any = {};
    const modelSchemas = getSchemas(obj);
    Object.keys(obj.paths).forEach(path => {
        const methods: any = obj.paths[path];
        Object.keys(methods).forEach((method: string) => {
            const api = methods[method];
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
                if (content && content["application/json"]?.schema) {
                    mock = content["application/json"].schema;
                }
                if (mock["$ref"]) {
                    const referencePath: Array<string> = mock["$ref"].split("/");
                    const modelName: string = referencePath[referencePath.length - 1];
                    mock = modelSchemas[modelName];
                } else if (mock.type === "array") {
                    const referencePath: Array<string> = mock.items["$ref"].split("/");
                    const modelName: string = referencePath[referencePath.length - 1];
                    mock = [modelSchemas[modelName]];
                } else if (mock.type === "string") {
                    mock = defaultReturn;
                }
                extracted[key][statusCode] = mock;
            });
        });
    });
    return extracted;
};

export const getSchemas = (obj: any) => {
    const models = {};
    const schemas = obj?.components?.schemas || obj.definitions;
    Object.keys(schemas).forEach((modelName: string) => {
        const schema = schemas[modelName];
        models[modelName] = formatSchema(modelName, schema, models);
    });
    return models;
}

const formatSchema = (modelName: string, schema: any, models?: any) => {
    if (schema["$ref"]) {
        const referencePath: Array<string> = schema["$ref"].split("/");
        const attributeName: string = referencePath[referencePath.length - 1];
        return models[attributeName];
    }
    switch (schema.type) {
        case "object":
            const object = {};
            const { properties } = schema;
            if (properties) {
                Object.keys(properties).forEach((attribute: string) => {
                    object[attribute] = formatSchema(attribute, properties[attribute], models);
                });
            }
            return object;
        case "array":
            return [formatSchema(modelName, schema.items, models)];
        case "date": return schema.example || new Date().toString();
        case "integer":
        case "number": return schema.example || 0;
        case "boolean": return schema.example || true;
        default:
            let example: string = schema.example ? schema.example : schema.enum ? schema.enum[0] : modelName;
            if (schema.format === "date-time") {
                example = new Date().toLocaleString();
            }
            return example;
    }
}