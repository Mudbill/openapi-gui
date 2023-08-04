import { OpenAPIV3 } from "openapi-types";

interface Props {
  spec: OpenAPIV3.Document;
}

export default function Header({ spec }: Props) {
  return (
    <header className="bg-slate-500 text-white font-semibold text-xl h-10 fixed top-0 right-0 left-0 flex items-center p-1 justify-between">
      <span>{spec.info.title}</span>
      <span className="text-base font-normal">Version {spec.info.version}</span>
    </header>
  );
}
