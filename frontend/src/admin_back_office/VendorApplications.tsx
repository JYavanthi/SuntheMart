import {useEffect,useState} from "react";
import {useNavigate} from "react-router-dom";

import Sidebar from "./Sidebar";
import {API_URLS} from "../API-Urls";

import "./styles/vendorApplications.css";

const VendorApplications=()=>{

const navigate=useNavigate();

const [vendors,setVendors]=useState([]);

useEffect(()=>{

fetch(

`http://localhost:4000/api/admin/vendor-applications`

)

.then(res=>res.json())
.then(data=>{

if(data.success){

setVendors(data.data);

}

});

},[]);

return(

<div className="vendor-layout">

<div className="vendor-layout-sidebar">

<Sidebar/>

</div>

<div className="vendor-layout-main">

<h2>

Vendor Applications

</h2>

<div className="vendor-table-card">

<table>

<thead>

<tr>

<th>Vendor</th>
<th>Business Type</th>
<th>Contact</th>
<th>Status</th>
<th>Action</th>

</tr>

</thead>

<tbody>

{

vendors.map((item:any)=>(

<tr key={item.VendorID}>

<td>

<b>

{item.BusinessName}

</b>

<p>

{item.Email}

</p>

</td>

<td>

{item.BusinessType}

</td>

<td>

{item.ContactPerson}

</td>

<td>

<span>

{item.VendorStatus}

</span>

</td>

<td>

<button

onClick={()=>{

navigate(

`/vendorapplicationdetails/${item.VendorID}`

)

}}

>

<i className="fa-solid fa-eye"></i>

</button>

</td>

</tr>

))

}

</tbody>

</table>

</div>

</div>

</div>

);

};

export default VendorApplications;