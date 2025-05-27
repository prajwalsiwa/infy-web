import Map from "@/components/Map/Map";
import { useEffect, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

type Attraction = {
  id: number;
  name: string;
  distance: number | string; // Distance can be a string (e.g., "5 km") or number
  latitude: number;
  longitude: number;
};

function OtherInfo() {
  const { register, watch, setValue, getValues } = useFormContext(); // Add setValue to manipulate form data
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const { append } = useFieldArray({
    name: "otherInfo.nearby_attractions",
  });

  watch("otherInfo");

  const handleRemove = (id: number) => {
    setAttractions((prev) => prev.filter((attraction) => attraction.id !== id));
  };

  const handleDistanceChange = (id: number, distance: string) => {
    setAttractions((prev) =>
      prev.map((attraction) =>
        attraction.id === id ? { ...attraction, distance } : attraction
      )
    );
  };

  // Clears the description field
  const handleClearDescription = () => {
    setValue("otherInfo.description", ""); // Sets description to an empty string
  };

  // Refills the description field with default or custom text
  const handleRefillDescription = () => {
    const defaultDescription = "This is a default hotel description.";
    setValue("otherInfo.description", defaultDescription); // Sets description to the default value
  };
  useEffect(() => {
    const existingAttractions = getValues("otherInfo.nearby_attractions") || [];

    const newAttractions = attractions.filter(
      (attraction) =>
        !existingAttractions.some((item: { id: number }) => item.id === attraction.id)
    );

    if (newAttractions.length > 0) {
      append(newAttractions);
    }
  }, [append, attractions, getValues]);

  return (
    <div className="flex flex-col  h-full ">
      <div className="w-full border-b pb-4  flex gap-6">
        <div className="w-full flex flex-col gap-4">
          <span className="text-primary-dark font-medium w-full text-[1rem]">
            Nearby Attraction to your location
          </span>
          <div className=" w-full rounded-lg h-[18rem] overflow-hidden">
            <Map
              mapPosition={[27.7172, 85.324]}
              setAttractions={setAttractions}
            />
          </div>
        </div>
        <div className="flex flex-col w-full h-fit mt-4">
          <div className="p-4 w-full flex-col mx-auto flex flex-grow">
            {/* Header Section */}
            <div className="flex justify-between items-start">
              <h2 className="text-gray-dark w-full font-medium text-lg">
                Nearby Attractions
              </h2>
              <h2 className="text-gray-dark w-1/2 ml-20 font-medium text-lg text-left">
                Distance
              </h2>
            </div>

            {/* Content Section */}
            <div className="grid gap-4 mt-2">
              {attractions.map((attraction) => (
                <div key={attraction.id} className="flex w-full">
                  <div className="flex items-center w-full">
                    <span className="w-full text-gray-dark">
                      {attraction.name}
                    </span>
                    <button
                      className="ml-2 text-red-500 flex items-start justify-start w-full text-sm underline"
                      onClick={() => handleRemove(attraction.id)}
                    >
                      Remove from list
                    </button>
                  </div>
                  <div>
                    <input
                      type="text"
                      value={
                        typeof attraction.distance === "number"
                          ? `${attraction.distance} km`
                          : attraction.distance
                      }
                      onChange={(e) =>
                        handleDistanceChange(attraction.id, e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-[19.8rem] mt-2">
        <div className="flex justify-between items-center mb-4">
          <span className="text-primary-dark font-medium text-[1rem]">
            Hotel Description
          </span>
          <div className="flex gap-4">
            <button
              className="underline text-blue-600 hover:text-blue-800"
              onClick={handleClearDescription}
              type="button"
            >
              Clear
            </button>
            <button
              className="underline text-blue-600 hover:text-blue-800"
              onClick={handleRefillDescription}
              type="button"
            >
              Refill
            </button>
          </div>
        </div>

        <div className="h-full">
          <textarea
            className="w-full h-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            rows={4}
            placeholder="Enter hotel description here..."
            {...register("otherInfo.description")}
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default OtherInfo;
