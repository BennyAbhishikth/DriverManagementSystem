import "./payment.css"
import { CiCalendar } from "react-icons/ci";
import { MdOutlineMessage } from "react-icons/md";
import { IoIosNotificationsOutline } from "react-icons/io";
import { RiAdminFill } from "react-icons/ri";
import { FaChevronLeft } from "react-icons/fa6";
import { FaFileInvoice } from "react-icons/fa";
import { HiDocumentReport } from "react-icons/hi";
import { IoCall } from "react-icons/io5";
import { FaMessage } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { IoMdSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
function Payments(){
    var today = new Date();
    // const  =new Date(Date.now()).toLocaleString().split(',')[0]
    var yyyy = today.getFullYear();
    var dd = String(today.getDate()).padStart(2, '0');
const month = today.toLocaleString('default', { month: 'short' });
const t =    new Date().toLocaleTimeString();
const vendordet=[
    {title:"Total Distance",
        value:"kms"
    },
    {title:"Total Hours",
        value:"hrs"
    },
    {title:"Total Vehicles",
        value:"veh"
    },
    {title:"Total Drivers",
        value:"dri"
    },
]
const paymentdet=[
    {drivername:"Raju",
        phonenumber:"9823456712",
        service:"Ola",
        vehivleno:"KA01AB1234",
        vehicletype:"SUV",
        triptype:"Drop",
        tripid:"OID1001",
        starttime:"7.30AM",
        date:"20/08/2024",
        endtime:" 8.00AM",
        date:"20/08/2024",
        distance:"10km",
        fare:"Rs.300",
        ridestatus:"completed",verification:"Verified",approvedstate:"Approved",
        action:"symbol"
    },
    {drivername:"Arun Patel",
        phonenumber:"654864564",
        service:"Ola",
        vehivleno:"DL03CD5678",
        vehicletype:"Sedan",
        triptype:"Drop",
        tripid:"OID1002",
        starttime:"9.30AM",
        date:"21/08/2024",
        endtime:"10.30AM",
        date:"21/08/2024",
        distance:"15KM",
        fare:"Rs.350",
        ridestatus:"Completed",verification:"verified",approvedstate:"Approved",
        action:"symbol"
    },
    {drivername:"Sanjay",
        phonenumber:"9705626859",
        service:"Rapido",
        vehivleno:"TN09GH4321",
        vehicletype:"SUV",
        triptype:"Drop",
        tripid:"OID1003",
        starttime:"8.00AM",
        date:"23/08/2024",
        endtime:"8.45AM",
        date:"23/08/2024",
        distance:"8KM",
        fare:"Rs.250",
        ridestatus:"Completed",verification:"verified",approvedstate:"Approved",
        action:"symbol"
    },
    {drivername:"Charan",
        phonenumber:"7728885525",
        service:"Uber",
        vehivleno:"MH12EF9876",
        vehicletype:"Minivan",
        triptype:"Drop",
        tripid:"OID1004",
        starttime:"5.00PM",
        date:"22/08/2024",
        endtime:"5.30PM",
        date:"22/08/2024",
        distance:"9KM",
        fare:"Rs.200",
        ridestatus:"Completed",verification:"verified",approvedstate:"Approved",
        action:"symbol"
    },
    {drivername:"Amit",
        phonenumber:"8974561230",
        service:"Ola",
        vehivleno:"DL03AB1234",
        vehicletype:"SUV",
        triptype:"Drop",
        tripid:"OID1005",
        starttime:"6.00PM",
        date:"25/08/2024",
        endtime:"6.30PM",
        date:"25/08/2024",
        distance:"12KM",
        fare:"Rs.10KM",
        ridestatus:"Drop",verification:"verified",approvedstate:"Approved",
        action:"symbol"
    },
]
const navigate = useNavigate();
const handleviewInvoice=()=>{
   navigate("/viewinvoice")
}
const handlepaynow=()=>{
    navigate("/paythroughh");
}
const [searchQuery, setSearchQuery] = useState('');
const [filteredPayments, setFilteredPayments] = useState(paymentdet);
const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter payments based on search query
    const filtered = paymentdet.filter((item) =>
        item.drivername.toLowerCase().includes(query) ||
        item.phonenumber.includes(query) ||
        item.service.toLowerCase().includes(query) ||
        item.vehivleno.toLowerCase().includes(query) ||
        item.vehicletype.toLowerCase().includes(query) ||
        item.triptype.toLowerCase().includes(query) ||
        item.tripid.toLowerCase().includes(query)
    );
    setFilteredPayments(filtered);
};
return (
    <div>
        <div className="payments-admin-head">
            <div className="payment-lists-head">
            <p>Payments/Lists</p>
            </div>
            <div className="payments-head-date">
              <p>{month}&nbsp;{dd}&nbsp;&nbsp;{yyyy}&nbsp;|&nbsp;&nbsp;</p>
              <p>{t}&nbsp;<CiCalendar />&nbsp;&nbsp;&nbsp;|</p>
              <p>&nbsp;&nbsp;<MdOutlineMessage />&nbsp;&nbsp;|&nbsp;<IoIosNotificationsOutline />&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;</p>
              <div className="payments-head-admin">
                <div className="pp-h-ad-adn">
                <p>Admin Name</p>
                <p>Admin</p>
                </div>
                <div className="pp-h-ad-img">
                <button className="pp-h-ad"><RiAdminFill /></button>
                </div>
              </div>
            </div>
        </div>
        <div className="two-cards">
        <div className="main-ven-card">
        <div className="card1">
            <div className="card1-ff">
           <button className="l-arr-btn"><FaChevronLeft /></button>
           <h3 className="card1-date">01 Sep 2023  - 31 Sep 2023</h3>
           <button className="reports-btn"><b><HiDocumentReport />&nbsp;&nbsp;&nbsp;Reports</b></button>
           <button onClick={handleviewInvoice} className="invoice-btn"><b><FaFileInvoice />&nbsp;&nbsp;&nbsp;Invoice</b></button>
           </div>
           <div className="vendor-det">
            <div>
            <button className="vendor-img-btn"><img  className="ven-img" src="https://res.cloudinary.com/dyxhiuuxa/image/upload/v1724558880/taxi_1946780_acwtiz.png" alt="d"/></button>
            </div>
            <div className="view-vend-det">
                <div className="vvd">
                <h4>Vendor Name</h4>
                <p className="view-pro-head">View Profile</p>
                </div>
                <p className="view-id-h">VendorId</p>
            </div>
           </div>
        </div>
        <div className="sym-icons">
            <button className="call-btn"><IoCall /></button>
            <button className="msg-btn"><FaMessage /></button>
            <button className="tele-btn"><FaTelegramPlane /></button>
            <button className="not-btn"><IoIosNotifications /></button>
        </div>
        <div className="ven-details-cards">
              {vendordet.map((item,key)=>(
                <li className="vendor-det-card">
                    <p>{item.value}</p>
                    <h5>{item.title}</h5>
                </li>

              ))}
        </div>
        </div>
        <div className="billing-card">
            <div className="bill-mont">
                <h5>Billing Month</h5>
                <p>bill month</p>
            </div>
            <div className="pay-status">
                <h5>Payment Status</h5>
                <p>Status</p>
            </div>
            <div className="bil-date">
                <h5>Billing Date</h5>
                <p>Bill date</p>
            </div>
            <div className="due-date">
                <h5>Due Date</h5>
                <p>duedate</p>
            </div>
            <div className="tot-price">
                <h5 >Rs.Total Price</h5>
                <p>View Breakup</p>
                <p>Inclusive Tax</p>
            </div>
            <button className="pay-now-btn" onClick={handlepaynow}>Pay Now Rs - xxxxxxx</button>
        </div>
        </div>
        {/* <input className="search-vendor" type="text" placeholder="Search"  /><IoMdSearch /> */}
        <input
                className="search-vendor"
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchChange}
            />
            <IoMdSearch />

        &nbsp;&nbsp;&nbsp;<select className="ride-status">
            
        <option>Completed</option>
        <option>Not Completed</option>
        </select>
        <table className="payment-table">
          <thead>
            <tr>
                <th>SI No</th>
                <th>Driver Name</th>
                <th>Phone Number</th>
                <th>Service</th>
                <th>Vehicle No</th>
                <th>Vehicle Type</th>
                <th>Trip Type</th>
                <th>Trip Id</th>
                <th>Start Time|Date</th>
                <th>End Time|Date</th>
                <th>Distance|Fare</th>
                <th>Ride Status</th>
                <th>Verification</th>
                <th>Aproved State</th>
                <th>Action</th>
            </tr>
          </thead>
                {paymentdet.map((item,key)=>(
                    <tr>
                        <td>{key+1}</td>
                        <td>{item.drivername}</td>
                        <td>{item.phonenumber}</td>
                        <td>{item.service}</td>
                        <td>{item.vehivleno}</td>
                        <td>{item.vehicletype}</td>
                        <td>{item.tripid}</td>
                        <td>{item.triptype}</td>
                        <td>{item.starttime} | {item.date}</td>
                        <td>{item.endtime} | {item.date}</td>
                        <td>{item.distance} | {item.fare}</td>
                        <td>{item.ridestatus}</td>
                        <td>{item.verification}</td>
                        <td>{item.approvedstate}</td>
                        <td>{item.action}</td>
                    </tr>
                ))}
            </table>
    </div>
)
}
export default Payments;