import { ratingsData } from "@/lib/constants/staysFilter";
import HotelRatings from "../../ui/FilterSection/HotelRatings";

function PackageRating() {
  return (
    <div>
      <HotelRatings ratingsData={ratingsData} title="Package Rating" />
    </div>
  );
}

export default PackageRating;
