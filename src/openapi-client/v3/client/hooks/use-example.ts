import { OpenAPIV3 } from "openapi-types";
import { isRef } from "../utils/is-ref";

export const useOutputExample = (schema: OpenAPIV3.SchemaObject) => {
  return getExample(schema, { type: "read" });
};

export const useInputExample = (schema: OpenAPIV3.SchemaObject) => {
  return getExample(schema, { type: "write" });
};

export const useExample = (
  schema: OpenAPIV3.SchemaObject,
  options: Options,
) => {
  return getExample(schema, options);
};

type Options = {
  type: "read" | "write" | "both";
};

function getExample(schema: OpenAPIV3.SchemaObject, options: Options): any {
  if (options.type === "read" && schema.writeOnly) return null;
  if (options.type === "write" && schema.readOnly) return null;
  if (schema.type === "string") {
    return getStringExample(schema);
  }
  if (schema.type === "boolean") {
    return getBooleanExample(schema);
  }
  if (schema.type === "number") {
    return getNumberExample(schema);
  }
  if (schema.type === "integer") {
    return getIntegerExample(schema);
  }
  if (schema.type === "array") {
    return getArrayExample(schema, options);
  }
  if (schema.type === "object") {
    return getObjectExample(schema, options);
  }
}

function getArrayExample(
  schema: OpenAPIV3.ArraySchemaObject,
  options: Options,
) {
  const itemSchema = schema.items;
  if (isRef(itemSchema)) return [];
  const itemExample = getExample(itemSchema, options);
  return [itemExample];
}

function getObjectExample(
  schema: OpenAPIV3.BaseSchemaObject,
  options: Options,
) {
  const obj: any = {};
  for (const key in schema.properties) {
    const prop = schema.properties[key];
    if (isRef(prop)) continue;
    const example = getExample(prop, options);
    obj[key] = example;
  }
  return obj;
}

function getIntegerExample(schema: OpenAPIV3.BaseSchemaObject) {
  if (schema.example) return Number(schema.example);
  if (schema.default) return Number(schema.default);
  return 1;
}

function getNumberExample(schema: OpenAPIV3.BaseSchemaObject) {
  if (schema.example) return Number(schema.example);
  if (schema.default) return Number(schema.default);
  return 1.5;
}

function getBooleanExample(schema: OpenAPIV3.BaseSchemaObject) {
  if (schema.example) return Boolean(schema.example);
  if (schema.default) return Boolean(schema.default);
  return true;
}

function getStringExample(schema: OpenAPIV3.BaseSchemaObject) {
  if (schema.example) return String(schema.example);
  if (schema.default) return String(schema.default);
  if (schema.enum) {
    const [first] = schema.enum;
    return String(first);
  }
  if (schema.format === "date-time") {
    return "2003-12-31 10:30:59";
  }
  return "string";
}
