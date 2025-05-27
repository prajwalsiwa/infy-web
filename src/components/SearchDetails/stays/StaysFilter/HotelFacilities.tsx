import React from "react";
import CheckboxList from "../../ui/FilterSection/CheckBoxList";
import { useSearchParams } from "react-router-dom";

interface HotelFacilitiesProps {
  facilities: { id: number; category: string; value: number; title:string; search_params: string; }[];
}

const HotelFacilities: React.FC<HotelFacilitiesProps> = ({ facilities }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selected, setSelected] = React.useState<string[]>([]);

  // Initialize selected state from URL on mount
  React.useEffect(() => {
    const selectedIds = searchParams.getAll("amenities").map(Number);
    const selectedLabels = facilities
      .filter((item) => selectedIds.includes(item.id))
      .map((item) => item.title);
    setSelected(selectedLabels);
  }, [facilities, searchParams]);

  const handleSelectionChange = (newSelected: string[]) => {
    setSelected(newSelected);

    // Update search params
    searchParams.delete("amenities");
    facilities
      .filter((item) => newSelected.includes(item.title))
      .forEach((item) => {
        searchParams.append("amenities", item.id.toString());
      });

    setSearchParams(searchParams);
  };

  const facility = facilities.map((item) => ({
    id: item.id,
    label: item.title,
    count: item.value,
  }));

  return (
    <div>
      <CheckboxList
        title="Hotel Facilities"
        items={facility}
        selected={selected}
        setSelected={(value) => {
          if (typeof value === "function") {
            handleSelectionChange(value(selected));
          } else {
            handleSelectionChange(value);
          }
        }}
      />
    </div>
  );
};

export default HotelFacilities;
