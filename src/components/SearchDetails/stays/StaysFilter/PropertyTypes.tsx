/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import CheckboxList from "../../ui/FilterSection/CheckBoxList";
import { useSearchParams } from "react-router-dom";

interface PropertyTypesProps {
  propertyTypesData: { id: number; name: string; value: number }[];
}

const PropertyTypes: React.FC<PropertyTypesProps> = ({ propertyTypesData }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selected, setSelected] = React.useState<string[]>([]);

  const handleSelectionChange = (newSelected: string[]) => {
    setSelected(newSelected);

    // Clear all property type filters
    searchParams.delete("category");

    // Set selected filters with IDs
    newSelected.forEach((label) => {
      const selectedItem = propertyTypesData.find(item => item.name === label);
      if (selectedItem) {
        searchParams.append("category", selectedItem.id.toString());
      }
    });



    setSearchParams(searchParams);
  };

  React.useEffect(() => {
  searchParams.delete("category");
  setSearchParams(searchParams);
}, []);



  const propertyTypeItems = propertyTypesData.map((item) => ({
    id: item.id,
    label: item.name,
    count: item.value,
  }));

  return (
    <CheckboxList
      setSelected={(value) => {
        const newSelected =
          typeof value === "function" ? value(selected) : value;
        handleSelectionChange(newSelected);
      }}
      title="Property Types"
      items={propertyTypeItems}
      selected={selected}
    />
  );
};

export default PropertyTypes;
