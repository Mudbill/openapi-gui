import { OpenAPIV3 } from "openapi-types";
import { isRef } from "./parse";

export interface Path {
  path: string;
  parameters: OpenAPIV3.ParameterObject[];
  method: string;
  operation: OpenAPIV3.OperationObject;
  data: Omit<OpenAPIV3.PathItemObject, OpenAPIV3.HttpMethods>;
}

export function usePaths(spec: OpenAPIV3.PathsObject): Path[] {
  const keys = Object.keys(spec);
  const paths: Path[] = [];

  keys.forEach((key) => {
    const data = spec[key];
    const parameters: OpenAPIV3.ParameterObject[] = [];
    if (data?.parameters) {
      for (const param of data.parameters) {
        if (isRef(param)) continue;
        parameters.push(param);
      }
    }

    if (data?.delete)
      paths.push({
        method: "delete",
        path: key,
        operation: data.delete,
        data: data,
        parameters,
      });
    if (data?.get)
      paths.push({
        method: "get",
        path: key,
        operation: data.get,
        data: data,
        parameters,
      });
    if (data?.head)
      paths.push({
        method: "head",
        path: key,
        operation: data.head,
        data: data,
        parameters,
      });
    if (data?.options)
      paths.push({
        method: "options",
        path: key,
        operation: data.options,
        data: data,
        parameters,
      });
    if (data?.patch)
      paths.push({
        method: "patch",
        path: key,
        operation: data.patch,
        data: data,
        parameters,
      });
    if (data?.post)
      paths.push({
        method: "post",
        path: key,
        operation: data.post,
        data: data,
        parameters,
      });
    if (data?.put)
      paths.push({
        method: "put",
        path: key,
        operation: data.put,
        data: data,
        parameters,
      });
  });

  return paths;
}
