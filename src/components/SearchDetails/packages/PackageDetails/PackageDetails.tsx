import { imageList } from "@/lib/constants/hoteDetails";
import ImageSection from "../../ui/DetailSection/ImageSection";
import { useState } from "react";
import DetailHeader from "../../ui/DetailSection/DetaiHeader";
import DetailTab from "../../ui/DetailSection/DetailTab";
import { packageDetailTabList } from "@/lib/constants/packageLists";
import PackageDescription from "./PackageDescription";
import PackageReview from "./PackageReview";
import PackageLocation from "./PackageLocation";
import PackagePolicy from "./PackagePolicy";
import SearchRecommendations from "../../ui/ListSection/SearchRecommendations";
import PopularDestination from "../../ui/ListSection/PopularDestination";
import ImageCarouselModal from "../../ui/DetailSection/ImageCarouselModal";
import { PackageDetailsProps } from "@/lib/types/packagesTypes";

function PackageDetails({
  trendList,
  recommendationList,
  detailHeader,
  description,
  policy,
  reviews,
}: PackageDetailsProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleImageOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="w-[calc(100vw-3rem)] sm:container ">
      <div className="">
        <DetailHeader
          title={detailHeader?.title}
          location={detailHeader?.location}
          ratings={detailHeader?.ratings}
          reviews={detailHeader?.reviews}
        />
        <div className="sm:mt-0 mt-8" onClick={handleImageOpen}>
          <ImageSection
            mainImageSrc={detailHeader.image}
            subImages={imageList[0].hotelSubImage.map((subImage) => ({
              src: subImage.hotelSubimage,
            }))}
          />
        </div>
        <div className="py-2">
          <DetailTab
            tabList={packageDetailTabList}
            defaultSelectedTab="Description"
          />
        </div>
        <div>
          <PackageDescription
            description={description.description}
            whatsIncluded={description.whatsIncluded}
            date={description?.date}
          />
        </div>
        <div>
          <PackageReview
            ratingStar={reviews?.ratings}
            reviewCount={reviews?.reviewCount}
            comments={reviews?.comment}
          />
        </div>
        <div>
          <PackageLocation />
        </div>
        <div>
          <PackagePolicy policy={policy} />
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <SearchRecommendations
          sectionTitle={"Trending Hotels"}
          hotelLists={recommendationList}
        />
        <PopularDestination
          destinations={trendList}
          sectionTitle="Popular Destinations"
        />
      </div>
      <ImageCarouselModal isOpen={isOpen} onClose={handleClose} imageSrc={[]} />
    </div>
  );
}

export default PackageDetails;
