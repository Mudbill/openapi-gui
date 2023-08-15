import { OpenAPIV3 } from "openapi-types";
import { useOpenApiV3Data } from "../../context";
import { isRef } from "../utils/is-ref";
import { useMemo } from "react";

export interface Path {
  path: string;
  parameters: OpenAPIV3.ParameterObject[];
  method: string;
  operation: OpenAPIV3.OperationObject;
  data: Omit<OpenAPIV3.PathItemObject, OpenAPIV3.HttpMethods>;
}

export function usePaths(): Path[] {
  const { originalDocument } = useOpenApiV3Data();

  const paths = useMemo(() => {
    const paths: Path[] = [];

    Object.entries(originalDocument.paths).forEach(([path, data]) => {
      if (!data) return;

      const parameters: OpenAPIV3.ParameterObject[] = [];
      if (data.parameters) {
        Object.entries(data.parameters).forEach(([key, value]) => {
          if (isRef(value)) return;
          parameters.push(value);
        });
      }

      Object.keys(data).forEach((key) => {
        const obj = {
          method: key,
          data,
          path,
        } as const;

        const parameters: OpenAPIV3.ParameterObject[] = [];

        if (key === "get" && data.get) {
          if (data.get.parameters) {
            Object.entries(data.get.parameters).forEach(([key, value]) => {
              if (isRef(value)) return;
              parameters.push(value);
            });
          }

          paths.push({
            ...obj,
            operation: data.get,
            parameters,
          });
        }
        if (key === "post" && data.post) {
          if (data.post.parameters) {
            Object.entries(data.post.parameters).forEach(([key, value]) => {
              if (isRef(value)) return;
              parameters.push(value);
            });
          }

          paths.push({
            ...obj,
            operation: data.post,
            parameters,
          });
        }
        if (key === "put" && data.put) {
          if (data.put.parameters) {
            Object.entries(data.put.parameters).forEach(([key, value]) => {
              if (isRef(value)) return;
              parameters.push(value);
            });
          }

          paths.push({
            ...obj,
            operation: data.put,
            parameters,
          });
        }
        if (key === "patch" && data.patch) {
          if (data.patch.parameters) {
            Object.entries(data.patch.parameters).forEach(([key, value]) => {
              if (isRef(value)) return;
              parameters.push(value);
            });
          }
          paths.push({
            ...obj,
            operation: data.patch,
            parameters,
          });
        }
        if (key === "delete" && data.delete) {
          if (data.delete.parameters) {
            Object.entries(data.delete.parameters).forEach(([key, value]) => {
              if (isRef(value)) return;
              parameters.push(value);
            });
          }

          paths.push({
            ...obj,
            operation: data.delete,
            parameters,
          });
        }
        if (key === "options" && data.options) {
          if (data.options.parameters) {
            Object.entries(data.options.parameters).forEach(([key, value]) => {
              if (isRef(value)) return;
              parameters.push(value);
            });
          }

          paths.push({
            ...obj,
            operation: data.options,
            parameters,
          });
        }
        if (key === "head" && data.head) {
          if (data.head.parameters) {
            Object.entries(data.head.parameters).forEach(([key, value]) => {
              if (isRef(value)) return;
              parameters.push(value);
            });
          }

          paths.push({
            ...obj,
            operation: data.head,
            parameters,
          });
        }
      });
    });

    return paths;
  }, [originalDocument.paths]);

  return paths;
}
