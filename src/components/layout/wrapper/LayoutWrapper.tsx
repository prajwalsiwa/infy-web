import { Outlet } from "react-router-dom";
import Header from "../header";
import Footer from "../footer";

const LayoutWrapper = () => {
  return (
    <main className="relative w-screen h-screen  flex flex-col overflow-auto">
      <Header />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
};

export default LayoutWrapper;
