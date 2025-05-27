
interface Amenity {
  title: string;
}

interface AmenitiesProps {
  amenities: Amenity[];
}

const Amenities = ({ amenities }: AmenitiesProps) => {
  return (
    <div>
      <div className="font-medium py-4 text-[1rem] text-primary-dark">
        <span>Amenities</span>
      </div>
      <div className="grid grid-cols-[150px_1fr] items-center gap-2 text-grey-700">
        <span className="font-medium">Amenities:</span>
        <div className="flex gap-2">
          {amenities.map((amenity, index) => (
            <span
              className="p-1 w-fit justify-center items-center border rounded-sm"
              key={index}
            >
              {amenity.title}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Amenities;
