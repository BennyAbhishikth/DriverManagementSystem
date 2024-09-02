<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./newdriver.css";
=======
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
>>>>>>> bcc809310cb52c4b3910d1cb9880eff1a37d0f99

function Newdriver() {
  // const navigate = useNavigate();

  // State variables for form fields
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
<<<<<<< HEAD
=======
  const [exp, setExp] = useState("");
  const [vehicleId , setVehicleId] = useState("")


  const [data, setData] = useState([]); 
>>>>>>> bcc809310cb52c4b3910d1cb9880eff1a37d0f99
  const [profileImages, setProfileImages] = useState({});
  const [imageUrl, setImageUrl] = useState(""); // State to store the Cloudinary URL

<<<<<<< HEAD
  // Fetch data from local storage
  useEffect(() => {
    const savedImages = localStorage.getItem("profileImages");
    if (savedImages) {
      setProfileImages(JSON.parse(savedImages));
    }
  }, []);

  // Save data to local storage
  useEffect(() => {
    localStorage.setItem("profileImages", JSON.stringify(profileImages));
  }, [profileImages]);
=======
  const generateRandomId = (length = 8) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

>>>>>>> bcc809310cb52c4b3910d1cb9880eff1a37d0f99

  // Validation function
  const validate = () => {
    const errors = [];

    if (!name) errors.push("Name is required.");
    if (!email) {
      errors.push("Email is required.");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.push("Email is invalid.");
    }
    if (!mobile) {
      errors.push("Mobile number is required.");
    } else if (!/^[6-9]\d{9}$/.test(mobile)) {
      errors.push("Mobile number is invalid.");
    }
    if (!gender) errors.push("Gender is required.");
    if (!dob) errors.push("Date of Birth is required.");
    if (!age) {
      errors.push("Age is required.");
    } else if (age < 18) {
      errors.push("Driver must be at least 18 years old.");
    }
    if (!address) errors.push("Address is required.");
    if (!aadhar) {
      errors.push("Aadhar number is required.");
    } else if (!/^\d{12}$/.test(aadhar)) {
      errors.push("Aadhar number is invalid.");
    }
    if (!pan) {
      errors.push("PAN card number is required.");
    } else if (!/[A-Z]{5}[0-9]{4}[A-Z]{1}/.test(pan)) {
      errors.push("PAN card number is invalid.");
    }
    if (!lic) {
      errors.push("License number is required.");
    } else if (!/^[0-9]{10}$/.test(lic)) {
      errors.push("License number is invalid.");
    }

    if (errors.length > 0) {
      window.alert(errors.join("\n"));
      return false;
    }

    return true;
  };

  const handleProfileImageChange = async (event, rowIndex) => {
    const file = event.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "shinyyyyy"); // Replace with your Cloudinary upload preset

        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dyxhiuuxa/image/upload", // Replace with your Cloudinary upload URL
          formData
        );

        // Get the image URL from the response
        const imageUrl = response.data.secure_url;

<<<<<<< HEAD
        // Update the profile image state with the Cloudinary URL
        setProfileImages((prevImages) => ({
          ...prevImages,
          [rowIndex]: imageUrl,
        }));

        // Update the imageUrl state to display it
        setImageUrl(imageUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
=======
            setImageUrl(imageUrl)

            // Update the profile image state with the Cloudinary URL
            setProfileImages(prevImages => ({ ...prevImages, [rowIndex]: imageUrl }));
        } catch (error) {
            console.error('Error uploading image:', error);
        }
>>>>>>> bcc809310cb52c4b3910d1cb9880eff1a37d0f99
    } else {
      alert("Please upload a valid image file (JPG or PNG).");
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
<<<<<<< HEAD
      });
      navigate("/viewdrivers", {
        state: {
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
        },
=======
        exp,
        imageUrl,
        vehicleId
>>>>>>> bcc809310cb52c4b3910d1cb9880eff1a37d0f99
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

  return (
    <div className="driver-form-details-m">
      <label className="l-namem">Name</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="dr-namem"
        type="text"
      />
      <br />

      <label className="l-emailm">E-mail</label>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="dr-emailm"
        type="text"
      />
      <br />

      <label className="l-mobm">Mobile Number</label>
      <input
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        className="dr-mobm"
        type="number"
      />
      <br />

      <label className="l-genm">Gender</label>
      <select
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        className="dr-gemn"
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <br />

      <label className="l-dobm">DOB</label>
      <input
        value={dob}
        onChange={(e) => setDob(e.target.value)}
        className="dr-dobm"
        type="date"
      />
      <br />

      <label className="l-agem">Age</label>
      <input
        value={age}
        onChange={(e) => setAge(e.target.value)}
        className="dr-agem"
        type="number"
      />
      <br />

      <label className="l-addressm">Address</label>
      <input
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="dr-addressm"
        type="text"
      />
      <br />

      <label className="l-licm">LIC.No</label>
      <input
        value={lic}
        onChange={(e) => setLic(e.target.value)}
        className="dr-licm"
        type="text"
      />
      <br />

      <label className="l-panm">PAN Card No</label>
      <input
        value={pan}
        onChange={(e) => setPan(e.target.value)}
        className="dr-panm"
        type="text"
      />
      <br />

      <label className="l-aadharm">Aadhar No</label>
      <input
        type="text"
        value={aadhar}
        onChange={(e) => setAadhar(e.target.value)}
        className="dr-aadharm"
      />
      <br />

<<<<<<< HEAD
      <label className="l-expm">Experience</label>
      <input className="dr-expm" type="number" />
=======
      <label className="l-exp">Experience</label>
      <input className="dr-exp" type="number" onChange={(e) => setExp(e.target.value)}/>
      <br />

      <label className="l-exp">Vehicle Id</label>
      <input className="dr-exp" type="text" onChange={(e) => setVehicleId(e.target.value)}/>
>>>>>>> bcc809310cb52c4b3910d1cb9880eff1a37d0f99
      <br />

      <label className="l-imgm">Image</label>
      <input
        className="dr-imgm"
        type="file"
        accept=".jpg, .jpeg, .png"
        onChange={(e) => handleProfileImageChange(e, 0)}
      />
      <br />
  

      {/* Display the Cloudinary image URL */}
      {imageUrl && (
        <div>
          <p>Uploaded Image URL:</p>
          <a href={imageUrl} target="_blank" rel="noopener noreferrer">
            {imageUrl}
          </a>
          <img src={imageUrl} alt="Uploaded" style={{ width: "100px", marginTop: "10px" }} />
        </div>
      )}

      <button onClick={handleSubmit} className="dr-submitm">
        Submit
      </button>
    </div>
  );
}

export default Newdriver;
