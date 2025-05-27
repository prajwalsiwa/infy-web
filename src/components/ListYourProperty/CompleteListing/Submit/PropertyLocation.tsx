/* eslint-disable @typescript-eslint/no-explicit-any */
interface PropertyLocationProps {
    location: any;
  }
  
  function PropertyLocation({ location }: PropertyLocationProps) {
    return (
      <div>
        <div className="font-medium py-4 text-[1rem] text-primary-dark">
          <span>Property Location</span>
        </div>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-[150px_1fr] items-center gap-2 text-grey-700">
            <span className="font-medium">City:</span>
            <span className="text-gray-dark font-normal">
              {location?.city || "-"}
            </span>
          </div>
          <div className="grid grid-cols-[150px_1fr] items-center gap-2 text-grey-700">
            <span className="font-medium">Ward No:</span>
            <span className="text-gray-dark font-normal">
              {location?.street_no || "-"}
            </span>
          </div>
          <div className="grid grid-cols-[150px_1fr] items-center gap-2 text-grey-700">
            <span className="font-medium">Area Name:</span>
            <span className="text-gray-dark font-normal">
              {location?.street_name || "-"}
            </span>
          </div>
          <div className="grid grid-cols-[150px_1fr] items-center gap-2 text-grey-700">
            <span className="font-medium">Additional Info:</span>
            <span className="text-gray-dark font-normal">
              {location?.additional_information || "-"}
            </span>
          </div>
          <div className="grid grid-cols-[150px_1fr] items-center gap-2 text-grey-700">
            <span className="font-medium">On Map:</span>
            <span className="text-gray-dark font-normal underline">
              View on Map
            </span>
          </div>
        </div>
      </div>
    );
  }
  
  export default PropertyLocation;
  