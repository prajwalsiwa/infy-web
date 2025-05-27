import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface DetailTabProps {
  tabList: { id: number; name: string }[];
  defaultSelectedTab: string;
  targetRef: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

function DetailTab({ tabList, defaultSelectedTab, targetRef }: DetailTabProps) {
  const [selectedTab, setSelectedTab] = useState<number | null>(null);

  useEffect(() => {
    const defaultone = tabList?.find((tab) => tab?.name === defaultSelectedTab);
    if (defaultone) {
      setSelectedTab(defaultone.id);
    }
  }, [defaultSelectedTab, tabList]);

  const handleTabClick = (tabId: number, index: number) => {
    targetRef?.current[index]?.scrollIntoView({ behavior: "smooth" });
    setSelectedTab(tabId);
  };

  return (
    <div className="flex gap-3 flex-wrap">
      {tabList.map((tab, index) => (
        <Button
          key={tab.id}
          onClick={() => handleTabClick(tab.id, index)}
          className={`
            ${
              selectedTab === tab.id
                ? "!bg-primary-light !text-primary scale-105"
                : "bg-white text-gray-dark"
            }
            border-none 
            shadow-none 
            transition-all 
            duration-300 
            ease-in-out 
            transform 
            hover:bg-grey-200
            hover:scale-105 
            focus:outline-none
          `}
        >
          {tab.name}
        </Button>
      ))}
    </div>
  );
}

export default DetailTab;
