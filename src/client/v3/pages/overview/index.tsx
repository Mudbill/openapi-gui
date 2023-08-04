import { OpenAPIV3 } from "openapi-types";
import Markdown from "../../../../components/Markdown";

interface Props {
  spec: OpenAPIV3.Document;
}

export default function Overview({ spec }: Props) {
  return (
    <div className="p-4">
      <h1 className="text-4xl font-semibold font-serif">
        <span>{spec.info.title}</span>
        <span className="text-lg font-normal ml-4">
          Version {spec.info.version}
        </span>
      </h1>
      <hr className="border-slate-400 my-2" />
      <address className="not-italic">
        <span>{spec.info.contact?.name}</span>:{" "}
        <a
          href={`mailto:${spec.info.contact?.email}`}
          className="text-blue-500 underline"
        >
          {spec.info.contact?.email}
        </a>
      </address>
      <span className="ml-2">
        URL:{" "}
        <a href={spec.info.contact?.url} className="text-blue-500 underline">
          {spec.info.contact?.url}
        </a>
      </span>
      <div className="mt-4">
        <a href="/docs/openapi.json" download>
          <button className="border bg-slate-100 border-slate-50 py-1 px-4 hover:bg-slate-200">
            Download OpenAPI spec
          </button>
        </a>
      </div>
      {spec.info.description !== undefined && (
        <div className="mt-4 prose">
          <Markdown>{spec.info.description}</Markdown>
        </div>
      )}
    </div>
  );
}
