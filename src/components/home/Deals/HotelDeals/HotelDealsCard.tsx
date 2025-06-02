import Icon from "@/components/ui/Icon";
// import dummyImage from "@/assets/images/dummyImage.png";

function HotelDealsCard({
  name,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  image,
  rating,
  discount,
  validTill,
  originalPrice,
  discountedPrice,
  includesBreakfast,
  // promoCode,
  ribbonText = "Expires in 1 week"
}: {
  name: string;
  image: string;
  rating: number;
  discount: string;
  validTill: string;
  originalPrice: string;
  discountedPrice: string;
  includesBreakfast: boolean;
  promoCode: string;
  ribbonText?: string;
}) {

  return (
    <div className="w-[19.5rem] h-[22rem] rounded-lg shadow-md border border-grey-200 bg-white  relative">
      {/* Rotated diagonal band behind the image */}
      {ribbonText && (
        <div className="absolute top-[4.25rem] left-[-1.2rem] w-[8rem] h-5 rotate-45 bg-teal-500 z-10" />
      )}

      {/* Image Section */}
      <div className=" h-[13.04rem] relative rounded-t-lg z-20">
       
       {/* <img src={image || dummyImage} alt={name} className="w-full h-full object-cover rounded-t-lg" /> */}
       <img src={"https://placehold.co/600x400"} alt={name} className="w-full h-full object-cover rounded-t-lg" />


        {/* Horizontal ribbon text on top */}
        {ribbonText && (
          <div className="absolute bg-teal-500 top-4 left-[-0.5rem]    text-white text-[0.65rem] px-6 py-1 font-semibold shadow-md z-30 ">
            {ribbonText}
          </div>
        )}

        {/* Includes Breakfast badge */}
        {includesBreakfast && (
          <div className="absolute bottom-2 left-2 text-white bg-teal-600 font-normal px-2 py-1 rounded text-xs flex items-center gap-1 z-30">
            <Icon name="restaurant" className="!text-sm" />
            Includes Breakfast
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col gap-2 text-sm text-grey-800">
        {/* Title and Rating */}
        <div className="flex justify-between items-center">
          <p className="font-semibold text-primary-dark text-base">{name}</p>
          <p className="flex items-center gap-1 text-yellow-600 font-medium">
            <Icon
              name="star"
              iconSymbolType="material-icons"
              className="!text-[1.2rem]"
            />
            {rating}
          </p>
        </div>

        {/* Deal Info */}
        <div className="flex items-center gap-2 text-xs">
          <div className="bg-red-600 text-white px-2 py-0.5 rounded">
            {discount}
          </div>
          <span className="text-grey-400">•</span>
          <p className="text-grey-500">Valid till {validTill}</p>
        </div>

        {/* Price Section */}
        <div className="flex items-baseline gap-2">
          <span className="line-through text-grey-400 text-sm">
            Rs. {originalPrice}
          </span>
          <span className="text-lg font-bold text-teal-700">
            Rs. {discountedPrice}
          </span>
          <span className="text-xs text-grey-500">/room per night</span>
        </div>
      </div>

      {/* Promo Code Section */}
      {/* <div className="border-t  mx-4 py-2 mt-auto">
        <div className="flex justify-between items-center text-sm">
          <div className="font-mono text-teal-700 border-dashed border p-1 text-xs border-teal-700 rounded-sm">
            {promoCode}
          </div>
          <button className="bg-teal-600 text-white px-4 py-1 rounded text-xs hover:bg-teal-700">
            Copy
          </button>
        </div>
      </div> */}
    </div>
  );
}

export default HotelDealsCard;
