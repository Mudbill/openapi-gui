import { Route, Routes } from "react-router-dom";
import OverviewPage from "./pages/overview";
import { usePaths } from "./hooks/use-paths";
import PathPage from "./pages/path";
import useSchemas from "./hooks/use-schemas";
import SchemaPage from "./pages/schema";

export default function AppRoutes() {
  // const schemas = useSchemas(spec.components?.schemas);
  // const securitySchemes = useSecuritySchemes(spec.components?.securitySchemes);
  // const paths = usePaths(spec.paths);
  const paths = usePaths();
  const schemas = useSchemas();
  return (
    <Routes>
      <Route index element={<OverviewPage />} />
      {/* <Route path="servers" element={<Servers />} /> */}
      <Route path="paths">
        {paths.map((path) => (
          <Route
            key={`${path.method}-${path.path}`}
            path={`${path.method}${path.path}`}
            element={<PathPage path={path} />}
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
      {/* <Route path="security-schemes">
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
        </Route> */}
      <Route path="*" element={<>Route not found</>} />
    </Routes>
  );
}
