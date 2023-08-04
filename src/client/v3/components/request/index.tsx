import { OpenAPIV3 } from "openapi-types";
import { useState } from "react";
import { Path } from "../../../../utils/paths";
import { createExample, isRef } from "../../../../utils/parse";
import SendRequest from "./send-request";
import { useForm } from "react-hook-form";

interface Props {
  data?: OpenAPIV3.RequestBodyObject;
  path: Path;
}

export default function Request({ data, path }: Props) {
  const mediaTypes = Object.keys(data?.content || {});
  const [selected, setSelected] = useState(mediaTypes[0]);
  const contentTypes = Object.keys(data?.content || {});
  const content = data?.content[selected];
  const parsed = createExample(content?.schema);

  const form = useForm({});

  const onSubmit = form.handleSubmit((values) => {});

  const params = form.watch();

  return (
    <div className="flex flex-col gap-1">
      {path.data.parameters?.length ? (
        <form onSubmit={onSubmit}>
          <span>PATH PARAMETERS</span>
          <ul className="bg-slate-200 p-2">
            {path.data.parameters.map(
              (param, i) =>
                !isRef(param) && (
                  <li key={param.name}>
                    <div className="flex gap-2">
                      <div className="flex flex-col">
                        <div>
                          {param.required && (
                            <span className="text-red-500">* </span>
                          )}
                          <span className="font-mono">{param.name}</span>
                        </div>
                        {!isRef(param.schema) && (
                          <span className="text-xs self-end">
                            {param.schema?.type}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col gap-2">
                        <input
                          {...form.register(param.name)}
                          defaultValue={
                            isRef(param.schema) ? "" : param.schema?.example
                          }
                        />
                        {!isRef(param.schema) && param.schema?.example ? (
                          <div className="text-xs">
                            Example:{" "}
                            <span className="text-blue-400">
                              {param.schema.example}
                            </span>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </li>
                ),
            )}
          </ul>
        </form>
      ) : null}
      {data ? (
        <div>
          <span>
            REQUEST BODY
            {data.required && <span className="text-red-500">*</span>}
          </span>{" "}
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            {contentTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <br />
          <pre className="bg-slate-200 p-2">
            {JSON.stringify(parsed, null, 2)}
          </pre>
        </div>
      ) : null}
      <SendRequest path={path} parameters={params} />
    </div>
  );
}
