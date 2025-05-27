import { TabsContent } from "@radix-ui/react-tabs";
import { Tabs, TabsList, TabsTrigger } from "../../ui/tabs";
import UnlistedCard from "./UnlistedCard";
import ListedCard from "./LIstedCard";
import { useGetPropertyListingsQuery } from "@/redux/services/listYourPropertyApi";

// Define interfaces for API data
interface Location {
  city?: string;
  street_name?: string;
}

interface Property {
  property_status: string;
  name: string;
  location: Location;
  photo_url?: string;
}

interface UnlistedProperty {
  cardType: string;
  title: string;
  location: string;
  reason: string;
  imageSrc: string;
}

interface ListedProperty {
  title: string;
  location: string;
  imageSrc: string;
  ratings: number;
}

const tabList = [
  {
    id: 1,
    label: "Unlisted Properties",
    value: "unlisted",
  },
  {
    id: 2,
    label: "Listed Properties",
    value: "listed",
  },
];


function PropertyList() {
  const { data: list } = useGetPropertyListingsQuery();
  const results: Property[] | undefined = list?.results;

  const unlistedProperty: UnlistedProperty[] | undefined = results
  ?.filter((property) => property.property_status !== "Published")
  .map((property) => {
    const { property_status, name, location, photo_url } = property;

    return {
      cardType:
        property_status === "Draft" ? "Pending on approval" : property_status,
      title: name,
      location: `${location?.street_name || "Unknown street"}, ${
        location?.city || "Unknown city"
      }`,
      reason:
        property_status === "Rejected" ? "See why it was rejected" : "",
      imageSrc: photo_url || "https://via.placeholder.com/1920x1080",
    };
  });

const listedProperty: ListedProperty[] | undefined = results
  ?.filter((property) => property.property_status === "Published")
  .map((property) => {
    const { name, location, photo_url, ratings } = property;

    return {
      title: name,
      location: `${location?.street_name || "Unknown street"}, ${
        location?.city || "Unknown city"
      }`,
      imageSrc: photo_url || "https://via.placeholder.com/1920x1080",
      ratings: ratings || 0, // Fallback to 0 if ratings are not available
    };
  });

  return (
    <div className="w-full">
      <Tabs
        defaultValue="unlisted"
        className="w-full flex flex-wrap flex-col gap-4 items-start"
      >
        <TabsList>
          {tabList.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.value}
              className="hover:!bg-sky-200"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="unlisted" className="flex flex-wrap w-full gap-6">
          {unlistedProperty?.map((property) => (
            <UnlistedCard
              key={property.title}
              cardType={property.cardType}
              title={property.title}
              location={property.location}
              imageSrc={property.imageSrc}
            />
          ))}
        </TabsContent>
        <TabsContent value="listed" className="flex w-full gap-6 flex-wrap">
          {listedProperty?.map((property) => (
            <ListedCard
              key={property.title}
              title={property.title}
              location={property.location}
              imageSrc={property.imageSrc}
              ratings={property.ratings}
            />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default PropertyList;
