import React from 'react';
import './invoice.css';

const DriverInvoiceStatic = () => {
  // Example static invoice data
  const invoiceData = {
    driverName: 'Sanjay',
    vehicleNumber: 'AP01CS3241',
    date: '2024-08-27',
    trips: [
      { description: 'Drop', hours: 3, rate: 350 },
      { description: 'Drop', hours: 1, rate: 100 },
      { description: 'Drop', hours: 1.5, rate: 200 },
    ],
    total: 3 * 50 + 2 * 40 + 1.5 * 55, // Calculated total
  };
  const handleprintinvoice=()=>{

  }

  return (
    <div className="invoice-container">
      <h1>Driver Payment Invoice</h1>
      <div className="invoice-header">
        <h2>Invoice</h2>
        <p><strong>Date:</strong> {invoiceData.date}</p>
        <p><strong>Driver Name:</strong> {invoiceData.driverName}</p>
        <p><strong>Vehicle Number:</strong> {invoiceData.vehicleNumber}</p>
      </div>
      <div className="invoice-trips">
        <h3>Trips</h3>
        {invoiceData.trips.map((trip, index) => (
          <div key={index} className="invoice-trip">
            <p><strong>Description:</strong> {trip.description}</p>
            <p><strong>Hours Worked:</strong> {trip.hours}</p>
            <p><strong>Rate per Hour:</strong> Rs.{trip.rate.toFixed(2)}</p>
            <p><strong>Total for Trip:</strong> Rs.{(trip.hours * trip.rate).toFixed(2)}</p>
          </div>
        ))}
      </div>
      <div className="invoice-footer">
        <h3>Total Amount Paid: Rs.{invoiceData.total.toFixed(2)}</h3>
        <button onClick={handleprintinvoice} className="print-btn"><b>Print</b></button>
      </div>
    </div>
  );
};

export default DriverInvoiceStatic;
