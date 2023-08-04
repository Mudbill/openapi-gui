import { OpenAPIV3 } from "openapi-types";
import { isRef } from "../../../utils/parse";

export function useMetadata(spec: OpenAPIV3.Document) {
  return {
    openapi: spec.openapi,
    info: spec.info,
    servers: spec.servers ?? [],
    tags: spec.tags ?? [],
    externalDocs: spec.externalDocs,
  };
}

export function useSchemas(schemas: OpenAPIV3.ComponentsObject["schemas"]) {
  const _schemas: { name: string; schema: OpenAPIV3.SchemaObject }[] = [];
  if (!schemas) return _schemas;
  for (const name in schemas) {
    const schema = schemas[name];
    if (isRef(schema)) continue;
    _schemas.push({
      name,
      schema,
    });
  }
  return _schemas;
}

export function useSecuritySchemes(
  spec: OpenAPIV3.ComponentsObject["securitySchemes"],
) {
  if (!spec) return [];
  const securitySchemes: {
    name: string;
    securityScheme: OpenAPIV3.SecuritySchemeObject;
  }[] = [];
  for (const name in spec) {
    const securityScheme = spec[name];
    if (isRef(securityScheme)) continue;
    securitySchemes.push({
      name,
      securityScheme,
    });
  }
  return securitySchemes;
}
