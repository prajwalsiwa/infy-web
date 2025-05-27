import React from "react";
import Icon from "@/components/ui/Icon";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { useCheckPackageAvailabilityMutation } from "@/redux/services/packagesApi";
import { format } from "date-fns";

interface PriceSectionProps {
  id: number;
  rating: number;
  reviews: number;
  originalPrice: number;
  discountedPrice: number;
  discountPercent?: number;
}

const PriceSection: React.FC<PriceSectionProps> = ({
  id,
  rating,
  reviews,
  originalPrice,
  discountedPrice,
  discountPercent,
}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const ifStays = pathname === "/search/hotel-list";

  const [checkPackageAvailability] = useCheckPackageAvailabilityMutation();

  const checkDate = format(new Date(), "yyyy-MM-dd");

  const handleClick = () => {
    // Navigate based on the availability check
    if (ifStays) {
      navigate(`/search/hotel-view/${id}`);
    } else {
      checkPackageAvailability({
        packageId: Number(id),
        number_of_guests: 0,
        date: checkDate,
      }).unwrap();
      navigate(`/search/package-view/${id}`);
    }
  };

  return (
    <div className="right p-2   sm:px-4 sm:justify-between sm:flex-col items-start justify-start w-full h-full sm:items-center flex">
      <div className="flex w-full h-fit items-center justify-start">
        <div className="rating h-fit w-fit text-sm flex gap-1 px-2 sm:text-lg items-center justify-center rounded-md bg-yellow-600 text-white">
          <Icon name="star" iconSymbolType="material-icons" className="text-sm sm:text-base" />
          {rating}
        </div>
        <div className="reviews flex  items-center text-sm  w-fit">
          <span className="font-extrabold mb-2 flex mx-1 text-sm leading-none sm:text-2xl">
            .
          </span>
          <span className="flex sm:text-[1rem] text-sm text-grey-600">
            {reviews} Reviews
          </span>
        </div>
      </div>
      <div className="flex  flex-col w-full">
        <div className="price w-full  gap-1 pb-2  flex h-full  flex-col justify-end items-end px-2">
          <div className="bg-green-100 flex text-xs sm:text-base  justify-end items-end text-green-500 font-bold w-fit rounded-lg px-3 py-1">
            {discountPercent}% Off
          </div>
          <div className="w-full  ">
            <div className="flex items-center gap-1  justify-end">
              <span className="text-grey-700 line-through text-md font-bold">
                Rs. {originalPrice}
              </span>
              <span className="text-primary-dark w-full text-xl font-bold">
                Rs. {discountedPrice}
              </span>
            </div>
            <span className="text-gray-light w-full justify-end flex">
              /room per night
            </span>
          </div>
        </div>
        <div className="w-full justify-end flex">
          <Button
            className="bg-[#27C29D] font-bold sm:p-7 w-[8rem] py-6 sm:w-full"
            icon={<Icon name="arrow_forward_ios" className="!text-sm" />}
            iconPosition="right"
            onClick={handleClick}
          >
            Show Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PriceSection;
