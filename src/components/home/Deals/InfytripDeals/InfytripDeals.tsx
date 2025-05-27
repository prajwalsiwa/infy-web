import InfytripDealsCard from "./InfytripDealsCard";

const dummyCoupons = [
  { discountPercent: 7, minSpend: 250 },
  { discountPercent: 10, minSpend: 500 },
  { discountPercent: 15, minSpend: 1000 },
  { discountPercent: 20, minSpend: 2000 },
];

// Map discount ranges to bg and text colors
const colorMap = (discount: number) => {
  if (discount >= 20) return { bg: "bg-red-100", text: "text-red-700" };
  if (discount >= 15) return { bg: "bg-yellow-100", text: "text-yellow-700" };
  if (discount >= 10) return { bg: "bg-green-100", text: "text-green-700" };
  return { bg: "bg-teal-100", text: "text-teal-700" };
};

function InfytripDeals() {
  const handleGetCoupon = (discount: number) => {
    alert(`Coupon for ${discount}% off applied!`);
  };

  return (
    <div className="flex gap-4 flex-wrap">
      {dummyCoupons.map(({ discountPercent, minSpend }, idx) => {
        const { bg, text } = colorMap(discountPercent);
        return (
          <InfytripDealsCard
            key={idx}
            discountPercent={discountPercent}
            minSpend={minSpend}
            onGetCoupon={() => handleGetCoupon(discountPercent)}
            bgColor={bg}
            textColor={text}
          />
        );
      })}
    </div>
  );
}

export default InfytripDeals;
