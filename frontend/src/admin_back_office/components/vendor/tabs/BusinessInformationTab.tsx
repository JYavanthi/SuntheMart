import React from "react";

interface Props {
  vendor: any;
}

const BusinessInformationTab = ({
  vendor
}: Props) => {

  return (

    <div className="vendor-info-grid">

      <div className="vendor-info-item">
        <label>
          Business Name
        </label>
        <p>
          {vendor.BusinessName}
        </p>
      </div>

      <div className="vendor-info-item">
        <label>
          Brand Name
        </label>
        <p>
          {vendor.BrandName}
        </p>
      </div>

      <div className="vendor-info-item">
        <label>
          Business Type
        </label>
        <p>
          {vendor.BusinessType}
        </p>
      </div>

      <div className="vendor-info-item">
        <label>
          Category
        </label>
        <p>
          {vendor.Category}
        </p>
      </div>

      <div className="vendor-info-item">
        <label>
          GST Number
        </label>
        <p>
          {vendor.GSTNumber}
        </p>
      </div>

      <div className="vendor-info-item">
        <label>
          FSSAI Number
        </label>
        <p>
          {vendor.FSSAINumber}
        </p>
      </div>

      <div className="vendor-info-item">
        <label>
          PAN Number
        </label>
        <p>
          {vendor.PANNumber}
        </p>
      </div>

      <div className="vendor-info-item">
        <label>
          Registration Type
        </label>
        <p>
          {vendor.RegistrationType}
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
          Business Description
        </label>

        <p>
          {
            vendor.BusinessDescription
          }
        </p>

      </div>

    </div>

  );

};

export default BusinessInformationTab;