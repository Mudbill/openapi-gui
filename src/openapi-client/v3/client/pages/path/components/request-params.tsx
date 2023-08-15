import { OpenAPIV3 } from "openapi-types";
import Schema from "../../../components/schema";
import { isRef } from "../../../utils/is-ref";

interface Props {
  params: OpenAPIV3.ParameterObject[];
}

export default function RequestParams({ params }: Props) {
  return (
    <section className="border border-slate-600">
      {params.some((param) => param.in === "path") && (
        <>
          <h2 className="text-lg uppercase px-2 py-1 bg-sky-600 text-white">
            Path parameters
          </h2>
          <div className="bg-slate-100 border-b border-slate-300 flex flex-col divide-y">
            <table>
              <tbody>
                {params
                  .filter((p) => p.in === "path")
                  .map((param) => (
                    <tr
                      key={param.name}
                      className="last:border-t border-slate-600 hover:bg-slate-200"
                    >
                      <td className="px-2 py-1">
                        <code className="pr-4">
                          {param.name}
                          {!param.required && (
                            <span className="text-orange-600">?</span>
                          )}
                          :{" "}
                          {param.schema && !isRef(param.schema) ? (
                            <Schema schema={param.schema} excludeReadOnly />
                          ) : null}
                        </code>
                      </td>
                      <td className="px-2 py-1">
                        <div className="text-gray-600 pl-4">
                          {param.description}
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      {params.some((param) => param.in === "header") && (
        <>
          <h2 className="text-lg uppercase px-2 py-1 bg-sky-700 text-white">
            Header parameters
          </h2>
          <div className="bg-slate-100 border-b border-slate-300 flex flex-col divide-y">
            <table>
              <tbody>
                {params
                  .filter((p) => p.in === "header")
                  .map((param) => (
                    <tr
                      key={param.name}
                      className="last:border-t border-slate-600 hover:bg-slate-200"
                    >
                      <td className="px-2 py-1">
                        <code className="pr-4">
                          {param.name}
                          {!param.required && (
                            <span className="text-orange-600">?</span>
                          )}
                          :{" "}
                          {param.schema && !isRef(param.schema) ? (
                            <Schema schema={param.schema} excludeReadOnly />
                          ) : null}
                        </code>
                      </td>
                      <td className="px-2 py-1">
                        <div className="text-gray-600 pl-4">
                          {param.description}
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      {params.some((param) => param.in === "query") && (
        <>
          <h2 className="text-lg uppercase px-2 py-1 bg-sky-800 text-white">
            Query parameters
          </h2>
          <div className="bg-slate-100 border-b border-slate-300 flex flex-col divide-y">
            <table>
              <tbody>
                {params
                  .filter((p) => p.in === "query")
                  .map((param) => (
                    <tr
                      key={param.name}
                      className="last:border-t border-slate-600 hover:bg-slate-200"
                    >
                      <td className="px-2 py-1">
                        <code className="pr-4">
                          {param.name}
                          {!param.required && (
                            <span className="text-orange-600">?</span>
                          )}
                          :{" "}
                          {param.schema && !isRef(param.schema) ? (
                            <Schema schema={param.schema} excludeReadOnly />
                          ) : null}
                        </code>
                      </td>
                      <td className="px-2 py-1">
                        <div className="text-gray-600 pl-4">
                          {param.description}
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
}
