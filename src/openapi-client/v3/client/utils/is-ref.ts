import { OpenAPIV3 } from "openapi-types";

export function isRef(value: any): value is OpenAPIV3.ReferenceObject {
  if (typeof value !== "object") return false;
  return value.hasOwnProperty("$ref");
}
