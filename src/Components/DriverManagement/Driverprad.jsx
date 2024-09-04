
import "./driver.css"
import { IoCall } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaChevronLeft } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineMessage } from "react-icons/md";
import { FaTelegramPlane } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { TiTick } from "react-icons/ti";
import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import { TiUser } from "react-icons/ti";
import { CiMobile1 } from "react-icons/ci";
import { MdOutlineMail } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { CiCalendarDate } from "react-icons/ci";
import { FaAddressCard } from "react-icons/fa";
import { PiClockAfternoon } from "react-icons/pi";
import { FaLocationDot } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";

import axios from "axios";

function Driverprad(){

    const d = Date();
    const [viewPersonalDetails,setViewPersonalDetails] = useState(true)

    const handleVd=()=>{
     setLivetracking(false)
    }
    const handlePd=()=>{
     setViewPersonalDetails(!viewPersonalDetails);
     setLivetracking(false)
    }
    const handleCf=()=>{
     setViewPersonalDetails(false);
     setLivetracking(false)
    }
    const [livetracking,setLivetracking] = useState(false)
    const handleLt=()=>{
     setViewPersonalDetails(false)
     setLivetracking(true)
    }
    const handleTh=()=>{
     setViewPersonalDetails(false);
     setLivetracking(false)
    }

    let driverId = localStorage.getItem("driverId")

    const [driverData , setDriverData] = useState({})

    useEffect(() => {
        axios.get(`https://silent-wave-76445.pktriot.net/drivers${driverId}`)
        .then((res) => {
            setDriverData(res.data)
            console.log(driverData)
        })
        .catch((err) => {
            console.log(err)
        })
    })

    const drdetails=[
     { title:"Experience",
        icon:"",
        val: driverData.exp
     },
     { title:"Total Distance",
        icon:"",
        val: driverData.total_distance || 0
     },{ title:"Total Hours",
        icon:"",
        val:"xxx"
     },{ title:"Total Office Trips",
        icon:"",
        val: driverData.successful_trips || 0
     },{ title:"Total Revenue",
        icon:"",
        val:"xxx"
     },{ title:"Driver Revenue",
        icon:"",
        val:"xxx"
     },
     { title:"Vehicles Driven",
        icon:"",
        val:"xxx"
     },
     { title:"Joined Date",
        icon:"",
        val: driverData.joining_date
     },
    ]
    const navigate = useNavigate();
    const handlebackdrpro=()=>{
       navigate("/viewdrivers")
    }
    
     const fun=[
        {title:"Phone Number",
         value: driverData.mobile,
         icon:<CiMobile1/>
        },
        {title:"Email",
            value: driverData.email,
            icon:<MdOutlineMail />
           },
           {title:"Gender",
            value: driverData.gender,
            icon:<CiUser />
           },
           {title:"Age",
            value: driverData.age,
            icon:<CiUser />
           },
           {title:"Date Of Birth",
            value: driverData.dob,
            icon:<CiCalendarDate />
           },
           {title:"Address",
            value: driverData.address,
            icon:<FaLocationDot />
           },
           {title:"Aadhar Number",
            value: driverData.aadhar,
            icon:<FaAddressCard />
           },
           {title:"Pan Card Number",
            value: driverData.pan,
            icon:<FaAddressCard />
           },
           {title:"Lic Number",
            value: driverData.lic,
            icon:<FaAddressCard />
           },
    ]
    // const vehinf=[
    //     {
    //         Brand:"",
    //         Model:"",
    //         VehicleType:"",
    //         Regno:"",
    //         Color:"",
    //         Seatcap:"",
    //         Fueltype:"",
    //         Mileagerange:"",
    //         ManufacturedYear:""
    //     }
    // ]
    // const location = useLocation();
   
 return(
    <div>
        <div className="admin-head">
            <div className="admin-dr-nav">
            <p className="dr-mng">Driver Mangement/Id: {driverId}</p>
            <p>{d}</p>
            </div>
            <div className="admin-prof">
            <h3 >AdminName</h3>
            <button className="admin-prof-btn"></button>
            </div>
        </div>
        <div className="tot-card">
            <button onClick={handlebackdrpro} className="inf-card-left"><FaAngleLeft /></button>
            <div className="tick-inf-doc-upd">
            <TiTick className="tick"  />
            <h4 className="doc-up" >All Documents are upto date</h4>
            </div>
            <div className="act-inact">
                <option>Active</option>
                {/* <option>InActive</option> */}
                </div>
                <button className="edit-btn"><MdOutlineEdit /></button>
                <button className="delete-btn"><MdDelete /></button>
                <img className="driver-image" src={driverData.imageUrl} alt="l" style={{width : "70px", height : "70px" , borderRadius : "50%"}}/>
                <h4 className="driver-name-head">{driverData.name}</h4>
                <h5 className="driver-id">{driverId}</h5>
                <p className="last-update-h">Last Update on Date</p>
                <h5 className="rating-dr">4.5<FaStar className="star" /></h5>
                <button className="caller-btn"><IoCallOutline /></button>
                <button className="message-btn"><MdOutlineMessage /></button>
                <button className="telegram-btn"><FaTelegramPlane /></button>
                <button className="notification-btn"><IoIosNotifications /></button>
                <h4 className="dr-only">DRIVER ONLY</h4>
                <h4 className="dr-Fleet">FLEET</h4>
                <h4 className="dr-of-rides">OFFICE RIDES</h4>
                <h4 className="dr-traveles">TRAVELS</h4>
                <h4 className="dr-org">NPT-HCL</h4>
                <h4 className="dr-based-pay">BASED PAYMENT</h4>
                <div className="dr-detail-cards">
                    {drdetails.map((item,key)=>(
                        <li className="dr-details-card" key={key}>
                            <h5 >{item.val}</h5>
                            <h5 >{item.title}</h5>
                        </li>
                    ))}
                </div>
        </div>
        <div className="dr-btns">
            <button className="dr-pd" onClick={handlePd}>Personal Details</button>
            <button className="dr-lt" onClick={handleLt}>Live Tracking</button>
            <button className="dr-th" onClick={handleTh}>Trip History</button>
            <button className="dr-vd" onClick={handleVd}>Vehicles Driven</button>
            <button className="dr-cf" onClick={handleCf}>Customer Feedback</button>
        </div>
            {viewPersonalDetails&&(
        <div className="information">
                 <div className="inf-pers">
                 <h4><u>Personal Information</u></h4>
                 <h3><TiUser />&nbsp;&nbsp;Driver Name</h3>
                 <div className="mob-infss">
                 {fun.map((item,key)=>(
                    <div className="mob-infs" key={key}>
                        
                        <div className="mob-symm">
                          <button className="mob-sym-btn"><icon />{item.icon}</button>
                        </div>
                        <div className="mob-inf-det">
                           <p className="phone-num-h"><b>{item.title}</b></p>
                           <p className="phone-num">{item.value}</p>
                        </div>
                    </div>
                 ))}
                 </div>
               
               
                 </div>
                 </div>
            )}
            {livetracking&&(
        <div className="information">
                <div>
                    <h4 className="lt-head"><u>Live Tracking</u></h4>
                <img className="driver-image-lt" src="https://res.cloudinary.com/dyxhiuuxa/image/upload/v1724665401/profiledriver_m3kcmd.png" alt="l" />
                     <h4 className="lt-veh-num">Vehicle Number : {driverData.registrationNumber}</h4>
                     <h5 className="lt-veh-id">Vehicle Id : {driverData.vehicleId}</h5>
                     <p className="view-veh-detail">View Vehicle details <FaAngleRight className="right-det" /> </p>
                    </div>
                    </div>
               )}     
        <div className="curr-ass-veh">
            <h4><u>Currently Assigned Vehicle</u></h4>
            <div className="cur-det">
                <div className="cur-car-det-c">
                <img className="cur-car-img" src={driverData.vehicleImage} alt="ff"/>
                </div>
                <div>
                    <div className="brand-img-mo-num">
                <img className="vehicle-brande-img" src="https://res.cloudinary.com/dyxhiuuxa/image/upload/v1724700248/Maruti-Suzuki-Logo-2011_oxddax.png" alt="id"/>
                <h3 className="veh-num-cras">{driverData.registrationNumber}</h3>
                <h5 className="veh-model">{driverData.vehicleName}</h5>
                </div>
                {/* <p className="view-veh-detail-cras">View Vehicle details <FaAngleRight className="right-det" /> </p> */}
                {/* <h5 className="assg-client">Assigned Client</h5> */}
                {/* <h3 className="assg-client-name">Client Name</h3> */}
                {/* <p className="assg-client-chng">Change Client<FaAngleRight className="right-det" /></p> */}
                {/* <h5 className="assg-loc">Assigned Location</h5> */}
                {/* <h3 className="assg-route">NPT-HCL</h3> */}
                {/* <p className="assg-loc-chng">Change Location<FaAngleRight className="right-det" /></p> */}
                
                <div className="curr-dets">
                    {/* <div className="brand">
                    <p >Brand</p>
                    <p>value</p>
                </div> */}
         <div className="model"> 
            <p ><b>Model</b></p>
            <p>{driverData.vehicleName}</p>
            </div>
            {/* <div className="color"><p>Color</p>
            <p>value</p>
            </div> */}
            <div className="regno">
            <p ><b>Registration Num</b></p>
            <p>{driverData.registrationNumber}</p>
            </div>
            <div className="seatcp">
            <p><b>Seat Capacity</b></p>
            <p>{driverData.seatCapacity}</p>
            </div>
            <div className="fueltype">
            <p><b>Fuel Type</b></p>
            <p>{driverData.fuelType}</p>
            </div>
            <div className="mil">
            <p ><b>Mileage</b></p>
            <p>{driverData.mileage}</p>
            </div>
            <div className="man-year">
            <p><b>Manufacture Year</b></p>
            <p>{driverData.yearOfManufacturing}</p>
            </div>
            </div>
                </div>
            </div>
        </div>
    </div>
 )
}
export default Driverprad;
