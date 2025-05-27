import { Button } from "@/components/ui/button";
import { usePageScroll } from "@/lib/hooks/usePageScroll";
import { cn } from "@/lib/utils";
import { UserRound } from "lucide-react";
import { useAppSelector } from "@/redux/store";
import { Link, useSearchParams } from "react-router-dom";
import AuthDropdown from "./AuthDropdown";
import Icon from "@/components/ui/Icon";
import ausFlag from "@/assets/Images/ausflag.jpeg";
import nepalFlag from "@/assets/Images/nepalflag.png";
import usaFlag from "@/assets/Images/usaflag.jpg";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import MobileMenu from "./MobileMenu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useState } from "react";

const menuItems = [
  { id: 1, label: "Trips", disabled: true },
  { id: 2, label: "Messages", disabled: true },
  { id: 3, label: "My Reviews", disabled: true },
  { id: 4, label: "Saved", disabled: true },
  { id: 5, label: "Refer and Earn", disabled: true },
];

const Header = () => {
  const [searchParams] = useSearchParams();
  const [activeCountry, setActiveCountry] = useState("Nepal");

  const activeTab = searchParams.get("tab") || "stays";
  const { isScrolled } = usePageScroll(200);
  const user = useAppSelector((state) => state?.user.user);

  const userInitials =
    user &&
    user
      .split(" ")
      .map((item) => item.charAt(0).toUpperCase())
      .join("");

  const handleMenuClick = (id: number) => {
    // Add your logic here based on the clicked menu item
    switch (id) {
      case 1:
        break;
      case 2:
        break;
      default:
    }
  };

  const countries = [
    {
      name: "Nepal",
      code: "npr",
      flag: nepalFlag,
    },
    {
      name: "Australia",
      code: "aud",
      flag: ausFlag,
    },
    {
      name: "USA",
      code: "usd",
      flag: usaFlag,
    },
  ];

  const getCurrencyCode = (country: string) => {
    const countryObj = countries.find(
      (c) => c.name.toLowerCase() === country.toLowerCase()
    );
    return countryObj?.code.toUpperCase() || "NPR";
  };

  const getCountryFlag = (country: string) => {
    const countryObj = countries.find(
      (c) => c.name.toLowerCase() === country.toLowerCase()
    );
    return countryObj?.flag || nepalFlag;
  };

  return (
    <header
      className={cn(
        "header sm:relative absolute sm:border sm:border-b   xl:px-12 px-6  w-full z-10 !bg-transparent sm:bg-white",
        {
          "header-sticky": isScrolled,
        }
      )}
    >
      <nav className="w-full ">
        <div className="py-3 flex items-center justify-between">
          {/* Logo and Navigation Links */}
          <div className="flex items-center sm:gap-6 gap-20 ">
            {/* Mobile Menu Icon */}
            <Dialog>
              <DialogTrigger>
                <div className="block sm:hidden">
                  <Icon name="menu" />
                </div>
              </DialogTrigger>
              <DialogContent className="w-screen h-screen">
                <MobileMenu />
              </DialogContent>
            </Dialog>
            {/* Logo */}
            <Link to="/">
              <img
                src="/infytrip_logo.png"
                alt="Infytrip Logo"
                width={120}
                height={40}
                className="w-[120px] h-auto"
              />
            </Link>
            {/* Links for larger screens */}
            <div className="hidden sm:flex gap-6">
              <Link
                to={`/search/hotel-list?tab=${activeTab}`}
                className="hover:text-gray transition-all"
              >
                Hotels
              </Link>
              <Link
                to={`/search/package-list?tab=${activeTab}`}
                className="hover:text-gray transition-all"
              >
                Packages
              </Link>
            </div>
          </div>

          {/* Right Side (User Options) */}
          <div className="flex items-center gap-6">
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center gap-2 cursor-pointer">
                    <div className="w-7 h-7 rounded-full overflow-hidden">
                      <img
                        src={getCountryFlag(activeCountry)}
                        alt={`${activeCountry} Flag`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="font-medium">
                      {getCurrencyCode(activeCountry)}
                    </span>
                    <Icon
                      name="keyboard_arrow_down"
                      className="text-gray-500"
                    />
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-32 border bg-white rounded-md mt-4 py-2">
                  <div className="flex flex-col gap-1 ">
                    {countries.map((country) => (
                      <div
                        key={country.code}
                        className={`flex items-center cursor-pointer hover:bg-grey-100 gap-2   p-2 ${
                          activeCountry === country.name ? "bg-grey-200" : ""
                        }`}
                        onClick={() => setActiveCountry(country.name)}
                      >
                        <div className="w-6 h-6 rounded-full overflow-hidden">
                          <img
                            src={country.flag}
                            alt={`${country.name} Flag`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-sm font-medium">
                          {country.code.toUpperCase()}
                        </span>
                      </div>
                    ))}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {/* Notification and "List your Property" (Visible on larger screens) */}
            <div className="hidden sm:flex items-center gap-6">
              <Icon
                name="notifications"
                className="cursor-not-allowed text-gray-500"
              />
              <Link to="/list-your-property">
                <span className="underline font-bold text-sm text-gray-dark">
                  List your Property
                </span>
              </Link>
            </div>
            {/* Auth Section */}
            <div>
              {localStorage.getItem("token") ? (
                <div className="w-10 h-10 border rounded-full flex bg-primary text-white font-semibold justify-center items-center">
                  <AuthDropdown
                    user={userInitials}
                    menuItems={menuItems}
                    onMenuClick={(id) => handleMenuClick(id)}
                  />
                </div>
              ) : (
                <Button
                  variant="outline"
                  className=" items-center hidden sm:flex justify-center gap-2"
                  asLink
                  href="/login"
                >
                  <UserRound />
                  <span>Login/Register</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
