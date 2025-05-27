/* eslint-disable @typescript-eslint/no-explicit-any */
interface BasicInfoProps {
  propertyCategory: any;
  submitDetails: any;
}

function BasicInfo({ propertyCategory, submitDetails }: BasicInfoProps) {
  return (
    <div>
      <div className="font-medium py-4 text-[1rem] text-primary-dark">
        <span>Basic Info</span>
      </div>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-[150px_1fr] items-center gap-2 text-grey-700">
          <span className="font-medium">Property Type:</span>
          <span className="text-gray-dark font-normal">
            {propertyCategory?.name || "-"}
          </span>
        </div>
        <div className="grid grid-cols-[150px_1fr] items-center gap-2 text-grey-700">
          <span className="font-medium">Property Name:</span>
          <span className="text-gray-dark font-normal">
            {submitDetails?.name || "-"}
          </span>
        </div>
        <div className="grid grid-cols-[150px_1fr] items-center gap-2 text-grey-700">
          <span className="font-medium">Property Size:</span>
          <span className="text-gray-dark font-normal">
            {submitDetails?.size || "-"} sqm
          </span>
        </div>
        <div className="grid grid-cols-[150px_1fr] items-start gap-2 text-grey-700">
          <span className="font-medium">Upload Photos:</span>
          <div className="flex flex-wrap gap-2">
            {submitDetails?.property_images?.length ? (
              submitDetails.property_images.map(
                (image: { image_url: string }, index: number) => (
                  <img
                    key={index}
                    src={image.image_url}
                    alt={`Property Image ${index + 1}`}
                    className="w-20 h-20 object-cover rounded"
                  />
                )
              )
            ) : (
              <span>No images available</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasicInfo;
