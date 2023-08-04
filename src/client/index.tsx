import OpenAPIv3 from "./v3";
import { OpenAPIv3ContextProvider } from "./v3/context";
import { useApiSpecification } from "../hooks/useApiSpecification";
import { OpenAPIV3 } from "openapi-types";

export default function ApiClient(props: { specification: any }) {
  const { data, error } = useApiSpecification(props.specification);

  if (error) {
    return <div>Error validating schema: {error.message}</div>;
  }

  return (
    <div>
      {data.version === "3.0" ? (
        <OpenAPIv3ContextProvider
          spec={data.document}
          originalDocument={props.specification as OpenAPIV3.Document}
        >
          <OpenAPIv3 />
        </OpenAPIv3ContextProvider>
      ) : data.version === "2" ? (
        <span>Specification version 2 not supported</span>
      ) : (
        data.version === "3.1" && (
          <span>Specification version 3.1 not supported</span>
        )
      )}
    </div>
  );
}
