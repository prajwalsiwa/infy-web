interface Attraction {
  name: string;
  distance: string;
}

interface AttractionsProps {
  image: string;
  attractionList: Attraction[];
}

function Attractions({ image, attractionList }: AttractionsProps) {
  return (
    <div className="space-y-2">
      <h1 className="font-medium text-2xl py-4 leading-[1.815625rem] text-[#353738]">
        Nearby Attractions
      </h1>
      <div className="flex flex-col lg:flex-row lg:h-[18.34rem] border rounded-2xl border-gray overflow-hidden">
        {/* Details Section */}
        <div className="p-4 lg:px-6 flex flex-col justify-between flex-grow overflow-y-auto">
          <div className="attraction-detail flex-grow">
            {attractionList.map((detail, index) => (
              <div
                className="flex justify-between py-2 border-b border-gray-200"
                key={index}
              >
                <span className="text-gray-dark text-sm sm:text-base">
                  {detail.name}
                </span>
                <span className="text-gray text-sm sm:text-base">
                  {detail.distance}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Map Section */}
        <div className="w-full lg:w-[23.19rem] h-[12rem] lg:h-[18.34rem]">
          <img
            src={image}
            alt="Attraction Map"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default Attractions;
