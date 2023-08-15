import Markdown from "../../../../../components/Markdown";
import { useOpenApiV3Data } from "../../../context";

export default function OverviewPage() {
  const { apiDocument } = useOpenApiV3Data();
  return (
    <div className="p-4">
      <h1 className="text-4xl font-semibold font-serif">
        <span>{apiDocument.info.title}</span>
        <span className="text-lg font-normal ml-4">
          Version {apiDocument.info.version}
        </span>
      </h1>
      <hr className="border-slate-400 my-2" />
      <address className="not-italic">
        <span>{}</span>
        <span>{apiDocument.info.contact?.name}</span>:{" "}
        <a
          href={`mailto:${apiDocument.info.contact?.email}`}
          className="text-blue-500 underline"
        >
          {apiDocument.info.contact?.email}
        </a>
      </address>
      <span className="ml-2">
        URL:{" "}
        <a
          href={apiDocument.info.contact?.url}
          className="text-blue-500 underline"
        >
          {apiDocument.info.contact?.url}
        </a>
      </span>
      <div className="mt-4">
        <a href="/docs/openapi.json" download>
          <button className="border bg-slate-100 border-slate-50 py-1 px-4 hover:bg-slate-200">
            Download OpenAPI specification
          </button>
        </a>
      </div>
      {apiDocument.info.description !== undefined && (
        <div className="mt-4 prose">
          <Markdown>{apiDocument.info.description}</Markdown>
        </div>
      )}
    </div>
  );
}
