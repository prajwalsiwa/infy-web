import { Fragment } from "react/jsx-runtime";
import { Separator } from "../ui/Separator";

interface SteeperIndicatorProps {
  activeTab: {
    tabNumber: number;
    label: string;
  };
  tabList: {
    tabNumber: number;
    label: string;
  }[];
}

function SteeperIndicator({ activeTab, tabList }: SteeperIndicatorProps) {
  return (
    <div className="flex flex-wrap gap-4 flex-col sm:flex-row w-full justify-center items-center sm:gap-2">
      {tabList.map((tab) => (
        <Fragment key={tab.tabNumber}>
          <div className="flex items-center gap-2 flex-wrap text-center">
            {/* Number Indicator */}
            <div
              className={`w-[2.5rem] h-[2.5rem] sm:w-[2rem] sm:h-[2rem] border rounded-full flex justify-center items-center ${
                activeTab.tabNumber === tab.tabNumber
                  ? "bg-primary text-white"
                  : "text-gray"
              }`}
            >
              {tab.tabNumber}
            </div>

            {/* Label */}
            <div className="hidden sm:block w-full sm:w-auto">
              <span
                className={`text-sm md:text-base ${
                  activeTab.tabNumber === tab.tabNumber
                    ? "text-primary"
                    : "text-gray"
                }`}
              >
                {tab.label}
              </span>
            </div>

            {/* Separator */}
            {tab.tabNumber !== tabList.length && (
              <Separator
                orientation="horizontal"
                className="hidden sm:block w-[2rem] sm:w-[3rem] xxl:w-[5rem]"
              />
            )}
          </div>
        </Fragment>
      ))}
    </div>
  );
}

export default SteeperIndicator;
