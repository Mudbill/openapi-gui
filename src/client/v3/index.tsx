import Header from "./components/layout/header";
import Sidebar from "./components/layout/sidebar";
import { useOpenAPIContext } from "./context";
import AppRoutes from "./routes";

export default function OpenAPIv3() {
  const { spec } = useOpenAPIContext();
  return (
    <div className="flex flex-col text-sm h-screen">
      <Header spec={spec} />
      <div className="flex mt-10 grow">
        <Sidebar spec={spec} />
        <main className="bg-slate-300 grow">
          <AppRoutes spec={spec} />
        </main>
      </div>
    </div>
  );
}
