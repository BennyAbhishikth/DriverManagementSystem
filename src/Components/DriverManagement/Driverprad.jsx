import "./driver.css"
import { IoCall } from "react-icons/io5";
import { MdAirlineSeatReclineExtra } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaChevronLeft } from "react-icons/fa6";
import { MdOutlineLocalTaxi } from "react-icons/md";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineMessage } from "react-icons/md";
import { FaTelegramPlane } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { TiTick } from "react-icons/ti";
import { LuFuel } from "react-icons/lu";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import { TiUser } from "react-icons/ti";
import { CiMobile1 } from "react-icons/ci";
import { MdOutlineMail } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { CiCalendarDate } from "react-icons/ci";
import { FaAddressCard } from "react-icons/fa";
import { PiClockAfternoon } from "react-icons/pi";
import { FaLocationDot } from "react-icons/fa6";
import { CiCalendar } from "react-icons/ci";
import { FaBrush } from "react-icons/fa";

import { useLocation, useNavigate } from "react-router-dom";
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
    const drdetails=[
     { title:"Experience",
        icon:"",
        val:"xxx"
     },
     { title:"Total Distance",
        icon:"",
        val:"xxx"
     },{ title:"Total Hours",
        icon:"",
        val:"xxx"
     },{ title:"Total Office Trips",
        icon:"",
        val:"xxx"
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
        val:"xxx"
     },
    ]
    const navigate = useNavigate();
    const handlebackdrpro=()=>{
       navigate("/viewdrivers")
    }
   
     const fun=[
        {title:"Phone Number",
         value:"xxxxxxxx",
         icon:<CiMobile1/>
        },
        {title:"Email",
            value:"xxx@gmail.com",
            icon:<MdOutlineMail />
           },
           {title:"Gender",
            value:"Male",
            icon:<CiUser />
           },
           {title:"Age",
            value:"46",
            icon:<CiUser />
           },
           {title:"Date Of Birth",
            value:"",
            icon:<CiCalendarDate />
           },
           {title:"Address",
            value:"jtyduafigihonkbdyihadb",
            icon:<FaLocationDot />
           },
           {title:"Aadhar Number",
            value:"dafsr",
            icon:<FaAddressCard />
           },
           {title:"Pan Card Number",
            value:"nljnnfers",
            icon:<FaAddressCard />
           },
           {title:"Lic Number",
            value:"fskhfil",
            icon:<FaAddressCard />
           },
    ]
    
   
 return(
    <div>
     

        <div className="admin-head">
            <div className="admin-dr-nav">
            <p className="dr-mng">Driver Mangement&nbsp;/&nbsp;All Drivers&nbsp;/&nbsp;<b className="bold-driver-id">xxxxxx</b></p>
            <p className="dr-time">{d}</p>
            </div>
            <div className="admin-prof">
            <h3 >AdminName</h3>
            <img className="admin-prof-btn" alt=""/>
            </div>
        </div>
        <div className="tot-card">
            <button onClick={handlebackdrpro} className="inf-card-left"><FaAngleLeft /></button>
            <div className="tick-inf-doc-upd">
            <TiTick className="tick"  />
            <h4 className="doc-up" >All Documents are upto date</h4>
            </div>
            {/* <select className="act-inact"> */}
                <option className="act-inact">Active</option>
                
                {/* </select> */}

                <button className="edit-btn"><MdOutlineEdit /></button>
                <button className="delete-btn"><MdDelete /></button>
                <img className="driver-image" src="https://res.cloudinary.com/dyxhiuuxa/image/upload/v1724665401/profiledriver_m3kcmd.png" alt="l" />
                <h4 className="driver-name-head">Driver Name</h4>
                <h5 className="driver-id">Driver Id</h5>
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
                            <h2 className="dr-details-card-value">{item.val}</h2>
                          <h5 className="dr-details-card-head">{item.title}</h5>
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
                 <h4 className="inf-pers-view"><u>Personal Information</u></h4>
                 <h3><TiUser />&nbsp;&nbsp;Driver Name</h3>
                 <div className="mob-infss">
                 {fun.map((item,key)=>(
                    <div className="mob-infs">
                      
                        <div className="mob-inf-det">
                              
                        <div className="mob-symm">
                          <button className="mob-sym-btn"><icon />{item.icon}</button>
                        </div>
                        <div className="details-driver-card">
                           <p className="phone-num-h">{item.title}</p>
                           <p className="phone-num"><b>{item.value}</b></p>
                           </div>
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
                     <h4 className="lt-veh-num">Vehicle Number</h4>
                     <h5 className="lt-veh-id">Vehicle Id</h5>
                     <p className="view-veh-detail">View Vehicle details <FaAngleRight className="right-det" /> </p>
                    </div>
                    </div>
               )}     
        <div className="curr-ass-veh">
            <h4 className="inf-pers-view-veh"><u>Currently Assigned Vehicle</u></h4>
            <div className="cur-det">
                <div className="cur-car-det-c">
                <img className="cur-car-img" src="https://res.cloudinary.com/dyxhiuuxa/image/upload/v1724421684/wrweuthrgturh6b7dqf1.png" alt="ff"/>
                </div>
                <div>
                    <div className="brand-img-mo-num">
                <img className="vehicle-brande-img" src="https://res.cloudinary.com/dyxhiuuxa/image/upload/v1724700248/Maruti-Suzuki-Logo-2011_oxddax.png" alt="id"/>
                <h3 className="veh-num-cras">TN 01 AA 1234</h3>
                <h5 className="veh-model">Swift VXI</h5>
                </div>
                <p className="view-veh-detail-cras">View Vehicle details <FaAngleRight className="right-det" /> </p>
                <h5 className="assg-client">Assigned Client</h5>
                <h3 className="assg-client-name">Client Name</h3>
                <p className="assg-client-chng">Change Client<FaAngleRight className="right-det" /></p>
                <h5 className="assg-loc">Assigned Location</h5>
                <h3 className="assg-route">NPT-HCL</h3>
                <p className="assg-loc-chng">Change Location<FaAngleRight className="right-det" /></p>
                
                <div className="curr-dets">
                    <div className="brand">
                        <div>
                       <button className="car-brand-btn"><MdOutlineLocalTaxi  /></button> 
                        </div>
                        <div>
                        <p >Brand</p>
                        <p>value</p>
                        </div>
                    </div>
         <div className="model"> 
         <div>
                       <button className="car-brand-btn"><MdOutlineLocalTaxi  /></button> 
                        </div>
                        <div>
                        <p >Model</p>
                        <p>value</p>
                        </div>
            </div>
            <div className="color">
            <div>
                       <button className="car-brand-btn"><FaBrush  /></button> 
                        </div>
                        <div>
                        <p>Color</p>
                        <p>value</p>
                        </div>
                        
            </div>
            <div className="regno">
            <div>
                       <button className="car-brand-btn"><MdOutlineLocalTaxi  /></button> 
                        </div>
                        <div>
                        <p >Registration Num</p>
                        <p>value</p>
                        </div>
            
            </div>

            <div className="seatcp">
            <div>
                       <button className="car-brand-btn"><MdAirlineSeatReclineExtra  /></button> 
                        </div>
            <div>
            <p>Seat Capacity</p>
            <p>value</p>
            </div>
            </div>
            <div className="fueltype">
            <div>
                       <button className="car-brand-btn"><LuFuel  /></button> 
                        </div>
           <div>
           <p>Fuel Type</p>
           <p>value</p>
           </div>
            </div>
            <div className="mil">
            <div>
                       <button className="car-brand-btn"><MdOutlineLocalTaxi  /></button> 
                        </div>
            <div>
            <p >Mileage</p>
            <p>value</p>
            </div>
            </div>
            <div className="man-year">
            <div>
                       <button className="car-brand-btn"><CiCalendar  /></button> 
                        </div>
                        <div>
                        <p>Manufacture Year</p>
                        <p>value</p>
                        </div>
            </div>
            </div>
                </div>
            </div>
        </div>
    </div>
 )
}
export default Driverprad;