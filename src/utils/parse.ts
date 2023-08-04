import { OpenAPIV3 } from "openapi-types";

export function createExample(schema?: OpenAPIV3.MediaTypeObject["schema"]) {
  if (!schema) return null;
  if (isRef(schema)) return null;

  if (schema.type !== "object") return null;
  const example = parseObject(schema);

  return example;
}

function parseObject(schema: OpenAPIV3.NonArraySchemaObject) {
  const obj: Record<string, ExampleValue> = {};
  if (!schema.properties) return {};
  const properties = Object.keys(schema.properties);
  for (const propKey of properties) {
    const prop = schema.properties[propKey];
    if (isRef(prop)) continue;
    if (prop.type === "object") {
      obj[propKey] = parseObject(prop);
      continue;
    }
    obj[propKey] = getExampleValue(prop);
  }
  return obj;
}

type ExampleValue =
  | string
  | number
  | boolean
  | undefined
  | Array<string | number | boolean | undefined>
  | object;

function getExampleValue(schema: OpenAPIV3.SchemaObject): ExampleValue {
  switch (schema.type) {
    case "string":
      return schema.example ?? schema.enum?.[0] ?? "string";
    case "number":
    case "integer":
      return schema.example ?? schema.enum?.[0] ?? 0;
    case "boolean":
      return schema.example ?? true;
    case "array": {
      if (!isRef(schema.items)) {
        if (schema.example) return schema.example;
        if (schema.items.example) return [schema.items.example];
        if (schema.items.type === "object") return parseObject(schema.items);
        return [getExampleValue(schema.items)];
      }
    }
  }
}

export function isRef(value: any): value is OpenAPIV3.ReferenceObject {
  if (typeof value !== "object") return false;
  return value.hasOwnProperty("$ref");
}
