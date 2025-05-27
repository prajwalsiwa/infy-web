import HotelCard from "./HotelCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Hotel } from "@/redux/services/homeApi";

interface recommendationListProps {
  recommendationList?: Hotel[];
  isPackage?: boolean;
}

const RecommendedHotel = ({
  recommendationList,
  isPackage = false,
}: recommendationListProps) => {
  return (
    <section className="section md:px-24 sm:px-10 px-14 bg-background-blue w-full ">
      <div className="w-full">
        <h2 className="section-title">
          {" "}
          {isPackage ? "Recommended Package" : "Recommended Hotels"}
        </h2>

        {/* hotel cards grid */}
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {recommendationList?.map((el) => (
              <CarouselItem
                key={el.id}
                className="basis-[100%] md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <HotelCard key={el.id} data={el} isPackage={isPackage} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default RecommendedHotel;
