import { isRef } from "../../../../utils/parse";
import { useOpenAPIContext } from "../../context";

interface Props {}

export default function Servers(props: Props) {
  const { spec } = useOpenAPIContext();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold">API server</h1>
      <p>Choose which server to use for testing the API in-browser.</p>
      <div className="p-4">
        {spec.servers?.map((server, i) => (
          <label className="flex items-center gap-2">
            <input type="radio" key={i} value={server.url} /> {server.url}
          </label>
        ))}
      </div>
      {spec.components?.securitySchemes ? (
        <>
          <h2>Authentication</h2>
          <div className="p-2">
            {Object.entries(spec.components.securitySchemes)?.map(
              ([key, value]) =>
                isRef(value) ? null : (
                  <div className="p-2 border">
                    {value.type === "apiKey" && (
                      <div className="flex flex-col">
                        <h3>{key}</h3>
                        <span>API Key ({value.name})</span>
                        <span>
                          Set {value.name} in {value.in}
                        </span>
                        <span>{value.description}</span>
                      </div>
                    )}
                  </div>
                ),
            )}
          </div>
        </>
      ) : null}
    </div>
  );
}
