import React from "react";

interface Props {
  vendor: any;
}

const ContactPersonTab = ({
  vendor
}: Props) => {

  return (

    <div className="vendor-info-grid">

      <div className="vendor-info-item">

        <label>
          Contact Person
        </label>

        <p>
          {vendor.ContactPerson}
        </p>

      </div>

      <div className="vendor-info-item">

        <label>
          Designation
        </label>

        <p>
          {vendor.Designation}
        </p>

      </div>

      <div className="vendor-info-item">

        <label>
          Email Address
        </label>

        <p>
          {vendor.Email}
        </p>

      </div>

      <div className="vendor-info-item">

        <label>
          Phone Number
        </label>

        <p>
          {vendor.PhoneNumber}
        </p>

      </div>

      <div className="vendor-info-item">

        <label>
          Alternate Phone
        </label>

        <p>
          {vendor.AlternatePhone}
        </p>

      </div>

      <div className="vendor-info-item">

        <label>
          Preferred Communication
        </label>

        <p>
          {vendor.PreferredCommunication}
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
          Communication Address
        </label>

        <p>
          {vendor.CommunicationAddress}
        </p>

      </div>

    </div>

  );

};

export default ContactPersonTab;