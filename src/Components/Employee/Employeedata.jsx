
import React, { useState, useEffect, useRef } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';
import { IoCloseSharp } from "react-icons/io5";
import './employee.css';
import { useForm } from 'react-hook-form';
import tt from '@tomtom-international/web-sdk-maps'; // Import TomTom SDK
import { EmailJSResponseStatus } from 'emailjs-com';

const ExcelUpload = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [fileName, setFileName] = useState("");
    const [editingRow, setEditingRow] = useState(null);
    const [profileImages, setProfileImages] = useState({});
    const [newEmployee, setNewEmployee] = useState([]);
    const [isAddingEmployee, setIsAddingEmployee] = useState(false);
    const [newImageUrl, setNewImageUrl] = useState("");
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [location, setLocation] = useState({ lat: 51.5074, lng: -0.1278 }); // Default to London coordinates
    const [error, setError] = useState('');
    const mapElement = useRef(null);
    const mapInstance = useRef(null);
    const markerInstance = useRef(null);

    useEffect(() => {
        const savedData = localStorage.getItem('excelData');
        const savedImages = localStorage.getItem('profileImages');
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            setData(parsedData);
            setFilteredData(parsedData);
        }
        if (savedImages) {
            setProfileImages(JSON.parse(savedImages));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('excelData', JSON.stringify(data));
        localStorage.setItem('profileImages', JSON.stringify(profileImages));
    }, [data, profileImages]);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        setFileName(file.name);
        const reader = new FileReader();

        reader.onload = (e) => {
            const binaryStr = e.target.result;
            const workbook = XLSX.read(binaryStr, { type: 'binary' });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            // Parse date values and ensure they are in a consistent format
            const updatedData = sheetData.map(row => row.map(cell => {
                if (typeof cell === 'string' && cell.match(/^\d{2}-\d{2}-\d{4}$/)) {
                    const [day, month, year] = cell.split('-');
                    return `${year}-${month}-${day}`;
                }
                return cell;
            }));
            
            setData(sheetData);
            setFilteredData(updatedData);
            console.log(updatedData);
        };

        reader.readAsBinaryString(file);
    };

    const handleSaveToDatabase = () => {
        const formData = new FormData();
        formData.append('data', JSON.stringify(data));

        Object.entries(profileImages).forEach(([index, file]) => {
            formData.append(`profileImage${index}`, file);
        });

        axios.post('/api/upload-employee-data', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then(response => {
            console.log('Data saved successfully');
        })
        .catch(error => {
            console.error('Error saving data:', error);
        });
    };

    const handleSearchChange = (event) => {
        const searchValue = event.target.value.toLowerCase();
        setSearchTerm(searchValue);
        filterData(searchValue);
    };

    const filterData = (searchValue) => {
        if (searchValue === '') {
            setFilteredData(data);
        } else {
            const filtered = data.filter(row =>
                row.some(cell =>
                    cell.toString().toLowerCase().includes(searchValue)
                )
            );
            setFilteredData(filtered);
        }
    };

    const handleDeleteRow = (rowIndex) => {
        const updatedData = [...data];
        updatedData.splice(rowIndex, 1);
        setData(updatedData);
        setFilteredData(updatedData);
    };

    const handleEditRow = (rowIndex) => {
        setEditingRow(rowIndex);
    };

    const handleSaveEdit = (rowIndex) => {
        setEditingRow(null);
    };

    const handleInputChange = (event, rowIndex, cellIndex) => {
        const updatedData = [...data];
        updatedData[rowIndex][cellIndex] = event.target.value;
        setData(updatedData);
        setFilteredData(updatedData);
    };

    const handleDateChange = (event, rowIndex) => {
        const updatedData = [...data];
        updatedData[rowIndex][15] = event.target.value; // Assuming 'Date of Hire' is in the 16th column
        setData(updatedData);
        setFilteredData(updatedData);
    };

    const handleShiftChange = (event, rowIndex) => {
        const updatedData = [...data];
        updatedData[rowIndex][13] = event.target.value; // Assuming 'Shift' is in the 14th column
        setData(updatedData);
        setFilteredData(updatedData);
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

                const imageUrl = response.data.secure_url;
                setProfileImages(prevImages => ({ ...prevImages, [rowIndex]: imageUrl }));
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        } else {
            alert('Please upload a valid image file (JPG or PNG).');
        }
    };

    // const handleNewEmployeeChange = (event, index) => {
    //     const updatedEmployee = [...newEmployee];
    //     updatedEmployee[index] = event.target.value;
    //     setNewEmployee(updatedEmployee);
    // };
    const generateRandomPassword = (length = 8) => {
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
        let password = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        return password;
    };

    const handleAddEmployee = () => {
        const updatedData = [...data, [...newEmployee]];
        setData(updatedData);
        setFilteredData(updatedData);
        setNewEmployee([]);
        setNewImageUrl("");
        setIsAddingEmployee(false);
    };

    useEffect(() => {
        if (mapElement.current && !mapInstance.current) {
          mapInstance.current = tt.map({
            key: '4VAIAvF0o7g6gIF6oj7lgSbHWDekpATt', // Replace with your TomTom Maps API key
            container: mapElement.current,
            center: [location.lng, location.lat],
            zoom: 10,
          });
          markerInstance.current = new tt.Marker().setLngLat([location.lng, location.lat]).addTo(mapInstance.current);
        } else if (mapInstance.current) {
          mapInstance.current.setCenter([location.lng, location.lat]);
          markerInstance.current.setLngLat([location.lng, location.lat]);
        }
    }, [location]);

    const onSubmit = async (data) => {
        const formData = {
          Emp_ID: data.employeeId,
          Emp_Name: data.name,
          Gender: data.gender,
          Address: data.address,
          Latitude: location.lat,
          Longitude: location.lng,
          Phone_Number: data.phoneNumber,
          Emergency_Number: data.emergencyNumber,
        };
    
        console.log('Submitting Form Data:', formData);
    
        try {
          const response = await axios.post('http://localhost:5098/employees', formData);
          console.log('Server response:', response.data);
          alert('Data submitted successfully!');
        } catch (error) {
          console.error('Error submitting form:', error.response ? error.response.data : error.message);
          alert('Error submitting data. Check the console for details.');
        }
    };

    const handleAddressChange = async (e) => {
        const address = e.target.value;
        setValue('address', address);
    
        if (address) {
          try {
            const apiKey = '4VAIAvF0o7g6gIF6oj7lgSbHWDekpATt'; // Replace with your TomTom API key
            const geocodeResponse = await axios.get(
              `https://api.tomtom.com/search/2/geocode/${encodeURIComponent(address)}.json`,
              {
                params: {
                  key: apiKey,
                  limit: 1,
                },
              }
            );
    
            const results = geocodeResponse.data.results;
            if (results && results.length > 0) {
              const lat = results[0].position.lat;
              const lon = results[0].position.lon;
              setLocation({ lat, lng: lon });
              setValue('latitude', lat);
              setValue('longitude', lon);
              setError('');
            } else {
              setError('No results found.');
            }
          } catch (error) {
            console.error('Geocoding error:', error);
            setError('Error fetching coordinates. Please try again.');
          }
        }
    };
    const [empid, setEmpid] = useState();
    const [empname,setEmpname] = useState();
    const [state,setState] = useState();
    const [empaddress,setEmpAddress] = useState();
    const [lat,setLat] = useState();
    const [long,setLong] = useState();
    const [city,setCity] = useState();
    const [gender, setGender] = useState();
    const [department,setDepartment] = useState();
    const [contactnum,setContactnum] = useState();
    const [shift,setShift] = useState();
    const [empstatus,setEmpstatus] = useState();
    const [role,setRole] = useState();
    const [hiredate,setHiredate] = useState();
    const [empemail,setEmpemail] = useState();
  
    return (
        <div className="container">
            <div className='mm-ff'>
                <h1 className='employ-head'>Employee</h1>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search-input"
                />
                <input className='input-file-xl' type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
                {fileName && <p className="file-name"></p>}
                <button className="upload-excel" onClick={handleSaveToDatabase} disabled={data.length === 0}>Upload</button>
                <button 
                    className="add-employee-button" 
                    onClick={() => setIsAddingEmployee(true)}
                >
                    Add Employee    
                </button>
            </div>
{isAddingEmployee && (
    <div className="popup-overlay">
        <div className="add-employee-form">
            <IoCloseSharp onClick={() => setIsAddingEmployee(false)} className="close-form-btn" />
            <h3 className='add-employee-head'>Add Employee</h3>
            <input
                type="text"
                value={empname}
                placeholder="Name"
                onChange={(e) => setEmpname(e.target.value)}
                className="add-employee-input"
            />
            <input
                type="text"
                value={empid}
                placeholder="Employee ID"
                onChange={(e) => setEmpid(e.target.value)}
                className="add-employee-input"
            />
            <input
                type="text"
                value={state}
                placeholder="State"
                onChange={(e) => setState(e.target.value)}
                className="add-employee-input"
            />
            <input
                type="number"
                value={contactnum}
                placeholder="Mobile Number"
                onChange={(e) => setContactnum(e.target.value)}
                className="add-employee-input"
            />
            <input
                type="text"
                value={empemail}
                placeholder="Email"
                onChange={(e) => setEmpemail(e.target.value)}
                className="add-employee-input"
            />
            <select name='Gender' value={gender}  onChange={(e) => setGender(e.target.value)}
                className="add-employee-input">
                <option>Gender</option>
                <option>Male</option>
                <option>Female</option>
            </select>
            <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="add-employee-input"
            />
            <input
                type="text"
                placeholder="Department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="add-employee-input"
            />
            <input
                type="text"
                placeholder="Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="add-employee-input"
            />
            <select name='shift' value={shift} onChange={(e) => setShift(e.target.value)}
                className="add-employee-input">
                <option>Shift 1</option>
                <option>Shift 2</option>
                <option>Shift 3</option>
            </select>
            <input
                type="date" value={hiredate}
                placeholder="Date of Hire"
                onChange={(e) => setHiredate(e.target.value)}
                className="add-employee-input"
            />
            <div className="add-employee-input full-width">
                <input
                    id="address" 
                    {...register('address', { required: 'Address is required' })}
                    onChange={handleAddressChange}
                    placeholder="Enter address"
                    className='add-employee-input'
                />
                {errors.address && <p>{errors.address.message}</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
            <div className="add-employee-input full-width">
                <input
                    id="latitude" 
                    {...register('latitude')}
                    value={location.lat}
                    // value={lat}
                    readOnly
                    className='add-employee-input'
                />
                <input
                    id="longitude"
                    {...register('longitude')}
                    value={location.lng}
                    readOnly
                    className='add-employee-input'
                />
            </div>
            <div ref={mapElement} style={{ height: '200px', width: '100%' }} />
            <label>Upload Image</label>
            <input type='file' accept='.jpg, .jpeg, .png' onChange={(e) => handleProfileImageChange(e, data.length)} />
            <div className="add-employee-buttons">
                <button onClick={handleAddEmployee} className="add-employee-save-btn">Save</button>
                <button onClick={() => setIsAddingEmployee(false)} className="add-employee-cancel-btn">Cancel</button>
            </div>
        </div>
    </div>
)}

            <div className="data-preview">
                {filteredData.length > 0 && (
                    <table>
                        <thead>
                            <tr>
                                <th>Employee ID</th>
                                <th>Name</th>
                                <th>Gender</th>
                                <th>Address</th>
                                <th>Latitude</th>
                                <th>Longitude</th>
                                <th>Mobile Number</th>
                                <th>E number</th>
                                <th>State</th>
                                <th>City</th>
                                <th>Department</th>
                                <th>Role</th>
                                <th>shift</th>
                                <th>Shift ID</th>
                                <th>Date of Hire</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {/* Ensure every <td> is always rendered, even if empty */}
                                    {Array.from({ length: 15 }).map((_, cellIndex) => (
                                        <td key={cellIndex}>
                                            {cellIndex === 12 ? (
                                                <select
                                                    value={row[cellIndex] || ''}
                                                    onChange={(e) => handleShiftChange(e, rowIndex)}
                                                    disabled={editingRow === null}
                                                >
                                                    <option value="">Select Shift</option>
                                                    <option value="Shift1">Shift1</option>
                                                    <option value="Shift2">Shift2</option>
                                                    <option value="Shift3">Shift3</option>
                                                </select>
                                            ) : cellIndex === 14 ? (
                                                <input
                                                    type="date"
                                                    value={row[cellIndex] || ''}
                                                    onChange={(e) => handleDateChange(e, rowIndex)}
                                                    disabled={editingRow === null}
                                                />
                                            ) : (
                                                editingRow === rowIndex ? (
                                                    <input
                                                        className='edit-input-field'
                                                        type="text"
                                                        value={row[cellIndex] || ''}
                                                        onChange={(e) => handleInputChange(e, rowIndex, cellIndex)}
                                                    />
                                                ) : (
                                                    row[cellIndex] || ''
                                                )
                                            )}
                                        </td>
                                    ))}
                                    
                                    {/* Action buttons - Always render action buttons in the last column */}
                                    <td>
                                        {editingRow === rowIndex ? (
                                            <button onClick={() => handleSaveEdit(rowIndex)} className="td-save-btn">Save</button>
                                        ) : (
                                            <div className='edit-del-btns'>
                                                <button onClick={() => handleEditRow(rowIndex)} className="td-edit-btn">Edit</button>
                                                <button onClick={() => handleDeleteRow(rowIndex)} className='td-delete-btn'>Delete</button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default ExcelUpload;
