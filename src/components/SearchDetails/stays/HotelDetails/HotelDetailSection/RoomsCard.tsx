/* eslint-disable @typescript-eslint/no-explicit-any */
import Icon from "@/components/ui/Icon";
import { OptionSelector } from "./OptionSelector";
import { Button } from "@/components/ui/button";
import ServiceContainer from "../../Card/ServiceContainer";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setNumberOfRooms } from "@/redux/features/staysSlice";

interface Service {
  icon: string;
  text: string | number;
}

interface RoomsCardProps {
  id: number;
  roomName: string;
  price: number;
  discountedPrice?: number;
  amenities: string[];
  services: Service[];
  imageUrl: string;
  roomLength?: number;
  bookRef: any;
}

function RoomsCard({
  bookRef,
  id,
  roomName,
  price,
  discountedPrice,
  amenities,
  services,
  imageUrl,
  roomLength,
}: RoomsCardProps) {
  const dispatch = useDispatch();

  const [selectedRoomLength, setSelectedRoomLength] = useState<
    number | undefined
  >(1);

  const handleOptionChange = (newValue: number) => {
    setSelectedRoomLength(newValue);
  };

  const handleBook = () => {
    dispatch(
      setNumberOfRooms({
        roomId: id,
        room: selectedRoomLength,
      })
    );
    bookRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="border rounded-2xl sm:p-6 p-4 flex   flex-col gap-4 border-grey-500">
      <div className="flex flex-col-reverse sm:flex-row justify-between flex-wrap sm:gap-0 gap-2 sm:flex ">
        {/* Room Info */}
        <div>
          <h1 className="font-medium text-[1.37rem] leading-[1.815625rem] text-gray">
            {roomName}
          </h1>
          <div className="flex flex-col justify-between gap-4">
            {/* Amenities */}
            <div className="amenities-list flex-col">
              {services?.map((service, index) => (
                <div key={index} className="service flex items-center">
                  <Icon className="text-gray" name={service.icon} />
                  <span className="text-gray-dark">{service.text}</span>
                </div>
              ))}
            </div>

            {/* Room Services */}
            <div className="flex gap-2 items-center">
              <div className="service-list flex grid-rows-1 gap-2 ghandleBookap-1 items-center">
                {amenities?.slice(0, 6).map((amenity, index) => (
                  <div key={index} className="flex items-center">
                    <ServiceContainer service={amenity} />
                  </div>
                ))}
              </div>
              <span>
                {/* Show "+ more" only if there are more than 6 services */}
                {amenities?.length > 6 ? `${amenities.length - 6}+ more` : null}
              </span>
            </div>
          </div>
        </div>

        {/* Room Image */}
        <div className="w-full sm:w-[16.685rem] h-[10.904rem] border-t-[0.0625rem] border-opacity-0 rounded-md overflow-hidden">
          <img
            src={imageUrl || "https://via.placeholder.com/1920x1080"}
            className="w-full h-full object-cover"
            alt="Room"
          />
        </div>
      </div>

      <hr />

      {/* Pricing and Actions */}
      <div className="pricing flex justify-between flex-wrap gap-2">
        <div className="flex flex-col ">
          <div className="flex items-center gap-3">
            <span className="text-[1.37rem] font-bold text-primary-dark">
              Rs. {price}
            </span>
            <span className="text-grey-600 !text-lg font-medium line-through">
              Rs. {discountedPrice}
            </span>
          </div>
          <span>/per night</span>
        </div>
        <div className="">
          <div className="flex h-full">
            {/* Left Div */}
            <div className="border pt-1 px-2 rounded-l-lg border-primary overflow-hidden">
              <OptionSelector
                roomLength={roomLength}
                onChange={handleOptionChange}
              />
            </div>
            <div className="flex w-full justify-between">
              {/* Right Div */}
              <div className="border-t border-r hover:bg-sky-100 border-b rounded-r-lg h-full border-primary overflow-hidden">
                <Button
                  className="bg-transparent text-primary h-full"
                  onClick={handleBook}
                >
                  Add to Book
                </Button>
              </div>
              <div className=" h-full border-primary  overflow-hidden lg:hidden">
                <Button className="h-full w-full" onClick={handleBook}>
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomsCard;
