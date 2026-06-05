import React from "react";

interface Props {
  vendor: any;
}

const ReviewStatusTab = ({
  vendor
}: Props) => {

  return (

    <div className="vendor-review-grid">

      <div className="vendor-review-card">

        <h4>
          Vendor Status
        </h4>

        <p>
          {vendor.VendorStatus}
        </p>

      </div>

      <div className="vendor-review-card">

        <h4>
          Is Approved
        </h4>

        <p>
          {vendor.IsApproved
            ? "Yes"
            : "No"}
        </p>

      </div>

      <div className="vendor-review-card">

        <h4>
          Is Active
        </h4>

        <p>
          {vendor.IsActive
            ? "Active"
            : "Inactive"}
        </p>

      </div>

      <div className="vendor-review-card">

        <h4>
          Registered On
        </h4>

        <p>
          {new Date(
            vendor.CreatedDt
          ).toLocaleDateString()}
        </p>

      </div>

    </div>

  );

};

export default ReviewStatusTab;