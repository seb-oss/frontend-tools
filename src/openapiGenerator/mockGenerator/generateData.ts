type NumberFormat = "float" | "double" | "int32" | "int64";
type StringFormat = "date" | "date-time" | "password" | "byte" | "binary" | "email" | "uuid" | "uri" | "hostname" | "ipv6" | "ipv4";

type RelationType = "oneOf" | "anyOf" | "allOf" | "not";

interface BasePropertyType {
    type: "string" | "number" | "integer" | "boolean" | "array" | "object" | "null";
    format?: NumberFormat | StringFormat;
    pattern?: string;
    example?: any;
    properties?: PropertyType;
    items?: SchemaContent;
    enum?: Array<string>;
}

interface ReferenceType {
    $ref: string;
}

type SchemaContent = BasePropertyType | PropertyType<RelationType> | Array<ReferenceType> | ReferenceType;

export type PropertyType<T extends string = ""> = {
    [K in T]?: SchemaContent;
}

type SwaggerV3Type = {
    components: {
        schemas: any;
    };
};

type SwaggerV2Type = {
    definitions: any;
}

export function generateModelsWithData(obj: SwaggerV2Type | SwaggerV3Type) {
    const models: any = {};
    const schemas: PropertyType = ((obj as SwaggerV3Type)?.components)?.schemas || (obj as SwaggerV2Type).definitions;
    const unsortedSchemaKeys: Array<string> = Object.keys(schemas);
    const unsortedSchemaKeysWithRef: Array<string> = unsortedSchemaKeys.filter((key: string) => JSON.stringify(schemas[key]).indexOf("$ref") > -1);
    let sortedSchemaKeys: Array<string> = unsortedSchemaKeys.filter((key: string) => JSON.stringify(schemas[key]).indexOf("$ref") === -1);

    unsortedSchemaKeysWithRef.sort((a: string, b: string) => {
        const refCount: number = (JSON.stringify(schemas[a]).match(/ref/g) || []).length;
        const referredKeysCount: number = sortedSchemaKeys.map((current: string): number => {
            return (JSON.stringify(schemas[a]).match(new RegExp(current, "g")) || []).length;
        }).reduce((accumulate: number, current: number) => accumulate + current);
        return refCount === referredKeysCount ? -1 : 0;
    });
    sortedSchemaKeys = [...sortedSchemaKeys, ...unsortedSchemaKeysWithRef];
    sortedSchemaKeys.forEach((modelName: string) => {
        const schema: SchemaContent = schemas[modelName];
        models[modelName] = generateData(modelName, schema, models);
    });
    return models;
}

export function generateData(modelName: string, schema: SchemaContent, models?: any): any {
    let newModel: any = {};
    if ((schema as ReferenceType)?.$ref) {
        const reference: any = getReference((schema as ReferenceType).$ref, models);
        newModel = typeof reference === "string" ? reference : { ...newModel, ...reference };
    }
    if ((schema as PropertyType<RelationType>)?.allOf || (schema as PropertyType<RelationType>)?.anyOf || (schema as PropertyType<RelationType>)?.oneOf) {
        Object.keys(schema as PropertyType<RelationType>).filter((key: RelationType) => key === "allOf" || key === "anyOf" || key === "oneOf" || key === "not")
            .map((key: RelationType) => {
                switch (key) {
                    case "allOf":
                        ((schema as PropertyType<RelationType>).allOf as Array<ReferenceType>).map((item: ReferenceType) => {
                            newModel = { ...newModel, ...item.$ref ? getReference(item.$ref, models) : generateData(modelName, item) };
                        });
                        break;
                    case "not": // TODO: fix not property
                        newModel = { ...newModel, ...generateData(modelName, { type: "string" }) };
                        break;
                    default:
                        const listOfReferences: Array<ReferenceType> = ((schema as PropertyType<RelationType>).oneOf || (schema as PropertyType<RelationType>).anyOf) as Array<ReferenceType>;
                        const selectedItem: ReferenceType = listOfReferences?.length ? listOfReferences[Math.floor(Math.random() * listOfReferences.length)] : null;
                        if (!!selectedItem) {
                            newModel = { ...newModel, ...selectedItem.$ref ? getReference(selectedItem.$ref, models) : generateData(modelName, selectedItem) };
                        }
                }
            });
    }
    if ((schema as BasePropertyType)?.type) {
        const selectedSchema: BasePropertyType = (schema as BasePropertyType);
        switch (selectedSchema.type) {
            case "object":
                const object: any = {};
                const { properties } = selectedSchema;
                if (properties) {
                    Object.keys(properties).forEach((attribute: string) => {
                        object[attribute] = generateData(attribute, properties[attribute], models);
                    });
                }
                newModel = { ...newModel, ...object };
                break;
            case "array":
                newModel = [generateData(modelName, selectedSchema.items, models)];
                break;
            case "integer":
            case "number": newModel = selectedSchema.example || 0; break;
            case "boolean": newModel = selectedSchema.example || true; break;
            default:
                let example: string = selectedSchema.example ? selectedSchema.example : selectedSchema.enum ? selectedSchema.enum[0] : modelName;
                if (selectedSchema.format === "date-time") {
                    example = new Date().toLocaleString();
                }
                newModel = example;
        }
    }
    return newModel;
}

/**
 * get model reference by path
 * @param path path of reference
 * @param references list of references
 */
function getReference(path: string, references) {
    const referencePath: Array<string> = path.split("/");
    return references[referencePath[referencePath.length - 1]];
}
