import MapView from "./MapView";
import PackageRating from "./PackageRating";
// import PackageTypes from "@/components/SearchDetails/stays/StaysFilter/PackageTypes";
import PriceRangeSlide from "./PriceRangeSlide";
import RelatedPayments from "@/components/SearchDetails/stays/StaysFilter/RelatedPayments";
import SearchSection from "./SearchSection";
import { useGetFilterListQuery } from "@/redux/services/filterApi";

function PackageFilter() {
  const { data } = useGetFilterListQuery();

  const getFilterOptions = (type: string) =>
    data?.side_filters.find((section) => section.type === type)?.options ?? [];

  const getPriceRange = () => {
    const priceOptions = getFilterOptions("Price");
    const min =
      priceOptions.find((item) => item.search_param === "min_price")?.value ??
      0;
    const max =
      priceOptions.find((item) => item.search_param === "max_price")?.value ??
      2700;
    return { minPrice: min, maxPrice: max };
  };

  const { minPrice, maxPrice } = getPriceRange();

  const ratingsData = getFilterOptions("Hotel Rating");
  const paymentMethods = getFilterOptions("Payment Related");
  // const propertyTypesData = getFilterOptions("Property Type");

  return (
    <div className="gap-6 flex flex-col pr-3">
      <MapView />
      <SearchSection title="Search by Hotel Name" />
      <div className="price-range flex flex-col gap-2 border-b border-gray-400 pb-4">
        <span className="font-medium text-base leading-[24.4px]">Price</span>
        <PriceRangeSlide
          defaultMinPrice={minPrice}
          defaultMaxPrice={maxPrice}
        />
      </div>
      <PackageRating
        ratingsData={ratingsData.map((item) => ({
          name: Number(item.name) || 0,
          value: item.value,
        }))}
      />
      <RelatedPayments
        paymentsData={paymentMethods.filter(
          (
            item
          ): item is { title: string; value: number; search_params: string } =>
            !!item.title
        )}
      />
      {/* <PackageTypes
        propertyTypesData={propertyTypesData
          .filter(
            (item): item is { id: number; name: string; value: number } =>
              item.id !== undefined
          )
          .map((item) => ({
            id: item.id,
            name: item.name,
            value: item.value,
          }))}
      /> */}
    </div>
  );
}

export default PackageFilter;
