import TrendingCard from "@/components/home/trending/TrendingCard";
import { trends } from "@/redux/services/homeApi";

interface PopularDestinationProps {
  destinations?: trends[];
  sectionTitle: string;
}

function PopularDestination({
  destinations,
  sectionTitle,
}: PopularDestinationProps) {
  return (
    <div className="w-full overflow-hidden">
      <h2 className="section-title">{sectionTitle}</h2>
        <div className="flex space-x-4 overflow-x-auto pb-1 scroll-area">
          {destinations?.map((trend, index) => (
            <div key={index} className="flex-shrink-0 w-[19.37rem]">
              <TrendingCard
                title={trend.location}
                listingNumber={trend.listed_property}
                imgSrc={trend.image}
              />
            </div>
          ))}
        </div>
    </div>
  );
}

export default PopularDestination;
