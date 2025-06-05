/* eslint-disable no-console */
/* eslint-disable max-lines */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Amenities from "@/components/ListYourProperty/CompleteListing/Amenities";
import Location from "@/components/ListYourProperty/CompleteListing/Location/Location";
import Membership from "@/components/ListYourProperty/CompleteListing/Membership";
import OtherInfo from "@/components/ListYourProperty/CompleteListing/OtherInfo";
import Policy from "@/components/ListYourProperty/CompleteListing/Policy";
import PropertyInfo from "@/components/ListYourProperty/CompleteListing/PropertyInfo/PropertyInfo";
import SteeperIndicator from "@/components/shared/SteeperIndicator";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import {
  useSubmitAddRoomMutation,
  useSubmitAmenitiesMutation,
  useSubmitDetailsMutation,
  useSubmitLocationMutation,
  useSubmitMembershipPlanMutation,
  useSubmitOtherInfoMutation,
  useSubmitPoliciesMutation,
  useSubmitPropertyInfoMutation,
} from "@/redux/services/listYourPropertyApi";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { validateForm } from "./validateForm";
import Submit from "@/components/ListYourProperty/CompleteListing/Submit/Submit";
import { useNavigate } from "react-router-dom";
import Rooms from "@/components/ListYourProperty/CompleteListing/Rooms";

// Define types for each form section
export interface AddRoomData {
  name: string;
  size: number;
  room_numbers: number[];
  amenities: number[];
  number_of_beds: { name: string; quantity: number }[];
  photo_url: { name: string; url: string; favourite: boolean }[];
  price: number;
  children: number;
  adults: number;
  infants: number;
}

export interface FormValues {
  propertyInfo: any;
  location: any;
  amenities: any;
  roomInfo: AddRoomData[];
  policy: any;
  otherInfo: any;
  membership: any;
  submit: any;
}

const tabList = [
  { tabNumber: 1, label: "Property Info" },
  { tabNumber: 2, label: "Location" },
  { tabNumber: 3, label: "Amenities" },
  { tabNumber: 4, label: "Add Room" },
  { tabNumber: 5, label: "Policy" },
  { tabNumber: 6, label: "Other Info" },
  { tabNumber: 7, label: "Membership" },
  { tabNumber: 8, label: "Submit" },
];

