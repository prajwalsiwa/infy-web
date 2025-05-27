import Header from "@/components/layout/header";
import PropertyListings from "@/components/ListYourProperty/PropertyList/PropertyList";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function PropertyList() {
  const navigate = useNavigate()
  return (
    <div>
      <Header />
      <div className="lg:px-24 px-6 pt-12 flex flex-col gap-4  ">
        <div className="w-full flex justify-between items-center flex-wrap gap-2 sm:gap-0 ">
          <span className="text-[2rem] font-medium text-gray-dark">
            My Listings
          </span>
          <Button variant={"outline"} className="" onClick={()=> navigate('/list-your-property/complete-your-listing')}>
            Complete your listing
          </Button>
        </div>

        <PropertyListings />
      </div>
    </div>
  );
}

export default PropertyList;
