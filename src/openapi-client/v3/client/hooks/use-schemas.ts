import { OpenAPIV3 } from "openapi-types";
import { useOpenApiV3Data } from "../../context";
import { isRef } from "../utils/is-ref";

export default function useSchemas() {
  const { originalDocument } = useOpenApiV3Data();

  const schemas: { name: string; schema: OpenAPIV3.SchemaObject }[] = [];

  if (originalDocument.components?.schemas) {
    Object.entries(originalDocument.components.schemas).forEach(
      ([name, schema]) => {
        if (isRef(schema)) return;
        schemas.push({
          name,
          schema,
        });
      },
    );
  }

  return schemas;
}
