/* eslint-disable max-lines */
import { useRef, useState } from "react";
import Input from "@/components/ui/FormUI/Input";
import Icon from "@/components/ui/Icon";
import { Separator } from "@/components/ui/Separator";
import CheckboxWithLabel from "@/components/ui/FormUI/CheckboxInput";
import { FieldErrors, useFieldArray, useFormContext } from "react-hook-form";
import { useGetPropertyTypeListQuery } from "@/redux/services/listYourPropertyApi";
import PropertyTypes from "./PropertyTypes";
import UploadImages from "./UploadImages";
import { convertFileToBase64 } from "@/lib/utils/common";
import Label from "@/components/ui/FormUI/Label";

type PropertyInfoProps = {
  errors: FieldErrors<{
    name: string;
    size: string;
    website: string;
    checkin_time: string;
    checkout_time: string;
    legal_documents: [];
  }>;
};

function PropertyInfo({ errors }: PropertyInfoProps) {
  const { register, watch } = useFormContext();
  const { append } = useFieldArray({
    name: "propertyInfo.legal_documents",
  });

  const { data: propertyTypeList, isLoading } = useGetPropertyTypeListQuery();
  watch("propertyInfo");

  // State for image previews
  const [documentPreviews, setDocumentPreviews] = useState<
    Record<string, string | null>
  >({});

  const handleDocumentUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    title: string
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const base64Image = await convertFileToBase64(file);

      const updateFile = {
        title,
        document: base64Image,
      };
      append(updateFile);

      setDocumentPreviews((prev) => ({
        ...prev,
        [title]: URL.createObjectURL(file),
      }));
    } catch (error) {
      console.error("Error occurred", error);
    }
  };

  const handleRemoveDocument = (title: string) => {
    setDocumentPreviews((prev) => ({
      ...prev,
      [title]: null,
    }));
  };

  const checkInRef = useRef<HTMLInputElement | null>(null);
  const checkOutRef = useRef<HTMLInputElement | null>(null);

  const { ref: registerCheckInRef, ...checkInRest } = register(
    "propertyInfo.checkin_time"
  );
  const { ref: registerCheckOutRef, ...checkOutRest } = register(
    "propertyInfo.checkout_time"
  );

  return (
    <div className="flex gap-5 flex-col w-full overflow-x-hidden ">
      <div className="font-medium text-[1rem] text-primary-dark">
        <span>Basic Info</span>
      </div>
      <div className="flex flex-col flex-wrap gap-4">
        {/* Property type */}
        <div className="flex flex-col flex-wrap gap-4">
          {isLoading ? (
            <div>Loading property types...</div>
          ) : propertyTypeList?.length ? (
            <PropertyTypes propertyTypeList={propertyTypeList} />
          ) : (
            <div>No property types available.</div>
          )}
        </div>

        {/* Property name and size */}
        <div className="flex gap-3 flex-col w-full lg:flex-row lg:items-center">
          <div className="flex-grow gap-2  w-full flex flex-col">
            <Label htmlFor="" className="text-gray-dark" required>
              Property Name
            </Label>
            <Input
              className="border rounded-sm w-full"
              placeholder="Property name"
              {...register("propertyInfo.name")}
            />
            {errors?.name && (
              <p className="error text-red-500">{errors?.name.message}</p>
            )}
          </div>
          <div className="w-[10rem] flex flex-col gap-2">
            <Label htmlFor="" required>
              Property Size
            </Label>
            <div className="relative flex items-center border rounded-sm">
              <Input
                type="number"
                className=" rounded-sm outline-none border-none w-full"
                placeholder="size"
                {...register("propertyInfo.size", {
                  valueAsNumber: true,
                })}
              />
              <div className="border-l pl-2 text-gray  top-2 right-4 pr-2">
                sqm
              </div>
            </div>
            {errors?.size && (
              <p className="error text-red-500">{errors?.size.message}</p>
            )}
          </div>
        </div>

        {/* Upload photos */}
        <UploadImages />
        {/* property websites  */}
        <div className="flex flex-col lg:flex-row md:items-start w-full gap-3 lg:items-center">
          <div className="flex-grow gap-2 w-full flex flex-col">
            <Label htmlFor="" className="text-gray-dark" required>
              Property Website
            </Label>
            <Input
              className="border rounded-sm w-full py-2.5"
              placeholder="Property website"
              {...register("propertyInfo.website")}
            />
            {errors?.website && (
              <p className="error text-red-500">{errors?.website.message}</p>
            )}
          </div>
          <div className="w-[15rem]  flex justify-start items-start flex-col gap-2">
            <Label htmlFor="" required>
              Check In- Check Out
            </Label>
            <div className="flex flex-col w-full md:flex-row items-start border rounded-sm">
              <div>
                <Input
                  type="time"
                  defaultValue="14:00"
                  ref={(el) => {
                    checkInRef.current = el;
                    registerCheckInRef(el);
                  }}
                  onClick={() => checkInRef.current?.showPicker()}
                  className="border border-gray-300 rounded-sm w-full cursor-pointer"
                  placeholder="Check In"
                  {...checkInRest}
                />
              </div>
              <Separator
                orientation="vertical"
                className="w-full md:w-[2px] my-1 h-[1px] lg:h-[2rem] bg-gray"
              ></Separator>
              <Input
                type="time"
                defaultValue="12:00"
                className="border-none rounded-sm w-full"
                placeholder="Check Out"
                ref={(el) => {
                  checkOutRef.current = el;
                  registerCheckOutRef(el);
                }}
                onClick={() => checkOutRef.current?.showPicker()}
                {...checkOutRest}
              />
            </div>
            {errors?.checkin_time && (
              <p className="error text-red-500">
                {errors?.checkin_time.message}
              </p>
            )}
            {errors?.checkout_time && (
              <p className="error text-red-500">
                {errors?.checkout_time.message}
              </p>
            )}
          </div>
        </div>

        {/* Upload legal documents */}
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[1rem] w-full mb-2 font-medium text-primary-dark">
              Upload Legal Documents
            </span>
            <Icon
              name="info"
              title="Upload documents like PAN Card, VAT, Company Registration Document"
              className="text-gray w-full h-full"
            />
          </div>

          <div className="flex flex-col gap-4">
            {/* Example Document: Citizenship */}
            <div className="flex flex-col lg:flex-row items-start gap-4 ">
              <div>
                <div className="flex gap-2">
                  <CheckboxWithLabel label="Business Identification Number (e.g., ABN, PAN)" />{" "}
                  <span className="text-red-500">*</span>
                </div>
                <div className="text-red-500">
                  {errors?.legal_documents?.message}
                </div>
              </div>
              <div className="flex gap-2 ">
                <div
                  className={`w-[10rem] h-[4.25rem] flex-wrap flex-col justify-center items-center border-dashed border rounded-md ${
                    documentPreviews["citizenship"] ? "p-0 border-none" : "p-2"
                  }`}
                >
                  {documentPreviews["citizenship"] ? (
                    <img
                      src={documentPreviews["citizenship"]}
                      alt="Citizenship"
                      className="w-full h-full"
                    />
                  ) : (
                    <label
                      htmlFor="upload-citizenship"
                      className="flex flex-col justify-center items-center w-full h-full cursor-pointer"
                    >
                      <Icon name="photo" className="text-gray" />
                      <span className="text-gray">Upload photo here</span>
                    </label>
                  )}
                  <input
                    id="upload-citizenship"
                    type="file"
                    className="hidden"
                    onChange={(e) => handleDocumentUpload(e, "citizenship")}
                  />
                </div>
                <Icon
                  className="text-gray cursor-pointer"
                  name="delete"
                  onClick={() => handleRemoveDocument("citizenship")}
                />
              </div>
            </div>

            {/* Example Document: Company Registration */}
            <div className="flex items-start flex-col lg:flex-row gap-4">
              <CheckboxWithLabel label="Company Registration Certificate" />
              <Input
                className="border rounded-sm w-[17rem]"
                placeholder="Company Registration Certificate"
                {...register("propertyInfo.documentName")}
              />
              <div className="flex gap-2">
                <div
                  className={`w-[10rem] h-[4.25rem] flex flex-col justify-center items-center border-dashed border rounded-md ${
                    documentPreviews["company_registration"]
                      ? "p-0 border-none"
                      : "p-2"
                  }`}
                >
                  {documentPreviews["company_registration"] ? (
                    <img
                      src={documentPreviews["company_registration"]}
                      alt="Company Registration"
                      className="w-full h-full"
                    />
                  ) : (
                    <label
                      htmlFor="upload-company-registration"
                      className="flex flex-col justify-center items-center w-full h-full cursor-pointer"
                    >
                      <Icon name="photo" className="text-gray" />
                      <span className="text-gray">Upload photo here</span>
                    </label>
                  )}
                  <input
                    id="upload-company-registration"
                    type="file"
                    className="hidden"
                    onChange={(e) =>
                      handleDocumentUpload(e, "company_registration")
                    }
                  />
                </div>
                <Icon
                  className="text-gray cursor-pointer"
                  name="delete"
                  onClick={() => handleRemoveDocument("company_registration")}
                />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <span className="underline text-primary pl-6">
              Add more documents
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyInfo;
