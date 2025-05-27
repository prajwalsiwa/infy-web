import { useState } from "react";
import AmenitiesModal from "./AmenitesModal";

interface Amenity {
  name: string;
  icon: string | null;
}

interface HotelDetailsSection {
  category: string;
  items: Amenity[];
}

interface AmenitiesPropsTypes {
  amenitiesList: HotelDetailsSection[];
}

function Amenities({ amenitiesList }: AmenitiesPropsTypes) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const amenities = amenitiesList?.map((category) => category.items).flat();

  const isRemaining = amenities?.length > 9;

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <span className="font-semibold text-xl text-grey-700">Amenities</span>
      <div className="amenities-list grid grid-cols-3 gap-4 items-start h-[8.5rem] overflow-hidden">
        {amenities?.slice(0, 9).map((amenity, index) => (
          <div key={index} className="amenity-item text-center gap-2 flex items-center">
            {amenity?.icon && <img src={amenity.icon} alt={amenity.name} className="w-6 h-6" />}
            <span>{amenity.name}</span>
          </div>
        ))}
      </div>
      
      {/* Show the "View all amenities" link if there are more than 9 amenities */}
      {isRemaining && (
        <span
          className="text-primary cursor-pointer hover:text-primary-dark underline"
          onClick={handleOpenModal}
        >
          View all amenities
        </span>
      )}

      <AmenitiesModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        amenitiesList={amenitiesList}
      />
    </div>
  );
}

export default Amenities;
