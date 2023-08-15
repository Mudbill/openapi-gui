import type { OpenAPIV2, OpenAPIV3, OpenAPIV3_1 } from "openapi-types";

export function isOpenAPIv2(spec: any): spec is OpenAPIV2.Document {
  if (typeof spec === "object") {
    const { swagger } = spec;
    if (typeof swagger === "string") {
      if (swagger.startsWith("2.0")) return true;
    }
  }
  return false;
}

export function isOpenAPIv3(spec: any): spec is OpenAPIV3.Document {
  if (typeof spec === "object") {
    const { openapi } = spec;
    if (typeof openapi === "string") {
      if (openapi.startsWith("3.0")) return true;
    }
  }
  return false;
}

export function isOpenAPIv3_1(spec: any): spec is OpenAPIV3_1.Document {
  if (typeof spec === "object") {
    const { openapi } = spec;
    if (typeof openapi === "string") {
      if (openapi.startsWith("3.1")) return true;
    }
  }
  return false;
}
