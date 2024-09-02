// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import "./driver.css"
// function Newdriver(){
//     const navigate = useNavigate();
//     const handlesubmit=()=>{
//        navigate("/viewdrivers")
//     }
//     const [name,setName] = useState();
//     const [mobile,setMobile] = useState();
//     const [email,setEmail] = useState();
//     const [gender,setGender] = useState();
//     const [age,setAge] = useState();
//     const [dob,setDob] = useState();
//     const [address,setAddress] = useState();
//     const [aadhar,setAadhar] = useState();
//     const [pan,setPan] = useState();
//     const [lic,setLic] = useState();

//     console.log(name);
//     console.log(mobile);
//     console.log(email);
//     console.log(gender);
//     console.log(age);
//     console.log(dob);
//     console.log(address);
//     console.log(aadhar);
//     console.log(pan);
//     console.log(lic);

// return(
//     <div className="driver-form-details">
//         <label className="l-name">Name</label>
//     <input value={name} onChange={(e)=>setName(e.target.value)} className="dr-name" type="text" /><br/>
    
//     <label className="l-email">E-mail</label>
//     <input value={email} onChange={(e)=>setEmail(e.target.value)} className="dr-email" type="text" /><br/>
//     <label className="l-mob">Mobile Number</label>
//     <input value={mobile} onChange={(e)=>setMobile(e.target.value)} className="dr-mob" type="Number" pattern="[6789][0-9]{9}" /><br/>
//     <label className="l-gen">Gender</label>
//     <select value={gender} onChange={(e)=>setGender(e.target.value)} className="dr-gen">
//         <option>Male</option>
//         <option>Female</option>
//     </select><br/>
//     <label className="l-dob" >DOB</label>
//     <input value={dob} onChange={(e)=>setDob(e.target.value)} className="dr-dob" type="date" /><br/>
//     <label className="l-age">Age</label>
//     <input value={age} onChange={(e)=> setAge(e.target.value)} className="dr-age" type="Number" /><br/>
//     <label className="l-address">Address</label>
//     <input value={address} onChange={(e)=>setAddress(e.target.value)} className="dr-address" type="text" /><br/>
//     <label className="l-lic">LIC.No</label>
//     <input value={lic} onChange={(e)=>setLic(e.target.value)} className="dr-lic" type="Number" /><br/>
//     <label className="l-pan">PAN Card No</label>
//     <input value={pan} onChange={(e)=>setPan(e.target.value)} className="dr-pan" type="Number" /><br/>
//     <label className="l-aadhar">Aadhar No</label>
//     <input type="text" value={aadhar} onChange={(e)=>setAadhar(e.target.value)} className="dr-aadhar" /><br/>
//     <label className="l-exp">Experience</label>
//     <input  className="dr-exp" type="Number"/><br/>
//     <label className="l-img">Image</label>
//     <input className="dr-img" type="file" /><br/>
//     <button onClick={handlesubmit} className="dr-submit">Submit</button>
//         </div>
        
// )
// }
// export default Newdriver;


// import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./driver.css";
import axios from 'axios';
import { useEffect } from "react";

function Newdriver() {
  // const navigate = useNavigate();

  // State variables for form fields and errors
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [pan, setPan] = useState("");
  const [lic, setLic] = useState("");
  const [exp, setExp] = useState("");
  const [vehicleId , setVehicleId] = useState("")


  const [data, setData] = useState([]); 
  const [profileImages, setProfileImages] = useState({});
  // State variables for error messages
  const [errors, setErrors] = useState({});
  const [imageUrl, setImageUrl] = useState('');

  const generateRandomId = (length = 8) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };


  // Validation function
  useEffect(() => {
    // const savedData = localStorage.getItem('excelData');
    const savedImages = localStorage.getItem('profileImages');
    // if (savedData) {
    //     const parsedData = JSON.parse(savedData);
    //     setData(parsedData);
    //     setFilteredData(parsedData);
    // }
    if (savedImages) {
        setProfileImages(JSON.parse(savedImages));
    }
}, []);

