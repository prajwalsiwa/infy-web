import React from "react";

interface CommentCardProps {
  photoUrl?: string; 
  name?: string; 
  date?: string; 
  rating?: number; 
  description?: string; 
}

const CommentCard: React.FC<CommentCardProps> = ({
  photoUrl,
  name,
  date,
  rating,
  description,
}) => {
  return (
    <div className="comment-card flex flex-col gap-2 p-4  shadow-sm">
      <div className="flex justify-between items-center">
        {/* Header Section */}
        <div className="flex items-center gap-2">
          <img
            src={photoUrl}
            alt={`${name}'s photo`}
            className="w-12 h-12 rounded-full"
          />
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-grey-800">{name}</h4>
            <span className="text-gray-300 text-md ">•</span>{" "}
            {/* Larger separator */}
            <span className="text-xs text-gray-500 mt-1">{date}</span>
          </div>
        </div>

        {/* Rating */}
        <div className="text-primary-dark">
          <span className="text-primary-dark font-medium">{rating}</span>
        </div>
      </div>

      {/* Comment Description */}
      <p className="text-gray-700">{description}</p>
    </div>
  );
};

export default CommentCard;
