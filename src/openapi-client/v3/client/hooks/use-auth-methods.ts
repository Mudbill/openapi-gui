import { useMemo } from "react";
import { Path } from "./use-paths";
import { useOpenApiV3Data } from "../../context";

export default function useAuthMethods(path: Path) {
  const { apiDocument } = useOpenApiV3Data();

  const authMethods = useMemo(() => {
    if (path.operation.security)
      return path.operation.security
        .map((security) => Object.keys(security))
        .flat();

    if (apiDocument.security)
      return apiDocument.security
        .map((security) => Object.keys(security))
        .flat();

    return [];
  }, [path, apiDocument]);

  return authMethods;
}
