import { useState, useEffect, useRef } from "react";
import AddRoom from "./AddRoom";
import Icon from "@/components/ui/Icon";
import { useFieldArray, useFormContext } from "react-hook-form";

interface roomProps {
  propertyId: number | null;
}

function Rooms({ propertyId }: roomProps) {
  const { control, watch } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "roomInfo",
  });

  const [rooms, setRooms] = useState<
    Array<{ id: string | number; collapsed: boolean; name: string }>
  >([]);

  watch("roomInfo");

  // Initialize with one room (Room 1) expanded
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (!hasInitialized.current && fields.length === 0) {
      const roomData = {
        name: "",
        size: 0,
        room_numbers: [],
        amenities: [],
        number_of_beds: [{ name: "", quantity: 1 }],
        photo_url: [{ name: "", url: "", favourite: false }],
        price: 0,
        children: 0,
        adults: 0,
        infants: 0,
      };
      append(roomData); // Add only once
      hasInitialized.current = true;
    }
  }, [append, fields.length]);

  // Sync UI state with form field array on initial render or changes
  useEffect(() => {
    setRooms((prevRooms) =>
      fields.map((field, index) => {
        const existing = prevRooms[index];
        return {
          id: field.id,
          collapsed: index > 0, // Keep Room 1 expanded, and others collapsed initially
          name: existing ? existing.name : "",
        };
      })
    );
  }, [fields]);

  const handleAddRoom = (e: React.MouseEvent) => {
    e.preventDefault();

    const roomData = {
      name: "",
      size: 0,
      room_numbers: [],
      amenities: [],
      number_of_beds: [{ name: "", quantity: 1 }],
      photo_url: [{ name: "", url: "", favourite: false }],
      price: 0,
      children: 0,
      adults: 0,
      infants: 0,
    };

    append(roomData);

    setRooms((prev) => [
      ...prev, // Add new room collapsed
      { id: Date.now(), collapsed: true, name: "" },
    ]);
  };

  const toggleRoom = (id: number | string) => {
    setRooms((prevRooms) =>
      prevRooms.map((room) =>
        room.id === id ? { ...room, collapsed: !room.collapsed } : room
      )
    );
  };

  const handleDeleteClick = (id: number | string) => {
    const indexToRemove = rooms.findIndex((room) => room.id === id);
    if (indexToRemove !== -1) {
      remove(indexToRemove);
      setRooms((prevRooms) => prevRooms.filter((room) => room.id !== id));
    }
  };

  const setRoomName = (index: number, name: string) => {
    setRooms((prevRooms) =>
      prevRooms.map((room, i) => (i === index ? { ...room, name } : room))
    );
  };

  return (
    <div className="flex flex-col gap-4">
      {rooms.map((roomUI, index) => {
        return (
          <div key={roomUI.id} className=" rounded p-4 border">
            <div
              className="w-full flex justify-between items-center cursor-pointer"
              onClick={() => toggleRoom(roomUI.id)}
            >
              <h2 className="font-medium text-[1rem] text-primary-dark">
                {roomUI?.name || `Room ${index + 1}`}
              </h2>
              <Icon name={roomUI?.collapsed ? "expand_more" : "expand_less"} />
            </div>

            {roomUI?.collapsed && (
              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  {roomUI.name || `Room ${index + 1}`}
                </span>
                <Icon
                  name="delete"
                  className="text-red-500 cursor-pointer"
                  onClick={() => handleDeleteClick(roomUI.id)}
                />
              </div>
            )}

            {!roomUI?.collapsed && (
              <div className="mt-4">
                <AddRoom
                  propertyId={propertyId}
                  index={index}
                  setRoomName={(name: string) => setRoomName(index, name)}
                  onRemove={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                />
              </div>
            )}
          </div>
        );
      })}

      <hr className="w-full my-4" />

      <div>
        <a href="#" className="text-primary underline" onClick={handleAddRoom}>
          Add Room
        </a>
      </div>
    </div>
  );
}

export default Rooms;
