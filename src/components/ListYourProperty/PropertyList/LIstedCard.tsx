import Icon from "@/components/ui/Icon";

interface ListedCardProps {
  title: string;
  location: string;
  imageSrc: string;
  ratings: number;
}

function ListedCard({
  title = "Default Villa Name",
  location = "Default Location",
  imageSrc = "https://cdn.pixabay.com/photo/2019/05/16/20/15/online-4208112_1280.jpg",
  ratings = 4.5,
}: ListedCardProps) {
  return (
    <div className="flex flex-col w-72 h-fit rounded-lg overflow-hidden">
      {/* Image Section */}
      <div className="w-full overflow-hidden h-52">
        <img
          src={imageSrc}
          height={220}
          width={320}
          alt={title}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Content Section with Border */}
      <div className="border border-gray-300 p-4 flex flex-col gap-2 rounded-b-lg">
        {/* Title and Location */}
        <div className="flex justify-between w-full">
          <div className="flex flex-col">
            <div>
              <span className="text-primary-dark font-semibold text-lg">
                {title}
              </span>
            </div>
            <div>
              <span className="text-gray">{location}</span>
            </div>
          </div>
          {/* Ratings Section */}
          <div className="flex items-start">
            <div className="flex items-center gap-1">
              <Icon
                name="star"
                iconSymbolType="material-icons"
                className="text-yellow-600"
              />
              <span className="text-yellow-600">{ratings}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListedCard;
