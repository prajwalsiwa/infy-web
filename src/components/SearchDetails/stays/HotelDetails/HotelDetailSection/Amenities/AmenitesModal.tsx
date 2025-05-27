import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Icon from "@/components/ui/Icon";

interface Amenity {
  name: string;
  icon: string | null;
}

interface HotelDetailsSection {
  category: string;
  items: Amenity[];
}

interface AmenitiesModalProps {
  isOpen: boolean;
  onClose: () => void;
  amenitiesList: HotelDetailsSection[]; 
}

function AmenitiesModal({
  isOpen,
  onClose,
  amenitiesList,
}: AmenitiesModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[37rem] gap-1">
        <DialogHeader>
          <DialogTitle className="text-gray-dark">Amenities</DialogTitle>
        </DialogHeader>
        <div className="gap-4 py-4 flex flex-col">
          <div className="amenities-list grid gap-3 overflow-hidden">
            {amenitiesList?.map((amenity, index) => (
              <div key={index} className="flex flex-col gap-2">
                <div>
                  <span className="text-gray-dark font-medium">
                    {amenity?.category}
                  </span>
                </div>
                <div className="amenities-list grid grid-cols-3 gap-3 overflow-hidden">
                  {amenity?.items?.map((amenityItem, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="amenity-item text-center gap-3 flex items-center"
                    >
                      {amenityItem.icon && (
                        <Icon
                          name={amenityItem.icon}
                          className="text-gray"
                          isImage={true}
                          imgSrc={amenityItem.icon}
                        />
                      )}
                      <span className="text-gray-dark">
                        {amenityItem.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AmenitiesModal;
