import classNames from "classnames";
import { OpenAPIV3 } from "openapi-types";
import { Link, useLocation } from "react-router-dom";
import Endpoints from "./components/endpoints";
import Components from "./components/components";

interface Props {
  spec: OpenAPIV3.Document;
}

export default function Sidebar({ spec }: Props) {
  const location = useLocation();
  return (
    <nav className="bg-slate-200 flex flex-col pt-4 gap-2 min-w-[300px] max-w-[400px] overflow-auto">
      <Link to="/">
        <div
          className={classNames(
            "p-1 hover:bg-slate-600 hover:text-white",
            location.pathname === "/" && "bg-slate-600 text-white",
          )}
        >
          Overview
        </div>
      </Link>
      <Link to="/servers">
        <div
          className={classNames(
            "p-1 hover:bg-slate-600 hover:text-white",
            location.pathname === "/servers" && "bg-slate-600 text-white",
          )}
        >
          Servers
        </div>
      </Link>
      <Endpoints spec={spec} />
      {spec.components ? <Components components={spec.components} /> : null}
    </nav>
  );
}
