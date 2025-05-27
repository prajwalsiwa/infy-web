/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import Input from "@/components/ui/FormUI/Input";
import TagInput from "@/components/ui/FormUI/TagInput";
import { GuestPicker } from "@/components/ui/guest-picker";
import { useEffect, useState } from "react";
import { AmenitiesMultiSelect, AmenitiesValue } from "./AmenitiesMultiselect";
import { useGetRoomAmenitiesQuery } from "@/redux/services/listYourPropertyApi";
import axios from "axios";
import Label from "@/components/ui/FormUI/Label";
import Select from "@/components/ui/FormUI/Select";
import Icon from "@/components/ui/Icon";
import { useFieldArray, useFormContext } from "react-hook-form";

export interface AddRoomProps {
  propertyId: any;
  index: number;
  setRoomName: (name: string) => void;
  onRemove: () => void;
}

const bedList = [
  { id: 1, label: "Single/Twin Bed", type: "Single" },
  { id: 2, label: "Double/Full Bed", type: "Double" },
  { id: 3, label: "Queen Bed", type: "Queen" },
  { id: 4, label: "King Bed", type: "King" },
  { id: 5, label: "California King Bed", type: "California King" },
  { id: 6, label: "Sofa Bed", type: "Sofa" },
  { id: 7, label: "Murphy Bed", type: "Murphy" },
  { id: 8, label: "Bunk Bed", type: "Bunk" },
  { id: 9, label: "Rollaway Bed", type: "Rollaway" },
  { id: 10, label: "Daybed", type: "Daybed" },
  { id: 11, label: "Trundle Bed", type: "Trundle" },
  { id: 12, label: "Crib", type: "Crib" },
];

