interface SubImage {
  src: string;
}

interface ImageSectionProps {
  mainImageSrc?: string;
  subImages: SubImage[];
}

const ImageSection: React.FC<ImageSectionProps> = ({
  mainImageSrc,
  subImages,
}) => {
  const defaultAltText = "Hotel Image"; // Static alt text for all images

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-1">
      {/* Main Image Section */}
      <div className="w-full h-[19.13rem] sm:rounded-tl-2xl sm:rounded-bl-2xl overflow-hidden">
        <img
          src={mainImageSrc}
          alt={defaultAltText}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Subimages Section */}
      <div className="grid grid-cols-2 md:grid-cols-2 gap-1 w-full sm:rounded-tr-2xl sm:rounded-tb-2xl overflow-hidden">
        {subImages.map((subImage, index) => (
          <div
            key={index}
            className="w-full h-[9.479375rem] overflow-hidden"
          >
            <img
              src={subImage.src}
              alt={defaultAltText}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSection;
