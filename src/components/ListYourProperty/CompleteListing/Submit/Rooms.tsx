// Type Definitions
interface Amenity {
  category: string;
  amenities: { title: string }[];
}

interface Bed {
  quantity: number;
  name: string;
}

interface Image {
  image_url: string;
}

interface Room {
  name?: string;
  size?: number;
  adults?: number;
  children?: number;
  infants?: number;
  amenities?: Amenity[];
  number_of_beds?: Bed[];
  images?: Image[];
}

interface RoomsProps {
  rooms: Room[];
}

const Rooms = ({ rooms }: RoomsProps) => {
  return (
    <div>
      <div className="font-medium py-4 text-[1rem] text-primary-dark">
        <span>All added Rooms</span>
      </div>
      {rooms.map((room, index) => (
        <div className="flex flex-col gap-4" key={index}>
          <span className="font-medium text-primary-dark">
            Room {index + 1}
          </span>
          {/* Room Name */}
          <div className="grid grid-cols-[150px_1fr] items-center gap-2 text-grey-700">
            <span className="font-medium">Room Name:</span>
            <span className="text-gray-dark font-normal">
              {room.name || "-"}
            </span>
          </div>
          {/* Room Size */}
          <div className="grid grid-cols-[150px_1fr] items-center gap-2 text-grey-700">
            <span className="font-medium">Room Size:</span>
            <span className="text-gray-dark font-normal">
              {room.size || "-"} sqm
            </span>
          </div>
          {/* Amenities */}
          <div className="grid grid-cols-[150px_1fr] items-center gap-2 text-grey-700">
            <span className="font-medium">Amenities:</span>
            <span className="text-gray-dark flex flex-col gap-1 p-1 w-fit items-start justify-start rounded-sm font-normal">
              {room.amenities?.map((amenity, index) => (
                <div
                  key={index}
                  className="flex flex-col p-1 border rounded-lg bg-gray-50"
                >
                  <div className="font-semibold text-sm text-primary">
                    {amenity.category}
                  </div>
                  <div className="space-y-1">
                    {amenity.amenities.length > 0 ? (
                      amenity.amenities.map((innerAmenity, innerIndex) => (
                        <div
                          key={innerIndex}
                          className="flex items-center gap-2"
                        >
                          <span className="text-sm text-gray-700">
                            {innerAmenity.title}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="text-sm text-gray-500">-</div>
                    )}
                  </div>
                </div>
              )) || (
                <div className="text-sm text-gray-500">
                  No amenities available
                </div>
              )}
            </span>
          </div>
          {/* Guest Capacity */}
          <div className="grid grid-cols-[150px_1fr] items-center gap-2 text-grey-700">
            <span className="font-medium">Guest Capacity:</span>
            <span className="text-gray-dark font-normal">
              {[
                room.adults ? `${room.adults} adults` : null,
                room.children ? `${room.children} children` : null,
                room.infants ? `${room.infants} infants` : null,
              ]
                .filter(Boolean)
                .join(", ")}
            </span>
          </div>
          {/* Number of Beds */}
          <div className="grid grid-cols-[150px_1fr] items-center gap-2 text-grey-700">
            <span className="font-medium">Number of Beds:</span>
            {room.number_of_beds?.map((bed, bedIndex) => (
              <div key={bedIndex}>
                <span>
                  {bed.quantity} {bed.name} bed
                </span>
              </div>
            ))}
          </div>
          {/* Upload Photos */}
          <div className="grid grid-cols-[150px_1fr] items-start gap-2 text-grey-700">
            <span className="font-medium">Upload Photos:</span>
            <div className="flex flex-wrap gap-2">
              {room.images?.length ? (
                room.images.map((image, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={image.image_url}
                    alt={`Room Image ${imgIndex + 1}`}
                    className="w-20 h-20 object-cover rounded"
                  />
                ))
              ) : (
                <span>No images available</span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Rooms;