function CompleteListing() {
  const [activeTab, setActiveTab] = useState(0);
  const [propertyId, setPropertyId] = useState<number | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const methods = useForm<FormValues>({
    defaultValues: {
      propertyInfo: {},
      location: {},
      amenities: {},
      roomInfo: [],
      policy: {},
      otherInfo: {},
      membership: {},
      submit: {},
    },
    mode: "onSubmit",
    resolver: validateForm,
  });

  const { getValues } = methods;
  const propertyInfoValues = getValues("propertyInfo");
  const locationInfo = getValues("location");
  const addRoomInfoValues = getValues("roomInfo");

  console.log(addRoomInfoValues, "room infor values");
  const amenities = getValues("amenities");
  const policies = getValues("policy");
  const otherInfo = getValues("otherInfo");
  const membership = getValues("membership");
  console.log(membership, "membership values");

  // const { control } = methods;

  const [submitPropertyInfo, { isLoading: isPropertyInfoLoading }] =
    useSubmitPropertyInfoMutation();
  const [submitLocation, { isLoading: isLocationLoading }] =
    useSubmitLocationMutation();
  const [submitAmenities, { isLoading: isAmenitiesLoading }] =
    useSubmitAmenitiesMutation();
  const [submitAddRoom, { isLoading: isAddRoomLoading }] =
    useSubmitAddRoomMutation();
  const [submitPolicies, { isLoading: isPoliciesLoading }] =
    useSubmitPoliciesMutation();
  const [submitOtherInfo, { isLoading: isOtherInfoLoading }] =
    useSubmitOtherInfoMutation();

  const [submitMembership, { isLoading: isMembershipLoading }] =
    useSubmitMembershipPlanMutation();
  const [submitDetails, { isLoading: isDetailsLoading }] =
    useSubmitDetailsMutation();

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <PropertyInfo
            errors={methods.formState?.errors?.propertyInfo ?? {}}
          />
        );
      case 1:
        return <Location errors={methods.formState?.errors?.location ?? {}} />;
      case 2:
        return <Amenities />;
      case 3:
        return (
          <Rooms
            propertyId={propertyId} // errors={methods.formState?.errors?.addRoom ?? {}}
          />
        );
      case 4:
        return <Policy />;
      case 5:
        return <OtherInfo />;
      case 6:
        return <Membership />;
      case 7:
        return <Submit propertyId={propertyId} />;
      default:
        return null;
    }
  };

  const tabHandlers: { [key: number]: () => Promise<void> } = {
    0: async () => {
      // Property Info
      if (propertyInfoValues) {
        try {
          const response = await submitPropertyInfo(
            propertyInfoValues
          ).unwrap();
          // Move to the next tab
          if (activeTab < tabList.length - 1) {
            setActiveTab((prev) => prev + 1);
          }
          const newPropertyId = response.id;
          setPropertyId(newPropertyId);
          localStorage.setItem("propertyId", newPropertyId.toString());
          toast({
            title: "Submission Successful",
            description: "Property Info submitted successfully.",
            variant: "success",
          });
        } catch (error) {
          toast({
            title: "Submission Failed",
            description: "Error submitting property info. Please try again.",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
            variant: "destructive",
          });
          console.error("Error submitting property info:", error);
        }
      }
    },
    1: async () => {
      if (locationInfo && propertyId) {
        try {
          const transformedLocation = {
            city: locationInfo.city,
            street_name: locationInfo.streetName,
            street_no: locationInfo.streetNo,
            country: locationInfo.country,
            zip_code: locationInfo.postalCode,
            additional_information: locationInfo.chowk,
            latitude: locationInfo.latitude,
            longitude: locationInfo.longitude,
            property: propertyId,
          };

          await submitLocation(transformedLocation).unwrap();
          // Move to the next tab
          if (activeTab < tabList.length - 1) {
            setActiveTab((prev) => prev + 1);
          }
          toast({
            title: "Submission Successful",
            description: "Location Info submitted successfully.",
            variant: "success",
          });
        } catch (error) {
          toast({
            title: "Submission Failed",
            description: "Error submitting Location. Please try again.",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
            variant: "destructive",
          });
          console.error("Error submitting location", error);
        }
      }
    },
    2: async () => {
      if (amenities && propertyId) {
        try {
          const formattedAmenities = Array.isArray(amenities) ? amenities : [];

          await submitAmenities({
            property: propertyId,
            amenities: formattedAmenities,
          }).unwrap();
          // Move to the next tab
          if (activeTab < tabList.length - 1) {
            setActiveTab((prev) => prev + 1);
          }
          toast({
            title: "Submission Successful",
            description: "Amenities submitted successfully.",
            variant: "success",
          });
        } catch (error) {
          toast({
            title: "Submission Failed",
            description: "Error submitting Amenities. Please try again.",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
            variant: "destructive",
          });
          console.error("Error submitting amenities:", error);
        }
      }
    },
    3: async () => {
      const addRooms = getValues("roomInfo");

      if (addRooms && propertyId) {
        try {
          for (const room of addRooms) {
            await submitAddRoom({
              organisation: propertyId,
              name: room.name,
              size: room.size,
              room_numbers: room.room_numbers,
              amenities: room.amenities,
              number_of_beds: room.number_of_beds,
              photo_url: room.photo_url,
              price: room.price || 0,
              children: room.children || 0,
              adults: room.adults || 0,
              infants: room.infants || 0,
            }).unwrap();
          }

          if (activeTab < tabList.length - 1) {
            setActiveTab((prev) => prev + 1);
          }

          toast({
            title: "All Rooms Submitted",
            description: `${addRooms.length} rooms submitted successfully.`,
            variant: "success",
          });
        } catch (error) {
          toast({
            title: "Submission Failed",
            description:
              "Error submitting one or more rooms. Please try again.",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
            variant: "destructive",
          });
          console.error("Error submitting one of the rooms:", error);
        }
      }
    },
    4: async () => {
      if (policies && propertyId) {
        try {
          await submitPolicies({ property: propertyId, ...policies }).unwrap();
          // Move to the next tab
          if (activeTab < tabList.length - 1) {
            setActiveTab((prev) => prev + 1);
          }
          toast({
            title: "Submission Successful",
            description: "Policies submitted successfully.",
            variant: "success",
          });
        } catch (error) {
          toast({
            title: "Submission Failed",
            description: "Error submitting Policies. Please try again.",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
            variant: "destructive",
          });
          console.error("Error submitting policies", error);
        }
      }
    },
    5: async () => {
      if (otherInfo && propertyId) {
        try {
          await submitOtherInfo({
            property: propertyId,
            ...otherInfo,
          }).unwrap();
          // Move to the next tab
          if (activeTab < tabList.length - 1) {
            setActiveTab((prev) => prev + 1);
          }
          toast({
            title: "Submission Successful",
            description: "Other Info submitted successfully.",
            variant: "success",
          });
        } catch (error) {
          toast({
            title: "Submission Failed",
            description: "Error submitting Other info. Please try again.",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
            variant: "destructive",
          });
          console.error("Error submitting Other info", error);
        }
      }
    },
    6: async () => {
      if (!propertyId) return;

      try {
        await submitMembership({
          property: propertyId,
          membership: membership?.membership || null, // safer access
        }).unwrap();

        if (activeTab < tabList.length - 1) {
          setActiveTab((prev) => prev + 1);
        }

        toast({
          title: "Submission Successful",
          description: "Membership submitted successfully.",
          variant: "success",
        });
      } catch (error) {
        toast({
          title: "Submission Failed",
          description: "Error submitting Membership. Please try again.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
          variant: "destructive",
        });
        console.error("Error submitting membership", error);
      }
    },
    7: async () => {
      if (propertyId) {
        try {
          await submitDetails({
            is_accepted: true,
            property: propertyId,
          }).unwrap();

          // Move to the next tab if submission is successful
          if (activeTab < tabList.length - 1) {
            setActiveTab((prev) => prev + 1);
          }

          // Success Toast with updated description
          toast({
            title: "Submission Successful",
            description:
              "Your information has been submitted successfully. Moving to the next step.",
            variant: "success",
          });
          navigate("/list-your-property/property-list");
        } catch (error) {
          // Error Toast with updated description
          toast({
            title: "Submission Failed",
            description:
              "There was an issue submitting your information. Please try again.",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
            variant: "destructive",
          });
          console.error("Error submitting details", error);
        }
      }
    },
  };

  const handleTabChange = async () => {
    // Call the handler for the current active tab if it exists

    await methods.trigger();

    if (tabHandlers[activeTab]) {
      await tabHandlers[activeTab]();
    }
  };

  // Load `propertyId` from localStorage on component mount
  useEffect(() => {
    const savedPropertyId = localStorage.getItem("propertyId");
    if (savedPropertyId) {
      setPropertyId(Number(savedPropertyId));
    }
  }, []);

  const isAnyLoading =
    isPropertyInfoLoading ||
    isLocationLoading ||
    isAmenitiesLoading ||
    isAddRoomLoading ||
    isPoliciesLoading ||
    isOtherInfoLoading ||
    isMembershipLoading ||
    isDetailsLoading;

  return (
    <div className="flex flex-col  h-screen overflow-hidden justify-center items-center pt-8">
      <div className="w-full px-8 mt-16 sm:mt-0">
        <h1 className="md:hidden block text-[1.5rem] text-gray-dark font-semibold">
          List your property
        </h1>
      </div>
      <div className="pt-6 w-full gap-3  h-[calc(100vh-10rem)] sm:h-full flex  md:justify-center md:items-center  md:flex-col">
        <div className="px-8 md:px-16 lg:px-16 flex-1 h-full flex flex-col gap-6">
          {/* Header Section */}
          <div>
            <h1 className="md:block hidden text-[1.5rem] text-gray-dark font-semibold">
              List your property
            </h1>
          </div>

          {/* Stepper Section */}
          <div className="flex justify-center h-full">
            <SteeperIndicator
              activeTab={tabList[activeTab]}
              tabList={tabList}
            />
          </div>
        </div>

        <FormProvider {...methods}>
          <div
            className="h-full  overflow-auto scroll-area-vertical  
               lg:w-[calc(100vw-30rem)] 
               md:w-[calc(100vw-20rem)] 
               sm:w-[calc(100vw-20rem)] 
               w-full 
               py-4 md:pr-0  "
          >
            <div className="pr-6">{renderContent()}</div>
          </div>
        </FormProvider>

        {/* Footer Section */}
        <div className="hidden sm:flex w-full border-t border-gray-200  items-center justify-between py-4 px-8 sm:px-24">
          <button
            type="button"
            className="text-gray hover:text-gray-dark cursor-pointer"
          >
            Save Draft and Exit
          </button>
          <div className="flex gap-2 items-start">
            {activeTab > 0 && (
              <Button
                className="px-8"
                variant="outline"
                onClick={() => setActiveTab((prev) => prev - 1)}
              >
                Previous
              </Button>
            )}
            <Button
              className="px-8 items-start"
              onClick={handleTabChange}
              disabled={isAnyLoading}
            >
              {isAnyLoading ? "Submitting data..." : "Next"}
            </Button>
          </div>
        </div>
      </div>
      <div className="flex sm:hidden w-full border-t border-gray-200  items-center justify-between py-4 px-8 sm:px-24">
        <button
          type="button"
          className="text-gray hover:text-gray-dark cursor-pointer"
        >
          Save Draft and Exit
        </button>
        <div className="flex gap-2 items-start">
          {activeTab > 0 && (
            <Button
              className="sm:px-8"
              variant="outline"
              onClick={() => setActiveTab((prev) => prev - 1)}
            >
              Previous
            </Button>
          )}
          <Button className="px-8 items-start" onClick={handleTabChange}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CompleteListing;
