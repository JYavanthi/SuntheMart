import Sidebar from "./Sidebar";
import "./styles/addvendor.css";

import { useState } from "react";

import VendorBusiness from "./components/VendorBusiness";
import VendorContact from "./components/VendorContact";
import VendorDocuments from "./components/VendorDocuments";
import VendorReview from "./components/VendorReview";

const AddVendor=()=>{

const [step,setStep]=useState(1);

// const [formData,setFormData]=useState({});
// const [files,setFiles]=useState({});
const [isValid,setIsValid]=useState(false);

const [formData,setFormData]=useState({

businessName:"",
brandName:"",
businessType:"",
category:"",
gstNumber:"",
fssaiNumber:"",
businessDescription:"",

storeName:"",
storeAddress:"",
pickupAddress:"",
state:"",
city:"",
pincode:"",

contactPerson:"",
designation:"",
email:"",
phoneNumber:"",
alternatePhone:"",
panNumber:"",
aadhaarNumber:"",
communicationAddress:"",
preferredCommunication:[],

accountHolderName:"",
bankName:"",
accountNumber:"",
ifscCode:"",
accountType:"",
branchName:""

});

const [files,setFiles]=useState({

gst:null,
fssai:null,
businessRegistration:null,
pan:null,
address:null,
passbook:null

});
const handleSubmit = async () => {

try{

/* STEP 1 → SAVE VENDOR DATA */

const vendorResponse = await fetch(

"http://localhost:4000/api/vendor/register",

{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(formData)

}

);

const vendorResult=
await vendorResponse.json();

if(!vendorResult.success){

alert(

vendorResult.message ||
"Vendor creation failed"

);

return;

}

const vendorId=
vendorResult.vendorId;



/* STEP 2 → UPLOAD DOCUMENTS */

const documentForm=
new FormData();

documentForm.append(
"vendorId",
vendorId
);

Object.entries(files).forEach(

([key,value]:any)=>{

if(value){

documentForm.append(
key,
value
);

}

}

);


const docResponse=await fetch(

"http://localhost:4000/api/vendor/documents",

{

method:"POST",
body:documentForm

}

);

const docResult=
await docResponse.json();


if(docResult.success){

alert(
"Vendor created successfully"
);

setStep(1);

setFormData({

businessName:"",
brandName:"",
businessType:"",
category:"",
gstNumber:"",
fssaiNumber:"",
businessDescription:"",

storeName:"",
storeAddress:"",
pickupAddress:"",
state:"",
city:"",
pincode:"",

contactPerson:"",
designation:"",
email:"",
phoneNumber:"",
alternatePhone:"",
panNumber:"",
aadhaarNumber:"",
communicationAddress:"",
preferredCommunication:[],

accountHolderName:"",
bankName:"",
accountNumber:"",
ifscCode:"",
accountType:"",
branchName:""

});

setFiles({

gst:null,
fssai:null,
businessRegistration:null,
pan:null,
address:null,
passbook:null

});

}
else{

alert(
"Document upload failed"
);

}

}
catch(error){

console.log(error);

alert(
"Something went wrong"
);

}

};

return(
<>
<div className="vendor-layout">

{/* SIDEBAR */}

<div className="vendor-layout-sidebar">

<Sidebar/>

</div>


{/* RIGHT CONTENT */}

<div className="vendor-layout-main">

{/* TOP BAR */}

<div className="vendor-topbar">

<div>

<h2>
Vendor Registration
</h2>

<p>
Create a new vendor account and onboard them to SunThe Mart platform.
</p>

</div>

<div className="vendor-top-right">

<i className="fa-regular fa-bell"></i>

<div className="vendor-user">

<div className="vendor-avatar">
SA
</div>

<div>

<h4>
SuntheMart Admin
</h4>

<span>
Super Admin
</span>

</div>

</div>

</div>

</div>


{/* STEP CARD */}

<div className="vendor-main-card">

<div className="vendor-stepper">

<div className={`step ${step>=1?"active":""}`}>
<div>1</div>
<span>Business Details</span>
</div>

<div className={`step ${step>=2?"active":""}`}>
<div>2</div>
<span>Contact Person</span>
</div>

<div className={`step ${step>=3?"active":""}`}>
<div>3</div>
<span>Documents & Bank</span>
</div>

<div className={`step ${step>=4?"active":""}`}>
<div>4</div>
<span>Review & Submit</span>
</div>

</div>


<div className="vendor-form-section">

<div className="vendor-left">

{step===1&&(

<VendorBusiness
formData={formData}
setFormData={setFormData}
setIsValid={setIsValid}
/>

)}

{step===2&&(

<VendorContact
formData={formData}
setFormData={setFormData}
setIsValid={setIsValid}
/>

)}

{step===3&&(

<VendorDocuments
files={files}
setFiles={setFiles}
formData={formData}
setFormData={setFormData}
setIsValid={setIsValid}
/>

)}

{step===4&&(

<VendorReview
formData={formData}
files={files}
setStep={setStep}
setIsValid={setIsValid}
handleSubmit={handleSubmit}
/>

)}

<div className="vendor-btn-row">

{step>1&&(

<button
className="back-btn"
onClick={()=>
setStep(step-1)
}
>

Back

</button>

)}

{step<4&&(

<button
className="next-btn"
disabled={!isValid}
onClick={() => setStep(step+1)}
>
Save & Next
</button>

)}

</div>

</div>


{/* RIGHT SIDE CARD */}

{/* <div className="vendor-right">

<h3>

Why sell on SunThe Mart?

</h3>

<div className="vendor-info">

<div>

<i className="fa-solid fa-users"></i>

</div>

<div>

<h4>
Wide Customer Reach
</h4>

<p>
Access thousands of customers
across the region.

</p>

</div>

</div>


<div className="vendor-info">

<div>

<i className="fa-solid fa-store"></i>

</div>

<div>

<h4>
Easy Product Management
</h4>

<p>

List manage and update products.

</p>

</div>

</div>


<div className="vendor-info">

<div>

<i className="fa-solid fa-shield"></i>

</div>

<div>

<h4>

Secure Payments

</h4>

<p>

Receive payments directly.

</p>

</div>

</div>

</div> */}

</div>

</div>

</div>

</div>


</>

);

};

export default AddVendor;