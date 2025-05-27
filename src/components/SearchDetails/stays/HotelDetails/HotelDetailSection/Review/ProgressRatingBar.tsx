import { Progress } from "@/components/ui/Progress";

interface RatingItem {
  label: string;
  rating: number;
}

interface ProgressRatingBarProps {
  ratings: RatingItem[];
}

function ProgressRatingBar({ ratings }: ProgressRatingBarProps): JSX.Element {
  return (
    <div className="progress-ratings grid grid-cols-2 gap-4 w-full">
      {ratings?.map((item, index) => {
        const progressRatingValue = (item?.rating / 5) * 100;
        return (
          <div key={index} className="w-full flex flex-col gap-2">
            <div className="w-full flex justify-between">
              <span>{item?.label}</span>
              <span>{item?.rating}</span>
            </div>
            <Progress
              value={progressRatingValue}
              className="w-[100%] h-[6px]"
            />
          </div>
        );
      })}
    </div>
  );
}

export default ProgressRatingBar;
