/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { useEffect, useState, useCallback } from "react";
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

  // Destructure all needed values at once for optimization
  const {
    propertyInfo,
    location,
    roomInfo,
    amenities,
    policy,
    otherInfo,
    membership,
  } = methods.getValues();

  // Mutations
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

  // Helper: go to next tab
  const goToNextTab = useCallback(() => {
    setActiveTab((prev) => (prev < tabList.length - 1 ? prev + 1 : prev));
  }, []);

  // Toast helpers
  const showSuccessToast = useCallback((title: string, description: string) => {
    toast({ title, description, variant: "success" });
  }, [toast]);

  const showErrorToast = useCallback((title: string, description: string) => {
    toast({
      title,
      description,
      action: <ToastAction altText="Try again">Try again</ToastAction>,
      variant: "destructive",
    });
  }, [toast]);

  // Abstracted submit section helper
  const submitSection = useCallback(
    async (
      submitFn: (data: any) => any,
      data: any,
      successMsg: string,
      errorMsg: string
    ) => {
      try {
        await submitFn(data).unwrap();
        goToNextTab();
        showSuccessToast("Submission Successful", successMsg);
      } catch (error) {
        showErrorToast("Submission Failed", errorMsg);
        // Optionally log error
      }
    },
    [goToNextTab, showSuccessToast, showErrorToast]
  );

  // Tab handlers
  const tabHandlers: { [key: number]: () => Promise<void> } = {
    0: async () => {
      if (propertyInfo) {
        try {
          const response = await submitPropertyInfo(propertyInfo).unwrap();
          goToNextTab();
          const newPropertyId = response.id;
          setPropertyId(newPropertyId);
          localStorage.setItem("propertyId", newPropertyId.toString());
          showSuccessToast(
            "Submission Successful",
            "Property Info submitted successfully."
          );
        } catch (error) {
          showErrorToast(
            "Submission Failed",
            "Error submitting property info. Please try again."
          );
        }
      }
    },
    1: async () => {
      if (location && propertyId) {
        const transformedLocation = {
          city: location.city,
          street_name: location.streetName,
          street_no: location.streetNo,
          country: location.country,
          zip_code: location.postalCode,
          additional_information: location.chowk,
          latitude: location.latitude,
          longitude: location.longitude,
          property: propertyId,
        };
        await submitSection(
          submitLocation,
          transformedLocation,
          "Location Info submitted successfully.",
          "Error submitting Location. Please try again."
        );
      }
    },
    2: async () => {
      if (amenities && propertyId) {
        const formattedAmenities = Array.isArray(amenities) ? amenities : [];
        await submitSection(
          submitAmenities,
          { property: propertyId, amenities: formattedAmenities },
          "Amenities submitted successfully.",
          "Error submitting Amenities. Please try again."
        );
      }
    },
    3: async () => {
      if (roomInfo && propertyId) {
        try {
          for (const room of roomInfo) {
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
          goToNextTab();
          showSuccessToast(
            "All Rooms Submitted",
            `${roomInfo.length} rooms submitted successfully.`
          );
        } catch (error) {
          showErrorToast(
            "Submission Failed",
            "Error submitting one or more rooms. Please try again."
          );
        }
      }
    },
    4: async () => {
      if (policy && propertyId) {
        await submitSection(
          submitPolicies,
          { property: propertyId, ...policy },
          "Policies submitted successfully.",
          "Error submitting Policies. Please try again."
        );
      }
    },
    5: async () => {
      if (otherInfo && propertyId) {
        await submitSection(
          submitOtherInfo,
          { property: propertyId, ...otherInfo },
          "Other Info submitted successfully.",
          "Error submitting Other info. Please try again."
        );
      }
    },
    6: async () => {
      if (propertyId) {
        await submitSection(
          submitMembership,
          { property: propertyId, membership: membership?.membership || null },
          "Membership submitted successfully.",
          "Error submitting Membership. Please try again."
        );
      }
    },
    7: async () => {
      if (propertyId) {
        try {
          await submitDetails({
            is_accepted: true,
            property: propertyId,
          }).unwrap();
          goToNextTab();
          showSuccessToast(
            "Submission Successful",
            "Your information has been submitted successfully. Moving to the next step."
          );
          navigate("/list-your-property/property-list");
        } catch (error) {
          showErrorToast(
            "Submission Failed",
            "There was an issue submitting your information. Please try again."
          );
        }
      }
    },
  };

  const handleTabChange = async () => {
    await methods.trigger();
    if (tabHandlers[activeTab]) {
      await tabHandlers[activeTab]();
    }
  };

  // Load propertyId from localStorage on mount
  useEffect(() => {
    const savedPropertyId = localStorage.getItem("propertyId");
    if (savedPropertyId) {
      setPropertyId(Number(savedPropertyId));
    }
  }, []);

  // Consolidated loading state
  const isAnyLoading = [
    isPropertyInfoLoading,
    isLocationLoading,
    isAmenitiesLoading,
    isAddRoomLoading,
    isPoliciesLoading,
    isOtherInfoLoading,
    isMembershipLoading,
    isDetailsLoading,
  ].some(Boolean);

  // Memoized renderContent
  const renderContent = useCallback(() => {
    switch (activeTab) {
      case 0:
        return (
          <PropertyInfo errors={methods.formState?.errors?.propertyInfo ?? {}} />
        );
      case 1:
        return <Location errors={methods.formState?.errors?.location ?? {}} />;
      case 2:
        return <Amenities />;
      case 3:
        return <Rooms propertyId={propertyId} />;
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
  }, [activeTab, methods.formState?.errors, propertyId]);

  return (
    <div className="flex flex-col h-screen overflow-hidden justify-center items-center pt-8">
      <div className="w-full px-8 mt-16 sm:mt-0">
        <h1 className="md:hidden block text-[1.5rem] text-gray-dark font-semibold">
          List your property
        </h1>
      </div>
      <div className="pt-6 w-full gap-3 h-[calc(100vh-10rem)] sm:h-full flex md:justify-center md:items-center md:flex-col">
        <div className="px-8 md:px-16 lg:px-16 flex-1 h-full flex flex-col gap-6">
          <div>
            <h1 className="md:block hidden text-[1.5rem] text-gray-dark font-semibold">
              List your property
            </h1>
          </div>
          <div className="flex justify-center h-full">
            <SteeperIndicator activeTab={tabList[activeTab]} tabList={tabList} />
          </div>
        </div>

        <FormProvider {...methods}>
          <div
            className="h-full overflow-auto scroll-area-vertical  
               lg:w-[calc(100vw-30rem)] 
               md:w-[calc(100vw-20rem)] 
               sm:w-[calc(100vw-20rem)] 
               w-full 
               py-4 md:pr-0"
          >
            <div className="pr-6">{renderContent()}</div>
          </div>
        </FormProvider>

        {/* Footer Section */}
        <div className="w-full flex justify-end items-center px-8 py-4">
          <Button
            disabled={isAnyLoading}
            onClick={handleTabChange}
            className="ml-auto"
          >
            {activeTab === tabList.length - 1 ? "Finish" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CompleteListing;
