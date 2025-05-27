import HotelDealsSection from "./HotelDealsSection";

const dummyDeals = [
  { city: "Kathmandu", discountPercent: 15, dealsCount: 10, },
  { city: "Pokhara", discountPercent: 20, dealsCount: 5 },
  { city: "Lalitpur", discountPercent: 10, dealsCount: 7 },
  { city: "Bhaktapur", discountPercent: 18, dealsCount: 12 },
];

function HotelDeals() {
  return (
    <div className="flex gap-4">
      {dummyDeals.map(({ city, discountPercent, dealsCount }, index) => (
        <HotelDealsSection
          key={index}
          city={city}
          discountPercent={discountPercent}
          dealsCount={dealsCount}
        />
      ))}
    </div>
  );
}

export default HotelDeals;
