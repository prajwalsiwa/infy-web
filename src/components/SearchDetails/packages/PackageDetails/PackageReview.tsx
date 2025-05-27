import { Comment } from "../../stays/HotelDetails/HotelDetailSection/Review/CommentSection";
import Review from "../../stays/HotelDetails/HotelDetailSection/Review/Review";

interface packageReviewProps {
  ratingStar?: number;
  reviewCount?: number;
  comments?: Comment[]
}

function PackageReview({
  ratingStar,
  reviewCount,
  comments,
}: packageReviewProps) {
  return (
    <div>
      <Review
        ratingStar={ratingStar}
        reviewCount={reviewCount}
        comments={comments}
      />
    </div>
  );
}

export default PackageReview;
