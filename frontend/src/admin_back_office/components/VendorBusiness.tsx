// const VendorBusiness = ({
//   formData,
//   setFormData
// }: any) => {

//   return (

//     <div className="vendor-business-wrapper">

//       {/* BUSINESS INFO */}

//       <div className="vendor-section">

//         <h3>
//           1. Business Information
//         </h3>

//         <div className="vendor-form-grid">

//           <div className="vendor-input-group">

//             <label>
//               Business Name *
//             </label>

//             <input
//               placeholder="Enter business name"
//               value={formData.businessName}
//               onChange={(e)=>
//                 setFormData({
//                   ...formData,
//                   businessName:e.target.value
//                 })
//               }
//             />

//           </div>


//           <div className="vendor-input-group">

//             <label>
//               Business Type *
//             </label>

//             <select
//               value={formData.businessType}
//               onChange={(e)=>
//                 setFormData({
//                   ...formData,
//                   businessType:e.target.value
//                 })
//               }
//             >

//               <option>
//                 Select business type
//               </option>

//               <option>
//                 Private Limited
//               </option>

//               <option>
//                 Partnership
//               </option>

//               <option>
//                 Individual
//               </option>

//             </select>

//           </div>


//           <div className="vendor-input-group">

//             <label>
//               Brand Name *
//             </label>

//             <input
//               placeholder="Enter brand name"
//               value={formData.brandName}
//               onChange={(e)=>
//                 setFormData({
//                   ...formData,
//                   brandName:e.target.value
//                 })
//               }
//             />

//           </div>


//           <div className="vendor-input-group">

//             <label>
//               Category *
//             </label>

//             <select
//               value={formData.category}
//               onChange={(e)=>
//                 setFormData({
//                   ...formData,
//                   category:e.target.value
//                 })
//               }
//             >

//               <option>
//                 Select category
//               </option>

//               <option>
//                 Fruits
//               </option>

//               <option>
//                 Vegetables
//               </option>

//               <option>
//                 Grocery
//               </option>

//             </select>

//           </div>


//           <div className="vendor-input-group">

//             <label>
//               GST Number *
//             </label>

//             <input
//               placeholder="Enter GST Number"
//               value={formData.gstNumber}
//               onChange={(e)=>
//                 setFormData({
//                   ...formData,
//                   gstNumber:e.target.value
//                 })
//               }
//             />

//           </div>


//           <div className="vendor-input-group">

//             <label>
//               FSSAI License
//             </label>

//             <input
//               placeholder="Enter FSSAI Number"
//               value={formData.fssaiNumber}
//               onChange={(e)=>
//                 setFormData({
//                   ...formData,
//                   fssaiNumber:e.target.value
//                 })
//               }
//             />

//           </div>

//         </div>


//         <div className="vendor-input-group">

//           <label>
//             Business Description
//           </label>

//           <textarea
//             placeholder="Briefly describe the business, products and services"
//             value={formData.businessDescription}
//             onChange={(e)=>
//               setFormData({
//                 ...formData,
//                 businessDescription:e.target.value
//               })
//             }
//           />

//         </div>

//       </div>


//       {/* STORE INFO */}

//       <div className="vendor-section">

//         <h3>
//           2. Store Information
//         </h3>

//         <div className="vendor-form-grid">

//           <div className="vendor-input-group">

//             <label>
//               Store Name *
//             </label>

//             <input
//               placeholder="Enter store name"
//               value={formData.storeName}
//               onChange={(e)=>
//                 setFormData({
//                   ...formData,
//                   storeName:e.target.value
//                 })
//               }
//             />

//           </div>


//           <div className="vendor-input-group">

//             <label>
//               Store Address *
//             </label>

//             <textarea
//               placeholder="Enter complete store address"
//               value={formData.storeAddress}
//               onChange={(e)=>
//                 setFormData({
//                   ...formData,
//                   storeAddress:e.target.value
//                 })
//               }
//             />

//           </div>

//         </div>


//         <div className="vendor-form-grid-three">

//           <div className="vendor-input-group">

//             <label>
//               State *
//             </label>

//             <select>

//               <option>
//                 Select State
//               </option>

//             </select>

//           </div>


//           <div className="vendor-input-group">

//             <label>
//               City *
//             </label>

//             <select>

//               <option>
//                 Select City
//               </option>

//             </select>

//           </div>


//           <div className="vendor-input-group">

//             <label>
//               Pincode *
//             </label>

//             <input
//               placeholder="Enter Pincode"
//             />

//           </div>

//         </div>


//         <div className="vendor-input-group">

//           <label>

//             Pickup / Return Address

//           </label>

