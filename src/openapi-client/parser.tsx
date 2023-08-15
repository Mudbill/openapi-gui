import SwaggerParser from "@apidevtools/swagger-parser";
import { OpenAPI } from "openapi-types";
import { ReactNode, useEffect, useState } from "react";

type OpenApiParserProps = {
  apiDocumentContent: string;
  children: (
    data:
      | {
          loading: boolean;
        } & (
          | {
              success: false;
              parsedDoc?: undefined;
              originalDoc?: undefined;
            }
          | {
              success: true;
              parsedDoc: OpenAPI.Document;
              originalDoc: OpenAPI.Document;
            }
        ),
  ) => ReactNode;
};

export default function OpenApiParser(props: OpenApiParserProps) {
  const [loading, setLoading] = useState(false);
  const [parsedDoc, setParsedDoc] = useState<OpenAPI.Document>();
  const [originalDoc, setOriginalDoc] = useState<OpenAPI.Document>();

  useEffect(() => {
    if (!props.apiDocumentContent) return;

    const parsedDoc = JSON.parse(props.apiDocumentContent);
    const parsedDoc2 = JSON.parse(props.apiDocumentContent);
    setLoading(true);
    setOriginalDoc(parsedDoc2);

    SwaggerParser.validate(parsedDoc)
      .then((data) => {
        setParsedDoc(data);
      })
      .finally(() => setLoading(false));
  }, [props.apiDocumentContent]);

  if (loading) return <>{props.children({ loading: true, success: false })}</>;

  if (parsedDoc && originalDoc) {
    return (
      <>{props.children({ loading, success: true, parsedDoc, originalDoc })}</>
    );
  }

  return (
    <>
      {props.children({
        loading,
        success: false,
      })}
    </>
  );
}
