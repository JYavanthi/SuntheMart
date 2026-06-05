

// import { useEffect } from "react";

// const VendorDocuments = ({
//   files,
//   setFiles,
//   formData,
//   setFormData,
//   setIsValid
// }: any) => {

// useEffect(()=>{

// const valid =

// files.gst &&
// files.businessRegistration &&
// files.pan &&
// files.address &&
// files.passbook &&

// formData.accountHolderName?.trim() &&
// formData.bankName?.trim() &&
// formData.accountNumber?.trim() &&
// formData.ifscCode?.trim() &&
// formData.accountType?.trim() &&
// formData.branchName?.trim();

// setIsValid(!!valid);

// },[
// files,
// formData,
// setIsValid
// ]);



// const handleFile=(name:string,file:any)=>{

// if(!file)return;

// setFiles((prev:any)=>({

// ...prev,
// [name]:file

// }));

// };


// const FileCard=({
// title,
// subTitle,
// id,
// field,
// required=true
// }:any)=>(

// <div className="vendor-doc-card">

// <label>

// {title}

// {required && "*"}

// </label>

// <p>

// {subTitle}

// </p>


// <input
// type="file"
// hidden
// id={id}
// onChange={(e:any)=>
// handleFile(
// field,
// e.target.files?.[0]
// )
// }
// />


// <label
// htmlFor={id}
// className="upload-btn"
// >

// <i className="fa-solid fa-upload"></i>

// {

// files[field]
// ? files[field].name
// : "Upload File"

// }

// </label>

// <small>

// PDF JPG PNG Max 5MB

// </small>

// </div>

// );


// return(

// <div className="vendor-doc-wrapper">

// <div className="vendor-section">

// <h3>

// 3. Documents & Bank Information

// </h3>

// <p className="vendor-subtitle">

// Upload required documents and bank details for verification and payouts.

// </p>



// <h4>

// Document Upload

// </h4>


// <div className="vendor-doc-grid">

// <FileCard
// title="GST Certificate"
// subTitle="Upload GST certificate"
// id="gst"
// field="gst"
// />

// <FileCard
// title="FSSAI License"
// subTitle="Upload FSSAI license"
// id="fssai"
// field="fssai"
// required={false}
// />

// <FileCard
// title="Business Registration"
// subTitle="Upload registration proof"
// id="business"
// field="businessRegistration"
// />

// <FileCard
// title="PAN Card"
// subTitle="Upload PAN card"
// id="pan"
// field="pan"
// />

// <FileCard
// title="Address Proof"
// subTitle="Upload address proof"
// id="address"
// field="address"
// />

// <FileCard
// title="Cancel Cheque/Passbook"
// subTitle="Upload passbook"
// id="passbook"
// field="passbook"
// />

// </div>


// <hr/>


// <h4>

// Bank Details

// </h4>


// <div className="vendor-form-grid-three">

// <div className="vendor-input-group">

// <label>

// Account Holder Name *

// </label>

// <input
// placeholder="Enter holder name"
// value={formData.accountHolderName || ""}
// onChange={(e)=>
// setFormData({

// ...formData,
// accountHolderName:e.target.value

// })
// }
// />

// </div>



// <div className="vendor-input-group">

// <label>

// Bank Name *

// </label>

// <select
// value={formData.bankName || ""}
// onChange={(e)=>
// setFormData({

// ...formData,
// bankName:e.target.value

// })
// }
// >

// <option value="">
// Select Bank
// </option>

// <option>
// HDFC
// </option>

// <option>
// ICICI
// </option>

// <option>
// SBI
// </option>

// </select>

// </div>



// <div className="vendor-input-group">

// <label>

// Account Number *

// </label>

// <input
// placeholder="Enter account number"
// value={formData.accountNumber || ""}
// onChange={(e)=>
// setFormData({

// ...formData,
// accountNumber:e.target.value

// })
// }
// />

// </div>

// </div>



// <div className="vendor-form-grid-three">

// <div className="vendor-input-group">

// <label>

// IFSC Code *

// </label>

// <div
// style={{
// display:"flex",
// gap:"10px"
// }}
// >

// <input
// placeholder="Enter IFSC"
// value={formData.ifscCode || ""}
// onChange={(e)=>
// setFormData({

// ...formData,
// ifscCode:e.target.value

// })
// }
// />

// <button
// className="verify-btn"
// type="button"
// >

// Verify IFSC

// </button>

// </div>

// </div>



// <div className="vendor-input-group">

// <label>

// Account Type *

// </label>

// <select
// value={formData.accountType || ""}
// onChange={(e)=>
// setFormData({

// ...formData,
// accountType:e.target.value

// })
// }
// >

// <option value="">
// Select type
// </option>

// <option>
// Current
// </option>

// <option>
// Savings
// </option>

// </select>

// </div>



// <div className="vendor-input-group">

// <label>

// Branch Name *

// </label>

// <input
// placeholder="Enter branch"
// value={formData.branchName || ""}
// onChange={(e)=>
// setFormData({

// ...formData,
// branchName:e.target.value

// })
// }
// />

