/* eslint-disable @typescript-eslint/no-explicit-any */
import HotelRatings from "../../ui/FilterSection/HotelRatings";

interface PackageRatingProps {
  ratingsData: any; // Replace 'any' with the actual type if known
}

function PackageRating({ ratingsData }: PackageRatingProps) {
  return (
    <div>
      <HotelRatings ratingsData={ratingsData} title="Package Rating" />
    </div>
  );
}

export default PackageRating;
