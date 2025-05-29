/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetTopDealsQuery } from "@/redux/services/dealsApi";
import HotelDealsSection from "./HotelDealsSection";

const dummyDeals = [
  { city: "Kathmandu", discountPercent: 15, dealsCount: 10 },
  { city: "Pokhara", discountPercent: 20, dealsCount: 5 },
  { city: "Lalitpur", discountPercent: 10, dealsCount: 7 },
  { city: "Bhaktapur", discountPercent: 18, dealsCount: 12 },
];

function HotelDeals() {
  const { data: topDeals, isLoading } = useGetTopDealsQuery();

  function convertResultsToDummyDeals(results: any[]): any[] {
    return results.map((item) => ({
      city: item.city,
      discountPercent: item.max,
      dealsCount: item.count,
      imageUrl: item.image_url,
    }));
  }

  const topDealsList = convertResultsToDummyDeals(
    topDeals?.results || dummyDeals
  );

  if (isLoading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="flex gap-4">
      {isLoading && <div className="text-center text-gray-500">Loading...</div>}
      {topDealsList.length === 0 ? (
        <div className="text-center text-gray-500">No deals available</div>
      ) : (
        topDealsList.map((deals, index) => (
          <HotelDealsSection
            key={index}
            image={deals.imageUrl}
            city={deals.city}
            discountPercent={deals.discountPercent}
            dealsCount={deals.dealsCount}
          />
        ))
      )}
    </div>
  );
}

export default HotelDeals;
