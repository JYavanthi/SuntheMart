import React from "react";

interface Props {
  vendor: any;
}

const AdditionalInformationTab = ({
  vendor
}: Props) => {

  return (

    <div className="vendor-info-grid">

      <div className="vendor-info-item">

        <label>
          Store Name
        </label>

        <p>
          {vendor.StoreName}
        </p>

      </div>

      <div className="vendor-info-item">

        <label>
          State
        </label>

        <p>
          {vendor.State}
        </p>

      </div>

      <div className="vendor-info-item">

        <label>
          City
        </label>

        <p>
          {vendor.City}
        </p>

      </div>

      <div className="vendor-info-item">

        <label>
          Pincode
        </label>

        <p>
          {vendor.Pincode}
        </p>

      </div>

      <div
        className="vendor-info-item"
        style={{
          gridColumn:
            "1 / span 2"
        }}
      >

        <label>
          Store Address
        </label>

        <p>
          {vendor.StoreAddress}
        </p>

      </div>

      <div
        className="vendor-info-item"
        style={{
          gridColumn:
            "1 / span 2"
        }}
      >

        <label>
          Pickup Address
        </label>

        <p>
          {vendor.PickupAddress}
        </p>

      </div>

    </div>

  );

};

export default AdditionalInformationTab;