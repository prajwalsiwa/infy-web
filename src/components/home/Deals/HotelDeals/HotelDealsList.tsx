import { Link, useParams } from "react-router-dom";
import HotelDealsCard from "./HotelDealsCard";
import DealsFilter from "../DealsFilter";

const hotelDeals = [
  {
    name: "Hotel Annapurna",
    image: "https://picsum.photos/300/200?random=1",
    rating: 4.5,
    discount: "15% off",
    validTill: "Jul 30, 2023",
    originalPrice: "3000",
    discountedPrice: "2500",
    includesBreakfast: true,
    promoCode: "Hotel15Off",
    ribbonText: "Expires in 1 week",
  },
  {
    name: "Himalaya Palace",
    image: "https://picsum.photos/300/200?random=2",
    rating: 4.2,
    discount: "20% off",
    validTill: "Aug 15, 2023",
    originalPrice: "3500",
    discountedPrice: "2800",
    includesBreakfast: false,
    promoCode: "HIM20",
    ribbonText: "Expires in 2 week",
  },
];

function HotelDealsList() {
  const { city } = useParams();
  const cityName = city ? city.charAt(0).toUpperCase() + city.slice(1) : "";

  return (
    <div className="w-full pt-10">
      {/* Outer padding container */}
      <div className="px-6 xl:px-20 flex flex-col justify-start items-start  w-full">
        {/* Breadcrumb */}
        <nav className="mb-4 text-sm text-gray-600" aria-label="Breadcrumb">
          <ol className="flex gap-1 list-reset">
            <li>
              <Link to="/top-deals" className="hover:underline text-gray-800">
                Today's Top Deals
              </Link>
            </li>
            <li>
              <span className="mx-2 text-gray-800">/</span>
            </li>
            <li className="text-gray-400 font-semibold">{cityName}</li>
          </ol>
        </nav>

        {/* Filter and Hotel List Section */}
        <div className="w-full flex flex-col gap-6 items-center">
          <DealsFilter />
          <div className="w-full justify-end flex items-center mb-4">
            <span className="font-light w-20 sm:text-[1rem] text-md">Sort by:</span>

            <select className="ml-2 p-1.5 border border-gray-300 text-[1rem] rounded">
              <option value="recommended">Recommended</option>
              <option value="recommended">Most Popular</option>
              <option value="price-low-to-high">Low to High Discounts</option>
              <option value="price-high-to-low">High to Low Discounts</option>
              <option value="rating">Nearest</option>
            </select>
          </div>
          {/* Hotel Cards */}
          <div className="w-full flex flex-wrap gap-4">
            {hotelDeals.map((hotel, index) => (
              <HotelDealsCard key={index} {...hotel} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotelDealsList;
