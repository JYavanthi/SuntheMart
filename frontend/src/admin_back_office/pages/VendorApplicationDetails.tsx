import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Sidebar from "../Sidebar";
import BusinessInformationTab from "../components/vendor/tabs/BusinessInformationTab";
import ContactPersonTab from "../components/vendor/tabs/ContactPersonTab";
import DocumentsBankTab from "../components/vendor/tabs/DocumentsBankTab";
import AdditionalInformationTab from "../components/vendor/tabs/AdditionalInformationTab";
import ReviewStatusTab from "../components/vendor/tabs/ReviewStatusTab";

import VendorHeaderCard from "../components/vendor/VendorHeaderCard";
import VendorTabs from "../components/vendor/VendorTabs";
import VendorStatusCard from "../components/vendor/VendorStatusCard";
import VendorActionsCard from "../components/vendor/VendorActionsCard";
import VendorQuickLinks from "../components/vendor/VendorQuickLinks";


import "../styles/vendorApplicationDetails.css";


const VendorApplicationDetails = () => {

  const { id } = useParams();

  const [vendor, setVendor] = useState<any>({});

  const [loading, setLoading] =
    useState(true);

  const [activeTab, setActiveTab] =
    useState("business");

  const loadVendor = async () => {

    try {

      const res = await fetch(
        `http://localhost:4000/api/admin/vendor-details/${id}`
      );

      const data =
        await res.json();

      if (data.success) {

        setVendor(data.data);

      }

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadVendor();

  }, []);

  const approveVendor =
    async () => {

      await fetch(
        `http://localhost:4000/api/admin/vendor-approve/${id}`,
        {
          method: "PUT"
        }
      );

      loadVendor();

    };

  const rejectVendor =
    async () => {

      await fetch(
        `http://localhost:4000/api/admin/vendor-reject/${id}`,
        {
          method: "PUT"
        }
      );

      loadVendor();

    };

  const markReview =
    async () => {

      await fetch(
        `http://localhost:4000/api/admin/vendor-under-review/${id}`,
        {
          method: "PUT"
        }
      );

      loadVendor();

    };

  if (loading) {

    return <h3>Loading...</h3>;

  }

  return (

    <div className="vendor-details-page">

      <div className="vendor-details-sidebar">

        <Sidebar />

      </div>

      <div className="vendor-details-content">

        {/* HEADER */}

        <VendorHeaderCard
  vendor={vendor}
/>

        {/* BODY */}

        <div className="vendor-details-layout">

          {/* LEFT */}

          <div className="vendor-details-main">

            {/* TABS */}

            <VendorTabs
  activeTab={activeTab}
  setActiveTab={setActiveTab}
/>

            {/* CONTENT */}

            <div className="vendor-details-card">

              {activeTab ===
                "business" && (
                <BusinessInformationTab
                  vendor={
                    vendor
                  }
                />
              )}

              {activeTab ===
                "contact" && (
                <ContactPersonTab
                  vendor={
                    vendor
                  }
                />
              )}

              {activeTab ===
                "documents" && (
                <DocumentsBankTab
                  vendor={
                    vendor
                  }
                />
              )}

              {activeTab ===
                "additional" && (
                <AdditionalInformationTab
                  vendor={
                    vendor
                  }
                />
              )}

              {activeTab ===
                "review" && (
                <ReviewStatusTab
                  vendor={
                    vendor
                  }
                />
              )}

            </div>

          </div>

          {/* RIGHT */}

          <div className="vendor-details-right">

  <VendorStatusCard
    vendor={vendor}
  />

  <VendorActionsCard
    approveVendor={
      approveVendor
    }
    rejectVendor={
      rejectVendor
    }
    markReview={
      markReview
    }
  />

  <VendorQuickLinks
    setActiveTab={
      setActiveTab
    }
  />

</div>
        </div>

      </div>

    </div>

  );

};

export default VendorApplicationDetails;