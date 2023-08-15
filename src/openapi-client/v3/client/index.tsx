import Header from "./components/layout/header";
import Sidebar from "./components/layout/sidebar";
import AppRoutes from "./routes";

export default function OpenApiClientV3() {
  return (
    <div className="flex flex-col text-sm h-screen">
      <Header />
      <div className="flex mt-10 grow">
        <Sidebar />
        <main className="bg-slate-300 grow p-2">
          <AppRoutes />
        </main>
      </div>
    </div>
  );
}
