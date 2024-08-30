
import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';
import { IoCloseSharp } from "react-icons/io5";
import './employee.css';

const ExcelUpload = () => {
    const [data, setData] = useState([]); 
    const [filteredData, setFilteredData] = useState([]); 
    const [searchTerm, setSearchTerm] = useState(''); 
    const [fileName, setFileName] = useState("");
    const [editingRow, setEditingRow] = useState(null);
    const [profileImages, setProfileImages] = useState({});
    const [newEmployee, setNewEmployee] = useState([]); 
    const [isAddingEmployee, setIsAddingEmployee] = useState(false); 
    const [newImageUrl, setNewImageUrl] = useState(""); // Add this line
    
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
            setData(sheetData);
            setFilteredData(sheetData);
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
        const updatedData = [...filteredData];
        updatedData.splice(rowIndex + 1, 1);
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
        const updatedData = [...filteredData];
        updatedData[rowIndex + 1][cellIndex] = event.target.value;
        setData(updatedData);
        setFilteredData(updatedData);
    };
    // const [name,setName] = useState();
    // const [empid,setEmpid] = useState();
    // const [mobile,setMobile] = useState();
    // const [email,setEmail] = useState();
    // const [gender,setGender] = useState();
    // const [address,setAddress] = useState();
    // const [Latitude,setLattitude] = useState();
    // const [Longitude,setLongitude] = useState();
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

                // Update the profile image state with the Cloudinary URL
                setProfileImages(prevImages => ({ ...prevImages, [rowIndex]: imageUrl }));
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        } else {
            alert('Please upload a valid image file (JPG or PNG).');
        }
    };

    const handleNewEmployeeChange = (event, index) => {
        const updatedEmployee = [...newEmployee];
        updatedEmployee[index] = event.target.value;
        setNewEmployee(updatedEmployee);
    };

    const handleAddEmployee = () => {
        const updatedData = [...data, [...newEmployee, newImageUrl]]; // Include image URL in the new employee data
        setData(updatedData);
        setFilteredData(updatedData);
        setNewEmployee([]);
        setNewImageUrl(""); // Clear the image URL
        setIsAddingEmployee(false);
    };

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
                {fileName && <p className="file-name">{fileName}</p>}
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
                            placeholder="Name"
                            onChange={(e) => handleNewEmployeeChange(e, 0)}
                            className="add-employee-input"
                        />
                        <input
                            type="number"
                            placeholder="Employee Id"
                            onChange={(e) => handleNewEmployeeChange(e, 1)}
                            className="add-employee-input"
                        />
                        <input
                            type="number"
                            placeholder="Mobile Number"
                            onChange={(e) => handleNewEmployeeChange(e, 2)}
                            className="add-employee-input"
                        />
                        <input
                            type="text"
                            placeholder="Email"
                            onChange={(e) => handleNewEmployeeChange(e, 3)}
                            className="add-employee-input"
                        />
                        <select name='Gender' onChange={(e) => handleNewEmployeeChange(e, 4)}
                            className="add-employee-input">
                                <option>Gender</option>
                            <option>Male</option>
                            <option>Female</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Address"
                            onChange={(e) => handleNewEmployeeChange(e, 5)}
                            className="add-employee-input"
                        />
                        <input
                            type="number"
                            placeholder="Latitude"
                            onChange={(e) => handleNewEmployeeChange(e, 6)}
                            className="add-employee-input"
                        />
                        <input
                            type="number"
                            placeholder="Longitude"
                            onChange={(e) => handleNewEmployeeChange(e, 7)}
                            className="add-employee-input"
                        />
                        <label>Upload Image</label>
                        <input type='file' accept='.jpg, .jpeg, .png' onChange={(e) => {handleProfileImageChange (e, data.length); // Use a new index for the new employee
                        }} />
                        <br/>
                        <button onClick={handleAddEmployee} className="add-employee-save-btn">Save</button>
                        <button onClick={() => setIsAddingEmployee(false)} className="add-employee-cancel-btn">Cancel</button>
                    </div>
                </div>
            )}
<div className="data-preview">
    {filteredData.length > 0 && (
        <table>
            <thead>
                <tr>
                    <th>Profile Image</th>
                    <th>Name</th>
                    <th>Employee Id</th>
                    <th>Mobile Number</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>Address</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {filteredData.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {/* Profile Image */}
                        <td>
                            {profileImages[rowIndex] && (
                                <img 
                                    src={profileImages[rowIndex]} 
                                    alt="Profile"
                                    className="profile-preview" 
                                />
                            )}
                        </td>
                        
                        {/* Data cells */}
                        {row.map((cell, cellIndex) => (
                            <td key={cellIndex}>
                                {editingRow === rowIndex ? (
                                    <input
                                        className='edit-input-field'
                                        type="text"
                                        value={cell}
                                        onChange={(e) => handleInputChange(e, rowIndex, cellIndex)}
                                    />
                                ) : (
                                    cell
                                )}
                            </td>
                        ))}
                        
                        {/* Action buttons */}
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
