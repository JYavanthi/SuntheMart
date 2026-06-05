import React from "react";

interface Props {
  setActiveTab: (
    tab: string
  ) => void;
}

const VendorQuickLinks = ({
  setActiveTab
}: Props) => {

  return (

    <div className="vendor-quick-card">

      <h3>
        Quick Navigation
      </h3>

      <button
        onClick={() =>
          setActiveTab(
            "business"
          )
        }
      >
        Business Information
      </button>

      <button
        onClick={() =>
          setActiveTab(
            "contact"
          )
        }
      >
        Contact Person
      </button>

      <button
        onClick={() =>
          setActiveTab(
            "documents"
          )
        }
      >
        Documents
      </button>

      <button
        onClick={() =>
          setActiveTab(
            "additional"
          )
        }
      >
        Additional Information
      </button>

      <button
        onClick={() =>
          setActiveTab(
            "review"
          )
        }
      >
        Review Status
      </button>

    </div>

  );

};

export default VendorQuickLinks;