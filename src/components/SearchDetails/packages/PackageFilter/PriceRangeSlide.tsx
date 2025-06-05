import PriceRangeSlider from "@/components/SearchDetails/ui/FilterSection/PriceRangeSlider";

interface PriceRangeSlideProps {
  defaultMaxPrice: number;
  defaultMinPrice: number;
}

function PriceRangeSlide({ defaultMaxPrice, defaultMinPrice }: PriceRangeSlideProps) {
  return (
    <div>
      <div className="text-gray-dark font-medium text-base">Price</div>
      <PriceRangeSlider
        defaultMinPrice={defaultMinPrice}
        defaultMaxPrice={defaultMaxPrice}
      />
    </div>
  );
}

export default PriceRangeSlide;
