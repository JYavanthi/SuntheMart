import {useEffect,useState} from "react";
import Sidebar from "./Sidebar";
import "./styles/allvendors.css";
import {API_URLS} from "../API-Urls";

const AllVendors=()=>{

const [vendors,setVendors]=useState([]);
const [stats,setStats]=useState<any>({});

useEffect(()=>{

fetch(

"http://localhost:4000/api/admin/vendors"

)

.then(res=>res.json())

.then(data=>{

if(data.success){

setVendors(data.data);

setStats(data.stats);

}

});

},[]);


return(

<div className="vendor-layout">

<div className="vendor-layout-sidebar">

<Sidebar/>

</div>


<div className="vendor-layout-main">

<div className="vendor-topbar">

<div>

<h2>

Vendors

</h2>

<p>

Home - Vendors - All Vendors

</p>

</div>

</div>



{/* TOP STATS */}

<div className="vendor-stats">

<div className="vendor-stat-card">

<i className="fa-solid fa-store"></i>

<div>

<h4>Total Vendors</h4>

<h2>{stats.total||0}</h2>

</div>

</div>


<div className="vendor-stat-card">

<i className="fa-solid fa-user-check"></i>

<div>

<h4>Active Vendors</h4>

<h2>{stats.active||0}</h2>

</div>

</div>


<div className="vendor-stat-card">

<i className="fa-solid fa-hourglass-half"></i>

<div>

<h4>Pending</h4>

<h2>{stats.pending||0}</h2>

</div>

</div>


<div className="vendor-stat-card">

<i className="fa-solid fa-ban"></i>

<div>

<h4>Suspended</h4>

<h2>{stats.suspended||0}</h2>

</div>

</div>

</div>



{/* SEARCH */}

<div className="vendor-search-row">

<input
placeholder="Search vendors"
/>

<button>

+ Add Vendor

</button>

</div>



{/* TABLE */}

<div className="vendor-list-table-card">

<table>

<thead>

<tr>

<th>Vendor</th>

<th>Business</th>

<th>Category</th>

<th>Location</th>

<th>Status</th>

<th>Joined</th>

</tr>

</thead>

<tbody>

{

vendors.map((item:any,index)=>(

<tr key={index}>

<td>

<div>

<b>

{item.ContactPerson}

</b>

<p>

{item.Email}

</p>

</div>

</td>

<td>

{item.BusinessName}

</td>

<td>

{item.Category}

</td>

<td>

{item.City},

{item.State}

</td>

<td>

<span
className={

item.Status==="Active"
?
"active-status"
:
"inactive-status"

}
>

{item.Status}

</span>

</td>

<td>

{

new Date(
item.CreatedDt
).toLocaleDateString()

}

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

export default AllVendors;