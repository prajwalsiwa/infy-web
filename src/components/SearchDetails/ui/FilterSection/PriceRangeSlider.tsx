/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Slider } from "@/components/ui/Slider";
import { useSearchParams } from "react-router-dom";

function PriceRangeSlider({
  defaultMinPrice,
  defaultMaxPrice,
}: {
  defaultMinPrice: number;
  defaultMaxPrice: number;
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [priceRange, setPriceRange] = useState<[number, number]>(() => {
    const min = Number(searchParams.get("min_price")) || defaultMinPrice;
    const max = Number(searchParams.get("max_price")) || defaultMaxPrice;
    return [min, max];
  });

  const handleValueChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);
  };

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("min_price", priceRange[0].toString());
    newParams.set("max_price", priceRange[1].toString());
    setSearchParams(newParams);
  }, [priceRange]);

  const getThumbLeft = (value: number) =>
    `${((value - defaultMinPrice) / (defaultMaxPrice - defaultMinPrice)) * 100}%`;

  return (
    <div className="h-full flex flex-col gap-2">
      <div className="mb-8">
        NRP Rs {priceRange[0]} - Rs {priceRange[1]}
      </div>
      <div className="w-full max-w-md mx-auto">
        <div className="relative ml-4 mr-4">
          <Slider
            value={priceRange}
            onValueChange={handleValueChange}
            min={defaultMinPrice}
            max={defaultMaxPrice}
            step={1}
            className="relative"
          />

          {/* Start Thumb Label */}
          <div
            className=" absolute left-5 mr-4 -top-8 text-xs transition-all"
            style={{ left: getThumbLeft(priceRange[0]) }}
          >
            <span className="text-grey-500 mr-4 left- text-sm leading-5">
              Rs {priceRange[0]}
            </span>
          </div>

          {/* End Thumb Label */}
          <div
            className="w-[5rem] absolute -top-8 text-xs transition-all"
            style={{
              left: getThumbLeft(priceRange[1]),
              transform: "translateX(-50%)",
            }}
          >
            <span className="text-grey-500 text-sm leading-5">
              Rs {priceRange[1]}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PriceRangeSlider;
