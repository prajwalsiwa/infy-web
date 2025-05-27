// src/components/Submit/OtherInformation.tsx

interface OtherInformationProps {
  nearbyAttractions: { name: string; distance: string }[];
  description: string;
}

const OtherInformation = ({
  nearbyAttractions,
  description,
}: OtherInformationProps) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="font-medium py-4 text-[1rem] text-primary-dark">
        <span>Other Information</span>
      </div>
      <div className="grid grid-cols-[150px_1fr]  gap-2 text-grey-700">
        <span className="font-medium">Nearby Attractions:</span>
        <div className="flex gap-12">
          <div>
            <span className="font-medium mb-2">Nearby Attractions</span>
            {nearbyAttractions.map((attraction, index) => (
              <div key={index}>
                <span>{attraction.name}</span>
              </div>
            ))}
          </div>
          <div>
            <span className="font-medium mb-2">Distance</span>
            {nearbyAttractions.map((attraction, index) => (
              <div key={index}>
                <span className="text-gray-light">
                  {attraction.distance} kms
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-[150px_1fr] items-center gap-2 text-grey-700">
        <span className="font-medium">Description:</span>
        <div className="flex gap-12">
          <span>{description || "-"}</span>
        </div>
      </div>
    </div>
  );
};

export default OtherInformation;