//           <textarea
//             placeholder="Enter address"
//             value={formData.pickupAddress}
//             onChange={(e)=>
//               setFormData({
//                 ...formData,
//                 pickupAddress:e.target.value
//               })
//             }
//           />

//         </div>

//       </div>

//     </div>

//   );

// };

// export default VendorBusiness;

import { useEffect } from "react";

const VendorBusiness = ({
  formData,
  setFormData,
  setIsValid
}: any) => {

useEffect(()=>{

const valid=

formData.businessName?.trim() &&
formData.businessType?.trim() &&
formData.brandName?.trim() &&
formData.category?.trim() &&
formData.gstNumber?.trim() &&
formData.storeName?.trim() &&
formData.storeAddress?.trim() &&
formData.state?.trim() &&
formData.city?.trim() &&
formData.pincode?.trim();

setIsValid(!!valid);

},[formData,setIsValid]);

return (

<div className="vendor-business-wrapper">

<div className="vendor-section">

<h3>
1. Business Information
</h3>

<div className="vendor-form-grid">

<div className="vendor-input-group">

<label>
Business Name *
</label>

<input
placeholder="Enter business name"
value={formData.businessName || ""}
onChange={(e)=>
setFormData({
...formData,
businessName:e.target.value
})
}
/>

</div>


<div className="vendor-input-group">

<label>
Business Type *
</label>

<select
value={formData.businessType || ""}
onChange={(e)=>
setFormData({
...formData,
businessType:e.target.value
})
}
>

<option value="">
Select business type
</option>

<option>
Private Limited
</option>

<option>
Partnership
</option>

<option>
Individual
</option>

</select>

</div>


<div className="vendor-input-group">

<label>
Brand Name *
</label>

<input
placeholder="Enter brand name"
value={formData.brandName || ""}
onChange={(e)=>
setFormData({
...formData,
brandName:e.target.value
})
}
/>

</div>


<div className="vendor-input-group">

<label>
Category *
</label>

<select
value={formData.category || ""}
onChange={(e)=>
setFormData({
...formData,
category:e.target.value
})
}
>

<option value="">
Select category
</option>

<option>
Fruits
</option>

<option>
Vegetables
</option>

<option>
Grocery
</option>
<option>
Meat
</option>

</select>

</div>


<div className="vendor-input-group">

<label>
GST Number *
</label>

<input
placeholder="Enter GST Number"
value={formData.gstNumber || ""}
onChange={(e)=>
setFormData({
...formData,
gstNumber:e.target.value
})
}
/>

</div>


<div className="vendor-input-group">

<label>
FSSAI License
</label>

<input
placeholder="Enter FSSAI Number"
value={formData.fssaiNumber || ""}
onChange={(e)=>
setFormData({
...formData,
fssaiNumber:e.target.value
})
}
/>

</div>

</div>


<div className="vendor-input-group">

<label>
Business Description
</label>

<textarea
placeholder="Briefly describe business"
value={formData.businessDescription || ""}
onChange={(e)=>
setFormData({
...formData,
businessDescription:e.target.value
})
}
/>

</div>

</div>



<div className="vendor-section">

<h3>
2. Store Information
</h3>

<div className="vendor-form-grid">

<div className="vendor-input-group">

<label>
Store Name *
</label>

<input
placeholder="Enter store name"
value={formData.storeName || ""}
onChange={(e)=>
setFormData({
...formData,
storeName:e.target.value
})
}
/>

</div>


<div className="vendor-input-group">

<label>
Store Address *
</label>

<textarea
placeholder="Enter store address"
value={formData.storeAddress || ""}
onChange={(e)=>
setFormData({
...formData,
storeAddress:e.target.value
})
}
/>

</div>

</div>


<div className="vendor-form-grid-three">

<div className="vendor-input-group">

<label>
State *
</label>

<input
placeholder="State"
value={formData.state || ""}
onChange={(e)=>
setFormData({
...formData,
state:e.target.value
})
}
/>

</div>


<div className="vendor-input-group">

<label>
City *
</label>

<input
placeholder="City"
value={formData.city || ""}
onChange={(e)=>
setFormData({
...formData,
city:e.target.value
})
}
/>

</div>


<div className="vendor-input-group">

<label>
Pincode *
</label>

<input
placeholder="Pincode"
value={formData.pincode || ""}
onChange={(e)=>
setFormData({
...formData,
pincode:e.target.value
})
}
/>

</div>

</div>


<div className="vendor-input-group">

<label>

Pickup / Return Address

</label>

<textarea
placeholder="Enter address"
value={formData.pickupAddress || ""}
onChange={(e)=>
setFormData({
...formData,
pickupAddress:e.target.value
})
}
/>

</div>

</div>

</div>

);

};

export default VendorBusiness;