// components/RoomOffers.tsx
import React from "react";
import CheckboxList from "../../ui/FilterSection/CheckBoxList";
import { useSearchParams } from "react-router-dom";

interface RoomOffersProps {
  roomOffersData: { id: number; category: string; title: string; value: number; search_params: string }[];
}

const RoomOffers: React.FC<RoomOffersProps> = ({ roomOffersData }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selected, setSelected] = React.useState<string[]>([]);

  const roomOffers = roomOffersData.map((item) => ({
    id: item.id,
    label: item.title,
    count: item.value,
  }));

  

  const handleSelectionChange = (newSelected: string[]) => {
    setSelected(newSelected); 

       // Update search params
    searchParams.delete("amenities");
    roomOffersData
      .filter((item) => newSelected.includes(item.title))
      .forEach((item) => {
        searchParams.append("amenities", item.id.toString());
      });

    setSearchParams(searchParams);
  }

  return <CheckboxList setSelected={(value) => handleSelectionChange(value as string[])} title="Room Offers" items={roomOffers} selected={selected} />;
};

export default RoomOffers;
