import React from "react";

interface HotelSubImage {
  id: number;
  subImage: string;
}

interface ImageSectionProps {
  hotelImage: string;
  hotelSubImageList?: HotelSubImage[];
}

const ImageSection: React.FC<ImageSectionProps> = ({
  hotelImage,
  hotelSubImageList,
}) => {
  return (
    <div className="images flex justify-between h-full w-full">
      <div className=" h-[13.58rem] w-72 border  flex-grow">
        <img src={hotelImage} alt="Hotel" className=" w-full h-full  " />
      </div>
      <div className="sub-images h-full md:block hidden ">
        {hotelSubImageList?.map((subImage) => (
          <img
            key={subImage.id}
            src={subImage.subImage}
            alt={`Sub-${subImage.id}`}
            className="w-[5.07rem] h-[3.40rem] "
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSection;
