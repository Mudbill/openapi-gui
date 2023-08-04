import { OpenAPIV3 } from "openapi-types";
import { useState } from "react";
import Schemas from "./schemas";
import SecuritySchemes from "./security-schemes";

interface Props {
  components: OpenAPIV3.ComponentsObject;
}

export default function Components({ components }: Props) {
  const [isExpanded, setExpanded] = useState(true);
  return (
    <div className="">
      <button onClick={() => setExpanded((x) => !x)}>
        <span className="text-xs font-bold text-gray-500 uppercase">
          Components
        </span>
      </button>
      {isExpanded && (
        <>
          <Schemas schemas={components.schemas} />
          <SecuritySchemes securitySchemes={components.securitySchemes} />
        </>
      )}
    </div>
  );
}
