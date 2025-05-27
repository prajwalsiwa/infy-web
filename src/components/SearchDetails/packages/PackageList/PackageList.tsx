// import { packageDataList } from "@/lib/constants/packageLists";
import Card from "../../stays/Card/Card";
import ListHeader from "../../ui/ListSection/ListHeader";
import SearchRecommendations from "../../ui/ListSection/SearchRecommendations";
import PopularDestination from "../../ui/ListSection/PopularDestination";
import { usePackageListQuery } from "@/redux/services/packagesApi";
import { useGetTrendsQuery } from "@/redux/services/homeApi";

const options = [
  {
    label: "Recommended",
    value: "1",
  },
];

function PackageList() {
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
    id: recommendation?.id,
    name: recommendation?.title,
    category: recommendation?.user_property?.category,
    photo_url: recommendation?.featured_image_url,
    discount_percentage: 33.33333333333333,
    location: recommendation?.user_property?.location,
    ratings: recommendation?.avg_rating,
    original_price: recommendation?.actual_price,
    days: recommendation?.number_of_days,
    night: recommendation?.number_of_nights,
  }));


  return (
    <div className="lg:pl-8  flex flex-col gap-6 pb-6">
      <div>
        <ListHeader
          itemCount={packageLists?.total}
          itemType={"Packages"}
          sortOptions={options}
        />
        <div className=" grid gap-4">
          {packageLists?.results?.map((packageItem) => {
            return (
              <Card
                key={packageItem?.id}
                id={packageItem?.id}
                hotelImage={packageItem?.featured_image_url}
                title={packageItem?.title}
                location={`${packageItem?.user_property?.location?.city},${packageItem?.user_property?.location?.country}`}
                serviceList={packageItem?.amenities}
                type={packageItem?.package_type?.name}
                rating={packageItem?.avg_rating}
                reviews={packageItem.user_review_count}
                originalPrice={packageItem.price}
                discountedPrice={packageItem.actual_price}
                discountPercent={18}
              />
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <SearchRecommendations
          sectionTitle={"Recommendation based on your search"}
          hotelLists={recommendationList}
          isPackage={true}
        />
        <PopularDestination
          destinations={trendList}
          sectionTitle="Popular Destinations"
        />
      </div>
    </div>
  );
}

export default PackageList;
