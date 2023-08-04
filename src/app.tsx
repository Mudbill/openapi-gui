import ApiClient from "./client";
import { useSpec } from "./hooks/api";

export default function App() {
  const spec = useSpec();

  if (!spec) return <>Ingen spec</>;

  return <ApiClient specification={spec} />;
}
