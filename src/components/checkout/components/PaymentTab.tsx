import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";

interface TabData {
  value: string;
  label?: string;
  imgSrc: string;
  content?: React.ReactNode;
}

interface PaymentTabsProps {
  tabs: TabData[];
  defaultValue: string;
}

const PaymentTabs: React.FC<PaymentTabsProps> = ({ tabs, defaultValue }) => {
  const [selectedTab, setSelectedTab] = useState<string>(defaultValue);
  return (
    <Tabs defaultValue={defaultValue} className="w-full">
      <TabsList className="flex gap-2 w-full">
        {tabs.map((tab) => (
          <div
            className={`${
              selectedTab === tab.value
                ? "border-b-2 border-b-grey-700 "
                : ""
            }`}
          >
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              onClick={() => setSelectedTab(tab.value)}
              className={`flex items-center gap-2 hover:!bg-sky-100 !text-gray-dark ${
                selectedTab === tab.value ? "!bg-sky-100" : ""
              }  `}
            >
              <img
                src={tab.imgSrc}
                alt={`${tab.label || tab.value} Logo`}
                className="h-6 object-contain"
              />
              {tab.label && <span>{tab.label}</span>}
            </TabsTrigger>
          </div>
        ))}
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent value={tab.value} key={tab.value}>
          <div className="mt-4">{tab.content}</div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default PaymentTabs;
