import { isRef } from "../utils/is-ref";
import { Path } from "./use-paths";

export default function useRequestBody(path: Path) {
  const body = path.operation.requestBody;
  if (isRef(body)) return undefined;
  return body;
}
