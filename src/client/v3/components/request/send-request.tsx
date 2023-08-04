import { Path } from "../../../../utils/paths";
import { useOpenAPIContext } from "../../context";

interface Props {
  path: Path;
  parameters: Record<string, string>;
}

export default function SendRequest(props: Props) {
  const { spec } = useOpenAPIContext();
  const url = spec.servers?.find(() => true);
  const thisUrl = url?.url + props.path.path;
  return (
    <div>
      <span>{thisUrl}</span>
    </div>
  );
}
