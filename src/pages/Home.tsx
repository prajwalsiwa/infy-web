import Banner from "@/components/home/banner";
import ChooseUs from "@/components/home/choose-us";
import Deals from "@/components/home/Deals";
import RecommendedHotel from "@/components/home/recommendation/recommended-hotel";
import RecommendedPackage from "@/components/home/recommendation/recommended-hotel";
import RegisterProperty from "@/components/home/register-property";
import TrendingDestination from "@/components/home/trending";
import {
  useGetHotelRecommendationsQuery,
  useGetTrendsQuery,
} from "@/redux/services/homeApi";
import { usePackageListQuery } from "@/redux/services/packagesApi";
export type recommedationType = {
  id: number;
  name: string;
  photo_url: string | null;
  location: { city: string; country: string };
  ratings: number;
  discount_percentage: number;
  original_price: number;
  min_room_price: number;
};
const Home = () => {
  const { data: trendList, isLoading, error } = useGetTrendsQuery();
  const { data: packageLists } = usePackageListQuery();
  const {
    data: recommendations,
    isLoading: isRecommendationsLoading,
    error: isRecommendataionError,
  } = useGetHotelRecommendationsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isRecommendationsLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading trending destinations!</div>;
  if (isRecommendataionError)
    return <div>Error loading trending destinations!</div>;

  const packageRecommendations = packageLists?.results;

  const packageRecommendationList = packageRecommendations?.map(
    (recommendation) => ({
      id: recommendation?.id,
      name: recommendation?.title,
      category: recommendation?.user_property?.category,
      photo_url: recommendation?.featured_image_url,
      discount_percentage: 33.33333333333333,
      location: recommendation?.user_property?.location,
      ratings: recommendation?.avg_rating,
      original_price: recommendation?.actual_price,
      min_room_price: recommendation?.price,
      days: recommendation?.number_of_days,
      night: recommendation?.number_of_nights,
    })
  );
  return (
    <div>
      <Banner />
      <TrendingDestination trendList={trendList} />
      <RecommendedHotel recommendationList={recommendations?.results} />
      <RecommendedPackage
        recommendationList={packageRecommendationList}
        isPackage={true}
      />
      <Deals />
      <ChooseUs />
      <RegisterProperty />
    </div>
  );
};

export default Home;
