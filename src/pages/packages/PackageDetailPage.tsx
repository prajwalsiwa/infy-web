import PackageBooking from "@/components/SearchDetails/packages/PackageDetails/BookingSection.tsx/PackageBooking";
import PackageDetails from "@/components/SearchDetails/packages/PackageDetails/PackageDetails";
import { useGetTrendsQuery } from "@/redux/services/homeApi";
import {
  usePackageDetailQuery,
  usePackageListQuery,
} from "@/redux/services/packagesApi";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

function PackageDetailPage() {
  const { data: packageLists } = usePackageListQuery();
  const {
    data: trendList,
    isLoading: isTrendsListLoading,
    error: isTrendListError,
  } = useGetTrendsQuery();

  if (isTrendsListLoading) <div>Loading Trends...</div>;
  if (isTrendListError) <div>Error Loading Trends...</div>;

  const recommendations = packageLists?.results;

  const recommendationList = recommendations?.map((recommendation) => ({
    id: recommendation?.id ?? 0,
    name: recommendation?.title || "-", // Default value for name
    category: recommendation?.user_property?.category || {
      id: 0,
      name: "Unknown Category",
      icon: null,
      color: "#000000",
    },
    photo_url: recommendation?.featured_image_url || "",
    location: {
      city: recommendation?.user_property?.location?.city || "-",
      country: recommendation?.user_property?.location?.country || "-",
    },
    ratings: recommendation?.avg_rating ?? 0,
    user_review_count: recommendation?.user_property?.user_review_count ?? 0,
    min_room_price: recommendation?.user_property?.min_room_price ?? 0,
    original_price: recommendation?.actual_price ?? 0,
    discount_percentage: 33.33333333333333, // Hardcoded value
    is_favourite: false, // Default value
    amenities: [], // Assuming no amenities provided; update if needed
    days: recommendation?.number_of_days ?? 0,
    night: recommendation?.number_of_nights ?? 0,
  }));

  const { id } = useParams();

  const packageDetail = usePackageDetailQuery(Number(id));

  const detailHeader = {
    image: packageDetail?.data?.featured_image_url,
    title: packageDetail?.data?.title,
    location: `${packageDetail?.data?.user_property?.location?.city}, ${packageDetail?.data?.user_property?.location?.country}`,
    ratings: packageDetail?.data?.avg_rating,
    reviews: packageDetail?.data?.user_review_count,
  };

  const packageDescription = {
    description: packageDetail?.data?.description,
    whatsIncluded: packageDetail?.data?.whats_included?.split("\n"),
    date: {
      start: packageDetail?.data?.booking_start_date
        ? format(
            new Date(packageDetail?.data.booking_start_date),
            "EEEE, MMMM d, yyyy"
          )
        : "-",
      end: packageDetail?.data?.booking_end_date
        ? format(
            new Date(packageDetail?.data?.booking_end_date),
            "EEEE, MMMM d, yyyy"
          )
        : "-",
    },
  };

  const policy = packageDetail?.data?.package_policy?.split("\n");

  const reviews = packageDetail?.data?.user_reviews || [];

  const reviewList = {
    ratings: packageDetail?.data?.avg_rating,
    reviewCount: packageDetail?.data?.user_review_count,
    comment: reviews.map((review) => ({
      photoUrl: review ? review.review_by.profile_picture : "",
      name: `${review.review_by.first_name} ${review.review_by.last_name}`,
      date: `2024-1-2`, // Static date as an example
      rating: review.rating,
      description: review.review, // Correct field name from your data
    })),
  };

  const packagePrice = {
    price: packageDetail?.data?.price,
    discountedPrice: packageDetail?.data?.actual_price,
  };

  return (
    <div className="py-2 grid lg:grid-cols-[70%_30%]">
      <PackageDetails
        trendList={trendList}
        recommendationList={recommendationList}
        detailHeader={detailHeader}
        description={packageDescription}
        policy={policy}
        reviews={reviewList}
      />
      <div className="pl-4 hidden lg:block">
        <PackageBooking price={packagePrice} bookDetail={detailHeader} />
      </div>
    </div>
  );
}

export default PackageDetailPage;
