import { useOpenApiV3Data } from "../../../../context";

export default function Header() {
  const { apiDocument } = useOpenApiV3Data();
  return (
    <header className="bg-slate-500 text-white font-semibold text-xl h-10 fixed top-0 right-0 left-0 flex items-center p-1 justify-between">
      <span>{apiDocument.info.title}</span>
      <span className="text-base font-normal">
        Version {apiDocument.info.version}
      </span>
    </header>
  );
}
