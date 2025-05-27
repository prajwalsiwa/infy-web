import Header from "@/components/layout/header";
import MultiMarkerMap from "@/components/Map/MultiMarkerMap";
import StaysFilter from "@/components/SearchDetails/stays/StaysFilter/StaysFilter";
import SearchBox from "@/components/SearchDetails/ui/SearchBox";
import { useHotelListQuery } from "@/redux/services/staysApi";
import { useSearchParams } from "react-router-dom";

const searchboxTabList = [
  { id: 1, label: "Stays", value: "stays" },
  { id: 2, label: "Packages", value: "packages" },
];

function MapView() {
  const [searchParams] = useSearchParams();
  const queryParams = Object.fromEntries(searchParams.entries());
  const { data: hotelList } = useHotelListQuery(queryParams);

  const hotelListResults = hotelList?.results ?? [];
  const staysCardList = hotelListResults.map((hotel) => ({
    id: hotel.id ?? 0,
    hotelImage: hotel?.photo_url,
    latitude: hotel.location.latitude,
    longitude: hotel.location.longitude,
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

  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col">
      {/* Header */}
      <Header />

      {/* SearchBox */}
      <div className="w-full py-2 bg-sky-900 hidden sm:flex justify-center items-center">
        <SearchBox tabList={searchboxTabList} />
      </div>

      {/* Map + Filter */}
      <div className="relative flex-1">
        {/* Map Container only takes remaining height */}
        <div className="absolute inset-0 z-10">
          <MultiMarkerMap staysCardList={staysCardList} />
        </div>

        {/* Filter Box */}
        <div
          className="absolute top-4 left-4 z-20 bg-white shadow-md rounded-lg p-4 w-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
          style={{ maxHeight: "calc(100vh - 17rem)" }}
        >
          <StaysFilter />
        </div>
      </div>
    </div>
  );
}

export default MapView;
