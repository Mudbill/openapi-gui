import { OpenAPIV3 } from "openapi-types";
import { useMemo, useState } from "react";
import { isRef } from "../../../../../utils/parse";
import Schema from "../../../components/schema";

interface Props {
  data: OpenAPIV3.ResponsesObject;
}

export default function ResponseBody({ data }: Props) {
  const responseCodes = Object.keys(data);
  const [code, setCode] = useState(
    responseCodes.find((x) => x.startsWith("2")) ?? responseCodes[0],
  );
  const response = useMemo(() => {
    const res = data[code];
    if (isRef(res)) return null;
    return res;
  }, [data, code]);

  return (
    <div className="flex flex-col gap-2">
      <div>
        <label htmlFor="">Response code: </label>
        <select
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="text-black px-1 py-0.5 border"
          disabled={responseCodes.length <= 1}
        >
          {responseCodes.map((code) => (
            <option value={code} key={code}>
              {code}
            </option>
          ))}
        </select>
        <span> {response?.description}</span>
      </div>
      <hr />
      {response ? <Response data={response} /> : null}
    </div>
  );
}

interface ResponseProps {
  data: OpenAPIV3.ResponseObject;
}

function Response({ data }: ResponseProps) {
  const contentTypes = Object.keys(data.content || {});
  const [contentType, setContentType] = useState(contentTypes[0]);
  const response = data.content?.[contentType];
  console.log(response?.schema);
  return (
    <section className="border border-slate-600">
      <div className="flex justify-between items-center border-b p-2 bg-slate-500 text-white">
        <h2 className="text-lg uppercase">Response body</h2>
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
      <pre className="bg-slate-200 p-2">
        {response?.schema ? (
          <Schema schema={response.schema} excludeWriteOnly />
        ) : null}
      </pre>
    </section>
  );
}
