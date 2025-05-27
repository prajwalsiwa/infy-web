interface UnlistedCardProps {
    cardType: string;
    title: string;
    location: string;
    reason?: string;
    imageSrc: string;
  }
  
  function UnlistedCard({
    cardType = "Pending on approval",
    title = "Default Villa Name",
    location = "Default Location",
    reason = "View Reason for Rejection",
    imageSrc = "https://cdn.pixabay.com/photo/2019/05/16/20/15/online-4208112_1280.jpg",
  }: UnlistedCardProps) {
    const isRejected = cardType === "Rejected";
    const isPending = cardType === "Pending on approval";
  
    return (
      <div className="flex flex-col w-72 h-fit rounded-lg overflow-hidden">
        {/* Image Section */}
        <div className="w-full overflow-hidden h-52">
          <img
            src={imageSrc}
            height={220}
            width={320}
            alt={title}
            className="object-cover w-full h-full"
          />
        </div>
  
        {/* Content Section with Border */}
        <div className="border border-gray-300 p-4 flex flex-col gap-2 rounded-b-lg">
          {/* Card Type */}
          <div
            className={`rounded-md border w-fit px-2 py-1 ${
              isRejected
                ? "border-red-500 text-red-400"
                : isPending
                ? "!border-yellow-500 !text-yellow-400"
                : "border-green-500 text-green-400"
            }`}
          >
            {cardType}
          </div>
  
          {/* Title and Location */}
          <div className="flex flex-col">
            <div>
              <span className="text-primary-dark font-semibold text-lg">
                {title}
              </span>
            </div>
            <div>
              <span className="text-gray">{location}</span>
            </div>
          </div>
  
          {/* Reason */}
          {isRejected && (
            <div className="flex justify-end">
              <span className="text-gray-dark underline cursor-pointer">
                {reason}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }
  
  export default UnlistedCard;
  