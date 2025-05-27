import { createBrowserRouter } from "react-router-dom";
import { routes } from "./routes";
import { NotFoundPage } from "@/components/error/NotFoundPage";
import { ErrorPage } from "@/components/error/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: routes,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
