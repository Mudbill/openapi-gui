import { OpenAPIV3 } from "openapi-types";
import { useMemo, useState } from "react";
import Schema from "../../../components/schema";
import { isRef } from "../../../utils/is-ref";
import classNames from "classnames";

interface Props {
  data: OpenAPIV3.ResponsesObject;
}

export default function ResponseBody({ data }: Props) {
  const responseCodes = Object.keys(data);
  const [code, setCode] = useState(
    responseCodes.find((x) => x.startsWith("2")) ?? responseCodes[0],
  );

  // const responses = useMemo(() => {
  //   return Object.entries(data).map(([key, value]) => {
  //     if (isRef(value)) return;
  //     return {
  //       key, value
  //     }
  //   })
  // }, [data])

  const response = useMemo(() => {
    const res = data[code];
    if (isRef(res)) return;
    return res;
  }, [data, code]);

  // return (
  //   <section className="border border-slate-600">
  //     <div className="flex justify-between items-center p-2 bg-slate-500 text-white border-b border-slate-600">
  //       <h2 className="text-lg uppercase">Responses</h2>
  //     </div>
  //     <div className="">
  //       <table className="w-full">
  //         <thead className="bg-white text-left">
  //           <tr>
  //             <th className="p-2">Code</th>
  //             <th className="p-2">Description</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {responseCodes.map((code) => (
  //             <tr key={code} className="bg-slate-200">
  //               <td className="p-2 font-mono">{code}</td>
  //               <td className="p-2"></td>
  //             </tr>
  //           ))}
  //         </tbody>
  //       </table>
  //     </div>
  //   </section>
  // );

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
      {response ? <Response data={response} code={code} /> : null}
    </div>
  );
}

interface ResponseProps {
  data: OpenAPIV3.ResponseObject;
  code: string;
}

function Response({ data, code }: ResponseProps) {
  const contentTypes = Object.keys(data.content || {});
  const [contentType, setContentType] = useState(contentTypes[0]);
  const response = data.content?.[contentType];

  console.log(data);

  return (
    <section className="border border-slate-600">
      <div className="flex justify-between items-center p-2 bg-slate-500 text-white">
        <h2 className="text-lg uppercase">Response body</h2>
        <div className={classNames(contentTypes.length === 0 && "hidden")}>
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
      {/* {data.description ? <p className="p-2">{data.description}</p> : null} */}
      {response?.schema ? (
        <pre className="bg-slate-200 p-2">
          <Schema schema={response.schema} excludeWriteOnly />
        </pre>
      ) : (
        <div className="p-2">
          <em>No response body</em>
        </div>
      )}
    </section>
  );
}
