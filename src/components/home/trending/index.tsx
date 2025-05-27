import { trends } from "@/redux/services/homeApi";
import TrendingCard from "./TrendingCard";

interface TrendingDestinationProps {
  trendList?: trends[];
}

const TrendingDestination = ({ trendList }: TrendingDestinationProps) => {
  return (
    <section className="section md:px-24 sm:px-10 px-6  w-full">
      <div className="w-full">
        <h2 className="section-title">Trending Destinations</h2>

        {/* destination grid container */}
        <div className="trending-grid gap-4">
          {trendList?.map((trend, index) => (
            <TrendingCard
              key={index}
              title={trend.location}
              listingNumber={trend.listed_property}
              imgSrc={trend.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingDestination;
