// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import { FaHeart, FaRegHeart, FaShareAlt } from 'react-icons/fa';
// // import './Upload.css';
// import { useNavigate } from 'react-router-dom';

// function Upload() {
//     const [image, setImageSelected] = useState("");
//     const [images, setImages] = useState([]);
//     const [searchQuery, setSearchQuery] = useState("");
//     const [users, setUsers] = useState([]);
//     const [showShareModal, setShowShareModal] = useState(false);
//     const [selectedUsers, setSelectedUsers] = useState([]);
//     const [imageToShare, setImageToShare] = useState(null);
//     const fileInputRef = useRef(null);

//     useEffect(() => {
//         fetchImages();
//         fetchUsers();
//     }, []);

//     const fetchImages = () => {
//         axios.get('http://localhost:5000/images')
//             .then(res => setImages(res.data))
//             .catch(err => console.log(err));
//     };

//     const fetchUsers = () => {
//         axios.get('http://localhost:5000/users')
//             .then(res => setUsers(res.data))
//             .catch(err => console.log(err));
//     };

//     const handleFileChange = (event) => {
//         const selectedFile = event.target.files[0];
//         if (selectedFile) {
//             setImageSelected(selectedFile);
//             upload(selectedFile);
//         }
//     };

//     const triggerFileInput = () => {
//         fileInputRef.current.click();
//     };

//     const upload = (file) => {
//         const formData = new FormData();
//         formData.append("file", file);
//         formData.append("upload_preset", "q6fwknmo");
//         axios.post("https://api.cloudinary.com/v1_1/djbz2ydtp/image/upload", formData)
//             .then(res => {
//                 saveImageUrl(res.data.secure_url);
//             })
//             .catch(err => console.log(err));
//     };

//     const saveImageUrl = (url) => {
//         axios.post('http://localhost:5000/images', { url })
//             .then(res => {
//                 setImages(prevImages => [{ id: res.data.id, url, likes: 0, shares: 0 }, ...prevImages]);
//             })
//             .catch(err => console.log(err));
//     };

//     const handleSearch = () => {
//         axios.get('http://localhost:5000/images?search=${searchQuery}')
//             .then(res => setImages(res.data))
//             .catch(err => console.log(err));
//     };
    

//     const handleLike = (imageId) => {
//     axios.post('http://localhost:5000/images/${imageId}/like')
//         .then(res => {
//             setImages(prevImages => 
//                 prevImages.map(image => 
//                     image.id === imageId ? { ...image, likes: res.data.likes } : image
//                 )
//             );
//         })
//         .catch(err => console.error('Error liking image:', err));
// };


//     const handleShare = (imageId) => {
//         setImageToShare(imageId);
//         setShowShareModal(true);
//     };

//     const handleUserSelect = (userId) => {
//         setSelectedUsers(prevSelectedUsers => {
//             if (prevSelectedUsers.includes(userId)) {
//                 return prevSelectedUsers.filter(id => id !== userId);
//             } else {
//                 return [...prevSelectedUsers, userId];
//             }
//         });
//     };
//     const navigate = useNavigate();

//   const handleSharedFilesClick = () => {
//     navigate('/shared');
//   };

