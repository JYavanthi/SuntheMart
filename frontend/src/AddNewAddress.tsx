// import React, { useEffect, useRef, useState } from "react";
// import "./styles/AddNewAddress.css";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import { useAddress } from "../context/AddressContext";

// interface Address {
//   id: number;
//   flat: string;
//   street: string;
//   landmark: string;
//   city: string;
//   state: string;
//   pincode: string;
//   mobile: string;
//   name: string;
//   type: string;
//   isDefault: boolean;
// }

// const emptyForm = {
//   flat: "",
//   street: "",
//   landmark: "",
//   city: "",
//   state: "",
//   pincode: "",
//   mobile: "",
//   name: "",
//   type: "Home",
//   default: false
// };

// const AddNewAddress = ({ userId }: any) => {

//   const { addresses, addAddress, updateAddress } = useAddress();

//   const [form, setForm] = useState<any>(emptyForm);
//   const [editingId, setEditingId] = useState<number | null>(null);

//   const [states, setStates] = useState<any[]>([]);
//   const [cities, setCities] = useState<any[]>([]);
//   const [pincodes, setPincodes] = useState<string[]>([]);

//   const [filteredStates, setFilteredStates] = useState<any[]>([]);
//   const [filteredCities, setFilteredCities] = useState<any[]>([]);
//   const [filteredPincodes, setFilteredPincodes] = useState<string[]>([]);

//   const [showStateDropdown, setShowStateDropdown] = useState(false);
//   const [showCityDropdown, setShowCityDropdown] = useState(false);
//   const [showPincodeDropdown, setShowPincodeDropdown] = useState(false);

//   const stateRef = useRef<HTMLInputElement>(null);
//   const cityRef = useRef<HTMLInputElement>(null);
//   const pincodeRef = useRef<HTMLInputElement>(null);

//   const API_BASE = "http://localhost:4000/api/location";

//   useEffect(() => {
//     fetchStates();
//   }, []);

//   const fetchStates = async () => {
//     try {
//       const res = await axios.get(`${API_BASE}/states`);
//       setStates(res.data.data);
//     } catch {
//       toast.error("Failed to load states");
//     }
//   };

//   useEffect(() => {

//     if (!form.state) return;

//     const fetchCities = async () => {

//       try {

//         const stateObj = states.find(
//           (s: any) => s.name === form.state
//         );

//         if (!stateObj) return;

//         const res = await axios.get(
//           `${API_BASE}/cities/${stateObj.id}`
//         );

//         setCities(res.data.data);

//       } catch {
//         toast.error("Failed to load cities");
//       }

//     };

//     fetchCities();

//   }, [form.state, states]);

//   useEffect(() => {

//     if (!form.state || !form.city) return;

//     const fetchPincodes = async () => {

//       try {

//         const stateObj = states.find(
//           (s: any) => s.name === form.state
//         );

//         const cityObj = cities.find(
//           (c: any) => c.name === form.city
//         );

//         if (!stateObj || !cityObj) return;

//         const res = await axios.get(
//           `${API_BASE}/pincodes`,
//           {
//             params: {
//               stateId: stateObj.id,
//               cityId: cityObj.id
//             }
//           }
//         );

//         const pins = [
//           ...new Set(
//             res.data.data.map((p: any) =>
//               String(p.pincode)
//             )
//           )
//         ];

//         setPincodes(pins as string[]);
//         setFilteredPincodes(pins as string[]);

//       } catch {
//         toast.error("Failed to load pincodes");
//       }

//     };

//     fetchPincodes();

//   }, [form.state, form.city, states, cities]);

//   const resetForm = () => {
//     setForm(emptyForm);
//     setEditingId(null);
//   };

//   const handleEdit = (address: Address) => {

//     setEditingId(address.id);

//     setForm({
//       flat: address.flat,
//       street: address.street,
//       landmark: address.landmark,
//       city: address.city,
//       state: address.state,
//       pincode: address.pincode,
//       mobile: address.mobile,
//       name: address.name,
//       type: address.type,
//       default: address.isDefault
//     });

//     window.scrollTo({
//       top: 0,
//       behavior: "smooth"
//     });

//   };

//   const validateForm = () => {

//     if (!form.flat) {
//       toast.error("Enter address line");
//       return false;
//     }

//     if (!form.street) {
//       toast.error("Enter street");
//       return false;
//     }

//     if (!form.state) {
//       toast.error("Select state");
//       return false;
//     }

