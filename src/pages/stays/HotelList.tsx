/* eslint-disable @typescript-eslint/no-unused-vars */
import StaysCard from "@/components/SearchDetails/stays/Card/Card";
import { Button } from "@/components/ui/button";
import SearchRecommendations from "@/components/SearchDetails/ui/ListSection/SearchRecommendations";
import PopularDestination from "@/components/SearchDetails/ui/ListSection/PopularDestination";
import StaysFilter from "@/components/SearchDetails/stays/StaysFilter/StaysFilter";
import MapSection from "@/components/SearchDetails/ui/FilterSection/MapSection";
import ListHeader from "@/components/SearchDetails/ui/ListSection/ListHeader";
import {
  useGetHotelRecommendationsQuery,
  useGetTrendsQuery,
} from "@/redux/services/homeApi";
import CardSkeleton from "@/components/SearchDetails/stays/Card/CardSkeleton";

import { useHotelListQuery } from "@/redux/services/staysApi";
import { useSearchParams } from "react-router-dom";

const options = [
  {
    label: "Recommended",
    value: "1",
  },
];

function Stays() {
  const [searchParams] = useSearchParams();
  const queryParams = Object.fromEntries(searchParams.entries());

  const {
    data: hotelList,
    isLoading: isHotelsLoading,
    error: hotelError,
  } = useHotelListQuery(queryParams);

  const {
    data: trendList,
    isLoading: isTrendsLoading,
    error: trendsError,
  } = useGetTrendsQuery();

  const {
    data: recommendations,
    isLoading: isRecommendationsLoading,
    error: recommendationsError,
  } = useGetHotelRecommendationsQuery();

  const recommendationList = recommendations?.results ?? [];
  const hotelListResults = hotelList?.results ?? [];

  const staysCardList = hotelListResults.map((hotel) => ({
    id: hotel.id ?? 0,
    hotelImage: hotel?.photo_url,
    title: hotel.name,
    location: `${hotel.location.city}, ${hotel.location.country}`,
    serviceList:
      hotel?.amenities?.map((service) => ({
        id: service.id,
        title: service.title,
        category: service.category,
        amenities_for: service.amenities_for,
        icon: service.icon,
      })) ?? [],
    type: hotel.category.name,
    rating: hotel.ratings ?? 0,
    reviews: hotel.user_review_count ?? 0,
    originalPrice: hotel.original_price ?? 0,
    discountedPrice: hotel.min_room_price ?? 0,
    discountPercent: hotel.discount_percentage
      ? Number(hotel.discount_percentage.toFixed())
      : 0,
  }));

  const handleSortChange = () => {};

  return (
    <div className="w-full">
      <div className="left-side hotels pr-2 grid lg:grid-cols-[25%_75%] grid-cols-1 h-full">
        {/* Left Filters and Map */}
        <div className="left lg:flex flex-col gap-6 w-full hidden pr-3">
          <MapSection />
          <StaysFilter />
        </div>

        {/* Right Main Content */}
        <div className="xl:pl-12 md:pl-4 w-full">
          <ListHeader
            itemCount={recommendationList?.length}
            itemType="Stays"
            sortOptions={options}
            onSortChange={handleSortChange}
          />
          <div className="flex flex-col gap-6 w-full">
            {/* Stays Card Section */}
            <div className="relative flex flex-col gap-4 w-full">
              <div className="flex flex-col gap-2 w-full">
                {isHotelsLoading ? (
                  <>
                    <CardSkeleton />
                    <CardSkeleton />
                    <CardSkeleton />
                    <CardSkeleton />
                  </>
                ) : staysCardList.length > 0 ? (
                  staysCardList.map((hotel) => (
                    <StaysCard
                      key={hotel.id}
                      id={hotel.id}
                      hotelImage={hotel.hotelImage}
                      title={hotel.title}
                      location={hotel.location}
                      serviceList={hotel.serviceList}
                      type={hotel.type}
                      rating={hotel.rating}
                      reviews={hotel.reviews}
                      originalPrice={hotel.originalPrice}
                      discountedPrice={hotel.discountedPrice}
                      discountPercent={hotel.discountPercent}
                    />
                  ))
                ) : (
                  <div className="text-gray-500 text-center py-6">
                    No stays found.
                  </div>
                )}
              </div>

              <div>
                <Button
                  className="w-full bg-white border rounded-sm border-primary-dark text-primary-dark"
                  padding="py-5"
                >
                  Show more Results
                </Button>
              </div>
            </div>

            {/* Recommendations and Destinations */}
            <div className="flex flex-col gap-6">
              <div>
                <SearchRecommendations
                  sectionTitle="Recommendation based on your search"
                  hotelLists={recommendationList}
                />
              </div>
              <div className="mb-8">
                <PopularDestination
                  destinations={trendList}
                  sectionTitle="Popular Destination"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stays;
