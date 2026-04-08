
// import React, { useEffect, useState, useRef } from "react";
// import "./styles/addressFormModal.css";
// import { useAddress } from "./context/AddressContext";
// import axios from "axios";
// import { toast } from "react-hot-toast";

// interface AddressFormProps {
//   open: boolean;
//   onClose: () => void;
//   form: any;
//   setForm: any;
//   userId: number;
//   editingId: number | null;
// }

// const AddressFormModal: React.FC<AddressFormProps> = ({
//   open,
//   onClose,
//   form,
//   setForm,
//   userId,
//   editingId
// }) => {

//   const { addAddress, updateAddress } = useAddress();

//   const modalRef = useRef<HTMLDivElement>(null);

//   const flatRef = useRef<HTMLInputElement>(null);
//   const streetRef = useRef<HTMLInputElement>(null);
//   const stateRef = useRef<HTMLInputElement>(null);
//   const cityRef = useRef<HTMLInputElement>(null);
//   const pincodeRef = useRef<HTMLInputElement>(null);
//   const nameRef = useRef<HTMLInputElement>(null);
//   const mobileRef = useRef<HTMLInputElement>(null);

//   const [errors, setErrors] = useState<any>({});

//   const [states,setStates] = useState<any[]>([]);
//   const [cities,setCities] = useState<any[]>([]);
//   const [pincodes,setPincodes] = useState<string[]>([]);

//   const [filteredStates,setFilteredStates] = useState<any[]>([]);
//   const [filteredCities,setFilteredCities] = useState<any[]>([]);
//   const [filteredPincodes,setFilteredPincodes] = useState<string[]>([]);

//   const [showStateDropdown,setShowStateDropdown] = useState(false);
//   const [showCityDropdown,setShowCityDropdown] = useState(false);
//   const [showPincodeDropdown,setShowPincodeDropdown] = useState(false);

//   const API_BASE = "http://localhost:4000/api/location";

//   const closeAllDropdowns = () => {
//     setShowStateDropdown(false);
//     setShowCityDropdown(false);
//     setShowPincodeDropdown(false);
//   };