//     if (!form.city) {
//       toast.error("Select city");
//       return false;
//     }

//     if (!form.pincode) {
//       toast.error("Enter pincode");
//       return false;
//     }

//     return true;
//   };

//   const handleSave = async () => {

//     if (!validateForm()) return;

//     if (!pincodes.includes(form.pincode)) {
//       toast.error("Invalid pincode");
//       return;
//     }

//     try {

//       const payload = {
//         flat: form.flat,
//         street: form.street,
//         landmark: form.landmark,
//         city: form.city,
//         state: form.state,
//         pincode: form.pincode,
//         mobile: form.mobile,
//         name: form.name,
//         type: form.type,
//         isDefault: form.default
//       };

//       if (editingId) {

//         await updateAddress(userId, {
//           id: editingId,
//           ...payload
//         });

//         toast.success("Address updated");

//       } else {

//         await addAddress(userId, payload);

//         toast.success("Address added");

//       }

//       resetForm();

//     } catch {
//       toast.error("Something went wrong");
//     }

//   };

//   return (

//     <div className="add-new-address-page">

//       <div className="add-new-address-banner">

//         <div>

//           <h1>Edit Address</h1>

//           <p>
//             Manage your saved delivery addresses
//           </p>

//         </div>

//       </div>

//       <div className="add-new-address-layout">

//         <div className="add-new-address-sidebar">

//           <div className="add-new-address-sidebar-item">
//             Profile Information
//           </div>

//           <div className="add-new-address-sidebar-item active">
//             Addresses
//           </div>

//           <div className="add-new-address-sidebar-item">
//             Orders
//           </div>

//           <div className="add-new-address-sidebar-item">
//             Wishlist
//           </div>

//           <div className="add-new-address-sidebar-item">
//             Payments
//           </div>

//           <div className="add-new-address-sidebar-item">
//             Notifications
//           </div>

//           <div className="add-new-address-sidebar-item">
//             Account Settings
//           </div>

//         </div>

//         <div className="add-new-address-content">

//           <div className="add-new-address-form-card">

//             <div className="add-new-address-header-row">

//               <div>

//                 <h2>
//                   {editingId ? "Edit Address" : "Add Address"}
//                 </h2>

//                 <p>
//                   Make changes to your address details
//                 </p>

//               </div>

//             </div>

//             <div className="add-new-address-type-row">

//               {["Home", "Office", "Other"].map((type) => (

//                 <button
//                   key={type}
//                   className={
//                     form.type === type
//                       ? "add-new-address-type-btn active"
//                       : "add-new-address-type-btn"
//                   }
//                   onClick={() =>
//                     setForm({
//                       ...form,
//                       type
//                     })
//                   }
//                 >
//                   {type}
//                 </button>

//               ))}

//             </div>

//             <div className="add-new-address-grid">

//               <div>

//                 <label>Full Name</label>

//                 <input
//                   value={form.name}
//                   placeholder="Enter full name"
//                   onChange={(e) =>
//                     setForm({
//                       ...form,
//                       name: e.target.value
//                     })
//                   }
//                 />

//               </div>

//               <div>

//                 <label>Pincode</label>

//                 <div className="add-new-address-dropdown-wrapper">

//                   <input
//                     ref={pincodeRef}
//                     value={form.pincode}
//                     placeholder="Enter pincode"
//                     onClick={() => {
//                       setFilteredPincodes(pincodes);
//                       setShowPincodeDropdown(true);
//                     }}
//                     onChange={(e) => {

//                       const value =
//                         e.target.value.replace(/\D/g, "");

//                       setForm({
//                         ...form,
//                         pincode: value
//                       });

//                       const filtered = pincodes.filter((p) =>
//                         p.startsWith(value)
//                       );

//                       setFilteredPincodes(filtered);
//                       setShowPincodeDropdown(true);

//                     }}
//                   />

//                   {showPincodeDropdown &&
//                     filteredPincodes.length > 0 && (

//                     <div className="add-new-address-dropdown-list">

//                       {filteredPincodes.map((pin) => (

//                         <div
//                           key={pin}
//                           className="add-new-address-dropdown-item"
//                           onClick={() => {

//                             setForm({
//                               ...form,
//                               pincode: pin
//                             });

//                             setShowPincodeDropdown(false);

//                           }}
//                         >
//                           {pin}
//                         </div>

//                       ))}

//                     </div>

//                   )}

//                 </div>

//               </div>

//               <div>

//                 <label>Address Line 1</label>

