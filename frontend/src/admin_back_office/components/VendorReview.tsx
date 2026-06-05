// const VendorReview=({
// formData
// }:any)=>{

// return(

// <div>

// <h3>
// Review Details
// </h3>

// <p>
// Business:
// {formData.businessName}
// </p>

// <p>
// Contact:
// {formData.contactPerson}
// </p>

// <p>
// Email:
// {formData.email}
// </p>

// <p>
// GST:
// {formData.gstNumber}
// </p>

// </div>

// );

// };

// export default VendorReview;

import { useEffect } from "react";

const VendorReview=({
formData,
files,
setStep,
setIsValid,
handleSubmit
}:any)=>{

useEffect(()=>{

const valid=

formData.businessName &&
formData.contactPerson &&
formData.email &&
formData.gstNumber &&
files.gst &&
files.pan;

setIsValid(!!valid);

},[
formData,
files,
setIsValid
]);


return(

<div className="vendor-review-wrapper">

<div className="vendor-review-left">

{/* BUSINESS */}

<div className="vendor-review-card">

<div className="vendor-review-header">

<div>

<h3>

Business Information

</h3>

</div>

<button
onClick={()=>setStep(1)}
className="vendor-edit-btn"
>

Edit

</button>

</div>


<div className="vendor-review-grid">

<div>

<label>

Business Name

</label>

<p>

{formData.businessName}

</p>

</div>


<div>

<label>

Business Type

</label>

<p>

{formData.businessType}

</p>

</div>


<div>

<label>

Category

</label>

<p>

{formData.category}

</p>

</div>


<div>

<label>

Brand Name

</label>

<p>

{formData.brandName}

</p>

</div>


<div>

<label>

GST Number

</label>

<p>

{formData.gstNumber}

</p>

</div>


<div>

<label>

FSSAI

</label>

<p>

{formData.fssaiNumber}

</p>

</div>

</div>

</div>



{/* CONTACT */}

<div className="vendor-review-card">

<div className="vendor-review-header">

<h3>

Contact Information

</h3>

<button
className="vendor-edit-btn"
onClick={()=>setStep(2)}
>

Edit

</button>

</div>


<div className="vendor-review-grid">

<div>

<label>

Contact Person

</label>

<p>

{formData.contactPerson}

</p>

</div>


<div>

<label>

Designation

</label>

<p>

{formData.designation}

</p>

</div>


<div>

<label>

Email

</label>

<p>

{formData.email}

</p>

</div>


<div>

<label>

Phone Number

</label>

<p>

{formData.phoneNumber}

</p>

</div>


<div>

<label>

Communication Address

</label>

<p>

{formData.communicationAddress}

</p>

</div>

</div>

</div>




{/* DOCUMENTS */}

<div className="vendor-review-card">

<div className="vendor-review-header">

<h3>

Documents & Bank Information

</h3>

<button
className="vendor-edit-btn"
onClick={()=>setStep(3)}
>

Edit

</button>

</div>


<div className="vendor-doc-list">

<p>

✅ GST Certificate

</p>

<p>

✅ PAN Card

</p>

<p>

✅ FSSAI License

</p>

<p>

✅ Business Registration

</p>

<p>

✅ Address Proof

</p>

<p>

✅ Passbook

</p>

</div>



<div className="vendor-review-grid">

<div>

<label>

Account Holder

</label>

<p>

{formData.accountHolderName}

</p>

</div>


<div>

<label>

Bank Name

</label>

<p>

{formData.bankName}

</p>

</div>


<div>

<label>

Account Number

</label>

<p>

{formData.accountNumber}

</p>

</div>


<div>

<label>

IFSC

</label>

<p>

{formData.ifscCode}

</p>

</div>

</div>

</div>



<div className="vendor-final-box">

<h4>

You're all set!

</h4>

<p>

Please review all information before submission.

</p>

</div>



<div className="vendor-review-footer">

<button
className="vendor-back-btn"
onClick={()=>setStep(3)}
>

Back

</button>

<button
className="vendor-submit-btn"
onClick={handleSubmit}
>

Submit & Create Vendor

</button>

</div>

</div>



{/* RIGHT PANEL */}

<div className="vendor-review-right">

<div className="vendor-review-side-card">

<h3>

Vendor Onboarding Summary

</h3>

<h4>

{formData.businessName}

</h4>

<span>

Ready to Submit

</span>

</div>



<div className="vendor-review-side-card">

<h3>

Registration Progress

</h3>

<p>

✅ Business Details

</p>

<p>

✅ Contact Details

</p>

<p>

✅ Documents

</p>

<p>

🟢 Review & Submit

</p>

</div>



<div className="vendor-review-side-card">

<h3>

What happens next?

</h3>

<p>

📝 Review by admin

</p>

<p>

✔ Verification

</p>

<p>

🚀 Approval & Activation

</p>

<p>

🛒 Start Selling

</p>

</div>

</div>

</div>

);

};

export default VendorReview;