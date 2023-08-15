import { useOpenApiV3Data } from "../../context";
import { usePaths } from "./use-paths";

export default function useTags() {
  const paths = usePaths();
  const { apiDocument } = useOpenApiV3Data();
  const tags = apiDocument.tags?.filter(
    (tag) =>
      paths.filter((p) => p.operation.tags?.includes(tag.name)).length > 0,
  );
  return tags ?? [];
}
