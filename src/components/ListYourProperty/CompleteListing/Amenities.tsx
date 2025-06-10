import CheckboxWithLabel from "@/components/ui/FormUI/CheckboxInput";
import { useGetAmenitiesListQuery } from "@/redux/services/listYourPropertyApi";
import { useFormContext } from "react-hook-form";

function Amenities() {
  const { data: amenitesList } = useGetAmenitiesListQuery();
  const { watch, setValue } = useFormContext();

  // ✅ Safely watch and normalize amenities
  const rawAmenities = watch("amenities");
  const selectedAmenities: number[] = Array.isArray(rawAmenities)
    ? rawAmenities.map(Number)
    : [];

  const handleCheckChange = (id: number, isChecked: boolean) => {
    const updatedAmenities = isChecked
      ? [...selectedAmenities, id]
      : selectedAmenities.filter((amenityId) => amenityId !== id);

    setValue("amenities", updatedAmenities);
  };

  return (
    <div className="pt-6">
      <div className="flex flex-col gap-6">
        {amenitesList?.map((amenity) => (
          <div key={amenity.category} className="flex flex-col gap-2">
            <div className="text-gray-dark text-[1rem]">{amenity.category}</div>
            <div className="flex gap-4 p-3 rounded-sm border flex-wrap">
              {amenity?.amenities?.map((item) => (
                <CheckboxWithLabel
                  key={item.id}
                  label={item.title}
                  checked={selectedAmenities.includes(item.id)}
                  onChange={(checked) => handleCheckChange(item.id, checked)}
                  className="text-[0.875rem]"
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
