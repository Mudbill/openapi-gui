import { OpenAPIV3 } from "openapi-types";
import Schema from "../../../components/schema";
import { useMemo, useState } from "react";
import { Path } from "../../../hooks/use-paths";

interface Props {
  data: OpenAPIV3.RequestBodyObject;
  path: Path;
}

export default function RequestBody({ data, path }: Props) {
  const contentTypes = Object.keys(data.content);
  const [contentType, setContentType] = useState(
    contentTypes.find((_, i) => i === 0),
  );
  const request = useMemo(() => {
    if (contentType) return data.content[contentType];
  }, [data, contentType]);

  return (
    <section className="border border-slate-600">
      <div className="flex justify-between items-center bg-lime-700 p-2 text-white">
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
      {data.description ? <p className="p-2">{data.description}</p> : null}
      {request?.schema ? (
        <pre className="bg-slate-200 p-2">
          <Schema schema={request.schema} excludeReadOnly />
        </pre>
      ) : null}
    </section>
  );
}
