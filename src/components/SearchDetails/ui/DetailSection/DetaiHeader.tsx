import Icon from "@/components/ui/Icon";
import { useState, ReactNode } from "react";
import ShareModal from "./ShareModal";

interface DetailHeaderProps {
  title?: string;
  location?: string;
  ratings?: number;
  reviews?: number;
  onShare?: () => void;
  onSave?: () => void;
  additionalActions?: ReactNode;
}

export default function DetailHeader({
  title,
  location,
  ratings,
  reviews,
  onShare,
  onSave,
  additionalActions,
}: DetailHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleShare = () => {
    setIsOpen(true);
    onShare?.();
  };

  const handleSave = () => {
    onSave?.();
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="hotel-header flex flex-wrap w-full">
      <div className="title">
        <span className="font-semibold text-2xl leading-[1.815625rem] text-primary-dark">
          {title}
        </span>
      </div>
      <div className="flex  justify-between flex-wrap w-full">
        <div className="location items-center flex  h-full gap-1">
          <div className="flex items-center">
            <Icon
              name="location_on"
              className="text-gray-dark"
              iconSymbolType="material-icons"
            />
            <span>{location}</span>
          </div>
          <span className="font-extrabold">.</span>
          <div className="ratings items-center flex gap-1">
            <Icon
              name="star"
              className="text-gray-dark"
              iconSymbolType="material-icons"
            />
            <span>{ratings}</span>
            <span className="font-extrabold">.</span>
            <span>
              <a href="" className="underline">
                {reviews} Reviews
              </a>
            </span>
          </div>
        </div>
        <div className="items-center flex gap-2">
          <div
            className="flex gap-1 items-center cursor-pointer"
            onClick={handleShare}
          >
            <Icon name="share" iconSymbolType="material-icons" />
            <span>Share</span>
          </div>
          <div
            className="items-center flex gap-1 cursor-pointer"
            onClick={handleSave}
          >
            <Icon name="favorite" />
            <span>Save</span>
          </div>
          {additionalActions}
        </div>
      </div>
      <ShareModal isOpen={isOpen} onClose={handleClose} />
    </div>
  );
}
