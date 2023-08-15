import { useState } from "react";
import useTags from "../../../../hooks/use-tags";
import { Link, useLocation } from "react-router-dom";
import { Path, usePaths } from "../../../../hooks/use-paths";
import classNames from "classnames";
import { OpenAPIV3 } from "openapi-types";

export default function Paths() {
  const [text, setText] = useState("");
  const [isExpanded, setExpanded] = useState(true);
  const tags = useTags();
  const paths = usePaths();

  const filteredTags = tags.filter((tag) =>
    tag.name.toLowerCase().includes(text.toLowerCase()),
  );

  const filteredPaths = paths.filter((path) =>
    path.path.toLowerCase().includes(text.toLowerCase()),
  );

  return (
    <>
      <div className="p-1">
        <input
          className="w-full p-1"
          placeholder="Search"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div>
        <button
          onClick={() => setExpanded((x) => !x)}
          className="font-bold text-xs text-gray-500 uppercase px-1"
        >
          Paths
        </button>
      </div>
      <ul
        className={classNames(
          "flex flex-col min-w-[300px]",
          !isExpanded && "hidden",
        )}
      >
        {filteredTags.map((tag) => (
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
    <Link to={`/paths/${path.method}${path.path}`}>
      <div
        className={classNames(
          "font-mono text-xs flex gap-1 p-1 items-center",
          location.pathname === `/paths/${path.method}${path.path}`
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
        <span
          className={classNames(path.operation.deprecated && "line-through")}
        >
          {path.path}
        </span>
      </div>
    </Link>
  );
}
