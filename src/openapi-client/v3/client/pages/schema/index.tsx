import { OpenAPIV3 } from "openapi-types";
import Schema from "../../components/schema";

interface Props {
  schema: OpenAPIV3.SchemaObject;
  name: string;
}

export default function SchemaPage({ name, schema }: Props) {
  return (
    <div className="p-2 m-2 bg-slate-100">
      <h1 className="text-xl">
        {name} <small className="text-gray-500">Schema</small>
      </h1>
      <h2 className="uppercase">{schema.type}</h2>
      <hr />
      <pre className="mt-2 bg-slate-200 p-2">
        <Schema schema={schema} key={name} />
      </pre>
    </div>
  );
}
