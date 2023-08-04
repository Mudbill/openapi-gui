import { OpenAPIV2, OpenAPIV3, OpenAPIV3_1 } from "openapi-types";
import { useEffect, useState } from "react";
import SwaggerParser from "swagger-parser";

type UseApiSpecification = {
  data: ApiSpecification;
  error?: Error;
};

type ApiSpecification =
  | {
      version: "2";
      document: OpenAPIV2.Document;
    }
  | {
      version: "3.0";
      document: OpenAPIV3.Document;
    }
  | {
      version: "3.1";
      document: OpenAPIV3_1.Document;
    }
  | {
      version: undefined;
    };

export const useApiSpecification = (
  specification: string,
): UseApiSpecification => {
  const [data, setData] = useState<ApiSpecification>({ version: undefined });
  const [error, setError] = useState<Error>();

  useEffect(() => {
    let mounted = true;

    const doc =
      typeof specification === "object"
        ? specification
        : JSON.parse(specification);

    // SwaggerParser.validate(specification)
    //   .then((doc2: any) => {
    if (!mounted) return;
    console.log(doc);
    if (doc.swagger?.startsWith("2")) {
      setData({
        version: "2",
        document: doc as OpenAPIV2.Document,
      });
    }
    if (doc.openapi?.startsWith("3.0")) {
      setData({
        version: "3.0",
        document: doc as OpenAPIV3.Document,
      });
    }
    if (doc.openapi?.startsWith("3.1")) {
      setData({
        version: "3.1",
        document: doc as OpenAPIV3_1.Document,
      });
    }
    // })
    // .catch((e) => {
    //   console.error("Failed to validate schema", e);
    //   setError(e);
    // });

    return () => {
      mounted = false;
    };
  }, [specification]);

  return {
    data,
    error,
  };
};
