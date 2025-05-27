"use client";

import { useState, useEffect } from "react";
import Icon from "@/components/ui/Icon";
import CheckboxInput from "@/components/ui/FormUI/CheckboxInput";
import { useSearchParams } from "react-router-dom";

interface HotelRatingsProps {
  ratingsData: { name: number; value: number }[];
  title: string;
}

const HotelRatings = ({ ratingsData, title }: HotelRatingsProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Parse existing ratings from URL
  const initialSelected = searchParams
    .get("ratings")
    ?.split(",")
    .map((r) => parseInt(r)) || [];

  const [checked, setChecked] = useState<boolean[]>(
    ratingsData.map((data) => initialSelected.includes(data.name))
  );
  useEffect(() => {
    const selectedRatings = ratingsData
      .map((data, index) => (checked[index] ? data.name : null))
      .filter((val): val is number => val !== null);
  
    const newSearchParams = new URLSearchParams(searchParams.toString());
  
    if (selectedRatings.length > 0) {
      newSearchParams.set("ratings", selectedRatings.join(","));
    } else {
      newSearchParams.delete("ratings");
    }
  
    // Only update searchParams if something actually changed
    if (searchParams.get("ratings") !== newSearchParams.get("ratings")) {
      setSearchParams(newSearchParams);
    }
  }, [checked, ratingsData, searchParams, setSearchParams]);
  
  const handleChange = (index: number) => {
    const updatedChecked = [...checked];
    updatedChecked[index] = !updatedChecked[index];
    setChecked(updatedChecked);
  };

  return (
    <div className="Rating flex flex-col border-b pb-8">
      <span className="font-medium text-base leading-[24.4px]">{title}</span>
      <div className="flex flex-col">
        {ratingsData.slice().reverse().map((ratingData) => (
          <div key={ratingData.name} className="flex items-center gap-2">
            <CheckboxInput
              checked={checked[ratingData.name]}
              onChange={() => handleChange(ratingData.name)}
              className=""
            />
            <div className="flex items-center gap-1">
              {Array.from({ length: ratingData.name }).map((_, i) => (
                <div>
                  <Icon
                    key={i}
                    name="star"
                    className="text-yellow-600"
                    iconSymbolType="material-icons"
                  />

                </div>
              ))}
              {ratingData.name == 0 && (
                <span className="!text-[#3B3939]">No Rating</span>
              )}
              <span className="!text-[#3B3939]">({ratingData.value})</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelRatings;