//   // close dropdowns when clicking anywhere inside modal except inputs
//   const handleInsideClick = (e: React.MouseEvent) => {
//     const target = e.target as HTMLElement;
//     if (target.tagName !== "INPUT") {
//       closeAllDropdowns();
//     }
//   };

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
//         closeAllDropdowns();
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   useEffect(()=>{
//     const fetchStates = async ()=>{
//       try{
//         const res = await axios.get(`${API_BASE}/states`);
//         setStates(res.data.data);
//       }catch{
//         toast.error("Failed to load states");
//       }
//     };
//     fetchStates();
//   },[]);

//   useEffect(()=>{
//     if(!form.state) return;

//     const fetchCities = async ()=>{
//       try{
//         const stateObj = states.find((s:any)=>s.name===form.state);
//         if(!stateObj) return;

//         const res = await axios.get(`${API_BASE}/cities/${stateObj.id}`);
//         setCities(res.data.data);
//       }catch{
//         toast.error("Failed to load cities");
//       }
//     };

//     fetchCities();
//   },[form.state,states]);

//   useEffect(()=>{
//     if(!form.state || !form.city) return;

//     const fetchPincodes = async ()=>{
//       try{
//         const stateObj = states.find((s:any)=>s.name===form.state);
//         const cityObj = cities.find((c:any)=>c.name===form.city);

//         if(!stateObj || !cityObj) return;

//         const res = await axios.get(`${API_BASE}/pincodes`,{
//           params:{
//             stateId:stateObj.id,
//             cityId:cityObj.id
//           }
//         });

//         const pins: string[] = [
//           ...new Set((res.data.data as any[]).map((p:any)=>String(p.pincode)))
//         ];

//         setPincodes(pins);
//         setFilteredPincodes(pins);

//       }catch{
//         toast.error("Failed to load pincodes");
//       }
//     };

//     fetchPincodes();

//   },[form.state,form.city,states,cities]);

//   if(!open) return null;

//   const handleEnter = (e: React.KeyboardEvent, nextRef: React.RefObject<HTMLInputElement>) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       nextRef.current?.focus();
//     }
//   };

//   const validateForm = () => {
//     const newErrors: any = {};

//     if (!form.flat) newErrors.flat = true;
//     if (!form.street) newErrors.street = true;
//     if (!form.state) newErrors.state = true;
//     if (!form.city) newErrors.city = true;
//     if (!form.pincode) newErrors.pincode = true;
//     if (!form.name) newErrors.name = true;
//     if (!form.mobile) newErrors.mobile = true;

//     setErrors(newErrors);

//     if (newErrors.flat) flatRef.current?.focus();
//     else if (newErrors.street) streetRef.current?.focus();
//     else if (newErrors.state) stateRef.current?.focus();
//     else if (newErrors.city) cityRef.current?.focus();
//     else if (newErrors.pincode) pincodeRef.current?.focus();
//     else if (newErrors.name) nameRef.current?.focus();
//     else if (newErrors.mobile) mobileRef.current?.focus();

//     return Object.keys(newErrors).length === 0;
//   };

//   const onSave = async ()=>{

//     if (!validateForm()) {
//       toast.error("Please fill all mandatory fields");
//       return;
//     }

//     if(!pincodes.includes(form.pincode)){
//       toast.error("Invalid pincode for selected city");
//       return;
//     }

//     if(!/^[0-9]{10}$/.test(form.mobile)){
//       toast.error("Enter valid mobile number");
//       return;
//     }

//     try{

//       const payload = {
//         name:form.name,
//         mobile:form.mobile,
//         flat:form.flat,
//         street:form.street,
//         landmark:form.landmark,
//         city:form.city,
//         state:form.state,
//         pincode:form.pincode,
//         type:form.type,
//         isDefault:form.default
//       };

//       if(editingId){
//         await updateAddress(userId,{id:editingId,...payload});
//         toast.success("Address updated");
//       }else{
//         await addAddress(userId,payload);
//         toast.success("Address added");
//       }

//       setForm({
//         flat:"",
//         street:"",
//         landmark:"",
//         pincode:"",
//         city:"",
//         state:"",
//         name:"",
//         mobile:"",
//         type:"Home",
//         default:false
//       });

//       onClose();

//     }catch{
//       toast.error("Something went wrong");
//     }

//   };

//   return(

// <div className="address-overlay">

// <div className="address-modal" ref={modalRef} onClick={handleInsideClick}>

// <button className="close-x" onClick={onClose}>×</button>

// <div className="address-form-ui">

// <h3>{editingId ? "Edit Address":"Add new address"}</h3>

// {/* <input
// ref={flatRef}
// className={errors.flat ? "error-input" : ""}
// placeholder="Flat / Building*"
// value={form.flat}
// onKeyDown={(e)=>handleEnter(e, streetRef)}
// onClick={closeAllDropdowns}
// onChange={(e)=>{
//   setForm({...form,flat:e.target.value});
//   setErrors({...errors,flat:false});
// }}
// /> */}
// <div className="input-wrapper">
//   <input
//     ref={flatRef}
//     className={errors.flat ? "error-input" : ""}
//     placeholder="Flat / Building"
//     value={form.flat}
//     onKeyDown={(e)=>handleEnter(e, streetRef)}
//     onClick={closeAllDropdowns}
//     onChange={(e)=>{
//       setForm({...form,flat:e.target.value});
//       setErrors({...errors,flat:false});
//     }}
//   />
//   <span className="required-star">*</span>
// </div>

// <input
// ref={streetRef}
// className={errors.street ? "error-input" : ""}
// placeholder="Street / Area*"
// value={form.street}
// onKeyDown={(e)=>handleEnter(e, stateRef)}
// onClick={closeAllDropdowns}
// onChange={(e)=>{
//   setForm({...form,street:e.target.value});
//   setErrors({...errors,street:false});
// }}
// />

// <input
// placeholder="Landmark"
// value={form.landmark}
// onClick={closeAllDropdowns}
// onChange={(e)=>setForm({...form,landmark:e.target.value})}
// />

// <div className="add-two-col">

// <div style={{position:"relative"}}>

// <input
// ref={stateRef}
// className={errors.state ? "error-input" : ""}
// placeholder="State"
// value={form.state}
// onKeyDown={(e)=>handleEnter(e, cityRef)}
// onClick={()=>{
// closeAllDropdowns();
// setFilteredStates(states);
// setShowStateDropdown(true);
// }}
// onChange={(e)=>{
// const value = e.target.value;
// setForm({...form,state:value,city:"",pincode:""});
// setErrors({...errors,state:false});
// const filtered = states.filter((s:any)=>
// s.name.toLowerCase().includes(value.toLowerCase())
// );
// setFilteredStates(filtered);
// setShowStateDropdown(true);
// }}
// />

// {showStateDropdown &&(
// <div className="dropdown-list">
// {filteredStates.map((state:any)=>(
// <div
// key={state.id}
// className="dropdown-item"
// onClick={()=>{
// setForm({...form,state:state.name,city:"",pincode:""});
// setCities([]);
// setPincodes([]);
// setShowStateDropdown(false);
// }}
// >
// {state.name}
// </div>
// ))}
// </div>
// )}

// </div>

// <div style={{position:"relative"}}>

// <input
// ref={cityRef}
// className={errors.city ? "error-input" : ""}
// placeholder="City"
// value={form.city}
// onKeyDown={(e)=>handleEnter(e, pincodeRef)}
// onClick={()=>{
// closeAllDropdowns();
// if(!form.state){
// toast.error("Select state first");
// return;
// }
// setFilteredCities(cities);
// setShowCityDropdown(true);
// }}
// onChange={(e)=>{
// const value = e.target.value;
// setForm({...form,city:value,pincode:""});
// setErrors({...errors,city:false});
// const filtered = cities.filter((c:any)=>
// c.name.toLowerCase().includes(value.toLowerCase())
// );
// setFilteredCities(filtered);
// setShowCityDropdown(true);
// }}
// />

// {showCityDropdown &&(
// <div className="dropdown-list">
// {filteredCities.map((city:any)=>(
// <div
// key={city.id}
// className="dropdown-item"
// onClick={()=>{
// setForm({...form,city:city.name,pincode:""});
// setShowCityDropdown(false);
// }}
// >
// {city.name}
// </div>
// ))}
// </div>
// )}

// </div>

// </div>

// <div style={{position:"relative"}}>

// <input
// ref={pincodeRef}
// className={errors.pincode ? "error-input" : ""}
// placeholder="Pincode*"
// value={form.pincode}
// onKeyDown={(e)=>handleEnter(e, nameRef)}
// onClick={()=>{
// closeAllDropdowns();
// if(!form.state || !form.city){
// toast.error("Select state & city first");
// return;
// }
// setFilteredPincodes(pincodes);
// setShowPincodeDropdown(true);
// }}
// onChange={(e)=>{
// const value = e.target.value.replace(/\D/g,"");
// const filtered = pincodes.filter((p)=>p.startsWith(value));
// setFilteredPincodes(filtered);
// setForm({...form,pincode:value});
// setErrors({...errors,pincode:false});
// setShowPincodeDropdown(true);
// }}
// />

// {showPincodeDropdown && filteredPincodes.length>0 &&(
// <div className="dropdown-list">
// {filteredPincodes.map((pin)=>(
// <div
// key={pin}
// className="dropdown-item"
// onClick={()=>{
// setForm({...form,pincode:pin});
// setShowPincodeDropdown(false);
// }}
// >
// {pin}
// </div>
// ))}
// </div>
// )}

// </div>

// <h3>Alternate Contact Details</h3>

// <input
// ref={nameRef}
// className={errors.name ? "error-input" : ""}
// placeholder="Name*"
// value={form.name}
// onKeyDown={(e)=>handleEnter(e, mobileRef)}
// onClick={closeAllDropdowns}
// onChange={(e)=>{
//   setForm({...form,name:e.target.value});
//   setErrors({...errors,name:false});
// }}
// />

// <input
// ref={mobileRef}
// className={errors.mobile ? "error-input" : ""}
// placeholder="Mobile*"
// value={form.mobile}
// onClick={closeAllDropdowns}
// onChange={(e)=>{
//   setForm({...form,mobile:e.target.value});
//   setErrors({...errors,mobile:false});
// }}
// />

// <div className="type-btns">

// {["Home","Work","Other"].map((t)=>(
// <button
// key={t}
// className={form.type===t?"active":""}
// onClick={()=>setForm({...form,type:t})}
// >
// {t}
// </button>
// ))}

// <button className="address-save-btn" onClick={onSave}>
// {editingId ? "UPDATE":"SAVE"}
// </button>

// </div>

// <label className="default-check">

// <input
// type="checkbox"
// checked={form.default}
// onChange={(e)=>setForm({...form,default:e.target.checked})}
// />

// Save as default address

// </label>

// </div>

// </div>

// </div>

// );

// };

// export default AddressFormModal;

import React, { useEffect, useState, useRef } from "react";
import "./styles/addressFormModal.css";
import { useAddress } from "./context/AddressContext";
import axios from "axios";
import { toast } from "react-hot-toast";
import { showToast } from "./components/CustomToast";
import mndtryImg from "./assets/mndtry.jpeg"

interface AddressFormProps {
  open: boolean;
  onClose: () => void;
  form: any;
  setForm: any;
  userId: number;
  editingId: number | null;
}

const AddressFormModal: React.FC<AddressFormProps> = ({
  open,
  onClose,
  form,
  setForm,
  userId,
  editingId
}) => {

  const { addAddress, updateAddress } = useAddress();

  const modalRef = useRef<HTMLDivElement>(null);

  const flatRef = useRef<HTMLInputElement>(null);
  const streetRef = useRef<HTMLInputElement>(null);
  const stateRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const pincodeRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const mobileRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState<any>({});
  const [blinkErrors, setBlinkErrors] = useState<any>({});
  const [blinkKey, setBlinkKey] = useState(0);

  const [states,setStates] = useState<any[]>([]);
  const [cities,setCities] = useState<any[]>([]);
  const [pincodes,setPincodes] = useState<string[]>([]);

  const [filteredStates,setFilteredStates] = useState<any[]>([]);
  const [filteredCities,setFilteredCities] = useState<any[]>([]);
  const [filteredPincodes,setFilteredPincodes] = useState<string[]>([]);

  const [showStateDropdown,setShowStateDropdown] = useState(false);
  const [showCityDropdown,setShowCityDropdown] = useState(false);
  const [showPincodeDropdown,setShowPincodeDropdown] = useState(false);

  const API_BASE = "http://localhost:4000/api/location";

  const closeAllDropdowns = () => {
    setShowStateDropdown(false);
    setShowCityDropdown(false);
    setShowPincodeDropdown(false);
  };

  // close dropdowns when clicking anywhere inside modal except inputs
  const handleInsideClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName !== "INPUT") {
      closeAllDropdowns();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeAllDropdowns();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(()=>{
    const fetchStates = async ()=>{
      try{
        const res = await axios.get(`${API_BASE}/states`);
        setStates(res.data.data);
      }catch{
        toast.error("Failed to load states");
      }
    };
    fetchStates();
  },[]);

  useEffect(()=>{
    if(!form.state) return;

    const fetchCities = async ()=>{
      try{
        const stateObj = states.find((s:any)=>s.name===form.state);
        if(!stateObj) return;

        const res = await axios.get(`${API_BASE}/cities/${stateObj.id}`);
        setCities(res.data.data);
      }catch{
        toast.error("Failed to load cities");
      }
    };

    fetchCities();
  },[form.state,states]);

  useEffect(()=>{
    if(!form.state || !form.city) return;

    const fetchPincodes = async ()=>{
      try{
        const stateObj = states.find((s:any)=>s.name===form.state);
        const cityObj = cities.find((c:any)=>c.name===form.city);

        if(!stateObj || !cityObj) return;

        const res = await axios.get(`${API_BASE}/pincodes`,{
          params:{
            stateId:stateObj.id,
            cityId:cityObj.id
          }
        });

        const pins: string[] = [
          ...new Set((res.data.data as any[]).map((p:any)=>String(p.pincode)))
        ];

        setPincodes(pins);
        setFilteredPincodes(pins);

      }catch{
        toast.error("Failed to load pincodes");
      }
    };

    fetchPincodes();

  },[form.state,form.city,states,cities]);

  if(!open) return null;

  const handleEnter = (e: React.KeyboardEvent, nextRef: React.RefObject<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      nextRef.current?.focus();
    }
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (!form.flat) newErrors.flat = true;
    if (!form.street) newErrors.street = true;
    if (!form.state) newErrors.state = true;
    if (!form.city) newErrors.city = true;
    if (!form.pincode) newErrors.pincode = true;
    // if (!form.name) newErrors.name = true;
    // if (!form.mobile) newErrors.mobile = true;

    setErrors(newErrors);

    // FIX: blur active element so blinking works even on focused field
    (document.activeElement as HTMLElement)?.blur();

    // trigger blinking (force re-render using key)
    setBlinkErrors(newErrors);
    setBlinkKey(prev => prev + 1);

    // remove after animation
    setTimeout(() => setBlinkErrors({}), 1600);

    if (newErrors.flat) flatRef.current?.focus();
    else if (newErrors.street) streetRef.current?.focus();
    else if (newErrors.state) stateRef.current?.focus();
    else if (newErrors.city) cityRef.current?.focus();
    else if (newErrors.pincode) pincodeRef.current?.focus();
    // else if (newErrors.name) nameRef.current?.focus();
    // else if (newErrors.mobile) mobileRef.current?.focus();

    return Object.keys(newErrors).length === 0;
  };

  const onSave = async ()=>{

//     if (!validateForm()) {
//       toast.error("Please fill all mandatory fields", {
//   id: "form-error"
// });
//       return;
//     }
if (!validateForm()) {
  showToast(
    mndtryImg,
    "Form Error",
    "Please fill all mandatory fields",
    "form-error"
  );
  return;
}

    if(!pincodes.includes(form.pincode)){
      toast.error("Invalid pincode for selected city", {
  id: "form-error"
});
      return;
    }

//     if(!/^[0-9]{10}$/.test(form.mobile)){
//       toast.error("Enter valid mobile number", {
//   id: "mobile-error"
// });
//       return;
//     }
if (form.mobile && !/^[0-9]{10}$/.test(form.mobile)) {
  toast.error("Enter valid mobile number", {
    id: "mobile-error"
  });
  return;
}

    try{

      const payload = {
        name:form.name,
        mobile:form.mobile,
        flat:form.flat,
        street:form.street,
        landmark:form.landmark,
        city:form.city,
        state:form.state,
        pincode:form.pincode,
        type:form.type,
        isDefault:form.default
      };

      if(editingId){
        await updateAddress(userId,{id:editingId,...payload});
        toast.success("Address updated");
      }else{
        await addAddress(userId,payload);
        toast.success("Address added");
      }

      setForm({
        flat:"",
        street:"",
        landmark:"",
        pincode:"",
        city:"",
        state:"",
        name:"",
        mobile:"",
        type:"Home",
        default:false
      });

      onClose();

    }catch{
      toast.error("Something went wrong");
    }

  };

  return(

<div className="address-overlay">

<div className="address-modal" ref={modalRef} onClick={handleInsideClick}>

<button className="close-x" onClick={onClose}>×</button>

<div className="address-form-ui">

<h3>{editingId ? "Edit Address":"Add new address"}</h3>

<input
key={`flat-${blinkKey}`}
ref={flatRef}
className={blinkErrors.flat ? "error-input" : ""}
placeholder="Flat / Building*"
value={form.flat}
onKeyDown={(e)=>handleEnter(e, streetRef)}
onClick={closeAllDropdowns}
onChange={(e)=>{
  setForm({...form,flat:e.target.value});
  setErrors({...errors,flat:false});
}}
/>

<input
key={`street-${blinkKey}`}
ref={streetRef}
className={blinkErrors.street ? "error-input" : ""}
placeholder="Street / Area*"
value={form.street}
onKeyDown={(e)=>handleEnter(e, stateRef)}
onClick={closeAllDropdowns}
onChange={(e)=>{
  setForm({...form,street:e.target.value});
  setErrors({...errors,street:false});
}}
/>

<input
placeholder="Landmark"
value={form.landmark}
onClick={closeAllDropdowns}
onChange={(e)=>setForm({...form,landmark:e.target.value})}
/>

<div className="add-two-col">

<div style={{position:"relative"}}>

<input
key={`state-${blinkKey}`}
ref={stateRef}
className={blinkErrors.state ? "error-input" : ""}
placeholder="State"
value={form.state}
onKeyDown={(e)=>handleEnter(e, cityRef)}
onClick={()=>{
closeAllDropdowns();
setFilteredStates(states);
setShowStateDropdown(true);
}}
onChange={(e)=>{
const value = e.target.value;
setForm({...form,state:value,city:"",pincode:""});
setErrors({...errors,state:false});
const filtered = states.filter((s:any)=>
s.name.toLowerCase().includes(value.toLowerCase())
);
setFilteredStates(filtered);
setShowStateDropdown(true);
}}
/>

{showStateDropdown &&(
<div className="dropdown-list">
{filteredStates.map((state:any)=>(
<div
key={state.id}
className="dropdown-item"
onClick={()=>{
setForm({...form,state:state.name,city:"",pincode:""});
setCities([]);
setPincodes([]);
setShowStateDropdown(false);
}}
>
{state.name}
</div>
))}
</div>
)}

</div>

<div style={{position:"relative"}}>

<input
key={`city-${blinkKey}`}
ref={cityRef}
className={blinkErrors.city ? "error-input" : ""}
placeholder="City"
value={form.city}
onKeyDown={(e)=>handleEnter(e, pincodeRef)}
onClick={()=>{
closeAllDropdowns();
if(!form.state){
toast.error("Select state first");
return;
}
setFilteredCities(cities);
setShowCityDropdown(true);
}}
onChange={(e)=>{
const value = e.target.value;
setForm({...form,city:value,pincode:""});
setErrors({...errors,city:false});
const filtered = cities.filter((c:any)=>
c.name.toLowerCase().includes(value.toLowerCase())
);
setFilteredCities(filtered);
setShowCityDropdown(true);
}}
/>

{showCityDropdown &&(
<div className="dropdown-list">
{filteredCities.map((city:any)=>(
<div
key={city.id}
className="dropdown-item"
onClick={()=>{
setForm({...form,city:city.name,pincode:""});
setShowCityDropdown(false);
}}
>
{city.name}
</div>
))}
</div>
)}

</div>

</div>

<div style={{position:"relative"}}>

<input
key={`pincode-${blinkKey}`}
ref={pincodeRef}
className={blinkErrors.pincode ? "error-input" : ""}
placeholder="Pincode*"
value={form.pincode}
onKeyDown={(e)=>handleEnter(e, nameRef)}
onClick={()=>{
closeAllDropdowns();
if(!form.state || !form.city){
toast.error("Select state & city first");
return;
}
setFilteredPincodes(pincodes);
setShowPincodeDropdown(true);
}}
onChange={(e)=>{
const value = e.target.value.replace(/\D/g,"");
const filtered = pincodes.filter((p)=>p.startsWith(value));
setFilteredPincodes(filtered);
setForm({...form,pincode:value});
setErrors({...errors,pincode:false});
setShowPincodeDropdown(true);
}}
/>

{showPincodeDropdown && filteredPincodes.length>0 &&(
<div className="dropdown-list">
{filteredPincodes.map((pin)=>(
<div
key={pin}
className="dropdown-item"
onClick={()=>{
setForm({...form,pincode:pin});
setShowPincodeDropdown(false);
}}
>
{pin}
</div>
))}
</div>
)}

</div>

<h3>Alternate Contact Details</h3>

<input
key={`name-${blinkKey}`}
ref={nameRef}
className={blinkErrors.name ? "error-input" : ""}
placeholder="Alternate Name (Optional)"
value={form.name}
onKeyDown={(e)=>handleEnter(e, mobileRef)}
onClick={closeAllDropdowns}
onChange={(e)=>{
  setForm({...form,name:e.target.value});
  setErrors({...errors,name:false});
}}
/>

<input
key={`mobile-${blinkKey}`}
ref={mobileRef}
className={blinkErrors.mobile ? "error-input" : ""}
placeholder="Alternate Mobile (Optional)"
value={form.mobile}
onClick={closeAllDropdowns}
onChange={(e)=>{
  setForm({...form,mobile:e.target.value});
  setErrors({...errors,mobile:false});
}}
/>

<div className="type-btns">

{["Home","Work","Other"].map((t)=>(
<button
key={t}
className={form.type===t?"active":""}
onClick={()=>setForm({...form,type:t})}
>
{t}
</button>
))}

<button className="address-save-btn" onClick={onSave}>
{editingId ? "UPDATE":"SAVE"}
</button>

</div>

<label className="default-check">

<input
type="checkbox"
checked={form.default}
onChange={(e)=>setForm({...form,default:e.target.checked})}
/>

Save as default address

</label>

</div>

</div>

</div>

);

};

export default AddressFormModal;
