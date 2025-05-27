import { Button } from "@/components/ui/button";
import Input from "@/components/ui/FormUI/Input";
import Label from "@/components/ui/FormUI/Label";

function PayPalPay() {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-medium text-lg">
          Pay with Paypal
        </span>
      <form className="flex flex-col gap-3 pr-32">

        <div className="flex flex-col gap-1">
          <Label className="" htmlFor="email">
            Email Address <span className="text-red-500">*</span>
          </Label>
          <Input
            type="email"
            id="email"
            placeholder="Email Address"
            className="border rounded !bg-white hover:!border-primary"
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label className="" htmlFor="email">
            Name on card <span className="text-red-500">*</span>
          </Label>
          <Input
            type="text"
            id="email"
            placeholder="Name on card"
            className="border rounded !bg-white hover:!border-primary"
          />
        </div>
        <Button className="text-gray-dark bg-white border-gray border w-fit px-7 !py-5">
          Pay Now
        </Button>
      </form>
    </div>
  );
}

export default PayPalPay;
