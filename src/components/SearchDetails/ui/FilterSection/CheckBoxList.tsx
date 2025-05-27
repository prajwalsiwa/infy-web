import React from "react";
import CheckboxWithLabel from "@/components/ui/FormUI/CheckboxInput";

interface CheckboxListProps {
  title: string;
  items: { id: number; label: string; count: number }[];
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
}

const CheckboxList: React.FC<CheckboxListProps> = ({
  title,
  items,
  selected,
  setSelected,
}) => {
  const toggleSelection = (label: string) => {
    if (selected.includes(label)) {
      setSelected(selected.filter((item) => item !== label));
    } else {
      setSelected([...selected, label]);
    }
  };

  return (
    <div className="flex flex-col gap-2 border-b pb-8">
      <div>
        <span className="font-medium text-base leading-[24.4px]">{title}</span>
      </div>
      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-2">
            <CheckboxWithLabel
              className="!text-[#3B3939]"
              label={`${item.label} (${item.count})`}
              checked={selected.includes(item.label)}
              onChange={() => toggleSelection(item.label)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckboxList;
