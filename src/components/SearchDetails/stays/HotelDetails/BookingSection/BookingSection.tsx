/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { CheckInOutPicker } from "@/components/ui/check-in-out-picker";
import { GuestPicker } from "@/components/ui/guest-picker";
import { useCheckRoomAvailabilityMutation, useContinueBookingMutation } from "@/redux/services/staysApi";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { addDays, format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setPendingBooking } from "@/redux/features/staysSlice";
import { DateRange } from "react-day-picker";
import Icon from "@/components/ui/Icon";
// import { useToast } from "@/hooks/use-toast";
interface BookingProps {
  roomId: number | null;
  roomName: string;
  roomPrice: number;
  discountPercent: number | null;
  discountPrice: number | null;
  refs: any;
  bookRef: any;
}

function BookingSection({
  bookRef,
  refs,
  roomId,
  roomName,
  roomPrice,
  discountPercent,
  discountPrice,
}: BookingProps) {
  const { room_details } = useSelector(
    (state: RootState) => state.stays?.availableRooms || 0
  );
  // const { toast } = useToast();

  const noOfRooms = useSelector((state: RootState) => state.stays?.rooms);

  // console.log(noOfRooms);

  const roomDetail = room_details?.find(
    (detail: any) => detail.room.id === noOfRooms.roomId
  );

  const hotelDetails = useSelector(
    (state: RootState) => state.stays?.hotelDetails
  );

  const dispatch = useDispatch();
  const [selectedDates, setSelectedDates] = useState<{
    checkin_date: string | null;
    checkout_date: string | null;
  }>({
    checkin_date: format(addDays(new Date(), 1), "yyyy-MM-dd"),
    checkout_date: format(addDays(new Date(), 2), "yyyy-MM-dd"),
  });
  const [guestValues, setGuestValues] = useState({
    adults: 0,
    children: 0,
    infants: 0,
  });

  const [checkRoomAvailability] = useCheckRoomAvailabilityMutation()
  const { id } = useParams();

  const handleDateChange = (dates: DateRange) => {
    setSelectedDates({
      checkin_date: dates.from ? format(dates?.from, "yyyy-MM-dd") : null,
      checkout_date: dates.to ? format(dates.to, "yyyy-MM-dd") : null,
    });
    checkRoomAvailability({checkin_date:  dates.from ? format(dates?.from, "yyyy-MM-dd") : null ,
      checkout_date: dates.to ? format(dates.to, "yyyy-MM-dd") : null,
      property: id,
      rooms:[]
 })
  };

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isCheckout = pathname.includes("checkout");


  const handleGuestChange = (updatedValues: {
    adults: number;
    children: number;
    infants: number;
  }) => {
    setGuestValues(updatedValues);
  };

  const [continueBooking] = useContinueBookingMutation();

  const isLoggedIn =
    useSelector((state: RootState) => state.auth.token) ||
    localStorage.getItem("token");

  const handleCheckout = () => {
    const startTimeKey = "circularTimerStartTime";
    const now = Date.now();
    localStorage.setItem(startTimeKey, now.toString());

    // if (!noOfRooms.roomId) {
    //   toast({
    //     title: "Room Addition Required",
    //     description: "Please add at least one room to continue.",
    //     variant: "destructive",
    //   });

    //   return;
    // }

    if (isLoggedIn) {
      continueBooking({
        checkin_date: selectedDates.checkin_date,
        checkout_date: selectedDates.checkout_date,
        property: Number(id),
        room_details: [
          {
            room: noOfRooms.roomId ? noOfRooms.roomId : roomId,
            room_count: noOfRooms?.room ? noOfRooms.room : 1,
          },
        ],
        adults: guestValues?.adults || 0,
        children: guestValues?.children || 0,
        infants: guestValues?.infants || 0,
      }).unwrap();
      navigate(`/hotel-view/checkout/${id}/set-details`);
    } else {
      dispatch(
        setPendingBooking({
          checkin_date: selectedDates.checkin_date,
          checkout_date: selectedDates.checkout_date,
          property: Number(id),
          room_details: [
            {
              room: noOfRooms.roomId ?? roomId!,
              room_count: noOfRooms.room || 1,
            },
          ],
          adults: guestValues?.adults || 0,
          children: guestValues?.children || 0,
          infants: guestValues?.infants || 0,
        })
      );
      navigate(`/hotel-view/checkout/${id}/login`);
    }
  };

  const bookingCardDetails = {
    id: hotelDetails?.id,
    name: hotelDetails?.name,
    image: hotelDetails?.photo_url,
    dates: `${selectedDates.checkin_date} to ${selectedDates.checkout_date}`,
    guests: guestValues.adults + guestValues.children + guestValues.infants,
    roomPrice: roomDetail?.room?.price || roomPrice,
    totalPrice:
      selectedDates.checkin_date &&
      selectedDates.checkout_date &&
      (roomDetail?.room?.price || roomPrice)
        ? (roomDetail?.room?.price || roomPrice) *
          (noOfRooms.room || 1) *
          Math.max(
            (new Date(selectedDates.checkout_date).getTime() -
              new Date(selectedDates.checkin_date).getTime()) /
              (1000 * 60 * 60 * 24),
            1
          )
        : 0,
    roomType: roomDetail?.room?.name || roomName,
    noOfRooms: noOfRooms.room || 1,
  };

  localStorage.setItem(
    "bookingCardDetails",
    JSON.stringify(bookingCardDetails)
  );

  const totalPrice =
    selectedDates.checkin_date && selectedDates.checkout_date
      ? (roomDetail?.room?.price || roomPrice) *
        (noOfRooms.room || 1) *
        Math.max(
          (new Date(selectedDates.checkout_date).getTime() -
            new Date(selectedDates.checkin_date).getTime()) /
            (1000 * 60 * 60 * 24),
          1
        )
      : 0;

  return (
    <div
      ref={bookRef}
      className="rounded-lg border  border-grey-200 pt-10 pr-8 pb-12 pl-8 w-full shadow-xl"
    >
      <div>
        <div className="price-section flex flex-col border-b border-b-gray pb-4">
          <div>
            <span className="acutal-price flex items-center gap-2">
              <span className="text-gray-dark">from</span>

              <span className="actual-price text-primary-dark font-semibold text-xl">
                Rs {roomPrice}
              </span>
              <span className="previous-price text-gray line-through text-sm font-medium">
                Rs. {discountPrice}
              </span>
              <span className="text-gray-dark">
                {discountPercent?.toFixed(1)}% off
              </span>
            </span>
          </div>
          <div className="flex pl-10">
            <span className="text-gray">/per night</span>
          </div>
        </div>
        <div className="pb-4 border-b  items-center border-b-gray flex justify-between ">
          <div className="flex flex-col">
            <div className="flex ">
              <div className="">
                <div className=" h-10 justify-start items-start flex !py-0  pr-12">
                  <CheckInOutPicker
                    className="!px-0"
                    showLabel={false}
                    onChange={handleDateChange}
                    initialDateRange={{
                      from: selectedDates.checkin_date
                        ? new Date(selectedDates.checkin_date)
                        : undefined,
                      to: selectedDates.checkout_date
                        ? new Date(selectedDates.checkout_date)
                        : undefined,
                    }}
                  />
                  ;
                </div>
              </div>
              <div className="border-r  h-6 mt-5 border-grey-400 "></div>
              <div className="ml-4">
                <GuestPicker
                  values={guestValues}
                  onChange={handleGuestChange}
                  showLabel={false}
                  className="!px-0 !pt-5"
                />
              </div>
            </div>
            <span className="text-gray text-xs  ">
              {/* Total length of stay: 2 nights */}
            </span>
          </div>
        </div>
        <div className="room-list flex flex-col gap-2 py-4">
          {noOfRooms && (
            <div className="room-item border border-dashed py-3 px-4 rounded-lg w-full flex justify-between">
              <span className="room-name">
                {roomDetail?.room?.name || roomName}{" "}
                <span className="text-gray  ml-1">x{noOfRooms.room || 1} </span>
              </span>

              <span className="price">
                Rs.{" "}
                {roomDetail?.room?.price > 0
                  ? roomDetail.room.price
                  : roomPrice}
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-between items-center py-4">
        <span className="text-lg">Total</span>
        <span className="text-xl text-sky-700 font-semibold ">
          Rs. {totalPrice}
        </span>
      </div>
      {!isCheckout && totalPrice != 0 && (
        <div className="w-full flex flex-col gap-4 h-[6rem]">
          <Button className="w-full !py-[1.5rem]" onClick={handleCheckout}>
            Continue Booking
          </Button>
          <div className="text-sm flex items-center gap-2 flex-col text-gray-500 justify-center">
            <p className="mb-4">Want to add more rooms?</p>
            <div
              onClick={() =>
                refs.current[2]?.scrollIntoView({ behavior: "smooth" })
              }
              className="flex rounded-full  justify-center items-center cursor-pointer transition-transform hover:scale-110"
            >
              <Icon
                name="arrow_downward"
                className="text-3xl text-blue-500 animate-bounce "
              />
            </div>
          </div>
        </div>
      )}
     {totalPrice === 0 && (
  <div className="mt-2 text-sm text-red-600 text-center">
    <p>Unfortunately, there are no rooms available at the moment.</p>
    <p className="mt-1">You cannot proceed with the booking without selecting a room.</p>
    <div className="flex justify-center mt-2">
      <span className="text-xl">🚫</span>
    </div>
  </div>
    )}
    </div>
  );
}

export default BookingSection;
