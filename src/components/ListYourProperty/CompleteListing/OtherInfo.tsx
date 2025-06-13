/* eslint-disable react-hooks/exhaustive-deps */
import Map from "@/components/Map/Map";
import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

type Attraction = {
  id: number;
  name: string;
  distance: number | string; // Distance can be a string (e.g., "5 km") or number
  latitude: number;
  longitude: number;
};

function OtherInfo() {
  const { register, watch, setValue, getValues } = useFormContext();
  const [attractions, setAttractions] = useState<Attraction[]>([]);

  const isFirstRender = useRef(true); // 👈 Guard to prevent syncing on first render

  // Load existing form values into local state on component mount
  useEffect(() => {
    const existingAttractions = getValues("otherInfo.nearby_attractions") || [];
    setAttractions(existingAttractions);
  }, []);

  watch("otherInfo"); // Keep watching the form fields (optional depending on your use)

  // Handle removal of an attraction from local state
  const handleRemove = (id: number) => {
    setAttractions((prev) => prev.filter((attraction) => attraction.id !== id));
  };

  // Handle distance change in local state
  const handleDistanceChange = (id: number, distance: string) => {
    setAttractions((prev) =>
      prev.map((attraction) =>
        attraction.id === id ? { ...attraction, distance } : attraction
      )
    );
  };

  // Clear hotel description field in the form
  const handleClearDescription = () => {
    setValue("otherInfo.description", "");
  };

  // Refill hotel description with default text
  const handleRefillDescription = () => {
    const defaultDescription = "This is a default hotel description.";
    setValue("otherInfo.description", defaultDescription);
  };

  // ✅ Sync local state to form state, but skip the initial render to prevent overwriting
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false; // Skip the first sync
      return;
    }
    // Update form state when local state changes
    setValue("otherInfo.nearby_attractions", attractions);
  }, [attractions, setValue]);

  return (
    <div className="flex flex-col h-full">
      <div className="w-full border-b pb-4 flex gap-6">
        <div className="w-full flex flex-col gap-4">
          <span className="text-primary-dark font-medium w-full text-[1rem]">
            Nearby Attraction to your location
          </span>
          <div className="w-full rounded-lg h-[18rem] overflow-hidden">
            <Map
              mapPosition={[27.7172, 85.324]}
              setAttractions={setAttractions} // Map component can still add/update attractions
            />
          </div>
        </div>

        <div className="flex flex-col w-full h-fit mt-4">
          <div className="p-4 w-full flex-col mx-auto flex flex-grow">
            <div className="flex justify-between items-start">
              <h2 className="text-gray-dark w-full font-medium text-lg">
                Nearby Attractions
              </h2>
              <h2 className="text-gray-dark w-1/2 ml-20 font-medium text-lg text-left">
                Distance
              </h2>
            </div>

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
                      type="button"
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
