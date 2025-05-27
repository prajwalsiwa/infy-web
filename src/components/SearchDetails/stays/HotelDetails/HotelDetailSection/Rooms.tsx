/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatDateToMonthYear } from "@/lib/utils/common";
import RoomsCard from "./RoomsCard";
import Icon from "@/components/ui/Icon";

interface RoomsProps {
  roomData: any;
  bookRef: any;
}

function Rooms({ roomData, bookRef }: RoomsProps) {
  const convertToString = (obj: any) => {
    return Object.entries(obj)
      .map(([key, value]) => `${value} ${key}`)
      .join(", ");
  };

  const roomDetails = roomData?.room_details?.map((room: any) => ({
    id: room?.room.id,
    roomName: room?.room.name,
    price: room?.room.price,
    amenities: room?.room?.amenities?.map((amenity: any) => amenity.title),
    services: [
      {
        icon: "bed",
        text: room?.room.number_of_beds[0].number_of_bed,
      },
      {
        icon: "fork_right",
        text: room?.room.size,
      },
      {
        icon: "people",
        text: convertToString(room.guest_capacity),
      },
    ],
    image: roomData?.property?.photo_url,
    roomLength: room?.available_count,
  }));

  const isRoomEmpty =
    roomData && roomData?.room_details && roomData?.room_details.length === 0;

  return (
    <div>
      <h1 className="font-medium text-2xl py-4 leading-[1.815625rem] text-[#353738]">
        Select your room
      </h1>
      {isRoomEmpty && (
        <div className="flex gap-4 items-center justify-center border border-red-500 rounded-lg py-4">
          <div>
            <Icon className="text-red-600" name="info" />
          </div>
          <div className="flex flex-col">
            <span className="text-red-600 text-md font-semibold">
              We have no availability here between{" "}
              {formatDateToMonthYear(roomData?.checkin_date)} to{" "}
              {formatDateToMonthYear(roomData?.checkout_date)}
            </span>
            <span className="text-red-500">
              Please select different dates to see more availability
            </span>
          </div>
        </div>
      )}
      <div className="grid gap-6">
        {roomDetails?.map((room: any) => (
          <RoomsCard
            bookRef={bookRef}
            key={room.id}
            id={room.id}
            roomName={room.roomName}
            price={room.price}
            amenities={room.amenities}
            services={room.services}
            imageUrl={room.image}
            roomLength={room.roomLength}
          />
        ))}
      </div>
    </div>
  );
}

export default Rooms;
