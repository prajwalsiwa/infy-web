import React from "react";
import ImageSection from "./ImageSection";
import ContentSection from "./ContentSection";
import PriceSection from "./PriceSection";

export interface CardProps {
  id: number;
  hotelImage: string;
  hotelSubImageList?: { id: number; subImage: string }[];
  title: string;
  location: string;

  serviceList: {
    id: number;
    title: string;
    category: string;
    amenities_for: string;
    icon: string | null;
  }[];
  type: string;
  rating: number;
  reviews: number;
  originalPrice: number;
  discountedPrice: number;
  discountPercent?: number;
  isRecommended?: boolean;
}

const Card: React.FC<CardProps> = ({
  id,
  hotelImage,
  hotelSubImageList,
  title,
  location,
  serviceList,
  type,
  rating,
  reviews,
  originalPrice,
  discountedPrice,
  discountPercent,
  isRecommended = true,
}) => {
  return (
    <div className="relative">
      {isRecommended && (
        <div
          className=" -left-3 top-14 absolute   w-7 h-7 -rotate-45 bg-teal-600 rounded-xs "
          style={{
            clipPath: "polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%)",
          }}
        ></div>
      )}
      <div className="relative sm:border z-10  bg-white sm:p-4  ">
        {isRecommended && (
          <div className="absolute top-[1.8rem] z-50 -left-[1.12rem] p-2.5   bg-[#27C29D] text-white text-center w-fit shadow-[4px_4px_15px_rgba(26,35,126,0.2)] ">
            Recommended for you
          </div>
        )}

        {/* Grid Layout for Images, Content, and Price Sections */}
        <div className="flex md:flex-row flex-col justify-between h-full relative z-10">
          <div className="relative  z-10">
            <div className="h-full">
              <ImageSection
                hotelImage={hotelImage}
                hotelSubImageList={hotelSubImageList}
              />
            </div>
          </div>
          <div className="relative flex-grow  z-10">
            <ContentSection
              title={title}
              location={location}
              ratingCount={rating}
              serviceList={serviceList}
              type={type}
            />
          </div>
          <div className="relative  sm:border-l z-10">
            <PriceSection
              id={id}
              rating={rating}
              reviews={reviews}
              originalPrice={originalPrice}
              discountedPrice={discountedPrice}
              discountPercent={discountPercent}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
