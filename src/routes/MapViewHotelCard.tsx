type MapViewHotelCardProps = {
  image: string;
  title: string;
  location: string;
  rating: number;
  originalPrice: number;
  discountedPrice: number;
};

function MapViewHotelCard({
  image,
  title,
  location,
  rating,
  originalPrice,
  discountedPrice,
}: MapViewHotelCardProps) {
  return (
    <div className="w-64 rounded-lg overflow-hidden shadow-md border bg-white">
      <div className="w-full h-36">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-3 flex flex-col ">
        <div className="flex justify-between items-start">
          <div className="leading-tight space-y-0">
            <h2 className="text-base font-semibold text-gray-800 m-0">
              {title}
            </h2>
            <p className="text-sm text-gray-600 m-0">{location}</p>
          </div>
          <p className="text-sm text-yellow-500 font-medium whitespace-nowrap mt-0.5">
            ⭐ {rating}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <p className="text-sm line-through text-grey-400">
            Rs{originalPrice}
          </p>
          <div className="flex items-center">
            <p className="text-lg font-bold text-grey-600">
              Rs{discountedPrice}
            </p>
            <span className="text-grey-400">/room per night</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapViewHotelCard;