function AddRoom({ propertyId, index }: AddRoomProps) {
  const {
    control,
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();
  const { data: amenitesList } = useGetRoomAmenitiesQuery(propertyId);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const { append } = useFieldArray({
    name: `roomInfo.${index}.photo_url`,
    control,
  });

  const { append: appendBed } = useFieldArray({
    name: `roomInfo.${index}.number_of_beds`,
    control,
  });

  const [beds, setBeds] = useState([{ id: 1, number: 1, name: "" }]);
  const [guestValues, setGuestValues] = useState({
    adults: 0,
    children: 0,
    infants: 0,
  });
  const [selectedAmenities, setSelectedAmenities] = useState<AmenitiesValue[]>(
    []
  );

  useEffect(() => {
    setValue(`roomInfo.${index}.number_of_beds`, []);
    beds.forEach((bed) => {
      if (bed.name) {
        appendBed({ name: bed.name, quantity: bed.number });
      }
    });
  }, [beds]);

  const handleGuestChange = (updatedValues: typeof guestValues) => {
    setGuestValues(updatedValues);
    const values = getValues(`roomInfo.${index}`);
    setValue(`roomInfo.${index}`, { ...values, ...updatedValues });
  };

  const handleAmenityChange = (amenities: AmenitiesValue[]) => {
    setSelectedAmenities(amenities);
    const ids = amenities.map((item) => item.id);
    if (ids.length > 0) {
      setValue(`roomInfo.${index}.amenities`, ids);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post(
        "https://inf.rajeshpudasaini.com.np/api/v4/upload-image/",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data) {
        const photoUrl = {
          name: response.data.name,
          url: response.data.image_url,
          favourite: true,
        };
        append(photoUrl);
      }
    } catch (err) {
      console.error("Upload error:", err);
    }

    setImgSrc(URL.createObjectURL(file));
  };

  return (
    <div className="w-full">
      <div className="font-medium py-4 text-[1rem] text-primary-dark">
        <span>Add Room</span>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex w-full gap-2 flex-wrap xl:flex-nowrap items-center">
          <div className="flex w-full md:flex-grow flex-col gap-1">
            <Label required>Room Name / Type</Label>
            <Input
              className="border rounded-md"
              placeholder="Room Name / Type"
              {...register(`roomInfo.${index}.name`, {
                required: "Room name is required",
              })}
            />
          </div>
          <div className="w-[10rem] flex-col flex gap-1 justify-end">
            <Label>Room Size</Label>
            <div className="flex rounded-md">
              <Input
                type="number"
                placeholder="size"
                {...register(`roomInfo.${index}.size`, {
                  valueAsNumber: true,
                  required: "Room size is required",
                  min: {
                    value: 1,
                    message: "Room size must be greater than 0",
                  },
                })}
                className="border w-[7rem] rounded-l-md"
              />
              <div className="border-l border flex justify-center items-center rounded-r-md px-2">
                sqm
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-8 sm:gap-2 items-end w-full justify-between">
          <div className="flex flex-col flex-grow w-full">
            <Label required>Room Number</Label>
            <TagInput index={index} errors={errors?.room_numbers?.message} />
          </div>
          <div className="flex  flex-col">
            <div className="flex justify-start items-start w-full">
              <Label>Guest Capacity</Label>
            </div>
            <div className=" h-[2.4rem] items-start flex flex-col pl-2  border rounded-md sm:w-[10rem] w-full">
              <div>
                <GuestPicker
                  values={guestValues}
                  onChange={handleGuestChange}
                  showLabel={false}
                  className="!px-0 gap-1  !pt-2 !rounded-md"
                />
              </div>
            </div>
          </div>
        </div>

        <AmenitiesMultiSelect
          options={amenitesList}
          values={selectedAmenities}
          onValuesChange={handleAmenityChange}
          label="Select Amenities"
          hasError={false}
          disabled={false}
          placeholder="Type to search..."
          className="w-full"
        />

        {beds.map((bed, i) => (
          <div key={bed.id} className="flex items-end gap-2 w-full">
            <div className="flex gap-2 w-full items-end">
              <div>
                {i === 0 && <Label>Number of beds</Label>}
                <div className="flex gap-6 border rounded-md w-fit px-10 p-2.5">
                  <button
                    className="font-bold border px-3 flex  justify-center items-center bg-primary text-white  bg-none w-4 rounded-full"
                    onClick={() =>
                      setBeds((prev) =>
                        prev.map((b) =>
                          b.id === bed.id && b.number > 1
                            ? { ...b, number: b.number - 1 }
                            : b
                        )
                      )
                    }
                  >
                    -
                  </button>
                  {bed.number}
                  <button
                    className="font-bold border px-3 flex  justify-center items-center bg-primary text-white  bg-none w-4 rounded-full"
                    onClick={() =>
                      setBeds((prev) =>
                        prev.map((b) =>
                          b.id === bed.id ? { ...b, number: b.number + 1 } : b
                        )
                      )
                    }
                  >
                    +
                  </button>
                </div>
              </div>
              <Select
                valueKey="type"
                options={bedList}
                onChange={(val) =>
                  setBeds((prev) =>
                    prev.map((b) => (b.id === bed.id ? { ...b, name: val } : b))
                  )
                }
                className="w-full rounded-md"
              />
            </div>
            <Icon
              name={i === beds.length - 1 ? "add" : "delete"}
              className={`border rounded-full mb-2  text-${
                i === beds.length - 1 ? "primary" : "red-700"
              } w-7 h-7 flex justify-center items-center `}
              onClick={
                i === beds.length - 1
                  ? () =>
                      setBeds([
                        ...beds,
                        { id: bed.id + 1, number: 1, name: "" },
                      ])
                  : () => setBeds(beds.filter((b) => b.id !== bed.id))
              }
            />
          </div>
        ))}

        <div>
          <Label>Upload Photos</Label>
          <div
            className={`w-full sm:h-[8rem] md:w-[11rem] md:h-[6rem] h-[8rem] border-dashed rounded-md border flex items-center ${
              imgSrc ? "rounded-none border-none" : ""
            }`}
          >
            {imgSrc ? (
              <div className="flex w-full h-full">
                <img
                  src={imgSrc}
                  alt="Uploaded"
                  className="w-full h-full object-contain"
                />
                <Icon
                  name="delete"
                  className="text-red-500"
                  onClick={() => setImgSrc(null)}
                />
              </div>
            ) : (
              <label
                htmlFor={`file-input-${index}`}
                className="w-full h-full flex justify-center text-gray-light items-center cursor-pointer"
              >
                <Icon name="image" /> Upload photo here
              </label>
            )}
            <Input
              type="file"
              id={`file-input-${index}`}
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <Label>Room Price</Label>
          <div className="w-[10rem] flex border rounded-md">
            <div className="border-r flex justify-center items-center px-2">
              Nrs
            </div>
            <Input
              type="number"
              placeholder="price"
              {...register(`roomInfo.${index}.price`, { valueAsNumber: true })}
              className="border-none w-[7rem]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddRoom;
