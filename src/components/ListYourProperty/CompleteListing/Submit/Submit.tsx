// src/components/Submit/Submit.tsx
import {
  useGetPropertyTypeListQuery,
  useGetSubmitDetailsQuery,
} from "@/redux/services/listYourPropertyApi";
import { skipToken } from "@reduxjs/toolkit/query";
import BasicInfo from "./BasicInfo";
import PropertyLocation from "./PropertyLocation";
import Rooms from "./Rooms";
import Amenities from "./Amenities";
import OtherInformation from "./OtherInformation";
import Policies from "./Policy";

interface submitProps {
  propertyId: number | null;
}

function Submit({ propertyId }: submitProps) {
  const { data: propertyTypeList } = useGetPropertyTypeListQuery();
  const { data: submitDetails } = useGetSubmitDetailsQuery(
    propertyId !== null ? { propertyId } : skipToken // Skip the query if `propertyId` is null
  );

  const propertyCategory = propertyTypeList?.find(
    (property) => property.id === submitDetails?.category
  );

  return (
    <div className="scrollbar overflow-auto">
      <BasicInfo
        propertyCategory={propertyCategory}
        submitDetails={submitDetails}
      />

      {submitDetails && <PropertyLocation location={submitDetails?.location} />}

      <Rooms rooms={submitDetails?.rooms || []} />
      <Amenities amenities={submitDetails?.amenities || []} />
      <OtherInformation
        nearbyAttractions={submitDetails?.nearby_attractions || []}
        description={submitDetails?.description || ""}
      />
      <Policies policies={submitDetails?.policies || []} />
    </div>
  );
}

export default Submit;
