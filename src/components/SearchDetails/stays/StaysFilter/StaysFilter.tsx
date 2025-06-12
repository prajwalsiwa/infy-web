import PriceRangeSlider from "../../ui/FilterSection/PriceRangeSlider";
import HotelRatings from "../../ui/FilterSection/HotelRatings";
import RelatedPayments from "./RelatedPayments";
import PropertyTypes from "./PropertyTypes";
// import BedTypes from "./BedTypes";
import HotelFacilities from "./HotelFacilities";
import RoomOffers from "./RoomOffers";
import Accessibility from "./Accessibility";
import SearchSection from "../../ui/FilterSection/SearchSection";
import Icon from "@/components/ui/Icon";
import { useGetFilterListQuery } from "@/redux/services/filterApi";
import { useSearchParams } from "react-router-dom";

interface staysFilterProps {
  isMobile?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

function StaysFilter({ isMobile = false, setIsOpen }: staysFilterProps) {
  const { data } = useGetFilterListQuery();

  const [, setSearchParams] = useSearchParams();
  // Clear filter handler
  const handleClearFilters = () => {
    setSearchParams({}); // clears all URL search params
  };

  const getFilterOptions = (type: string) =>
    data?.side_filters.find((section) => section.type === type)?.options ?? [];

  const getPriceRange = () => {
    const priceOptions = getFilterOptions("Price");
    interface PriceOption {
      search_param: string;
      value: number;
    }

    const min =
      priceOptions.find(
        (item): item is PriceOption => item.search_param === "min_price"
      )?.value ?? 0;
    const max =
      priceOptions.find(
        (item): item is PriceOption => item.search_param === "max_price"
      )?.value ?? 2700;
    return { minPrice: min, maxPrice: max };
  };

  const ratingsData = getFilterOptions("Hotel Rating");
  const paymentMethods = getFilterOptions("Payment Related");
  const propertyTypesData = getFilterOptions("Property Type");
  // const bedTypesData = getFilterOptions("Bed Type");
  const hotelFacilityList = getFilterOptions("Hotel Facilities");
  const roomOffersData = getFilterOptions("Room Offers");
  const accessibilityData = getFilterOptions("Accessibility");
  const { minPrice, maxPrice } = getPriceRange();

  return (
    <div className="filter-section  h-screen overflow-auto sm:h-full w-full flex flex-col gap-6  ">
      <div className="clear mt-10   flex sm:justify-end justify-between items-center sm:items-end">
        {isMobile && setIsOpen && (
          <div onClick={() => setIsOpen(false)}>
            <Icon name="arrow_back" />
          </div>
        )}
        <span
          onClick={handleClearFilters}
          className="text-sky-800 hover:text-sky-900 cursor-pointer font-semibold"
        >
          Clear Filter
        </span>
      </div>
      <div className="w-full">
        <SearchSection title="Search by Hotel Name" />
      </div>
      <div className="price-range flex flex-col gap-2 border-b border-gray-400 pb-8">
        <span className="font-medium text-base leading-[24.4px]">Price</span>
        <PriceRangeSlider
          defaultMinPrice={minPrice}
          defaultMaxPrice={maxPrice}
        />
      </div>
      <div>
        <HotelRatings
          ratingsData={ratingsData.map((item) => ({
            name: Number(item.name) || 0,
            value: item.value,
          }))}
          title="Hotel Ratings"
        />
      </div>
      <div>
        <RelatedPayments
          paymentsData={paymentMethods.filter(
            (
              item
            ): item is {
              title: string;
              value: number;
              search_params: string;
            } => !!item.title
          )}
        />
      </div>
      <div>{/* <Deals deals={dealsData} /> */}</div>
      <div>
        <PropertyTypes
          propertyTypesData={propertyTypesData
            .filter(
              (item): item is { id: number; name: string; value: number } =>
                item.id !== undefined
            )
            .map((item) => ({
              id: item.id as number,
              name: item.name,
              value: item.value,
            }))}
        />
      </div>
      <div>
        {/* <BedTypes
          bedTypesData={bedTypesData
            .filter(
              (
                item
              ): item is {
                id: number;
                name: string;
                search_params: string;
                value: number;
              } => item.id !== undefined && item.search_params !== undefined
            )
            .map((item) => ({
              id: item.id as number,
              name: item.name,
              search_params: item.search_params,
              value: item.value,
            }))}
        /> */}
      </div>
      <div>
        <HotelFacilities
          facilities={hotelFacilityList.filter(
            (
              item
            ): item is {
              id: number;
              category: string;
              value: number;
              title: string;
              search_params: string;
            } => item.id !== undefined
          )}
        />
      </div>
      <div>
        <RoomOffers
          roomOffersData={roomOffersData.filter(
            (
              item
            ): item is {
              id: number;
              category: string;
              title: string;
              value: number;
              search_params: string;
            } => item.id !== undefined
          )}
        />
      </div>
      <div>
        <Accessibility
          accessibilityData={accessibilityData.filter(
            (
              item
            ): item is {
              id: number;
              category: string;
              value: number;
              title: string;
              search_params: string;
            } => item.id !== undefined
          )}
        />
      </div>
    </div>
  );
}

export default StaysFilter;
