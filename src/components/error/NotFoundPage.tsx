import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-w-screen min-h-screen flex items-center justify-center">
      <div className="space-y-3">
        <h1 className="text-darkGray text-6xl font-semibold">404</h1>
        <h3 className="max-w-xl text-darkGray text-3xl font-medium">
          The page you were looking for does not exist.
        </h3>
        <p className="text-mediumGray">
          Please make sure that you have typed correct address.
        </p>

        <Button onClick={() => navigate(-1)}>
          <MdArrowBack />
          <span>Go Back</span>
        </Button>
      </div>
    </div>
  );
};
