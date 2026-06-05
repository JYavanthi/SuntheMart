// const VendorContact=({
// formData,
// setFormData
// }:any)=>{

// return(

// <div className="vendor-form-grid">

// <input
// placeholder="Contact Person"
// value={formData.contactPerson}
// onChange={(e)=>
// setFormData({
// ...formData,
// contactPerson:e.target.value
// })
// }
// />

// <input
// placeholder="Designation"
// value={formData.designation}
// onChange={(e)=>
// setFormData({
// ...formData,
// designation:e.target.value
// })
// }
// />

// <input
// placeholder="Email"
// value={formData.email}
// onChange={(e)=>
// setFormData({
// ...formData,
// email:e.target.value
// })
// }
// />

// <input
// placeholder="Phone"
// value={formData.phoneNumber}
// onChange={(e)=>
// setFormData({
// ...formData,
// phoneNumber:e.target.value
// })
// }
// />

// <input
// placeholder="PAN"
// value={formData.panNumber}
// onChange={(e)=>
// setFormData({
// ...formData,
// panNumber:e.target.value
// })
// }
// />

// </div>

// );

// };

// export default VendorContact;

import { useEffect } from "react";

const VendorContact = ({
formData,
setFormData,
setIsValid
}:any)=>{

useEffect(()=>{

const valid=

formData.contactPerson?.trim() &&
formData.designation?.trim() &&
formData.email?.trim() &&
formData.phoneNumber?.trim() &&
formData.panNumber?.trim() &&
formData.communicationAddress?.trim();

setIsValid(!!valid);

},[formData,setIsValid]);


const handleCheckbox=(value:string)=>{

let current=
formData.preferredCommunication || [];

if(current.includes(value)){

current=current.filter(
(item:string)=>item!==value
);

}
else{

current=[...current,value];

}

setFormData({

...formData,
preferredCommunication:current

});

};

return(

<div className="vendor-contact-wrapper">

<div className="vendor-section">

<h3>

2. Contact Person Information

</h3>

<p className="vendor-subtitle">

Provide details of the primary contact person who will manage this account.

</p>


<div className="vendor-form-grid">

<div className="vendor-input-group">

<label>

Contact Person Full Name *

</label>

<input
placeholder="Enter full name"
value={formData.contactPerson || ""}
onChange={(e)=>
setFormData({

...formData,
contactPerson:e.target.value

})
}
/>

</div>


<div className="vendor-input-group">

<label>

Designation / Role *

</label>

<input
placeholder="Enter designation"
value={formData.designation || ""}
onChange={(e)=>
setFormData({

...formData,
designation:e.target.value

})
}
/>

</div>



<div className="vendor-input-group">

<label>

Email Address *

</label>

<input
placeholder="Enter email address"
value={formData.email || ""}
onChange={(e)=>
setFormData({

...formData,
email:e.target.value

})
}
/>

</div>


<div className="vendor-input-group">

<label>

Phone Number *

</label>

<div className="vendor-phone">

<div className="vendor-country">

🇮🇳 +91

</div>

<input
placeholder="Enter mobile number"
value={formData.phoneNumber || ""}
onChange={(e)=>
setFormData({

...formData,
phoneNumber:e.target.value

})
}
/>

</div>

</div>



<div className="vendor-input-group">

<label>

Alternative Phone Number

</label>

<div className="vendor-phone">

<div className="vendor-country">

🇮🇳 +91

</div>

<input
placeholder="Enter alternate number"
value={formData.alternatePhone || ""}
onChange={(e)=>
setFormData({

...formData,
alternatePhone:e.target.value

})
}
/>

</div>

</div>



<div className="vendor-input-group">

<label>

Aadhaar Number (Optional)

</label>

<input
placeholder="Enter Aadhaar number"
value={formData.aadhaarNumber || ""}
onChange={(e)=>
setFormData({

...formData,
aadhaarNumber:e.target.value

})
}
/>

</div>



<div className="vendor-input-group">

<label>

PAN Number *

</label>

<input
placeholder="Enter PAN number"
value={formData.panNumber || ""}
onChange={(e)=>
setFormData({

...formData,
panNumber:e.target.value

})
}
/>

</div>

</div>



<div className="vendor-input-group">

<label>

Communication Address *

</label>

<textarea
placeholder="Enter communication address"
value={formData.communicationAddress || ""}
onChange={(e)=>
setFormData({

...formData,
communicationAddress:e.target.value

})
}
/>

</div>



<div className="vendor-pref">

<h4>

Preferred Communication

</h4>

<p>

How would you like us to contact you?

</p>

<div className="vendor-pref-row">

<label>

<input
type="checkbox"
checked={
formData.preferredCommunication?.includes("Email")
}
onChange={()=>
handleCheckbox("Email")
}
/>

Email

</label>


<label>

<input
type="checkbox"
checked={
formData.preferredCommunication?.includes("Phone")
}
onChange={()=>
handleCheckbox("Phone")
}
/>

Phone

</label>


<label>

<input
type="checkbox"
checked={
formData.preferredCommunication?.includes("WhatsApp")
}
onChange={()=>
handleCheckbox("WhatsApp")
}
/>

WhatsApp

</label>

</div>

</div>

</div>

</div>

);

};

export default VendorContact;