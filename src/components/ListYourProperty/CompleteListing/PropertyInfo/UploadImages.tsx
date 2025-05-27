import Input from "@/components/ui/FormUI/Input";
import Icon from "@/components/ui/Icon";
import { convertFileToBase64 } from "@/lib/utils/common";
import { useState } from "react";
import { useFieldArray } from "react-hook-form";

function UploadImages() {
  const [images, setImages] = useState<string[]>([]);

  const { append } = useFieldArray({
    name: "propertyInfo.property_images",
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    const newImageUrls: string[] = [];

    for (let i = 0; i < fileArray.length; i++) {
      const file = fileArray[i];

      try {
        const base64Image = await convertFileToBase64(file);

        const imageRecord = {
          image: base64Image,
          is_primary: i === 0 && images.length === 0, // Only first uploaded image overall is primary
        };

        append(imageRecord);

        const fileUrl = URL.createObjectURL(file);
        newImageUrls.push(fileUrl);
      } catch (error) {
        console.error("Error occurred while processing image:", error);
      }
    }

    setImages((prev) => [...prev, ...newImageUrls]);
  };

  return (
    <div className="flex flex-col gap-2">
      <span className="text-gray-dark">Upload Photos</span>
      <div className="flex gap-2 overflow-x-auto">
        {images.map((imgSrc, index) => (
          <div
            key={index}
            className="w-[6.88rem] h-[3.77rem] rounded-md overflow-hidden"
          >
            <img
              src={imgSrc}
              alt={`Uploaded ${index}`}
              className="w-full h-full object-contain z-50"
            />
          </div>
        ))}
        <div className="w-[10.88rem] h-[3.77rem] border-dashed border flex flex-col items-center justify-center">
          <label
            htmlFor="file-input"
            className="cursor-pointer text-gray flex flex-col items-center"
          >
            <Icon name="image" className="text-gray" />
            <span className="text-gray text-xs">Upload photo(s)</span>
          </label>
          <Input
            type="file"
            id="file-input"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
}

export default UploadImages;