//                 <input
//                   value={form.flat}
//                   placeholder="House / Flat / Building"
//                   onChange={(e) =>
//                     setForm({
//                       ...form,
//                       flat: e.target.value
//                     })
//                   }
//                 />

//               </div>

//               <div>

//                 <label>Address Line 2</label>

//                 <input
//                   value={form.street}
//                   placeholder="Street / Area"
//                   onChange={(e) =>
//                     setForm({
//                       ...form,
//                       street: e.target.value
//                     })
//                   }
//                 />

//               </div>

//               <div>

//                 <label>Landmark</label>

//                 <input
//                   value={form.landmark}
//                   placeholder="Landmark"
//                   onChange={(e) =>
//                     setForm({
//                       ...form,
//                       landmark: e.target.value
//                     })
//                   }
//                 />

//               </div>

//               <div>

//                 <label>Phone Number</label>

//                 <input
//                   value={form.mobile}
//                   placeholder="Phone number"
//                   onChange={(e) =>
//                     setForm({
//                       ...form,
//                       mobile: e.target.value
//                     })
//                   }
//                 />

//               </div>

//               <div>

//                 <label>State</label>

//                 <div className="add-new-address-dropdown-wrapper">

//                   <input
//                     ref={stateRef}
//                     value={form.state}
//                     placeholder="Select state"
//                     onClick={() => {

//                       setFilteredStates(states);
//                       setShowStateDropdown(true);

//                     }}
//                     onChange={(e) => {

//                       const value = e.target.value;

//                       setForm({
//                         ...form,
//                         state: value,
//                         city: "",
//                         pincode: ""
//                       });

//                       const filtered = states.filter(
//                         (s: any) =>
//                           s.name
//                             .toLowerCase()
//                             .includes(value.toLowerCase())
//                       );

//                       setFilteredStates(filtered);
//                       setShowStateDropdown(true);

//                     }}
//                   />

//                   {showStateDropdown && (

//                     <div className="add-new-address-dropdown-list">

//                       {filteredStates.map((state: any) => (

//                         <div
//                           key={state.id}
//                           className="add-new-address-dropdown-item"
//                           onClick={() => {

//                             setForm({
//                               ...form,
//                               state: state.name,
//                               city: "",
//                               pincode: ""
//                             });

//                             setShowStateDropdown(false);

//                           }}
//                         >
//                           {state.name}
//                         </div>

//                       ))}

//                     </div>

//                   )}

//                 </div>

//               </div>

//               <div>

//                 <label>City</label>

//                 <div className="add-new-address-dropdown-wrapper">

//                   <input
//                     ref={cityRef}
//                     value={form.city}
//                     placeholder="Select city"
//                     onClick={() => {

//                       setFilteredCities(cities);
//                       setShowCityDropdown(true);

//                     }}
//                     onChange={(e) => {

//                       const value = e.target.value;

//                       setForm({
//                         ...form,
//                         city: value
//                       });

//                       const filtered = cities.filter(
//                         (c: any) =>
//                           c.name
//                             .toLowerCase()
//                             .includes(value.toLowerCase())
//                       );

//                       setFilteredCities(filtered);
//                       setShowCityDropdown(true);

//                     }}
//                   />

//                   {showCityDropdown && (

//                     <div className="add-new-address-dropdown-list">

//                       {filteredCities.map((city: any) => (

//                         <div
//                           key={city.id}
//                           className="add-new-address-dropdown-item"
//                           onClick={() => {

//                             setForm({
//                               ...form,
//                               city: city.name
//                             });

//                             setShowCityDropdown(false);

//                           }}
//                         >
//                           {city.name}
//                         </div>

//                       ))}

//                     </div>

//                   )}

//                 </div>

//               </div>

//             </div>

//             <div className="add-new-address-save-row">

//               <label className="add-new-address-default-check">

//                 <input
//                   type="checkbox"
//                   checked={form.default}
//                   onChange={(e) =>
//                     setForm({
//                       ...form,
//                       default: e.target.checked
//                     })
//                   }
//                 />

//                 Save as default address

//               </label>

//               <div className="add-new-address-action-buttons">

//                 {editingId && (

//                   <button
//                     className="add-new-address-cancel-btn"
//                     onClick={resetForm}
//                   >
//                     Cancel
//                   </button>

//                 )}

//                 <button
//                   className="add-new-address-save-btn"
//                   onClick={handleSave}
//                 >
//                   {editingId
//                     ? "Update Address"
//                     : "Save Address"}
//                 </button>

