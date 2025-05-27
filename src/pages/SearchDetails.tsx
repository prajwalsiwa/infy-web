import { Outlet, useLocation } from "react-router-dom";
import SearchBox from "@/components/SearchDetails/ui/SearchBox";
import { useState } from "react";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Icon from "@/components/ui/Icon";
import MobileSearch from "@/components/SearchDetails/ui/MobileSearch";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import StaysFilter from "@/components/SearchDetails/stays/StaysFilter/StaysFilter";

const searchboxTabList = [
  {
    id: 1,
    label: "Stays",
    value: "stays",
  },
  {
    id: 2,
    label: "Packages",
    value: "packages",
  },
];

function SearchDetails() {
  const [isOpen, setIsOpen] = useState(false);

  const { pathname } = useLocation();

  const isDetail = pathname.includes("view");

  return (
    <div className="">
      <Header />
      <div className={`w-full mb-10  h-full ${isDetail ? "" : "bg-sky-50"}`}>
        {/* Search Box */}
        <div className="top w-full hidden  search-section py-7 bg-sky-900 sm:flex justify-center items-center">
          <SearchBox tabList={searchboxTabList} />
        </div>
        <div className={`pt-14 sm:hidden block px-4 ${isDetail && "hidden"}`}>
          <MobileSearch />
        </div>
        <div
          className={`sm:hidden my-3 justify-between items-center mx-4 px-2 rounded-sm py-1 h-full flex border ${
            isDetail && "hidden"
          }`}
        >
          {/* tabs section  */}
          <Dialog open={isOpen} onOpenChange={() => setIsOpen(true)}>
            <DialogTrigger asChild>
              <div className="flex items-center cursor-pointer gap-2">
                <Icon name="tune" className="text-gray" />
                <span className="text-gray-dark">Filter</span>
              </div>
            </DialogTrigger>
            <DialogContent className="py-8 transform transition-transform duration-300 ease-out translate-y-full data-[state=open]:translate-y-0">
              <StaysFilter isMobile setIsOpen={setIsOpen} />
            </DialogContent>
          </Dialog>

          <div className="flex items-center gap-2">
            <Icon name="filter_list" className="text-gray" />
            <span className="text-gray-dark">Sort</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="map" className="!text-gray" />
            <span className="text-gray-dark">Map View</span>
          </div>
        </div>

        <div
          className={` w-full h-full px-24 container ${
            isDetail ? "sm:pt-0 pt-14" : ""
          }  `}
        >
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SearchDetails;
