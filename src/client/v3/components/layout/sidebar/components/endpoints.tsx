import classNames from "classnames";
import { OpenAPIV3 } from "openapi-types";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { usePaths, Path } from "../../../../../../utils/paths";

interface Props {
  spec: OpenAPIV3.Document;
}

export default function Endpoints({ spec }: Props) {
  const paths = usePaths(spec.paths);
  const [text, setText] = useState("");
  const [isExpanded, setExpanded] = useState(true);

  const filteredPaths = paths.filter((p) =>
    p.path.toLowerCase().includes(text.toLowerCase()),
  );
  const tags = spec.tags?.filter(
    (tag) =>
      filteredPaths.filter((p) => p.operation.tags?.includes(tag.name)).length >
      0,
  );

  return (
    <>
      <div className="p-1">
        <input
          className="w-full p-1"
          placeholder="Filter"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div>
        <button
          onClick={() => setExpanded((x) => !x)}
          className="font-bold text-xs text-gray-500 uppercase"
        >
          Operations
        </button>
      </div>
      {isExpanded && (
        <ul className="flex flex-col min-w-[300px]">
          {tags?.map((tag) => (
            <li key={tag.name}>
              <Tag
                tag={tag}
                routes={filteredPaths.filter((path) =>
                  path.operation.tags?.includes(tag.name),
                )}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

function Tag({ tag, routes }: { routes: Path[]; tag: OpenAPIV3.TagObject }) {
  const location = useLocation();
  const [isExpanded, setExpanded] = useState(
    routes.some((route) => location.pathname.endsWith(route.path)),
  );
  return (
    <div>
      <button
        className="p-1 hover:bg-slate-300 w-full text-left"
        onClick={() => setExpanded((x) => !x)}
      >
        <span className="text-base font-serif font-semibold">{tag.name}</span>
      </button>
      <div className="bg-slate-100">
        {isExpanded && (
          <ul className="flex flex-col py-1">
            {routes.map((route) => (
              <li key={`${route.method}-${route.path}`}>
                <Route path={route} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function Route({ path }: { path: Path }) {
  const location = useLocation();
  return (
    <Link to={`/routes/${path.method}${path.path}`}>
      <div
        className={classNames(
          "font-mono text-xs flex gap-1 p-1 items-center",
          location.pathname === `/routes/${path.method}${path.path}`
            ? "bg-slate-600 text-white"
            : "hover:bg-slate-500 hover:text-white",
        )}
      >
        <span className="min-w-[40px] text-center text-[10px] px-1 font-mono">
          {path.method === "get" && (
            <div className="bg-sky-600 text-sky-100 font-semibold w-full px-1 rounded">
              GET
            </div>
          )}
          {path.method === "post" && (
            <div className="bg-lime-600 text-lime-100 font-semibold w-full px-1 rounded">
              POST
            </div>
          )}
          {path.method === "put" && (
            <div className="bg-orange-600 text-orange-100 font-semibold px-1 rounded">
              PUT
            </div>
          )}
          {path.method === "delete" && (
            <div className="bg-red-600 text-red-100 font-semibold px-1 rounded">
              DEL
            </div>
          )}
        </span>
        {path.path}
      </div>
    </Link>
  );
}
