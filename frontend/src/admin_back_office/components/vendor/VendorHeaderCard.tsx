import React from "react";

interface Props {
  vendor: any;
}

const VendorHeaderCard = ({
  vendor,
}: Props) => {

  const getStatusClass = (
    status: string
  ) => {

    if (
      status === "Approved"
    )
      return "approved";

    if (
      status === "Rejected"
    )
      return "rejected";

    if (
      status === "Under Review"
    )
      return "review";

    return "pending";

  };

  return (

    <div className="vendor-details-header-card">

      <div className="vendor-details-header-left">

        <div className="vendor-details-company-logo">

          {vendor.BusinessName
            ?.charAt(0)
            ?.toUpperCase()}

        </div>

        <div>

          <h2>
            {
              vendor.BusinessName
            }
          </h2>

          <div className="vendor-details-subtitle">

            <span>

              {
                vendor.BusinessType
              }

            </span>

            <span>
              •
            </span>

            <span>

              {
                vendor.Category
              }

            </span>

          </div>

          <p>

            {
              vendor.Email
            }

          </p>

        </div>

      </div>

      <div className="vendor-details-header-right">

        <div
          className={`vendor-details-status-badge ${getStatusClass(
            vendor.VendorStatus
          )}`}
        >

          {
            vendor.VendorStatus
          }

        </div>

        <div className="vendor-details-header-meta">

          <span>
            Vendor ID
          </span>

          <strong>

            #
            {
              vendor.VendorID
            }

          </strong>

        </div>

      </div>

    </div>

  );

};

export default VendorHeaderCard;