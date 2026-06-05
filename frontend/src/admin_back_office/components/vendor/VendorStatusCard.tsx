import React from "react";

interface Props {
  vendor: any;
}

const VendorStatusCard = ({
  vendor
}: Props) => {

  const getStatusClass = (
    status: string
  ) => {

    if (status === "Approved")
      return "approved";

    if (status === "Rejected")
      return "rejected";

    if (status === "Under Review")
      return "review";

    return "pending";

  };

  return (

    <div className="vendor-status-card">

      <div className="vendor-status-top">

        <h3>
          Application Status
        </h3>

        <span
          className={`vendor-status-pill ${getStatusClass(
            vendor.VendorStatus
          )}`}
        >
          {vendor.VendorStatus}
        </span>

      </div>

      <div className="vendor-status-body">

        <div className="vendor-status-row">

          <span>
            Vendor ID
          </span>

          <strong>
            #{vendor.VendorID}
          </strong>

        </div>

        <div className="vendor-status-row">

          <span>
            Approved
          </span>

          <strong>

            {vendor.IsApproved
              ? "Yes"
              : "No"}

          </strong>

        </div>

        <div className="vendor-status-row">

          <span>
            Active
          </span>

          <strong>

            {vendor.IsActive
              ? "Yes"
              : "No"}

          </strong>

        </div>

        <div className="vendor-status-row">

          <span>
            Registration Date
          </span>

          <strong>

            {new Date(
              vendor.CreatedDt
            ).toLocaleDateString()}

          </strong>

        </div>

      </div>

    </div>

  );

};

export default VendorStatusCard;