import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GuestPicker } from "../../ui/guest-picker";
import { CheckInOutPicker } from "../../ui/check-in-out-picker";
import { LocationPicker } from "../../ui/location-picker";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Separator } from "@/components/ui/Separator";
import { addDays } from "date-fns";

type tabList = {
  id: number;
  label: string;
  value: string;
};

interface SearchBoxProps {
  tabList: tabList[];
}

function SearchBox({ tabList }: SearchBoxProps) {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "stays";
  const navigate = useNavigate();

  const selectedValue = searchParams.get("city") || "";
  const checkin_date = searchParams.get("checkin_date");
  const checkout_date = searchParams.get("checkout_date");

  const guestValues = {
    adults: parseInt(searchParams.get("adults") || "1"),
    children: parseInt(searchParams.get("children") || "0"),
    infants: parseInt(searchParams.get("infants") || "0"),
  };

  const parsedDateRange = {
    from: checkin_date ? new Date(checkin_date) : new Date(),
    to: checkout_date ? new Date(checkout_date) : addDays(new Date(), 1),
  };

  return (
    <div className="container">
      <Tabs
        defaultValue={activeTab}
        className="w-full "
        onValueChange={(val) => {
          if (val !== "stays") {
            navigate(`/search/package-list?tab=${val}`);
          } else {
            navigate(`/search/hotel-list?tab=${val}`);
          }
        }}
      >
        <TabsList>
          {tabList.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="text-white hover:text-primary"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="stays" className="w-full ">
          {/* Search Container */}
          <div className=" grid grid-cols-[80%_20%] py-4 w-full rounded-lg ">
            <div className="bg-white flex  py-2  rounded-l-lg w-full h-20">
              {/* Location Search */}
              <div className="h-full">
              <LocationPicker selectedValue={selectedValue} setSelectedValue={() => {}} />
              </div>
              <Separator orientation="vertical" />

              {/* Date Range */}
              <div className="">
              <CheckInOutPicker date={parsedDateRange} setDate={() => {}} />
              </div>
              <Separator orientation="vertical" />
              {/* Guest Input */}
              <div className="h-full">
              <GuestPicker values={guestValues} onChange={() => {}} />
              </div>

              {/* Search Button */}
            </div>
            <button className="bg-primary text-white px-6 rounded-r-md">
              Search
            </button>
          </div>
        </TabsContent>
        <TabsContent value="packages">
          {/* Search Container */}
          <div className=" grid grid-cols-[80%_20%] h-full py-4 w-full rounded-lg">
            <div className="search-input-container py-2 grid grid-cols-2 border rounded-l-lg w-full h-20">
              {/* Location Search */}
              <div className="h-full">
              <LocationPicker selectedValue={selectedValue} setSelectedValue={() => {}} />
              </div>

              {/* Date Range */}
              {/* <div>
                <CheckInOutPicker />
              </div> */}

              {/* Guest Input */}

              {/* Search Button */}
            </div>
            <button className="bg-primary text-white px-6 rounded-r-md">
              Search
            </button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default SearchBox;
