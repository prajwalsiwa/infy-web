import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Icon from "@/components/ui/Icon"; // Assuming your custom Icon component is here

interface ImageCarouselTypes {
  imageSrc: (string | undefined)[];
}

const ImageCarousel = ({ imageSrc }: ImageCarouselTypes) => {
  return (
    <div className=" px-8 gap-14 w-[41rem] overflow-hidden flex flex-col">
      <div className="">
        <Carousel className="w-full flex justify-center items-center max-w-full px-24 ">
          <CarouselContent>
            {imageSrc?.map((image, index) => (
              <CarouselItem
                key={index}
                className=" w-[16rem]  h-[15rem]   rounded-md"
              >
                <img
                  src={image}
                  className="w-full h-full object-cover"
                  alt="hotel"
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Custom Previous Button */}
          <CarouselPrevious className="border-none  flex justify-center items-center ml-4 pl-2 hover:bg-gray-light">
            <Icon
              name="arrow_back_ios"
              className="text-black"
              iconSymbolType="material-icons"
            />
          </CarouselPrevious>

          {/* Custom Next Button */}
          <CarouselNext className="border-none flex justify-center items-center mr-4 pl-1 hover:bg-gray-light">
            <Icon name="arrow_forward_ios" className="text-black" />
          </CarouselNext>
        </Carousel>
      </div>

      {/* Below Images */}
      <div className="flex w-full  -red-700 overflow-auto gap-2">
        {imageSrc?.map((image) => (
          <div className="!w-[9rem] overflow-hidden  h-[6rem] rounded-[0.25rem] bg-gray-200">
            <img
              src={image}
              alt="hotel"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
