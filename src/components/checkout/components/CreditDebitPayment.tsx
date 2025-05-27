import { Button } from "@/components/ui/button";
import Input from "@/components/ui/FormUI/Input";
import Label from "@/components/ui/FormUI/Label";

function CreditDebitPayment() {
  return (
    <div className="w-full flex flex-col gap-4">
      <div>
        <span className="font-medium text-lg text-gray-dark">
          Please enter your Card Details
        </span>
      </div>
      <div className="flex flex-col gap-4">
        <div className="relative w-full pr-32  flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <Label htmlFor="retypePassword" className="">
              Card Number <span className="text-red-500">*</span>
            </Label>
            <Input
              type="number"
              className="border rounded w-full bg-white pr-10 hover:!border-primary"
              id="retypePassword"
              placeholder="Card number"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="retypePassword" className="">
              Name on Card <span className="text-red-500">*</span>
            </Label>
            <Input
              type="number"
              className="border rounded w-full bg-white pr-10 hover:!border-primary"
              id="retypePassword"
              placeholder="Name on card"
            />
          </div>
          <div className="flex  justify-between gap-4">
            <div className="flex-grow">
              <Label htmlFor="retypePassword" className="">
                Expiration date <span className="text-red-500">*</span>
              </Label>
              <Input
                type="number"
                className="border rounded w-full bg-white pr-10 hover:!border-primary"
                id="retypePassword"
                placeholder="Name on card"
              />
            </div>
            <div className="w-1/4">
              <Label htmlFor="retypePassword" className="">
                CVV <span className="text-red-500">*</span>
              </Label>
              <Input
                type="number"
                className="border rounded w-full bg-white pr-10 hover:!border-primary"
                id="retypePassword"
                placeholder="CVV"
              />
            </div>
          </div>
        </div>

        <Button className="text-gray-dark w-1/4 bg-white border-gray border px-10 !py-5">
          Pay Now
        </Button>
      </div>
    </div>
  );
}

export default CreditDebitPayment;
