import { Route, Routes } from "react-router-dom";
import Overview from "./pages/overview";
import { useSchemas, useSecuritySchemes } from "./hooks/hook";
import { usePaths } from "../../utils/paths";
import { OpenAPIV3 } from "openapi-types";
import Endpoint from "./pages/endpoint";
import SchemaPage from "./pages/schema";
import SecuritySchemePage from "./pages/security-scheme";
import Servers from "./pages/servers";

interface Props {
  spec: OpenAPIV3.Document;
}

export default function AppRoutes({ spec }: Props) {
  const schemas = useSchemas(spec.components?.schemas);
  const securitySchemes = useSecuritySchemes(spec.components?.securitySchemes);
  const paths = usePaths(spec.paths);
  return (
    <Routes>
      <Route index element={<Overview spec={spec} />} />
      <Route path="servers" element={<Servers />} />
      <Route path="routes">
        {paths.map((path) => (
          <Route
            key={`${path.method}-${path.path}`}
            path={`${path.method}${path.path}`}
            element={<Endpoint path={path} />}
          />
        ))}
      </Route>
      <Route path="schemas">
        {schemas.map((schema) => (
          <Route
            key={schema.name}
            path={schema.name}
            element={<SchemaPage schema={schema.schema} name={schema.name} />}
          />
        ))}
      </Route>
      <Route path="security-schemes">
        {securitySchemes.map((scheme) => (
          <Route
            key={scheme.name}
            path={scheme.name}
            element={
              <SecuritySchemePage
                name={scheme.name}
                scheme={scheme.securityScheme}
              />
            }
          />
        ))}
      </Route>
      <Route path="*" element={<>Route not found</>} />
    </Routes>
  );
}
