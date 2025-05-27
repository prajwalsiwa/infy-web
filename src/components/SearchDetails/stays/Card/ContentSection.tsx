import React from "react";
import ServiceContainer from "./ServiceContainer";
import Icon from "@/components/ui/Icon";

interface Service {
  id: number;
  title: string;
  category: string;
  amenities_for: string;
  icon: string | null;
}

interface ContentSectionProps {
  title: string;
  location: string;
  ratingCount: number;
  serviceList: Service[];
  type: string;
}

const ContentSection: React.FC<ContentSectionProps> = ({
  title,
  location,
  ratingCount,
  serviceList,
  type,
}) => {
  return (
    <div className="content px-4 py-2  sm:py-0 justify-start items-start  w-full  sm:h-[13.6rem] overflow-hidden  flex flex-grow flex-col">
      <div className="title">
        <span className="font-medium text-sky-900 sm:text-[1.3125rem]  text-[1.1rem] leading-[1.588rem]">
          {title}
        </span>
      </div>
      <div className="location flex flex-col sm:h-full  h-fit sm:justify-between gap-2 sm:gap-0">
        <div className="flex flex-col  w-full gap-1 items-start justify-start">
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-start">
              <Icon
                name="location_on"
                className="text-primary"
                iconSymbolType="material-icons"
              />
              <span className="font-normal text-[#2497EB] sm:text-[0.875rem] text-[0.75rem] leading-[1.3125rem]">
                {location}
              </span>
            </div>
            <div className="flex justify-start  w-full h-full">
              {Array.from({ length: ratingCount }, (_, index) => (
                <Icon
                  key={index}
                  name="star"
                  className="text-gold text-[1.25rem]"
                  iconSymbolType="material-icons"
                />
              ))}
            </div>
          </div>
          <div className="w-full flex-wrap sm:h-[3.8rem] sm:flex hidden h-fit overflow-hidden  gap-1">
            {serviceList.map((service, index) => (
              <ServiceContainer key={index} service={service.title} />
            ))}
          </div>
        </div>
        <div className="hotel-type sm:block hidden border rounded-3xl px-4 py-1 bg-slate-300 text-primary-dark w-fit">
          {type}
        </div>
      </div>
    </div>
  );
};

export default ContentSection;
