import { CheckInOutPicker } from "@/components/ui/check-in-out-picker";
import { GuestPicker } from "@/components/ui/guest-picker";
import { LocationPicker } from "@/components/ui/location-picker";
import MobileSearch from "@/components/ui/MobileSearch/MobileSearch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { addDays } from "date-fns";
import { SetStateAction, useCallback, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Banner = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedValue, setSelectedValue] = useState("");
  const defaultDateRange = useMemo(() => ({
    from: addDays(new Date(), 1),
    to: addDays(new Date(), 2),
  }), []);

  const [date, setDate] = useState(defaultDateRange);

  const activeTab = searchParams.get("tab") || "stays";

  const navigate = useNavigate();
  const handleValueChange = useCallback((val: string) => {
    setSearchParams({ tab: val });
  }, [setSearchParams]);

  const formatDate = useCallback((date: Date) => date.toISOString().split("T")[0], []);

  const [guestValues, setGuestValues] = useState({
    adults: 0,
    children: 0,
    infants: 0,
  });

  const handleGuestChange = useCallback((updatedValues: SetStateAction<{ adults: number; children: number; infants: number; }>) => {
    setGuestValues(updatedValues);
  }, []);

  const handleSearch = useCallback(() => {
    const city = selectedValue?.split(", ").pop() || "";
    const checkin_date = formatDate(date.from);
    const checkout_date = formatDate(date.to);
  
    const params = new URLSearchParams({
      tab: "stays",
      city,
      checkin_date,
      checkout_date,
      adults: guestValues.adults.toString(),
      children: guestValues.children.toString(),
      infants: guestValues.infants.toString(),
    });
  
    navigate(`/search/hotel-list?${params.toString()}`);
  }, [selectedValue, date, guestValues, navigate, formatDate]);
  
  return (
    <section className="banner md:px-24 sm:px-10 px-6 w-full bg-[url('/banner.jpg')] bg-no-repeat bg-center bg-cover">
      <div className="relative z-10">
        <h1 className="text-gray-dark max-w-lg">
          Explore{" "}
          <span className="inline-block text-primary-dark underline underline-offset-8">
            New Experience
          </span>{" "}
          with us
        </h1>

        <h5 className="mt-8 text-gray-dark">
          Find the best stay and your dream vacation.
        </h5>

        <div className="mt-12 p-6 rounded-lg bg-white/20 w-fit border">
          <Tabs
            defaultValue={activeTab}
            onValueChange={handleValueChange}
            className="w-full"
          >
            <TabsList>
              <TabsTrigger value="stays">Stays</TabsTrigger>
              <TabsTrigger value="packages">Packages</TabsTrigger>
            </TabsList>
            <TabsContent value="stays" className="!w-full flex">
              {/* Search Container */}
              <div className="w-full hidden lg:block">
                <div className="mt-3 inline-flex p-4 rounded-lg bg-white/20 border">
                  <div className="search-input-container flex border rounded-l-lg w-max">
                    {/* Location Search */}
                    <div>
                      <LocationPicker
                        selectedValue={selectedValue}
                        setSelectedValue={setSelectedValue}
                      />
                    </div>

                    {/* Date Range */}
                    <div>
                      <CheckInOutPicker date={date} setDate={setDate} />
                    </div>
                    {/* Guest Input */}
                    <div className="h-full">
                      <GuestPicker values={guestValues} onChange={handleGuestChange} />
                    </div>

                    {/* Search Button */}
                    <button
                      className="bg-primary text-white px-6 rounded-r-md"
                      onClick={handleSearch}
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
              <div className="lg:hidden block w-full">
                <MobileSearch />
              </div>
            </TabsContent>
            <TabsContent value="packages">
              {/* Search Container */}
              <div className="mt-3 inline-flex p-4 rounded-lg bg-white/20 border">
                <div className="search-input-container flex border rounded-l-lg w-max">
                  {/* Location Search */}
                  <div>
                    <LocationPicker
                      selectedValue={selectedValue}
                      setSelectedValue={setSelectedValue}
                    />
                  </div>

                  {/* Date Range */}
                  <div>
                    <CheckInOutPicker date={undefined} setDate={undefined} />
                  </div>

                  {/* Guest Input */}

                  {/* Search Button */}
                </div>
                <button
                  className="bg-primary text-white px-6 rounded-r-md"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default Banner;