// </div>

// </div>



// <div className="vendor-safe">

// <i className="fa-solid fa-shield"></i>

// <div>

// <h5>

// Your Information is Safe

// </h5>

// <p>

// We use bank-level encryption to protect your information.

// </p>

// </div>

// </div>

// </div>

// </div>

// );

// };

// export default VendorDocuments;

import { useEffect } from "react";

const VendorDocuments=({

files,
setFiles,
formData,
setFormData,
setIsValid

}:any)=>{

useEffect(()=>{

const valid=

!!files?.gst &&
!!files?.businessRegistration &&
!!files?.pan &&
!!files?.address &&
!!files?.passbook &&

!!formData?.accountHolderName?.trim() &&
!!formData?.bankName?.trim() &&
!!formData?.accountNumber?.trim() &&
!!formData?.ifscCode?.trim() &&
!!formData?.accountType?.trim() &&
!!formData?.branchName?.trim();

setIsValid(valid);

},[
files,
formData,
setIsValid
]);


const handleFile=(

name:string,
file:any

)=>{

if(!file)return;

setFiles((prev:any)=>({

...prev,
[name]:file

}));

};



const FileCard=({

title,
subTitle,
id,
field,
required=true

}:any)=>(

<div className="vendor-doc-card">

<label>

{title}

{required && "*"}

</label>

<p>

{subTitle}

</p>

<input
type="file"
hidden
id={id}
accept=".pdf,.jpg,.jpeg,.png"
onChange={(e:any)=>{

const selectedFile=
e.target.files?.[0];

if(selectedFile){

handleFile(
field,
selectedFile
);

}

}}
/>


<label
htmlFor={id}
className="upload-btn"
>

<i className="fa-solid fa-upload"></i>

<span>

{

files?.[field]?.name
? files[field].name
: "Upload File"

}

</span>

</label>

<small>

PDF JPG PNG Max 5MB

</small>

</div>

);



return(

<div className="vendor-doc-wrapper">

<div className="vendor-section">

<h3>

3. Documents & Bank Information

</h3>

<p className="vendor-subtitle">

Upload required documents and bank details for verification and payouts.

</p>


<h4>

Document Upload

</h4>


<div className="vendor-doc-grid">

<FileCard
title="GST Certificate"
subTitle="Upload GST certificate"
id="gst"
field="gst"
/>


<FileCard
title="FSSAI License"
subTitle="Upload FSSAI license"
id="fssai"
field="fssai"
required={false}
/>


<FileCard
title="Business Registration"
subTitle="Upload registration proof"
id="businessRegistration"
field="businessRegistration"
/>


<FileCard
title="PAN Card"
subTitle="Upload PAN card"
id="pan"
field="pan"
/>


<FileCard
title="Address Proof"
subTitle="Upload address proof"
id="address"
field="address"
/>


<FileCard
title="Cancel Cheque/Passbook"
subTitle="Upload passbook"
id="passbook"
field="passbook"
/>

</div>


<hr/>


<h4>

Bank Details

</h4>


<div className="vendor-form-grid-three">


<div className="vendor-input-group">

<label>

Account Holder Name *

</label>

<input
placeholder="Enter account holder"
value={formData.accountHolderName || ""}
onChange={(e)=>
setFormData({

...formData,
accountHolderName:e.target.value

})
}
/>

</div>



<div className="vendor-input-group">

<label>

Bank Name *

</label>

<select
value={formData.bankName || ""}
onChange={(e)=>
setFormData({

...formData,
bankName:e.target.value

})
}
>

<option value="">

Select Bank

</option>

<option>

HDFC

</option>

<option>

ICICI

</option>

<option>

SBI

</option>

</select>

</div>



<div className="vendor-input-group">

<label>

Account Number *

</label>

<input
placeholder="Enter account number"
value={formData.accountNumber || ""}
onChange={(e)=>
setFormData({

...formData,
accountNumber:e.target.value

})
}
/>

</div>

</div>



<div className="vendor-form-grid-three">

<div className="vendor-input-group">

<label>

IFSC Code *

</label>

<input
placeholder="Enter IFSC code"
value={formData.ifscCode || ""}
onChange={(e)=>
setFormData({

...formData,
ifscCode:e.target.value

})
}
/>

</div>



<div className="vendor-input-group">

<label>

Account Type *

</label>

<select
value={formData.accountType || ""}
onChange={(e)=>
setFormData({

...formData,
accountType:e.target.value

})
}
>

<option value="">

Select Type

</option>

<option>

Current

</option>

<option>

Savings

</option>

</select>

</div>



<div className="vendor-input-group">

<label>

Branch Name *

</label>

<input
placeholder="Enter branch"
value={formData.branchName || ""}
onChange={(e)=>
setFormData({

...formData,
branchName:e.target.value

})
}
/>

</div>

</div>



<div className="vendor-safe">

<i className="fa-solid fa-shield"></i>

<div>

<h5>

Your Information is Safe

</h5>

<p>

We use bank-level encryption to protect your data.

</p>

</div>

</div>

</div>

</div>

);

};

export default VendorDocuments;