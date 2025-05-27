/* eslint-disable react-hooks/exhaustive-deps */
import HotelDetailSection from "@/components/SearchDetails/stays/HotelDetails/HotelDetailSection/HotelDetailSection";
import BookingSection from "@/components/SearchDetails/stays/HotelDetails/BookingSection/BookingSection";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useCheckRoomAvailabilityMutation } from "@/redux/services/staysApi";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { tabList } from "@/lib/constants/hoteDetails";

function HotelDetails() {
  const hotelDetails = useSelector(
    (state: RootState) => state.stays?.hotelDetails
  );

  // const roomPrice = hotelDetails && hotelDetails?.min_room_price;
  const discountPrice = hotelDetails && hotelDetails?.original_price;
  const discountPercent = hotelDetails && hotelDetails?.discount_percentage;

  const [checkRoomAvailability] = useCheckRoomAvailabilityMutation();
  const today = new Date();
  const checkIn = new Date(today.setDate(today.getDate() + 1));
  const checkOut = new Date(today.setDate(today.getDate() + 1));
  const formatDate = (date: Date) => date.toISOString().split("T")[0];
  const formattedCheckIn = formatDate(checkIn);
  const formattedCheckOut = formatDate(checkOut);
  const { id } = useParams();
  const rooms: never[] = [];
  interface RoomDetails {
    room: {
      price: number;
      name: string;
      id: number | null;
    };
  }

  interface AvailableData {
    room_details: RoomDetails[];
  }

  const [availableData, setAvailableData] = useState<AvailableData | null>(
    null
  );
  const [, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await checkRoomAvailability({
          checkin_date: formattedCheckIn,
          checkout_date: formattedCheckOut,
          property: id,
          rooms,
        }).unwrap(); // this extracts the pure data

        setAvailableData(response);
      } catch (error) {
        console.error("Error fetching room availability:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [checkRoomAvailability, formattedCheckIn, formattedCheckOut, id]);

  const roomPrice = availableData?.room_details?.[0]?.room?.price ?? 0;
  const roomName = availableData?.room_details?.[0]?.room?.name ?? "";
  const roomId = availableData?.room_details?.[0]?.room?.id ?? null;

  const refs = useRef<(HTMLDivElement | null)[]>(
    new Array(tabList.length).fill(null)
  );

  const bookRef = useRef(null);

  return (
    <div className="py-2 lg:grid  lg:grid-cols-[70%_30%]">
      <HotelDetailSection refs={refs} bookRef={bookRef} />
      <div className="pl-4 lg:block hidden">
        <BookingSection
          bookRef={bookRef}
          refs={refs}
          roomId={roomId}
          roomName={roomName}
          roomPrice={roomPrice}
          discountPrice={discountPrice}
          discountPercent={discountPercent}
        />
      </div>
    </div>
  );
}

export default HotelDetails;
