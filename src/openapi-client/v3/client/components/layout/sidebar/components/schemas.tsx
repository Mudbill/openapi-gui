import { useState } from "react";
import useSchemas from "../../../../hooks/use-schemas";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";

interface Props {}

export default function Schemas(props: Props) {
  const [isExpanded, setIsExpanded] = useState(true);
  const schemas = useSchemas();
  const location = useLocation();
  return (
    <div>
      <button
        className="p-1 hover:bg-slate-300 w-full text-left"
        onClick={() => setIsExpanded((x) => !x)}
      >
        <span className="text-base font-serif font-semibold">Schemas</span>
      </button>
      {isExpanded && (
        <ul className="flex flex-col">
          {schemas.map((schema) => (
            <li key={schema.name}>
              <Link
                to={`/schemas/${schema.name}`}
                className={classNames(
                  "px-1 py-1 block",
                  location.pathname === `/schemas/${schema.name}`
                    ? "bg-slate-600 text-white"
                    : "hover:bg-slate-500 hover:text-white",
                )}
              >
                {schema.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
