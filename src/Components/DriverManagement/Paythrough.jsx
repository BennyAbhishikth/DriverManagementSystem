// import "./paythrough.css"
// import { CiCreditCard1 } from "react-icons/ci";
// function Paythrough(){
//     return(
//      <div className="main-conatainer-pt">
//         <h3>Cards,UPI & More</h3>
//         <div className="pay-through">
            
//         </div>
//      </div>
//     )
// }
// export default Paythrough;
import React, { useState } from 'react';
import './paythrough.css';

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
    alert('Payment method selected: ' + paymentMethod);
  };
  const handlePay=()=>{

  }
  return (
    <div className="payment-container">
      <h1>Payment Page</h1>
      <form onSubmit={handleSubmit}>
        <div className="payment-methods">
          <label>
            <input
              type="radio"
              value="card"
              checked={paymentMethod === 'card'}
              onChange={handlePaymentMethodChange}
            />
            Credit/Debit Card
          </label>
          <label>
            <input
              type="radio"
              value="upi"
              checked={paymentMethod === 'upi'}
              onChange={handlePaymentMethodChange}
            />
            UPI
          </label>
          <label>
            <input
              type="radio"
              value="netbanking"
              checked={paymentMethod === 'netbanking'}
              onChange={handlePaymentMethodChange}
            />
            Net Banking
          </label>
        </div>
        {paymentMethod === 'card' && (
          <div className="payment-details card-details">
            <label>
              Card Number:
              <input type="text" placeholder="Card Number" required />
            </label>
            <label>
              Expiry Date:
              <input type="text" placeholder="MM/YY" required />
            </label>
            <label>
              CVV:
              <input type="password" placeholder="CVV" required />
            </label>
          </div>
        )}
        {paymentMethod === 'upi' && (
          <div className="payment-details upi-details">
            <label>
              UPI ID:
              <input type="text" placeholder="UPI ID" required />
            </label>
          </div>
        )}
        {paymentMethod === 'netbanking' && (
          <div className="payment-details netbanking-details">
            <label>
              Bank Name:
              <input type="text" placeholder="Bank Name" required />
            </label>
            <label>
              Account Number:
              <input type="text" placeholder="Account Number" required />
            </label>
          </div>
        )}
        <button className='pay-through-submit-btn' type="submit" onClick={handlePay}>Pay Now</button>
      </form>
    </div>
  );
};

export default PaymentPage;