useEffect(() => {
    // localStorage.setItem('excelData', JSON.stringify(data));
    localStorage.setItem('profileImages', JSON.stringify(profileImages));
}, [data, profileImages]);
  const validate = () => {
    const newErrors = {};

    if (!name) newErrors.name = "Name is required.";
    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid.";
    }
    if (!mobile) {
      newErrors.mobile = "Mobile number is required.";
    } else if (!/^[6-9]\d{9}$/.test(mobile)) {
      newErrors.mobile = "Mobile number is invalid.";
    }
    if (!gender) newErrors.gender = "Gender is required.";
    if (!dob) newErrors.dob = "Date of Birth is required.";
    if (!age) {
      newErrors.age = "Age is required.";
    } else if (age < 18) {
      newErrors.age = "Driver must be at least 18 years old.";
    }
    if (!address) newErrors.address = "Address is required.";
    if (!aadhar) {
      newErrors.aadhar = "Aadhar number is required.";
    } else if (!/^\d{12}$/.test(aadhar)) {
      newErrors.aadhar = "Aadhar number is invalid.";
    }
    if (!pan) {
      newErrors.pan = "PAN card number is required.";
    } else if (!/[A-Z]{5}[0-9]{4}[A-Z]{1}/.test(pan)) {
      newErrors.pan = "PAN card number is invalid.";
    }
    if (!lic) {
      newErrors.lic = "License number is required.";
    } else if (!/^[0-9]{10}$/.test(lic)) {
      newErrors.lic = "License number is invalid.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleProfileImageChange = async (event, rowIndex) => {
    const file = event.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
        try {
            
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'q6fwknmo'); // Replace with your Cloudinary upload preset

            const response = await axios.post(
                'https://api.cloudinary.com/v1_1/djbz2ydtp/image/upload', // Replace with your Cloudinary upload URL
                formData
            );

            // Get the image URL from the response
            const imageUrl = response.data.secure_url;

            setImageUrl(imageUrl)

            // Update the profile image state with the Cloudinary URL
            setProfileImages(prevImages => ({ ...prevImages, [rowIndex]: imageUrl }));
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    } else {
        alert('Please upload a valid image file (JPG or PNG).');
    }
};

  const handleSubmit = () => {

   let  driverId = generateRandomId()
   console.log(driverId)

    if (validate()) {
      console.log({
        driverId,
        name,
        mobile,
        email,
        gender,
        age,
        dob,
        address,
        aadhar,
        pan,
        lic,
        exp,
        imageUrl,
        vehicleId
      });
      // navigate("/viewdrivers", {
      //   state: {
      //     name,
      //     mobile,
      //     email,
      //     gender,
      //     age,
      //     dob,
      //     address,
      //     aadhar,
      //     pan,
      //     lic
      //   }
      // });

      axios.post("https://silent-wave-76445.pktriot.net/addDriver",{driverId,name,mobile,email,gender,age,dob,address,aadhar,pan,lic,exp,imageUrl,vehicleId})
      .then((result) => {
        console.log(result.data);
      })
      .catch((error) => {
        console.error(error);
      })

    }
  };
  // const location = useLocation();
  return (
    <div className="driver-form-details">
      <label className="l-name">Name</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="dr-name"
        type="text"
      />
      {errors.name && <p className="error">{errors.name}</p>}
      <br />

      <label className="l-email">E-mail</label>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="dr-email"
        type="text"
      />
      {errors.email && <p className="error">{errors.email}</p>}
      <br />

      <label className="l-mob">Mobile Number</label>
      <input
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        className="dr-mob"
        type="number"
      />
      {errors.mobile && <p className="error">{errors.mobile}</p>}
      <br />

      <label className="l-gen">Gender</label>
      <select
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        className="dr-gen"
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      {errors.gender && <p className="error">{errors.gender}</p>}
      <br />

      <label className="l-dob">DOB</label>
      <input
        value={dob}
        onChange={(e) => setDob(e.target.value)}
        className="dr-dob"
        type="date"
      />
      {errors.dob && <p className="error">{errors.dob}</p>}
      <br />

      <label className="l-age">Age</label>
      <input
        value={age}
        onChange={(e) => setAge(e.target.value)}
        className="dr-age"
        type="number"
      />
      {errors.age && <p className="error">{errors.age}</p>}
      <br />

      <label className="l-address">Address</label>
      <input
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="dr-address"
        type="text"
      />
      {errors.address && <p className="error">{errors.address}</p>}
      <br />

      <label className="l-lic">LIC.No</label>
      <input
        value={lic}
        onChange={(e) => setLic(e.target.value)}
        className="dr-lic"
        type="text"
      />
      {errors.lic && <p className="error">{errors.lic}</p>}
      <br />

      <label className="l-pan">PAN Card No</label>
      <input
        value={pan}
        onChange={(e) => setPan(e.target.value)}
        className="dr-pan"
        type="text"
      />
      {errors.pan && <p className="error">{errors.pan}</p>}
      <br />

      <label className="l-aadhar">Aadhar No</label>
      <input
        type="text"
        value={aadhar}
        onChange={(e) => setAadhar(e.target.value)}
        className="dr-aadhar"
      />
      {errors.aadhar && <p className="error">{errors.aadhar}</p>}
      <br />

      <label className="l-exp">Experience</label>
      <input className="dr-exp" type="number" onChange={(e) => setExp(e.target.value)}/>
      <br />

      <label className="l-exp">Vehicle Id</label>
      <input className="dr-exp" type="text" onChange={(e) => setVehicleId(e.target.value)}/>
      <br />

      <label className="l-img">Image</label>
      <input  className="dr-img" type="file" accept='.jpg, .jpeg, .png' onChange={(e) => {handleProfileImageChange (e, data.length);}} />
      {imageUrl && <img src={imageUrl} alt="Uploaded" />}

      <br />
  

      <button onClick={()=>handleSubmit()} className="dr-submit" >
        Submit
      </button>
    </div>
  );
}

export default Newdriver;