//               </div>

//             </div>

//           </div>

//           <div className="add-new-address-saved-section">

//             <h2>Saved Addresses</h2>

//             <div className="add-new-address-saved-grid">

//               {addresses?.map((address: Address) => (

//                 <div
//                   className="add-new-address-card"
//                   key={address.id}
//                 >

//                   <div className="add-new-address-card-top">

//                     <span className="add-new-address-badge">
//                       {address.type}
//                     </span>

//                     {address.isDefault && (
//                       <span className="add-new-address-default-badge">
//                         Default
//                       </span>
//                     )}

//                   </div>

//                   <h3>{address.name}</h3>

//                   <p>
//                     {address.flat}, {address.street}
//                   </p>

//                   <p>{address.landmark}</p>

//                   <p>
//                     {address.city}, {address.state} -
//                     {address.pincode}
//                   </p>

//                   <p>{address.mobile}</p>

//                   <div className="add-new-address-card-actions">

//                     <button
//                       className="add-new-address-edit-btn"
//                       onClick={() =>
//                         handleEdit(address)
//                       }
//                     >
//                       Edit
//                     </button>

//                   </div>

//                 </div>

//               ))}

//             </div>

//           </div>

//         </div>

//       </div>

//     </div>

//   );

// };

// export default AddNewAddress;

import React, { useEffect, useRef, useState } from "react";
import "./styles/addnewaddress.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAddress } from "./context/AddressContext";

interface Address {
  id: number;
  flat: string;
  street: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
  mobile: string;
  name: string;
  type: string;
  isDefault: boolean;
}

const emptyForm = {
  flat: "",
  street: "",
  landmark: "",
  city: "",
  state: "",
  pincode: "",
  mobile: "",
  name: "",
  type: "Home",
  default: false
};

