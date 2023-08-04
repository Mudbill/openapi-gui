import { OpenAPIV3 } from "openapi-types";
import { useExample } from "../../hooks/useExample";
import JsonHighlight from "../../../../components/JsonHighlight";

interface Props {
  schema: OpenAPIV3.SchemaObject;
  type: "read" | "write" | "both";
}

export default function Example(props: Props) {
  const example = useExample(props.schema, { type: props.type });
  return (
    <div className="bg-black">
      <JsonHighlight json={example}></JsonHighlight>
    </div>
  );
}
