import React from "react";

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const VendorTabs = ({
  activeTab,
  setActiveTab
}: Props) => {

  const tabs = [
    {
      key: "business",
      label: "Business Information"
    },
    {
      key: "contact",
      label: "Contact Person"
    },
    {
      key: "documents",
      label: "Documents & Bank Details"
    },
    {
      key: "additional",
      label: "Additional Information"
    },
    {
      key: "review",
      label: "Review Status"
    }
  ];

  return (

    <div className="vendor-tabs-wrapper">

      {tabs.map((tab) => (

        <button
          key={tab.key}
          className={
            activeTab === tab.key
              ? "vendor-tab-btn active"
              : "vendor-tab-btn"
          }
          onClick={() =>
            setActiveTab(tab.key)
          }
        >
          {tab.label}
        </button>

      ))}

    </div>

  );

};

export default VendorTabs;