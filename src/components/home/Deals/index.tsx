import dealsBanner from "@/assets/Images/dealsBanner.png";
import deals from "@/assets/Images/deals.png";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function Deals() {
  const navigate = useNavigate();

  return (
    <div className="w-full relative px-[1.5rem] md:px-[4rem] lg:px-[6rem] rounded-3xl overflow-hidden mt-10">
      {/* Parent container for the banner */}
      <div className="relative">
        {/* Deals Banner */}
        <img
          src={dealsBanner}
          alt="Deals Banner"
          className="w-full object-cover h-[12.5rem] md:h-[18.75rem] lg:h-[25rem] rounded-3xl"
        />

        {/* Overlay Image */}
        <img
          src={deals}
          alt="Deals"
          className="absolute top-[1rem] md:top-[2rem] left-[1rem] md:left-[1.5rem] w-[7rem] md:w-[7.5rem] lg:w-[22.375rem] object-contain"
        />

        {/* Text and Button Section */}
        <div className="absolute flex flex-col items-start gap-[1rem] bottom-[3rem] md:bottom-[5rem] left-[1.5rem] md:left-[2rem] lg:left-[5rem]">
          <div className="text-[1.125rem] md:text-[1.5rem] lg:text-[1.875rem] text-primary-dark font-semibold">
            Upto 20%-50% Off
          </div>
          <Button
            onClick={() => navigate("/top-deals")}
            className="px-[1.5rem] md:px-[2.5rem] py-[0.75rem] md:py-[1.5rem] rounded-3xl text-[0.875rem] md:text-[1rem]"
          >
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Deals;
