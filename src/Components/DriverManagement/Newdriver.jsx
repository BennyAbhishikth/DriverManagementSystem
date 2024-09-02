import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./newdriver.css";

function Newdriver() {
  const navigate = useNavigate();

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
  const [profileImages, setProfileImages] = useState({});
  const [imageUrl, setImageUrl] = useState(""); // State to store the Cloudinary URL

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
    } else {
      alert("Please upload a valid image file (JPG or PNG).");
    }
  };

  const handleSubmit = () => {
    if (validate()) {
      console.log({
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
      });
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

      <label className="l-expm">Experience</label>
      <input className="dr-expm" type="number" />
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
