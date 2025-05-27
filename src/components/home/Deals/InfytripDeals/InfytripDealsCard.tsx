import { Button } from "@/components/ui/button";

interface InfytripDealsCardProps {
  discountPercent: number;
  minSpend: number;
  onGetCoupon?: () => void;
  bgColor?: string; // Tailwind bg class string
  textColor?: string; // Tailwind text color class string
}

function InfytripDealsCard({
  discountPercent,
  minSpend,
  onGetCoupon,
  bgColor = "bg-teal-100",
  textColor = "text-teal-700",
}: InfytripDealsCardProps) {
  return (
    <div className="w-[19rem] h-[18rem] border border-grey-100 rounded-md overflow-hidden shadow-sm flex flex-col">
      <div className={`w-full h-[13rem] flex justify-center items-center ${bgColor}`}>
        <p className={`text-[4rem] font-bold select-none ${textColor}`}>
          {discountPercent}%
        </p>
      </div>
      <div className="flex flex-col justify-center items-center px-4 py-3 gap-3 flex-grow">
        <div className="text-center text-gray-800">
          <p className="font-semibold">{discountPercent}% off</p>
          <p className="text-sm">Min. spend NRP{minSpend}</p>
        </div>
        <Button
          className="w-full rounded-sm"
          aria-label={`Get ${discountPercent}% coupon`}
          onClick={onGetCoupon}
        >
          Get Coupon
        </Button>
      </div>
    </div>
  );
}

export default InfytripDealsCard;
