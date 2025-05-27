import Icon from "@/components/ui/Icon";
import ProgressRatingBar from "./ProgressRatingBar";
import CommentSection, { Comment } from "./CommentSection";
import { useLocation } from "react-router-dom";

interface ReviewProps {
  ratingStar?: number ;
  ratingBarsData?: Array<{
    label: string;
    rating: number;
  }> | null;
  reviewCount?: number ;
  comments?: Comment[]
}

function Review({
  ratingStar ,
  ratingBarsData ,
  reviewCount ,
  comments = [],
}: ReviewProps) {
  const { pathname } = useLocation();
  const isPackage = pathname.includes("package");
  return (
    <div className="review-section">
      <h1 className="font-medium text-2xl py-4 leading-[1.815625rem] text-[#353738]">
        Reviews
      </h1>
      <div className="border border-gray sm:py-7 sm:px-[2.875rem]  rounded-2xl">
        <div
          className={` border-b border-b-gray flex lg:gap-16  justify-center ${
            isPackage ? "h-20 px-2" : "h-[11.036875rem]"
          } `}
        >
          <div
            className={`w-fit h-full flex   gap-4 justify-center items-center ${
              isPackage ? "flex-row" : "flex-col"
            }`}
          >
            <div className="py-1 px-3 flex gap-1 items-center bg-gold text-white w-fit rounded-sm">
              <Icon
                name="star"
                iconSymbolType="material-icons"
                className="text-white"
              />
              {ratingStar !== null ? ratingStar?.toFixed(1) : "N/A"}
            </div>
            <div className="w-fit flex gap-2">
              <span className="font-medium text-base">"Good"</span>
              <span className="flex w-24">{`(${
                reviewCount || 0
              } Reviews)`}</span>
            </div>
          </div>
          <div className="progress-ratings p-2 lg:p-0  w-full">
            {ratingBarsData ? (
              <ProgressRatingBar ratings={ratingBarsData} />
            ) : (
              <p className="text-gray-500"></p>
            )}
          </div>
        </div>
        <div className="comments-section">
          {comments && comments.length > 0 ? (
            <CommentSection comments={comments} />
          ) : (
            <p className="text-gray-500">No comments available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Review;
