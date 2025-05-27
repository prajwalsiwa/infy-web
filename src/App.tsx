import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { initDomToCode } from "dom-to-code";
import { useEffect } from "react";
import {
  useLazyAuthUserProfileQuery,
  useRefreshAuthMutation,
} from "./redux/services/authApi";
import { clearAuth } from "./redux/features/authSlice";

const App = () => {
  const isToken = localStorage.getItem("token");
  const [authUserProfile] = useLazyAuthUserProfileQuery();
  const [refreshAuth] = useRefreshAuthMutation();

  useEffect(() => {
    if (isToken) {
      refreshAuth({ token: isToken }).unwrap();
      authUserProfile();
    } else {
      clearAuth();
      localStorage.removeItem("token");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {process.env.NODE_ENV !== "production" && initDomToCode()}
      <RouterProvider
        router={router}
        future={{
          v7_startTransition: true,
        }}
      />
    </>
  );
};

export default App;
