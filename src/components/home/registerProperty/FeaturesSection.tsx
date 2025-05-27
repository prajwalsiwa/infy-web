import buildingImage from "@/assets/Images/building.png";
import walletImage from "@/assets/Images/wallet.png";
import globalImage from "@/assets/Images/global.png";

const FeaturesSection = () => {
  return (
    <div className="flex flex-col items-center justify-center ">
      <h2 className="text-primary-dark text-[2.25rem] leading-[2.25rem] font-medium text-center">
        Why Choose Us
      </h2>
      <div className="flex flex-wrap justify-center gap-y-12 mt-8">
        {/* Feature 1 */}
        <div className="w-full md:w-1/2 lg:w-1/3 px-3 flex flex-col items-center">
          <img src={buildingImage} alt="Be in control" className="w-44" />
          <h3 className="text-primary-dark text-[1.5rem] leading-[1.5rem] font-semibold mt-6">
            Be in control
          </h3>
          <p className="text-gray-dark text-[1.25rem] leading-[1.255rem] font-normal text-center mt-6">
            Set your rates and control your Hotel rental schedule
          </p>
        </div>
        {/* Feature 2 */}
        <div className="w-full md:w-1/2 lg:w-1/3 px-3 flex flex-col items-center">
          <img src={walletImage} alt="Business Growth" className="w-44" />
          <h3 className="text-primary-dark text-[1.5rem] leading-[1.5rem] font-semibold mt-6">
            Business Growth
          </h3>
          <p className="text-gray-dark text-[1.25rem] leading-[1.255rem] font-normal text-center mt-6">
            Get 2x revenue jump through with the increase of travelers to you
          </p>
        </div>
        {/* Feature 3 */}
        <div className="w-full md:w-1/2 lg:w-1/3 px-3 flex flex-col items-center">
          <img src={globalImage} alt="Exposure" className="w-44" />
          <h3 className="text-primary-dark text-[1.5rem] leading-[1.5rem] font-semibold mt-6">
            Exposure to world of travelers
          </h3>
          <p className="text-gray-dark text-[1.25rem] leading-[1.255rem] font-normal text-center mt-6">
            Reach more customer with the help of our listing
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
