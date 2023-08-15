import classNames from "classnames";
import { Path } from "../../hooks/use-paths";
import { Fragment } from "react";
import useAuthMethods from "../../hooks/use-auth-methods";
import RequestParams from "./components/request-params";
import RequestBody from "./components/request-body";
import useRequestBody from "../../hooks/use-request-body";
import ResponseBody from "./components/response-body";

interface Props {
  path: Path;
}

export default function PathPage({ path }: Props) {
  const auths = useAuthMethods(path);
  const requestBody = useRequestBody(path);

  return (
    <div className="p-4">
      <div className="flex flex-col gap-2">
        <div>
          <h1 className="text-2xl font-medium flex items-end gap-2 justify-between text-slate-700">
            {path.operation.description}
            {path.operation.tags?.map((tag) => (
              <span
                key={tag}
                className="bg-slate-600 px-1 py-0.5 rounded text-white text-xs"
              >
                {tag}
              </span>
            ))}
          </h1>
        </div>
        <hr />
        <div className="text-lg">
          <span
            className={classNames(
              "uppercase rounded p-1 font-semibold",
              path.method === "post" && "bg-lime-500 text-lime-100",
              path.method === "get" && "bg-sky-500 text-sky-100",
              path.method === "put" && "bg-orange-500 text-orange-100",
              path.method === "delete" && "bg-red-500 text-red-100",
            )}
          >
            {path.method}
          </span>
          &nbsp;&nbsp;
          <span className="font-mono border p-1 bg-slate-100">
            {path.path.split("/").map((part, i, parts) => (
              <Fragment key={i}>
                <span
                  className={classNames(
                    part.startsWith("{") &&
                      part.endsWith("}") &&
                      "text-blue-500",
                  )}
                >
                  {part}
                </span>
                {i + 1 < parts.length && <span>/</span>}
              </Fragment>
            ))}
          </span>
        </div>
        {auths.length ? (
          <div className="border border-slate-400 p-2 bg-slate-200 flex gap-2 w-fit">
            Authentication required:
            {auths.map((method) => (
              <span key={method}>{method}</span>
            ))}
          </div>
        ) : null}
        {path.parameters.length > 0 && (
          <RequestParams params={path.parameters} />
        )}
        <hr />
        {requestBody ? <RequestBody data={requestBody} path={path} /> : null}
        <hr />
        <ResponseBody data={path.operation.responses} />
        {/* <h2 className="text-lg">RESPONSE</h2>
        {responseCodes.map((code) => (
          <div key={code}>
            <h3>{code}</h3>
            <>
              {(() => {
                const response = path.operation.responses[code];
                if (isRef(response)) return <>Ref object</>;
                return <Response response={response} />;
              })()}
            </>
          </div>
        ))} */}
      </div>
      {/* <hr />
      <pre className="text-xs">{JSON.stringify(path, null, 2)}</pre> */}
    </div>
  );
}
