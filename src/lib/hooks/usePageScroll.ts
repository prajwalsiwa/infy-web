import { useEffect, useState } from "react";

export const usePageScroll = (scrollY: number) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const handleScrollY = () => {
    const yScroll = window.scrollY;
    setIsScrolled(yScroll >= scrollY);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScrollY);

    return () => {
      window.removeEventListener("scroll", handleScrollY);
    };
  });
  return { isScrolled };
};
