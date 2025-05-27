import { Button } from "@/components/ui/button";
import Input from "@/components/ui/FormUI/Input";
import Label from "@/components/ui/FormUI/Label";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function VerifyNumber() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const handlePhoneChange = (e: { target: { value: string } }) => {
    const value = e.target.value.replace(/[^\d]/g, ""); 
    setPhoneNumber(value);
  };

  return (
    <div className="">
      <div className="flex flex-col gap-2">
        <span className="font-medium text-xl">Verify your number</span>
        <span className="text-gray">
          We see that your number is not verified till now, you are required to
          verify your number first in order to proceed with booking.
        </span>
      </div>
      <div className="flex flex-col mt-4">
        <Label htmlFor="number">Mobile Number</Label>
        <div className="relative flex items-center">
          <span className="absolute left-3 text-gray-500">+977 |</span>
          <Input
            id="number"
            type="text"
            placeholder="XXXXXXXX"
            className="border rounded !bg-white pl-14 hover:!border-primary"
            value={phoneNumber}
            onChange={handlePhoneChange}
          />
        </div>
      </div>
      <Button
        className="!bg-white text-gray-dark py-5 !border !border-gray-dark mt-6"
        onClick={() => navigate(`../${id}/set-details`)}
      >
        Continue
      </Button>
    </div>
  );
}

export default VerifyNumber;
