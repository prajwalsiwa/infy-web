import { useNavigate } from "react-router-dom";
import { MdHome, MdRefresh } from "react-icons/md";
import { Button } from "../ui/button";

export const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-w-screen min-h-screen flex items-center justify-center">
      <div className="space-y-3">
        <h1 className="text-darkGray text-4xl font-semibold">
          Oops! Error Occured
        </h1>
        <p className="text-mediumGray max-w-xl">
          Looks like you have encountered an error. Try refreshing the page or
          if the error still persists contact your service provider.
        </p>

        <div className="space-x-3">
          <Button
            onClick={() => {
              window.location.reload();
            }}
          >
            <MdRefresh />
            <span>Refresh Page</span>
          </Button>
          <Button variant="secondary" onClick={() => navigate("/")}>
            <MdHome />
            <span>Back to Home</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
