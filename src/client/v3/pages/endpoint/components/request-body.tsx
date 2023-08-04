import { OpenAPIV3 } from "openapi-types";
import { Path } from "../../../../../utils/paths";
import Schema from "../../../components/schema";
import { isRef } from "../../../../../utils/parse";
import { useState } from "react";

interface Props {
  data: OpenAPIV3.RequestBodyObject;
  path: Path;
}

export default function RequestBody({ data, path }: Props) {
  //   const [tab, setTab] = useState<"schema" | "example">("schema");
  const contentTypes = Object.keys(data.content);
  const [contentType, setContentType] = useState(contentTypes[0]);
  const request = data.content[contentType];

  return (
    <section className="border border-slate-600">
      <div className="flex justify-between items-center bg-lime-700 border-b p-2 text-white">
        <h2 className="text-lg uppercase">
          Request body{" "}
          {data.required && <span className="text-red-500">*</span>}
        </h2>
        <div>
          <span>Content type: </span>
          <select
            className="text-black px-1 py-0.5 border"
            disabled={contentTypes.length <= 1}
            value={contentType}
            onChange={(e) => setContentType(e.target.value)}
          >
            {contentTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="bg-slate-100 p-1 border-b border-slate-300">Schema:</div>
      <p>{data.description}</p>
      {request.schema && !isRef(request.schema) ? (
        <pre className="bg-slate-200 p-2">
          <Schema schema={request.schema} excludeReadOnly />
        </pre>
      ) : null}
    </section>
  );
}
