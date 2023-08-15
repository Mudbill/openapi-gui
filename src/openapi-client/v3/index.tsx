import { HashRouter } from "react-router-dom";
import OpenApiClientV3 from "./client";

export default function OpenApiV3() {
  return (
    <HashRouter>
      <OpenApiClientV3 />
    </HashRouter>
  );
}
