import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/Separator";
import { UserRound } from "lucide-react";

function MobileMenu() {
  return (
    <div className="">
      <div className="flex flex-col gap-6">
        <span>Hotel</span>
        <span>Package</span>
      </div>
      <Separator orientation="horizontal" className="my-4" />
      <Button
        variant="outline"
        className=" items-center  justify-center gap-2"
        asLink
        href="/login"
      >
        <UserRound />
        <span>Login/Register</span>
      </Button>
    </div>
  );
}

export default MobileMenu;
