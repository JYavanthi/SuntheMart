import React from "react";

interface Props {
  approveVendor: () => void;
  rejectVendor: () => void;
  markReview: () => void;
}

const VendorActionsCard = ({
  approveVendor,
  rejectVendor,
  markReview
}: Props) => {

  return (

    <div className="vendor-action-card">

      <h3>
        Review Actions
      </h3>

      <button
        className="vendor-approve-btn"
        onClick={
          approveVendor
        }
      >
        ✓ Approve Application
      </button>

      <button
        className="vendor-review-btn"
        onClick={
          markReview
        }
      >
        ⏳ Mark Under Review
      </button>

      <button
        className="vendor-reject-btn"
        onClick={
          rejectVendor
        }
      >
        ✕ Reject Application
      </button>

    </div>

  );

};

export default VendorActionsCard;