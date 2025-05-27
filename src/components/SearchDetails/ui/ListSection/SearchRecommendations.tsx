import HotelCard from "@/components/home/recommendation/recommended-hotel/HotelCard";
import { Hotel } from "@/redux/services/homeApi";

interface SearchRecommendationsProps {
  sectionTitle: string;
  hotelLists?: Hotel[];
  isPackage?: boolean;
}

function SearchRecommendations({
  sectionTitle,
  hotelLists,
  isPackage = false,
}: SearchRecommendationsProps) {
  return (
    <div className="w-full overflow-hidden">
      <h2 className="section-title">{sectionTitle}</h2>
      <div className="flex gap-2 w-full overflow-x-auto scroll-area pb-1">
        {hotelLists?.map((hotel) => {
          return (
            <div
              key={hotel.id}
              className="flex-shrink-0 w-[19.37rem] border rounded-lg hover:-translate-y-[2px] hover:shadow-md duration-300 "
            >
              <HotelCard data={hotel} isPackage={isPackage} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SearchRecommendations;
