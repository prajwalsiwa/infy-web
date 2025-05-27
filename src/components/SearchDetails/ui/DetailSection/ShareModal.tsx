import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Icon from "@/components/ui/Icon";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function ShareModal({ isOpen, onClose }: ShareModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[34rem] gap-1">
        <DialogHeader>
          <DialogTitle className="text-gray-dark">Share this hotel</DialogTitle>
        </DialogHeader>
        <div className=" gap-4 py-4 grid grid-cols-2">
          <div className="border border-gray flex px-2 gap-2 rounded-md w-[14.6rem] h-[3.4rem] items-center">
            <Icon name="facebook" iconSymbolType="material-icons" />
            <span>facebook</span>
          </div>
          <div className="border border-gray flex px-2 gap-2 rounded-md w-[14.6rem] h-[3.4rem] items-center">
            <Icon name="facebook" iconSymbolType="material-icons" />
            <span>facebook</span>
          </div>
          <div className="border border-gray flex px-2 gap-2 rounded-md w-[14.6rem] h-[3.4rem] items-center">
            <Icon name="facebook" iconSymbolType="material-icons" />
            <span>facebook</span>
          </div>
          <div className="border border-gray flex px-2 gap-2 rounded-md w-[14.6rem] h-[3.4rem] items-center">
            <Icon name="facebook" iconSymbolType="material-icons" />
            <span>Whatsapp</span>
          </div>

          <div className="border border-gray flex px-2 gap-2 rounded-md w-[14.6rem] h-[3.4rem] items-center">
            <Icon name="content_copy" iconSymbolType="material-icons" />
            <span>Copy the link</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ShareModal;