const AddNewAddress = ({
  userId,
  setShowAddNewAddress
}: any) => {

  const {
    addresses,
    addAddress,
    updateAddress
  } = useAddress();

  const [form, setForm] =
    useState<any>(emptyForm);

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [states, setStates] =
    useState<any[]>([]);

  const [cities, setCities] =
    useState<any[]>([]);

  const [pincodes, setPincodes] =
    useState<string[]>([]);

  const [filteredStates, setFilteredStates] =
    useState<any[]>([]);

  const [filteredCities, setFilteredCities] =
    useState<any[]>([]);

  const [filteredPincodes, setFilteredPincodes] =
    useState<string[]>([]);

  const [showStateDropdown, setShowStateDropdown] =
    useState(false);

  const [showCityDropdown, setShowCityDropdown] =
    useState(false);

  const [showPincodeDropdown, setShowPincodeDropdown] =
    useState(false);

  const stateRef =
    useRef<HTMLInputElement>(null);

  const cityRef =
    useRef<HTMLInputElement>(null);

  const pincodeRef =
    useRef<HTMLInputElement>(null);

  const API_BASE =
    "http://localhost:4000/api/location";

  useEffect(() => {
    fetchStates();
  }, []);

  const fetchStates = async () => {

    try {

      const res = await axios.get(
        `${API_BASE}/states`
      );

      setStates(res.data.data);

    } catch {

      toast.error(
        "Failed to load states"
      );

    }

  };

  useEffect(() => {

    if (!form.state) return;

    const fetchCities = async () => {

      try {

        const stateObj = states.find(
          (s: any) =>
            s.name === form.state
        );

        if (!stateObj) return;

        const res = await axios.get(
          `${API_BASE}/cities/${stateObj.id}`
        );

        setCities(res.data.data);

      } catch {

        toast.error(
          "Failed to load cities"
        );

      }

    };

    fetchCities();

  }, [form.state, states]);

  useEffect(() => {

    if (!form.state || !form.city)
      return;

    const fetchPincodes = async () => {

      try {

        const stateObj = states.find(
          (s: any) =>
            s.name === form.state
        );

        const cityObj = cities.find(
          (c: any) =>
            c.name === form.city
        );

        if (!stateObj || !cityObj)
          return;

        const res = await axios.get(
          `${API_BASE}/pincodes`,
          {
            params: {
              stateId: stateObj.id,
              cityId: cityObj.id
            }
          }
        );

        const pins = [
          ...new Set(
            res.data.data.map(
              (p: any) =>
                String(p.pincode)
            )
          )
        ];

        setPincodes(pins as string[]);
        setFilteredPincodes(
          pins as string[]
        );

      } catch {

        toast.error(
          "Failed to load pincodes"
        );

      }

    };

    fetchPincodes();

  }, [
    form.state,
    form.city,
    states,
    cities
  ]);

  const resetForm = () => {

    setForm(emptyForm);

    setEditingId(null);

  };

  const handleEdit = (
    address: Address
  ) => {

    setEditingId(address.id);

    setForm({
      flat: address.flat,
      street: address.street,
      landmark: address.landmark,
      city: address.city,
      state: address.state,
      pincode: address.pincode,
      mobile: address.mobile,
      name: address.name,
      type: address.type,
      default: address.isDefault
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  };

  const validateForm = () => {

    if (!form.flat) {

      toast.error(
        "Enter address line"
      );

      return false;

    }

    if (!form.street) {

      toast.error("Enter street");

      return false;

    }

    if (!form.state) {

      toast.error("Select state");

      return false;

    }

    if (!form.city) {

      toast.error("Select city");

      return false;

    }

    if (!form.pincode) {

      toast.error(
        "Enter pincode"
      );

      return false;

    }

    return true;

  };

  const handleSave = async () => {

    if (!validateForm()) return;

    if (
      !pincodes.includes(form.pincode)
    ) {

      toast.error("Invalid pincode");

      return;

    }

    try {

      const payload = {
        flat: form.flat,
        street: form.street,
        landmark: form.landmark,
        city: form.city,
        state: form.state,
        pincode: form.pincode,
        mobile: form.mobile,
        name: form.name,
        type: form.type,
        isDefault: form.default
      };

      if (editingId) {

        await updateAddress(
          userId,
          {
            id: editingId,
            ...payload
          }
        );

        toast.success(
          "Address updated"
        );

      } else {

        await addAddress(
          userId,
          payload
        );

        toast.success(
          "Address added"
        );

      }

      resetForm();

      setShowAddNewAddress(false);

    } catch {

      toast.error(
        "Something went wrong"
      );

    }

  };

  return (

    <div className="add-new-address-page">

      
      
        {/* <button
          onClick={() =>
            setShowAddNewAddress(
              false
            )
          }
          className="add-new-address-cancel-btn"
        >
          ← Back to Addresses
        </button> */}
      

      <div className="add-new-address-form-card">

        <div className="add-new-address-header-row">

          <div>

            <h2>
              {editingId
                ? "Edit Address"
                : "Add Address"}
            </h2>

            <p>
              Make changes to your
              address details
            </p>

          </div>
          <button className="saved-add-btn" >Back to Saved Adress</button>

        </div>

        <div className="add-new-address-type-row">

          {[
            "Home",
            "Office",
            "Other"
          ].map((type) => (

            <button
              key={type}
              className={
                form.type === type
                  ? "add-new-address-type-btn active"
                  : "add-new-address-type-btn"
              }
              onClick={() =>
                setForm({
                  ...form,
                  type
                })
              }
            >
              {type}
            </button>

          ))}

        </div>

        <div className="add-new-address-grid">

          <div>

            <label>
              Full Name
            </label>

            <input
              value={form.name}
              placeholder="Enter full name"
              onChange={(e) =>
                setForm({
                  ...form,
                  name:
                    e.target.value
                })
              }
            />

          </div>

          <div>

            <label>
              Pincode
            </label>

            <div className="add-new-address-dropdown-wrapper">

              <input
                ref={pincodeRef}
                value={form.pincode}
                placeholder="Enter pincode"
                onClick={() => {

                  setFilteredPincodes(
                    pincodes
                  );

                  setShowPincodeDropdown(
                    true
                  );

                }}
                onChange={(e) => {

                  const value =
                    e.target.value.replace(
                      /\D/g,
                      ""
                    );

                  setForm({
                    ...form,
                    pincode: value
                  });

                  const filtered =
                    pincodes.filter(
                      (p) =>
                        p.startsWith(
                          value
                        )
                    );

                  setFilteredPincodes(
                    filtered
                  );

                  setShowPincodeDropdown(
                    true
                  );

                }}
              />

              {showPincodeDropdown &&
                filteredPincodes.length >
                  0 && (

                <div className="add-new-address-dropdown-list">

                  {filteredPincodes.map(
                    (pin) => (

                      <div
                        key={pin}
                        className="add-new-address-dropdown-item"
                        onClick={() => {

                          setForm({
                            ...form,
                            pincode:
                              pin
                          });

                          setShowPincodeDropdown(
                            false
                          );

                        }}
                      >
                        {pin}
                      </div>

                    )
                  )}

                </div>

              )}

            </div>

          </div>

          <div>

            <label>
              Address Line 1
            </label>

            <input
              value={form.flat}
              placeholder="House / Flat / Building"
              onChange={(e) =>
                setForm({
                  ...form,
                  flat:
                    e.target.value
                })
              }
            />

          </div>

          <div>

            <label>
              Address Line 2
            </label>

            <input
              value={form.street}
              placeholder="Street / Area"
              onChange={(e) =>
                setForm({
                  ...form,
                  street:
                    e.target.value
                })
              }
            />

          </div>

          <div>

            <label>
              Landmark
            </label>

            <input
              value={form.landmark}
              placeholder="Landmark"
              onChange={(e) =>
                setForm({
                  ...form,
                  landmark:
                    e.target.value
                })
              }
            />

          </div>

          <div>

            <label>
              Phone Number
            </label>

            <input
              value={form.mobile}
              placeholder="Phone number"
              onChange={(e) =>
                setForm({
                  ...form,
                  mobile:
                    e.target.value
                })
              }
            />

          </div>

          <div>

            <label>
              State
            </label>

            <div className="add-new-address-dropdown-wrapper">

              <input
                ref={stateRef}
                value={form.state}
                placeholder="Select state"
                onClick={() => {

                  setFilteredStates(
                    states
                  );

                  setShowStateDropdown(
                    true
                  );

                }}
                onChange={(e) => {

                  const value =
                    e.target.value;

                  setForm({
                    ...form,
                    state: value,
                    city: "",
                    pincode: ""
                  });

                  const filtered =
                    states.filter(
                      (s: any) =>
                        s.name
                          .toLowerCase()
                          .includes(
                            value.toLowerCase()
                          )
                    );

                  setFilteredStates(
                    filtered
                  );

                  setShowStateDropdown(
                    true
                  );

                }}
              />

              {showStateDropdown && (

                <div className="add-new-address-dropdown-list">

                  {filteredStates.map(
                    (
                      state: any
                    ) => (

                      <div
                        key={
                          state.id
                        }
                        className="add-new-address-dropdown-item"
                        onClick={() => {

                          setForm({
                            ...form,
                            state:
                              state.name,
                            city: "",
                            pincode:
                              ""
                          });

                          setShowStateDropdown(
                            false
                          );

                        }}
                      >
                        {
                          state.name
                        }
                      </div>

                    )
                  )}

                </div>

              )}

            </div>

          </div>

          <div>

            <label>
              City
            </label>

            <div className="add-new-address-dropdown-wrapper">

              <input
                ref={cityRef}
                value={form.city}
                placeholder="Select city"
                onClick={() => {

                  setFilteredCities(
                    cities
                  );

                  setShowCityDropdown(
                    true
                  );

                }}
                onChange={(e) => {

                  const value =
                    e.target.value;

                  setForm({
                    ...form,
                    city: value
                  });

                  const filtered =
                    cities.filter(
                      (c: any) =>
                        c.name
                          .toLowerCase()
                          .includes(
                            value.toLowerCase()
                          )
                    );

                  setFilteredCities(
                    filtered
                  );

                  setShowCityDropdown(
                    true
                  );

                }}
              />

              {showCityDropdown && (

                <div className="add-new-address-dropdown-list">

                  {filteredCities.map(
                    (
                      city: any
                    ) => (

                      <div
                        key={city.id}
                        className="add-new-address-dropdown-item"
                        onClick={() => {

                          setForm({
                            ...form,
                            city:
                              city.name
                          });

                          setShowCityDropdown(
                            false
                          );

                        }}
                      >
                        {city.name}
                      </div>

                    )
                  )}

                </div>

              )}

            </div>

          </div>

        </div>

        <div className="add-new-address-save-row">

          <label className="add-new-address-default-check">

            <input
              type="checkbox"
              checked={
                form.default
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  default:
                    e.target.checked
                })
              }
            />

            Save as default address

          </label>

          <div className="add-new-address-action-buttons">

            {editingId && (

              <button
                className="add-new-address-cancel-btn"
                onClick={
                  resetForm
                }
              >
                Cancel
              </button>

            )}

            <button
              className="add-new-address-save-btn"
              onClick={
                handleSave
              }
            >
              {editingId
                ? "Update Address"
                : "Save Address"}
            </button>

          </div>

        </div>

      </div>

      
     

    </div>

  );

};

export default AddNewAddress;