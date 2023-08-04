import { OpenAPIV3 } from "openapi-types";
import { useState } from "react";
import { createExample, isRef } from "../../../../utils/parse";
import SchemaPage from "../../pages/schema";
import JsonHighlight from "../../../../components/JsonHighlight";

interface Props {
  response: OpenAPIV3.ResponseObject;
}

export default function Response({ response }: Props) {
  const [tab, setTab] = useState<"example" | "schema">("example");
  if (!response.content) return null;
  const mediaTypes = Object.keys(response.content);
  if (!mediaTypes.length) return null;
  const schema = response.content[mediaTypes[0]].schema;
  if (isRef(schema)) return null;
  const example = createExample(schema);
  return (
    <div>
      <h4>{response.description}</h4>
      <div className="flex gap-2">
        <button
          onClick={() => setTab("example")}
          className={tab === "example" ? "underline" : ""}
        >
          Example
        </button>
        <button
          onClick={() => setTab("schema")}
          className={tab === "schema" ? "underline" : ""}
        >
          Schema
        </button>
      </div>
      {tab === "example" && (
        <div className="prose max-w-full">
          <JsonHighlight json={example} />
        </div>
      )}
      {tab === "schema" && schema !== undefined && (
        <SchemaPage schema={schema} />
      )}
    </div>
  );
}
