import CheckboxWithLabel from "@/components/ui/FormUI/CheckboxInput";
import { useGetAmenitiesListQuery } from "@/redux/services/listYourPropertyApi";
import { useFieldArray, useFormContext } from "react-hook-form";

function Amenities() {
  const { data: amenitesList } = useGetAmenitiesListQuery();
  const { watch } = useFormContext();
  const { append } = useFieldArray({
    name: "amenities",
  });
  watch("amenities");

  const handleCheckChange = (id: number, isChecked: boolean) => {
    append(id);
    console.warn(isChecked);
  };

  return (
    <div className="pt-6">
      <div className="flex flex-col gap-6">
        {amenitesList?.map((amenity) => (
          <div key={amenity.category} className="flex flex-col gap-2">
            <div className="text-gray-dark text-[1rem]">{amenity.category}</div>
            <div className="flex gap-4 p-3 rounded-sm border">
              {amenity?.amenities?.map((item) => (
                <CheckboxWithLabel
                  key={item.id}
                  label={item.title}
                  className="text-[0.875rem]"
                  onChange={(checked) => handleCheckChange(item.id, checked)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Amenities;
