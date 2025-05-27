import { Outlet } from "react-router-dom";
import Header from "../header";

function CheckoutWrapper() {
  return (
    <main className="w-screen h-screen flex flex-col gap-12 overflow-auto">
      <Header />
      <div className="flex-grow container">
        <Outlet />
      </div>
    </main>
  );
}

export default CheckoutWrapper;
