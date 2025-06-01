import React from "react";

const CardSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse">
      <div className="relative sm:border z-10 bg-grey-100 sm:p-4">
        <div className="flex md:flex-row flex-col justify-between h-full relative z-10 gap-4">
          {/* Image Skeleton */}
          <div className="w-full md:w-[250px] h-[180px] bg-gray-200 rounded-md" />

          {/* Content Skeleton */}
          <div className="flex-grow space-y-3">
            <div className="w-3/4 h-5 bg-gray-200 rounded"></div>
            <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
            <div className="w-2/3 h-4 bg-gray-200 rounded"></div>
            <div className="flex gap-2 mt-2">
              <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
              <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
              <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
            </div>
          </div>

          {/* Price Skeleton */}
          <div className="w-[100px] space-y-3">
            <div className="w-full h-6 bg-gray-200 rounded"></div>
            <div className="w-full h-5 bg-gray-200 rounded"></div>
            <div className="w-full h-5 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
