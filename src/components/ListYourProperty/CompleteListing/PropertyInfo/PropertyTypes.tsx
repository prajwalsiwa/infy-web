import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

interface propertyTypeListProps {
  propertyTypeList: { id: number; name: string; icon: string; color: string }[];
}

function PropertyTypes({ propertyTypeList }: propertyTypeListProps) {
  const { register, setValue, getValues } = useFormContext();
  const [selectedType, setSelectedType] = useState(1);

  const propertyInfoCategory = getValues("propertyInfo.category");
  if (!propertyInfoCategory) {
    setValue("propertyInfo.category", selectedType);
  }

  useEffect(() => {
    // Set the default value for category if it's not already set
    if (!propertyInfoCategory) {
      setValue("propertyInfo.category", selectedType);
    }
  }, [propertyInfoCategory, selectedType, setValue]);

  const handleSelectType = (id: number) => {
    setSelectedType(id);
    setValue("propertyInfo.category", id);
  };

  return (
    <div className="flex flex-col w-full gap-2">
      <span className="text-gray-dark font-normal">Property Type</span>
      <div className="flex gap-2 flex-wrap w-full md:flex-row flex-col">
        {propertyTypeList?.map((property) => (
          <div
            key={property.id}
            onClick={() => handleSelectType(property.id)} // Set the type when clicked
            className={`flex cursor-pointer  ${
              selectedType === property.id ? "bg-primary-light" : "bg-none"
            } hover:bg-primary-light hover:text-primary justify-center gap-1.5 items-center w-[6.88rem] h-[3.77rem] border rounded-md flex-col overflow-hidden`}
          >
            <img
              src={property.icon}
              alt="apartment"
              style={{ fill: property.color }}
            />
            <span
              className={`text-gray !text-xs ${
                selectedType === property.id ? "text-primary" : ""
              }`}
            >
              {property.name}
            </span>
          </div>
        ))}
      </div>

      <input {...register("propertyInfo.category")} type="hidden" />
    </div>
  );
}

export default PropertyTypes;
