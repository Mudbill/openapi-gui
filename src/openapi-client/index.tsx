import { useEffect, useState } from "react";
import OpenApiParser from "./parser";
import { isOpenAPIv2, isOpenAPIv3, isOpenAPIv3_1 } from "../utils/is-version";
import SwaggerClientV2 from "./v2";
import OpenApiV3 from "./v3";
import OpenApiClientV31 from "./v3_1";
import { OpenApiV3Provider } from "./v3/context";

interface Props {
  url: string;
}

export default function OpenApiClient(props: Props) {
  const { apiDocumentContent, error, loading } = useOpenApiDocument(props.url);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading document: {error}</div>;
  }

  return (
    <OpenApiParser apiDocumentContent={apiDocumentContent}>
      {({ loading, success, originalDoc, parsedDoc }) =>
        loading ? (
          <em>Loading2...</em>
        ) : !success ? (
          <>Invalid specification document</>
        ) : isOpenAPIv2(parsedDoc) && isOpenAPIv2(originalDoc) ? (
          <SwaggerClientV2 />
        ) : isOpenAPIv3(parsedDoc) && isOpenAPIv3(originalDoc) ? (
          <OpenApiV3Provider
            apiDocument={parsedDoc}
            originalDocument={originalDoc}
          >
            <OpenApiV3 />
          </OpenApiV3Provider>
        ) : isOpenAPIv3_1(parsedDoc) && isOpenAPIv3_1(originalDoc) ? (
          <OpenApiClientV31 />
        ) : null
      }
    </OpenApiParser>
  );
}

function useOpenApiDocument(url: string) {
  const [apiDocumentContent, setApiDocumentContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (!url) return;
    setLoading(true);
    fetch(url)
      .then((response) => response.text())
      .then((response) => {
        setApiDocumentContent(response);
      })
      .catch((error) => {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Unknown error");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url]);

  return {
    apiDocumentContent,
    loading,
    error,
  };
}
