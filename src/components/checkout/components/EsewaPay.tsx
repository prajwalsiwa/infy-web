import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function EsewaPay() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <span className="text-gray-dark">
          You will be redirected to your e-Sewa account, Please login and follow
          the to required process to complete your payment
        </span>
        <span className=" text-grey-800">
          NPR 3485 will be deducted from your account, Please proceed to pay
          with e-Sewa.{" "}
        </span>
      </div>
      <Button
        className="text-gray-dark bg-white border-gray border w-fit px-7 !py-5"
        onClick={() => navigate("../booking-confirmed")}
      >
        {" "}
        Proceed
      </Button>
    </div>
  );
}

export default EsewaPay;
