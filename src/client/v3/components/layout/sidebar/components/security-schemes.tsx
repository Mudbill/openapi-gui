import { OpenAPIV3 } from "openapi-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSecuritySchemes } from "../../../../hooks/hook";

interface Props {
  securitySchemes: OpenAPIV3.ComponentsObject["securitySchemes"];
}

export default function SecuritySchemes(props: Props) {
  const [isExpanded, setIsExpanded] = useState(true);
  const securitySchemes = useSecuritySchemes(props.securitySchemes);
  if (!securitySchemes.length) return null;
  return (
    <div>
      <button
        className="p-1 hover:bg-slate-300 w-full text-left"
        onClick={() => setIsExpanded((x) => !x)}
      >
        <span className="text-base font-serif font-semibold">
          Security Schemes
        </span>
      </button>
      {isExpanded && (
        <ul>
          {securitySchemes.map((scheme) => (
            <li key={scheme.name}>
              <Link to={`/security-schemes/${scheme.name}`}>
                <span>{scheme.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
