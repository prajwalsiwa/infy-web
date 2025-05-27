// import { getDiscountedPrice } from "@/lib/utils/pricing";
import { Hotel } from "@/redux/services/homeApi";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const HotelCard = ({
  data,
  isPackage = false,
  className = "",
}: {
  data: Hotel;
  isPackage?: boolean;
  className?: string;
}) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "stays";
  const handleCardClick = () => {
    if (isPackage) {
      navigate(`/search/package-view/${data.id}?tab=${activeTab}`);
    } else {
      navigate(`/search/hotel-view/${data.id}?tab=${activeTab}`);
    }
  };

  return (
    <button
      type="button"
      className={"w-full overflow-hidden hover:border-2 hover:border-primary rounded-lg" + className}
      onClick={handleCardClick}
    >
      <div className={"bg-white !w-full shadow-md rounded-md cursor-pointer "+ className}>
        {/* Image Container */}
        <figure className="relative !w-full">
          <img
            src={data.photo_url || "/default-hotel.jpg"}
            width={320}
            height={220}
            alt={data.name || "Hotel room"}
            className="!w-full h-[220px] object-fill object-center rounded-t-md"
          />

          {data.discount_percentage > 0 && (
            <figcaption className="absolute bottom-3 left-3 bg-white text-primary text-xs font-medium px-2 py-1 rounded-sm">
              {Math.round(data.discount_percentage)}% Off
            </figcaption>
          )}
        </figure>

        {/* Info Container */}
        <div className="p-4">
          {/* Hotel general info */}
          <div
            className={` items-start justify-between ${
              isPackage ? "flex flex-col-reverse" : "flex"
            }`}
          >
            <Link to={`/hotel/${data.id}`}>
              <h1 className="text-base text-primary-dark">{data.name}</h1>
              <p className="text-xs text-gray flex justify-start">
                {data?.location?.city}, {data?.location?.country}
              </p>
            </Link>

            <div
              className={`flex items-center gap-1 ${
                isPackage ? "text-gray-dark" : "text-gold"
              }`}
            >
              <StarFilledIcon className="size-4" />
              <span className="font-medium">{data.ratings?.toFixed(1)} </span>
              {isPackage && (
                <span className="text-gray-dark">
                  || {data?.days} days {data?.night} night
                </span>
              )}
            </div>
          </div>

          {/* Hotel pricing info */}
          <div className="mt-2 flex justify-start items-center">
            <span className="text-gray text-xs line-through">
              Rs. {data.original_price}
            </span>
            <span className="text-base text-gray-dark ml-2">
              Rs.{""}
              {/* {getDiscountedPrice({
                price: data?.original_price || 0,
                discountPercent: data.discount_percentage,
              })} */}
              {data?.min_room_price}
            </span>
            {isPackage ? (
              <span className="text-xs text-gray">/person</span>
            ) : (
              <span className="text-xs text-gray">/room per night</span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
};

export default HotelCard;