//   const handleShareSubmit = () => {
//     axios.post('http://localhost:5000/images/share', {
//         imageId: imageToShare,
//         senderId: 1, 
//         receiverIds: selectedUsers
//     })
//     .then(res => {
//         setShowShareModal(false);
//         setSelectedUsers([]);
//         setImageToShare(null);
//         console.log(res.data.message);
//     })
//     .catch(err => console.error('Error sharing image:', err));
// };
//     return (
//         <div className='main'>
//             <div className="controls">
//                 <div className="search-container">
//                     <input 
//                         type="text" 
//                         placeholder="Search images..." 
//                         value={searchQuery} 
//                         onChange={(e) => setSearchQuery(e.target.value)} 
//                         className="search-bar"
//                     />
//                     <button onClick={handleSearch} className="search-button">Search</button>
//                 </div>
//                 <button onClick={triggerFileInput} className="upload-button">Upload Image</button>
//                 <button onClick={handleSharedFilesClick} className="upload-button">Shared</button>
//                 <input 
//                     type="file" 
//                     name="image" 
//                     onChange={handleFileChange} 
//                     ref={fileInputRef} 
//                     style={{ display: 'none' }} 
//                 />
//             </div>
//             <div className='images-container'>
//                 {images.map(image => (
//                     <div key={image.id} className="card">
//                         <img src={image.url} alt="Uploaded" className="uploaded-image" />
//                         <div className="card-buttons">
//                             <button 
//                                 className="like-button"
//                                 onClick={() => handleLike(image.id)}
//                             >
//                                 {image.likes > 0 ? <FaHeart className="liked-icon" /> : <FaRegHeart className="like-icon" />}
//                                 {image.likes}
//                             </button>
//                             <button 
//                                 className="share-button"
//                                 onClick={() => handleShare(image.id)}
//                             >
//                                 <FaShareAlt className="share-icon" />
//                                 {image.shares}
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {showShareModal && (
//                 <div className="modal">
//                     <div className="modal-content">
//                         <h2>Select Users to Share</h2>
//                         <div className="user-list">
//                             {users.map(user => (
//                                 <div key={user.id} className="user-item">
//                                     <input 
//                                         type="checkbox" 
//                                         checked={selectedUsers.includes(user.id)} 
//                                         onChange={() => handleUserSelect(user.id)} 
//                                     />
//                                     {user.username}
//                                 </div>
//                             ))}
//                         </div>
//                         <button onClick={handleShareSubmit} className="share-submit-button">Send</button>
//                         <button onClick={() => setShowShareModal(false)} className="close-button">Close</button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default Upload;
import axios from 'axios';
// import './AddVehicle.css';
import { useState,} from 'react';

// Function to generate a random alphanumeric ID
const generateRandomId = (length = 8) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

// Cloudinary upload preset and URL
const CLOUDINARY_UPLOAD_PRESET = 'shinyyyyy';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dyxhiuuxa/image/upload';

const VehicleForm = () => {
  const [vehicleDetails, setVehicleDetails] = useState({
    vehicleName: '',
    vehicleId: generateRandomId(),
    vendorName: '',
    vendorId: '',
    registrationNumber: '',
    engineNumber: '',
    chassisNumber: '',
    fuelType: '',
    seatCapacity: 0,
    mileage: 0,
    yearOfManufacturing: '',
    vehicleImage: '', // Initialize as empty
  });

  const [errors, setErrors] = useState({});

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

      try {
        const response = await axios.post(CLOUDINARY_UPLOAD_URL, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const imageUrl = response.data.secure_url;
        setVehicleDetails({
          ...vehicleDetails,
          vehicleImage: imageUrl,
        });

        // Optionally, send image URL to your backend for storing in the database
        // await axios.post('/your-backend-endpoint', { imageUrl });

      } catch (error) {
        console.error('Image upload failed:', error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicleDetails({
      ...vehicleDetails,
      [name]: value,
    });

    // Remove error message once user starts typing
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    // Check if all fields are non-empty
    Object.keys(vehicleDetails).forEach((key) => {
      if (!vehicleDetails[key] && key !== 'vehicleImage') { // Exclude vehicleImage from required fields
        formIsValid = false;
        errors[key] = '${key} is required';
      }
    });

    if (vehicleDetails.registrationNumber && vehicleDetails.registrationNumber.length !== 10) {
      formIsValid = false;
      errors.registrationNumber = 'Registration number must be 10 characters long';
    }

    if (vehicleDetails.engineNumber && vehicleDetails.engineNumber.length !== 10) {
      formIsValid = false;
      errors.engineNumber = 'Engine number must be 10 characters long';
    }

    if (vehicleDetails.mileage && isNaN(vehicleDetails.mileage)) {
      formIsValid = false;
      errors.mileage = 'Mileage must be a number';
    }

    if (vehicleDetails.yearOfManufacturing && (isNaN(vehicleDetails.yearOfManufacturing) || vehicleDetails.yearOfManufacturing.length !== 4)) {
      formIsValid = false;
      errors.yearOfManufacturing = 'Year of Manufacture must be a 4-digit number';
    }

    setErrors(errors);
    return formIsValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log('Form is valid and ready to be submitted');
      try {
        // Send vehicleDetails to your backend

        console.log(vehicleDetails.vehicleName)
        console.log(vehicleDetails.vehicleId)
        console.log(vehicleDetails.vendorName)
        console.log(vehicleDetails.vendorId)
        console.log(vehicleDetails.registrationNumber)
        console.log(vehicleDetails.engineNumber)
        console.log(vehicleDetails.chassisNumber)
        console.log(vehicleDetails.fuelType)
        console.log(vehicleDetails.seatCapacity)
        console.log(vehicleDetails.mileage)
        console.log(vehicleDetails.yearOfManufacturing)
        console.log(vehicleDetails.vehicleImage)


        await axios.post('https://silent-wave-76445.pktriot.net/add-vehicle', {vehicleDetails});
        console.log('Vehicle details saved successfully');
      } catch (error) {
        console.error('Error saving vehicle details:', error);
      }
    } else {
      console.log('Form has errors');
    }
  };

  return (
    <form className="vehicle-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h2>Add Vehicle</h2>
        <button type="submit" className="save-button">Save</button>
      </div>

      <div className="form-content">
        <div className="left-section">
          <div className="image">
            <input 
              type="file" 
              name="vehicleImage" 
              onChange={handleImageUpload} 
              style={{ display: 'none' }} 
              id="upload-button"
            />
            <label htmlFor="upload-button">
              <img src={vehicleDetails.vehicleImage || 'https://res.cloudinary.com/djbz2ydtp/image/upload/v1724774191/111_-Add_Car_Details-_transport_vehicle-512_ptci8m.png'} alt="Vehicle" className="vehicle-preview" />
            </label>
          </div>
          <div className='vehicle'>
            <label className="required">Vehicle Name:</label>
            <input 
              type="text" 
              name="vehicleName" 
              value={vehicleDetails.vehicleName} 
              onChange={handleChange} 
            />
            {errors.vehicleName && <span className="error-message">{errors.vehicleName}</span>}

            <label>Vehicle ID:</label>
            <input 
              type="text" 
              name="vehicleId" 
              value={vehicleDetails.vehicleId} 
              readOnly // Making ID read-only as it is auto-generated
            />

            <label htmlFor="imageUpload" style={{ marginRight: '10px',  content: '*',
   }}>*Upload Image:</label>
            <input type="file" id="imageUpload" accept="image/*" onChange={handleImageUpload} />
          </div>

          <div className="vendor-details">
            <h3>Vendor Details</h3>
            <label className="required">Vendor Name:</label>
            <input 
              type="text" 
              name="vendorName" 
              value={vehicleDetails.vendorName} 
              onChange={handleChange} 
            />
            {errors.vendorName && <span className="error-message">{errors.vendorName}</span>}

            <label className="required">Vendor ID:</label>
            <input 
              type="text" 
              name="vendorId" 
              value={vehicleDetails.vendorId} 
              onChange={handleChange} 
            />
            {errors.vendorId && <span className="error-message">{errors.vendorId}</span>}
          </div>
        </div>

        <div className="right-section">
          <div className="vehicle-details">
            <h3>Vehicle Details</h3>
            <label className="required">Registration Number:</label>
            <input 
              type="text" 
              name="registrationNumber" 
              value={vehicleDetails.registrationNumber} 
              onChange={handleChange} 
            />
            {errors.registrationNumber && <span className="error-message">{errors.registrationNumber}</span>}

            <label className="required">Engine Number:</label>
            <input 
              type="text" 
              name="engineNumber" 
              value={vehicleDetails.engineNumber} 
              onChange={handleChange} 
            />
            {errors.engineNumber && <span className="error-message">{errors.engineNumber}</span>}

            <label className="required">Fuel Type:</label>
            <input 
              type="text" 
              name="fuelType" 
              value={vehicleDetails.fuelType} 
              onChange={handleChange} 
            />
            {errors.fuelType && <span className="error-message">{errors.fuelType}</span>}

            <label className="required">Chassis Number:</label>
            <input 
              type="text" 
              name="chassisNumber" 
              value={vehicleDetails.chassisNumber} 
              onChange={handleChange} 
            />
            {errors.chassisNumber && <span className="error-message">{errors.chassisNumber}</span>}

            <label className="required">Seat Capacity:</label>
            <input 
              type="text" 
              name="seatCapacity" 
              value={vehicleDetails.seatCapacity} 
              onChange={handleChange} 
            />
            {errors.seatCapacity && <span className="error-message">{errors.seatCapacity}</span>}

            <label className="required">Mileage:</label>
            <input 
              type="text" 
              name="mileage" 
              value={vehicleDetails.mileage} 
              onChange={handleChange} 
            />
            {errors.mileage && <span className="error-message">{errors.mileage}</span>}

            <label className="required">Year of Manufacture:</label>
            <input 
              type="text" 
              name="yearOfManufacturing" 
              value={vehicleDetails.yearOfManufacturing} 
              onChange={handleChange} 
            />
            {errors.yearOfManufacturing && <span className="error-message">{errors.yearOfManufacturing}</span>}
          </div>
        </div>
      </div>
    </form>
  );
};

export default VehicleForm;