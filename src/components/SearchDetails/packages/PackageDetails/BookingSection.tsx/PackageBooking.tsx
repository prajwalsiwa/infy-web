import { Button } from "@/components/ui/button";
import DatePicker from "@/components/ui/DatePicker";
import Icon from "@/components/ui/Icon";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { usePackageBookingMutation } from "@/redux/services/packagesApi";
import { useAppSelector } from "@/redux/store";
import { setContinueBookingBody } from "@/redux/features/packagesSlice";
import { useDispatch } from "react-redux";

interface PackageBookingProps {
  price: {
    price?: number;
    discountedPrice?: number;
  };
  bookDetail: {
    image?: string;
    title?: string;
    location?: string;
    ratings?: number;
    reviews?: number;
  };
}

function PackageBooking({ price, bookDetail }: PackageBookingProps) {
  const dispatch = useDispatch();
  const [packageNumber, setPackageNumber] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const { id } = useParams();
  const navigate = useNavigate();

  const formattedDate = selectedDate ? format(selectedDate, "MMMM d") : null;
  const bodyformattedDate = selectedDate
    ? format(selectedDate, "yyyy-MM-dd")
    : new Date();

  // eslint-disable-next-line no-console
  console.log(bodyformattedDate);

  const totalPrice = price?.price ? packageNumber * price.price : 0;

  const packageBookDetail = {
    id: id,
    image: bookDetail.image,
    name: "Mustang Tour package",
    location: bookDetail.location,
    rating: bookDetail.ratings,
    reviews: bookDetail.reviews,
    price: price.price,
    packageName: `Package x${packageNumber}`,
    totalPrice: totalPrice,
    noOfPackage: packageNumber,
    date: formattedDate,
    // guest:
  };

  // eslint-disable-next-line no-console
  console.log(packageBookDetail, "bookDetails");

  const [packageBooking] = usePackageBookingMutation();

  const packageId = Number(id);

  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const handleContinueBooking = async () => {
    const startTimeKey = "circularTimerStartTime";
    const now = Date.now();
    localStorage.setItem(startTimeKey, now.toString());

    if (isAuthenticated) {
      try {
        const result = await packageBooking({
          packageId,
          number_of_guests: packageNumber,
          date: bodyformattedDate,
          discount_code: null,
        });

        if ("data" in result && result.data) {
          localStorage.setItem("packageCard", JSON.stringify(result.data));
        } else {
          localStorage.setItem(
            "loginpackageCard",
            JSON.stringify(packageBookDetail)
          );
        }

        navigate(`/package-view/checkout/${id}/set-details`);
      } catch (error) {
        console.error("Error while booking the package:", error);
      }
    } else {
      if (packageBookDetail) {
        localStorage.setItem(
          "loginpackageCard",
          JSON.stringify(packageBookDetail)
        );
      }

      const body = {
        packageId,
        number_of_guests: packageNumber,
        date: bodyformattedDate,
        discount_code: null,
      };
      dispatch(setContinueBookingBody(body));
      navigate(`/package-view/checkout/${id}/login`);
    }
  };

  const discountPercent =
    price?.price && price?.discountedPrice
      ? ((price.discountedPrice - price.price) / price.discountedPrice) * 100
      : 0;

  return (
    <div className="rounded-lg border  border-grey-100 pt-10 pr-8 pb-12 pl-8 shadow-xl">
      <div>
        <div className="price-section flex flex-col border-b border-b-gray pb-4">
          <div>
            <span className="acutal-price flex items-center gap-2">
              <span className="text-gray-dark">from</span>

              <span className="actual-price text-primary-dark font-semibold text-xl">
                Rs {price.price}
              </span>
              <span className="previous-price text-gray line-through text-sm font-medium">
                Rs. {price.discountedPrice}
              </span>
              <span className="text-gray-dark">
                {discountPercent.toFixed()}% off
              </span>
            </span>
          </div>
          <div className="flex pl-10">
            <span className="text-gray">/per person</span>
          </div>
        </div>

        <div className="room-list flex flex-col gap-2 py-4">
          <div className="room-item border  py-2 px-4 rounded-lg w-full flex justify-between">
            <div className="flex gap-3 items-center">
              <Icon className="text-gray !text-[1.2rem]" name="package" />
              <div>
                <span className="text-gray">{packageNumber} Package</span>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <button
                className="bg-primary pb-[0.1rem] rounded-full h-6 w-6 text-white flex justify-center items-center text-2xl"
                onClick={() => {
                  if (packageNumber <= 1) return;
                  setPackageNumber((prev) => prev - 1);
                }}
              >
                -
              </button>
              {packageNumber}
              <button
                className="bg-primary pb-[0.1rem] rounded-full h-6 w-6 text-white  flex justify-center items-center text-2xl"
                onClick={() => setPackageNumber((prev) => prev + 1)}
              >
                +
              </button>
            </div>
          </div>
        </div>
        <div>
          <DatePicker
            className="hover:bg-white border border-grey-300 hover:text-gray py-6 w-full"
            onDateChange={setSelectedDate}
          />
        </div>
      </div>
      <div className="flex justify-between items-center py-4">
        <span className="text-lg">Total</span>
        <span className="text-xl text-sky-700 font-semibold ">
          Rs. {totalPrice}
        </span>
      </div>
      <div className="w-full">
        <Button className="w-full !py-[1.5rem]" onClick={handleContinueBooking}>
          Continue Booking
        </Button>
      </div>
    </div>
  );
}

export default PackageBooking;
