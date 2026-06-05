import React from "react";

interface Props {
  vendor: any;
}

const DocumentsBankTab = ({
  vendor
}: Props) => {

  const documents = [

    {
      title:
        "GST Certificate",
      file:
        vendor.GSTCertificate
    },

    {
      title:
        "FSSAI License",
      file:
        vendor.FSSAILicense
    },

    {
      title:
        "Business Registration",
      file:
        vendor.BusinessRegistrationCertificate
    },

    {
      title:
        "PAN Card",
      file:
        vendor.PANCard
    },

    {
      title:
        "Address Proof",
      file:
        vendor.AddressProof
    },

    {
      title:
        "Cancelled Cheque / Passbook",
      file:
        vendor.CancelChequeOrPassbook
    },

    {
      title:
        "Aadhaar Document",
      file:
        vendor.AadhaarDocument
    }

  ];

  return (

    <div className="vendor-doc-grid">

      {documents.map(
        (
          doc,
          index
        ) => (

          <div
            className="vendor-doc-card"
            key={index}
          >

            <div className="vendor-doc-icon">
              📄
            </div>

            <h4>
              {doc.title}
            </h4>

            {doc.file ? (

              <a
                href={`http://localhost:4000/${doc.file}`}
                target="_blank"
                rel="noreferrer"
                className="vendor-doc-btn"
              >
                View Document
              </a>

            ) : (

              <span className="vendor-doc-missing">
                Not Uploaded
              </span>

            )}

          </div>

        )
      )}

    </div>

  );

};

export default DocumentsBankTab;