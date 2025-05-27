/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import CheckboxList from "../../ui/FilterSection/CheckBoxList";
import { useSearchParams } from "react-router-dom";

interface AccessibilityProps {
  accessibilityData:{ id: number; category: string; value: number; title:string; search_params: string; }[];
}

const Accessibility: React.FC<AccessibilityProps> = ({ accessibilityData }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selected, setSelected] = React.useState<string[]>([]);

  const accessibilityItems = accessibilityData.map((item) => ({
    id: item.id,
    label: item.title,
    count: item.value,
  }));

  // Initialize selected from URL params
  React.useEffect(() => {
    const selectedIds = searchParams.getAll("amenities").map(Number);
    const selectedLabels = accessibilityItems
      .filter((item) => selectedIds.includes(item.id))
      .map((item) => item.label);
    setSelected(selectedLabels);
  }, [accessibilityData, searchParams]);

  const handleSelectionChange = (newSelected: string[]) => {
    setSelected(newSelected);

    // Update "amenities" search param
    searchParams.delete("amenities");
    accessibilityItems
      .filter((item) => newSelected.includes(item.label))
      .forEach((item) => {
        searchParams.append("amenities", item.id.toString());
      });

    setSearchParams(searchParams);
  };

  return (
    <CheckboxList
      title="Accessibility"
      items={accessibilityItems}
      selected={selected}
      setSelected={(value) => handleSelectionChange(value as string[])}
    />
  );
};

export default Accessibility;
