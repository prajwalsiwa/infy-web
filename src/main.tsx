import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@/styles/globals.css";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "./components/ui/toaster";
const clientId =
  "342724163623-fguhqi877tb2dsrit9ui8jc2puftk29b.apps.googleusercontent.com";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <Provider store={store}>
        <App />
        <Toaster />
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
