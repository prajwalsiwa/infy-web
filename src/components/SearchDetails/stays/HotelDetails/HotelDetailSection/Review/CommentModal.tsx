import { Dialog, DialogContent } from "@/components/ui/dialog";
import CommentCard from "./CommentCard";
import Select from "@/components/ui/FormUI/Select";
import { useState } from "react";
import Icon from "@/components/ui/Icon";

const options = [
  {
    label: "Recent",
    value: 1,
  },
];

interface Comment {
  photoUrl?: string;
  name?: string;
  date?: string;
  rating?: number;
  description?: string;
}



interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  commentList: Comment[] | null;
}



function CommentModal({ isOpen, onClose, commentList }: CommentModalProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(1);

  const handleSelectChange = (selected: number) => {
    setSelectedOption(selected);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <div className="head flex  flex-col ">
          <div className="w-full pl-4">
            <div className="w-full border-b border-b-gray-dark    flex  justify-between items-center mt-2">
              <span className="text-gray-dark text-lg font-semibold block">
                {commentList?.length} Reviews
              </span>
              <div className=" flex h-full   justify-start items-center  ">
                <span className="font-light w-14   text-md">Sort By: </span>
                <div className="flex w-[5rem] ">
                  <Select
                    inputTagClassname="!focus:placeholder:text-black !text-sm"
                    className=" !w-24 border-none !text-sm"
                    options={options}
                    selectedOption={selectedOption}
                    onChange={handleSelectChange}
                    placeholder="Select Sorting Option"
                    labelKey="label"
                    valueKey="value"
                  />
                </div>
              </div>
            </div>
            <div className="py-2 bg-grey-100 pl-2 rounded-lg mt-2 flex gap-4 items-center">
              <div className="py-1 px-3  flex gap-1 items-center bg-gold text-white w-fit rounded-sm">
                <Icon
                  name="star"
                  iconSymbolType="material-icons"
                  className="text-white"
                />
                4.2
              </div>
              <div>
                <span>"Good"</span>
              </div>
            </div>
          </div>

          <div className="contenet-section">
            {commentList?.map((comment) => (
              <div className="border-b">
                <CommentCard
                  key={comment.name}
                  photoUrl={comment.photoUrl}
                  name={comment.name}
                  date={comment.date}
                  rating={comment.rating}
                  description={comment.description}
                />
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CommentModal;
