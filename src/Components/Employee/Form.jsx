
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import tt from '@tomtom-international/web-sdk-maps'; // Import TomTom SDK

const Form = () => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [location, setLocation] = useState({ lat: 51.5074, lng: -0.1278 }); // Default to London coordinates
  const [error, setError] = useState('');
  const mapElement = useRef(null);
  const mapInstance = useRef(null);
  const markerInstance = useRef(null);

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
            params: { key: apiKey },
          }
        );

        const results = geocodeResponse.data.results;

        if (results.length > 0) {
          const { lat, lon } = results[0].position;
          const newLocation = { lat, lng: lon };
          setLocation(newLocation);
          setValue('latitude', newLocation.lat);
          setValue('longitude', newLocation.lng);
        } else {
          setError('No results found for the given address.');
        }
      } catch (error) {
        console.error('Error fetching coordinates:', error);
        setError('Error fetching coordinates. Please try again.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="employeeId">Employee ID</label>
        <input
          id="employeeId"
          {...register('employeeId', { required: 'Employee ID is required' })}
        />
        {errors.employeeId && <p>{errors.employeeId.message}</p>}
      </div>

      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          {...register('name', { required: 'Name is required' })}
        />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <div>
        <label htmlFor="gender">Gender</label>
        <select
          id="gender"
          {...register('gender', { required: 'Gender is required' })}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {errors.gender && <p>{errors.gender.message}</p>}
      </div>

      <div>
        <label htmlFor="address">Address</label>
        <input
          id="address"
          {...register('address', { required: 'Address is required' })}
          onChange={handleAddressChange} // Fetch coordinates when address changes
          placeholder="Enter address"
        />
        {errors.address && <p>{errors.address.message}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>

      <div>
        <label htmlFor="latitude">Latitude</label>
        <input
          id="latitude"
          {...register('latitude')}
          value={location.lat} // Display latitude
          readOnly // Prevent manual input
        />
      </div>

      <div>
        <label htmlFor="longitude">Longitude</label>
        <input
          id="longitude"
          {...register('longitude')}
          value={location.lng} // Display longitude
          readOnly // Prevent manual input
        />
      </div>

      <div ref={mapElement} style={{ height: '400px', width: '100%' }} />

      <div>
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          id="phoneNumber"
          {...register('phoneNumber', {
            required: 'Phone number is required',
            validate: validatePhoneNumber,
          })}
        />
        {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
      </div>

      <div>
        <label htmlFor="emergencyNumber">Emergency Number</label>
        <input
          id="emergencyNumber"
          {...register('emergencyNumber', {
            required: 'Emergency number is required',
            validate: validateEmergencyNumber,
          })}
        />
        {errors.emergencyNumber && <p>{errors.emergencyNumber.message}</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

// Validation functions for phone numbers
const validatePhoneNumber = (value) => {
  if (!/^[0-9]{10}$/.test(value)) {
    return 'Phone number must be 10 digits';
  }
  return true;
};

const validateEmergencyNumber = (value) => {
  if (!/^[0-9]{10}$/.test(value)) {
    return 'Emergency number must be 10 digits';
  }
  return true;
};

export default Form;