import React from "react";
import { useNavigate } from "react-router-dom";
// import dummyImage from "@/assets/images/dummyImage.png";

interface HotelDealsSectionProps {
  image?: string;
  city?: string;
  discountPercent?: number;
  dealsCount?: number;
}

const HotelDealsSection: React.FC<HotelDealsSectionProps> = ({
  image,
  city = "Kathmandu",
  discountPercent = 13,
  dealsCount = 13,
}) => {
  const navigate = useNavigate();
  const navigateToHotelDeals = () => {
    navigate(`/hotel-deals/${city.toLowerCase()}`);
  };

  return (
    <div
      onClick={navigateToHotelDeals}
      className="flex flex-col bg-white shadow-md rounded-lg overflow-hidden cursor-pointer"
    >
      <img
        src={image || "https://placehold.co/600x400"}
        alt={`${city} hotel deals`}
        className="w-full h-[13rem] object-cover"
      />
      <div className="flex flex-col justify-center items-center py-3 flex-grow">
        <h3 className="text-primary-dark text-lg font-semibold mb-2">{city}</h3>
        <div className="flex text-gray-700 mt-auto">
          <span className="bg-red-600 text-white text-xs flex items-center justify-center rounded-sm px-2 py-1 mr-2">
            Up to {discountPercent}% off
          </span>
          <p className="text-sm">{dealsCount} ongoing deals</p>
        </div>
      </div>
    </div>
  );
};

export default HotelDealsSection;
