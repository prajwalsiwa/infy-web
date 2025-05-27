import MapView from "./MapView";
import PackageRating from "./PackageRating";
import PackageTypes from "./PackageTypes";
import PriceRangeSlide from "./PriceRangeSlide";
import RelatedPayments from "./RelatedPayments";
import SearchSection from "./SearchSection";

function PackageFilter() {
  return (
    <div className="gap-6 flex flex-col pr-3">
      <MapView />
      <SearchSection />
      <PriceRangeSlide />
      <PackageRating />
      <RelatedPayments />
      <PackageTypes />
    </div>
  );
}

export default PackageFilter;
