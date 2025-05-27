import React from "react";
import CheckboxList from "../../ui/FilterSection/CheckBoxList";
import { useSearchParams } from "react-router-dom";

interface BedTypesProps {
  bedTypesData: {
    id: number;
    name: string;
    search_params: string;
    value?: number;
  }[];
}

const BedTypes: React.FC<BedTypesProps> = ({ bedTypesData }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selected, setSelected] = React.useState<string[]>([]);

  // Initialize selected state from URL params
  React.useEffect(() => {
    const selectedIds = searchParams.getAll("room_category").map(Number);
    const selectedNames = bedTypesData
      .filter((item) => selectedIds.includes(item.id))
      .map((item) => item.name);
    setSelected(selectedNames);
  }, [bedTypesData, searchParams]);

  const bedTypes = bedTypesData.map((item) => ({
    id: item.id,
    label: item.name,
    count: 0,
  }));

  const handleSelectionChange = (newSelected: string[]) => {
    setSelected(newSelected);

    // Clear old params
    searchParams.delete("room_category");

    // Add selected bed type IDs
    bedTypesData
      .filter((item) => newSelected.includes(item.name))
      .forEach((item) => {
        searchParams.append("room_category", item.id.toString());
      });

    setSearchParams(searchParams);
  };

  return (
    <CheckboxList
      setSelected={(value) => {
        if (typeof value === "function") {
          handleSelectionChange(value(selected));
        } else {
          handleSelectionChange(value);
        }
      }}
      title="Bed Types"
      items={bedTypes}
      selected={selected}
    />
  );
};

export default BedTypes;
