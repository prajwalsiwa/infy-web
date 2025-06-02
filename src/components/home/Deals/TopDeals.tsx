import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/components/ui/tabs";
import HotelDeals from "./HotelDeals/HotelDeals";
// import InfytripDeals from "./InfytripDeals/InfytripDeals"; // Not recommended as for now

function TopDeals() {
  return (
    <div className="xl:px-20 px-6 flex flex-col justify-start items-start gap-4 w-full">
      <p className="text-[2rem] font-medium text-gray-dark">Top Deals</p>
      <Tabs
        defaultValue="hotel"
        className="w-full flex items-start flex-col justify-start gap-2"
      >
        <TabsList className="flex gap-2 w-full items-start justify-start">
          <TabsTrigger value="hotel" className="font-normal">
            Deals on Hotels
          </TabsTrigger>
          {/* <TabsTrigger value="infytrip" className="font-normal">
            Infytrip Deals
          </TabsTrigger> */}
        </TabsList>
        <TabsContent value="hotel">
          <HotelDeals />
        </TabsContent>
        {/* <TabsContent value="infytrip">
          <InfytripDeals />
        </TabsContent> */}
      </Tabs>
    </div>
  );
}

export default TopDeals;
