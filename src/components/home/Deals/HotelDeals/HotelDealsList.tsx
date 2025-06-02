/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import HotelDealsCard from "./HotelDealsCard";
import DealsFilter from "../DealsFilter";
import { useGetHotelDealsQuery } from "@/redux/services/dealsApi";
import { useMemo, ChangeEvent } from "react";

interface TransformedDeal {
  id: number;
  name: string;
  image: string;
  rating: number;
  discount: string;
  validTill: string;
  originalPrice: string;
  discountedPrice: string;
  includesBreakfast: boolean;
  promoCode: string;
  ribbonText: string;
}

function HotelDealsList() {
  const { city } = useParams<{ city?: string }>();
  const cityName = city ? city.charAt(0).toUpperCase() + city.slice(1) : "";

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const sortBy = queryParams.get("sort_by") ?? "";

  const checkin_date = queryParams.get("checkin_date") ?? "";
  const checkout_date = queryParams.get("checkout_date") ?? "";
  const adults = queryParams.get("adults") ?? "0";
  const children = queryParams.get("children") ?? "0";
  const infants = queryParams.get("infants") ?? "0";

  const {
    data: hotelDealsList,
    error,
    isLoading,
  } = useGetHotelDealsQuery({
    city: city ?? "",
    sort_by: sortBy,
    checkin_date,
    checkout_date,
    adults,
    children,
    infants,
  } as {
    city: string;
    sort_by: string;
    checkin_date: string;
    checkout_date: string;
    adults: string;
    children: string;
    infants: string;
  });

  const transformedDeals: TransformedDeal[] = useMemo(() => {
    if (!hotelDealsList?.results) return [];

    return hotelDealsList.results.map((deal: any, index: number) => {
      const image = `https://picsum.photos/300/200?random=${index + 1}`;
      const discount = deal.discount_percentage
        ? `${deal.discount_percentage}% off`
        : "";

      const validTill = new Date(deal.to_date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

      const originalPrice = 3000;
      const discountedPrice = (
        originalPrice *
        (1 - (deal.discount_percentage ?? 0) / 100)
      ).toFixed(0);

      const rating = 4 + Math.random();
      const includesBreakfast = Math.random() > 0.5;
      const promoCode = deal.discount_code ?? "";

      const expiryDate = new Date(deal.to_date);
      const today = new Date();
      const daysLeft = Math.ceil(
        (expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
      );
      const ribbonText =
        daysLeft > 0
          ? `Expires in ${daysLeft} day${daysLeft > 1 ? "s" : ""}`
          : "Expired";

      return {
        id: deal.id,
        name: deal.name,
        image,
        rating: +rating.toFixed(1),
        discount,
        validTill,
        originalPrice: originalPrice.toString(),
        discountedPrice,
        includesBreakfast,
        promoCode,
        ribbonText,
      };
    });
  }, [hotelDealsList]);

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    queryParams.set("sort_by", selected);
    navigate({ search: queryParams.toString() });
  };

  if (isLoading) {
    return <p className="p-10 text-center">Loading hotel deals...</p>;
  }

  if (error) {
    return (
      <p className="p-10 text-center text-red-500">
        Error loading hotel deals.
      </p>
    );
  }

  if (!transformedDeals.length) {
    return (
      <p className="p-10 text-center">No hotel deals found for {cityName}.</p>
    );
  }

  return (
    <div className="w-full pt-10">
      <div className="px-6 xl:px-20 flex flex-col justify-start items-start w-full">
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

        <div className="w-full flex flex-col gap-6 items-center">
          <DealsFilter />

          <div className="w-full justify-end flex items-center mb-4">
            <span className="font-light w-20 sm:text-[1rem] text-md">
              Sort by:
            </span>
            <select
              className="ml-2 p-1.5 border border-gray-300 text-[1rem] rounded"
              value={sortBy}
              onChange={handleSortChange}
            >
              <option value="">Recommended</option>
              <option value="HTOL">High to Low Discounts</option>
              <option value="LTOH">Low to High Discounts</option>
            </select>
          </div>

          <div className="w-full flex flex-wrap gap-4">
            {transformedDeals.map((hotel, index) => (
              <HotelDealsCard key={hotel.id ?? index} {...hotel} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotelDealsList;
