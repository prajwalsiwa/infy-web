import HotelHeader from "../../../ui/DetailSection/DetaiHeader";
import ImageSection from "../../../ui/DetailSection/ImageSection";
import { tabList } from "@/lib/constants/hoteDetails";
import DetailTab from "../../../ui/DetailSection/DetailTab";
import Description from "./Description";
import Amenities from "./Amenities/Amenities";
import Rooms from "./Rooms";
import Review from "./Review/Review";
import Attractions from "./Attractions/Attractions";
import { attractionsMapData } from "@/lib/constants/hoteDetails";
import Policy from "./Policy";
import PopularDestination from "@/components/SearchDetails/ui/ListSection/PopularDestination";
import SearchRecommendations from "@/components/SearchDetails/ui/ListSection/SearchRecommendations";
import { useState } from "react";
import ImageCarouselModal from "../../../ui/DetailSection/ImageCarouselModal";
import { useHotelDetailsQuery } from "@/redux/services/staysApi";
import { useParams } from "react-router-dom";
import { HotelDetails, Rating } from "@/lib/types/staysTypes";
import {
  useGetHotelRecommendationsQuery,
  useGetTrendsQuery,
} from "@/redux/services/homeApi";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

import { MutableRefObject } from "react";

function HotelDetailSection({
  refs,
  bookRef,
}: {
  refs: MutableRefObject<(HTMLDivElement | null)[]>;
  bookRef: MutableRefObject<HTMLDivElement | null>;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const params = useParams();
  const { data: hotelDetails } = useHotelDetailsQuery(Number(params?.id)) as {
    data: HotelDetails | undefined;
  };

  const {
    data: recommendations,
    isLoading: isRecommendationsLoading,
    error: isRecommendataionError,
  } = useGetHotelRecommendationsQuery();

  const { data: trendList, isLoading, error } = useGetTrendsQuery();

  if (isLoading) <div>Loading...</div>;
  if (error) <div>Loading...</div>;

  if (isRecommendationsLoading) <div>Loading...</div>;
  if (isRecommendataionError) <div>Loading...</div>;

  const recommendationList = recommendations?.results;

  const handleImageOpen = () => setIsOpen(true);

  const handleClose = () => setIsOpen(false);

  const amenities = hotelDetails?.amenities?.map((hotel) => ({
    category: hotel.category,
    items: hotel.amenities.map((amenity) => ({
      name: amenity.title,
      icon: amenity.icon,
    })),
  }));

  const policies = hotelDetails?.policies?.map((policy) => ({
    title: policy.policy_sub_category,
    items: policy.policies,
  }));

  const commentList =
    hotelDetails?.rating?.map((item: Rating) => ({
      photoUrl:
        item.rated_by.profile_picture || "https://via.placeholder.com/150",
      name:
        `${item.rated_by.first_name} ${item.rated_by.last_name}`.trim() ||
        "Anonymous",
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      rating: item.rated_on.ratings,
      description: item.comments || "No comments provided.",
    })) || [];

  const ratingBarsData = hotelDetails?.rating
    ? [
        { label: "Cleanliness", rating: hotelDetails.rating[0]?.cleanliness },
        { label: "Service", rating: hotelDetails.rating[0]?.service },
        { label: "Location", rating: hotelDetails.rating[0]?.location },
        { label: "Value", rating: hotelDetails.rating[0]?.value_for_money },
        { label: "Amenities", rating: hotelDetails.rating[0]?.facilities },
        { label: "Comfort", rating: hotelDetails.rating[0]?.comfort },
      ]
    : [];

  const checkRoomDetails = useSelector(
    (state: RootState) => state.stays?.availableRooms
  );

  const subImages = hotelDetails?.property_images.map((image) => ({
    src: image.image_url,
  }));

  const carouselImageList: (string | undefined)[] = [
    hotelDetails?.photo_url,
    hotelDetails?.property_images.map((image) => image.image_url),
  ].flat();

  return (
    <div className="hotel-detail-section w-full gap-6 flex flex-col ">
      <div className="flex flex-col gap-2 ">
        <HotelHeader
          title={hotelDetails?.name || ""}
          location={`${hotelDetails?.location.city || ""}, ${
            hotelDetails?.location.country || ""
          }`}
          ratings={hotelDetails?.ratings || 0}
          reviews={hotelDetails?.views || 0}
        />
        <div onClick={handleImageOpen} className="mt-6 sm:mt-0">
          <ImageSection
            mainImageSrc={hotelDetails?.photo_url || ""}
            subImages={subImages || []}
          />
        </div>
        <div className="py-2">
          <DetailTab
            tabList={tabList}
            defaultSelectedTab="Description"
            targetRef={refs}
          />
        </div>
      </div>
      <div
        ref={(el) => {
          if (el) refs.current[0] = el;
        }}
      >
        <Description description={hotelDetails?.description || ""} />
      </div>
      <div
        ref={(el) => {
          if (el) refs.current[1] = el;
        }}
      >
        <Amenities amenitiesList={amenities || []} />
      </div>
      <div
        ref={(el) => {
          if (el) refs.current[2] = el;
        }}
      >
        <Rooms roomData={checkRoomDetails || []} bookRef={bookRef} />
      </div>
      <div
        ref={(el) => {
          if (el) refs.current[3] = el;
        }}
      >
        <Review
          ratingStar={hotelDetails?.rating?.[0]?.rating_star || 0}
          ratingBarsData={ratingBarsData}
          reviewCount={
            hotelDetails?.rating?.[0]?.rated_on?.user_review_count || 0
          }
          comments={commentList}
        />
      </div>
      <div
        ref={(el) => {
          if (el) refs.current[4] = el;
        }}
      >
        <Attractions
          image={attractionsMapData.image}
          attractionList={attractionsMapData.attractionList}
        />
      </div>
      <div
        ref={(el) => {
          if (el) refs.current[5] = el;
        }}
      >
        <Policy sections={policies || []} />
      </div>
      <SearchRecommendations
        sectionTitle={"Trending Hotels"}
        hotelLists={recommendationList || []}
      />
      <PopularDestination
        destinations={trendList || []}
        sectionTitle="Popular Destinations"
      />
      <ImageCarouselModal
        isOpen={isOpen}
        onClose={handleClose}
        imageSrc={carouselImageList}
      />
    </div>
  );
}

export default HotelDetailSection;
