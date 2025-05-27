import { useState } from "react";
import CommentCard from "./CommentCard";
import CommentModal from "./CommentModal";

export interface Comment {
  photoUrl?: string;
  name?: string;
  date?: string;
  rating?: number;
  description?: string;
}

interface CommentSectionProps {
  comments: Comment[] ;
}

function CommentSection({ comments }: CommentSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const displayedComments = comments?.slice(0, 1);

  return (
    <div>
      {displayedComments?.map((comment) => (
        <CommentCard
          key={comment?.name}
          photoUrl={comment?.photoUrl}
          name={comment?.name}
          date={comment?.date}
          rating={comment?.rating}
          description={comment?.description}
        />
      ))}

      {comments && comments.slice(1).length > 0 && (
        <span
          className="text-primary cursor-pointer hover:text-primary-dark underline"
          onClick={handleOpenModal}
        >
          View all Reviews
        </span>
      )}

      <CommentModal commentList={comments} isOpen={isOpen} onClose={onClose} />
    </div>
  );
}

export default CommentSection;
