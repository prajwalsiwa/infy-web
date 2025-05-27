import { Button } from "@/components/ui/button";

function KhaltiPay() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-3">
        <span className="font-medium text-lg">
          Pay with existing Khalti account
        </span>
        <span className="text-gray-dark">
          Khalti ID 98******** will be charged
        </span>
      </div>
      <Button className="text-gray-dark bg-white border-gray border w-fit px-7 !py-5"> Pay Now</Button>
    </div>
  );
}

export default KhaltiPay;
