import { useEffect, useState } from "react";
import Label from "@/components/ui/FormUI/Label";
import Input from "@/components/ui/FormUI/Input";
import LocationMap from "./LocationMap";
import { FieldErrors, useFormContext } from "react-hook-form";

// Unified type definition
export type Location = {
  city: string;
  streetName: string;
  streetNo: number;
  country: string;
  postalCode: string;
  chowk: string;
  latitude: number;
  longitude: number;
};

interface LocationProps {
  errors: FieldErrors<{
    city: string;
    streetName: string;
    country: string;
    streetNo: string;
    chowk: string;
  }>;
}

function Location({ errors }: LocationProps) {
  const { watch, setValue } = useFormContext();
  const [locationDetails, setLocationDetails] = useState<Location>({
    city: "",
    streetName: "",
    streetNo: 0,
    country: "",
    postalCode: "",
    chowk: "",
    latitude: 0,
    longitude: 0,
  });

  // Update form state only when locationDetails changes
  useEffect(() => {
    setValue("location", locationDetails);
  }, [locationDetails, setValue]);

  watch("location"); // For debugging

  // Handle changes to the inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    let formattedValue = value;

    if (
      (name === "latitude" || name === "longitude") &&
      /^-?\d*\.?\d*$/.test(value)
    ) {
      const floatValue = parseFloat(value);
      if (!isNaN(floatValue)) {
        formattedValue = floatValue.toFixed(4);
      }
    }

    setLocationDetails((prevDetails) => ({
      ...prevDetails,
      [name]: formattedValue,
    }));
  };

  return (
    <div>
      <div className="flex flex-col gap-2">
        <span className="text-primary-dark font-medium text-[1rem]">
          Property Location
        </span>
        
      </div>
      <div>
        <LocationMap
          mapPosition={[27.7172, 85.324]} // Default position (e.g., Kathmandu)
          locationDetails={locationDetails}
          setLocationDetails={setLocationDetails}
        />
      </div>
      <div className="mt-4 flex flex-col gap-4">
        <div className="flex flex-wrap xl:flex-nowrap w-full gap-2">
          <div className="flex flex-col gap-1 w-1/2">
            <Label htmlFor="city" required>
              Suburb/City
            </Label>
            <Input
              type="text"
              className="border rounded-sm w-full"
              name="city"
              value={locationDetails.city}
              onChange={handleChange}
            />
            {errors?.city && (
              <p className="error text-red-500">{errors?.city.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-1 w-2/4">
            <Label htmlFor="streetName" required>
              Street Name
            </Label>
            <Input
              type="text"
              className="border rounded-sm"
              name="streetName"
              value={locationDetails.streetName}
              onChange={handleChange}
            />
            {errors?.streetName && (
              <p className="error text-red-500">{errors?.streetName.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="streetNo" required>
              Street No
            </Label>
            <Input
              type="text"
              className="border rounded-sm"
              name="streetNo"
              value={locationDetails.streetNo}
              onChange={handleChange}
            />
            {errors?.streetNo && (
              <p className="error text-red-500">{errors?.streetNo.message}</p>
            )}
          </div>
        </div>
        <div className="flex flex-wrap w-full gap-2">
          <div className="flex flex-col gap-1 w-full">
            <Label htmlFor="country" required>
              Country
            </Label>
            <Input
              type="text"
              className="border rounded-sm w-full"
              name="country"
              value={locationDetails.country}
              onChange={handleChange}
            />
            {errors?.country && (
              <p className="error text-red-500">{errors?.country.message}</p>
            )}
          </div>
          <div className="flex justify-between w-full gap-2">
            <div className="flex flex-col gap-1 w-full">
              <Label htmlFor="postalCode">ZIP / Postal Code (optional)</Label>
              <Input
                type="text"
                className="border rounded-sm w-full"
                name="postalCode"
                value={locationDetails.postalCode}
                onChange={handleChange}
              />
            </div>
            <div className="latitude flex flex-col gap-1">
              <Label htmlFor="latitude">Latitude</Label>
              <Input
                type="text"
                className="border rounded-sm w-full"
                name="latitude"
                value={locationDetails.latitude}
                onChange={handleChange}
              />
            </div>
            <div className="longitue">
              <Label htmlFor="longitude">Longitude</Label>
              <Input
                type="text"
                className="border rounded-sm w-full"
                name="longitude"
                value={locationDetails.longitude}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="flex flex-col gap-1 w-full">
            <Label htmlFor="chowk" required>
              Building, Floor, Unit number or Additional Information
            </Label>
            <Input
              type="text"
              className="border rounded-sm w-full"
              name="chowk"
              value={locationDetails.chowk}
              onChange={handleChange}
            />
            {errors?.chowk && (
              <p className="error text-red-500">{errors?.chowk.message}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Location;
