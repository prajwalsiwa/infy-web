// import bannerImage from "@/assets/Images/bannerlisturproperty.png";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAppSelector } from "@/redux/store";
import { useNavigate } from "react-router-dom";

const BannerSection = () => {
  const navigate = useNavigate();
  const {toast} = useToast();

   const { isAuthenticated } = useAppSelector((state) => state.auth);

  const handleClick = () => {
    if(isAuthenticated){
      navigate("/list-your-property/property-list");
    } else {
      toast({
        title: "Login Required",
        description: "Please log in to access that page.",
        variant: "destructive",
      });
    }
  };

  return (
    <div
      className="relative w-full"
      // style={{
      //   background: `url(${bannerImage}) 50% 40% / cover`,
      // }}
    >
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none"></div>
      <div className="flex flex-col items-start justify-center w-full max-w-screen-lg px-6 sm:px-40 py-24">
        <h1 className="text-[2.5rem] font-semibold text-gray-dark text-start leading-[1.2]">
          Grow your business <br />
          with us
        </h1>
        <p className="text-lg font-normal text-gray-dark text-start mt-8 leading-relaxed">
          List your property for Free in just 15 minutes <br />
          and get started today.
        </p>
        <Button
          className="mt-8 px-20 !py-8 bg-primary text-white text-lg font-medium rounded hover:bg-sky-600 cursor-pointer"
          onClick={handleClick}
        >
          Let’s get started
        </Button>
      </div>
    </div>
  );
};

export default BannerSection;
