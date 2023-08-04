import { OpenAPIV3 } from "openapi-types";
import { isRef } from "../../../utils/parse";
import { useOpenAPIContext } from "../context";

export function useDereferencedSchema(
  schema?: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject,
) {
  const { spec } = useOpenAPIContext();
  if (!schema) return { isComponent: false };
  if (!isRef(schema)) return { isComponent: false, schema };
  const path = schema.$ref.split("/");
  if (path[0] === "#" && path[1] === "components" && path[2] === "schemas") {
    const refSchema = spec.components?.schemas?.[path[3]];
    if (refSchema && !isRef(refSchema)) {
      console.log("schema name", path[3]);
      return {
        schema: refSchema,
        isComponent: true,
        name: path[3],
      };
    }
  }
  return { isComponent: false };
}
