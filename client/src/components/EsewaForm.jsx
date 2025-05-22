
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto-js";

const EsewaForm = ({ amount, bookingId }) => {
  const [txUUID] = useState(uuidv4());
  const taxAmount = 0; // or compute if needed
  const totalAmount = amount + taxAmount;


  const generateSignature = (() => {
    const secretKey = process.env.REACT_APP_ESEWA_SECRET_KEY; // Ensure this is loaded correctly
    const stringToSign = `total_amount=${totalAmount},transaction_uuid=${txUUID},product_code=${process.env.REACT_APP_ESEWA_PRODUCT_CODE}`;
    const signature = crypto.HmacSHA256(stringToSign, secretKey);
    
  const a = crypto.enc.Base64.stringify(signature)
    return a;
    
    
  })(); 

  const BACKEND = process.env.REACT_APP_BACKEND_URL;
  // eSewa will append `?data=<Base64>` to these URLs
  const successUrl = `${BACKEND}/payments/esewa/success`;
  const failureUrl = `${BACKEND}/payments/esewa/failure`;

  return (
    <>
    <p>Pay with: <img src="/assets/payment.png" alt="" /></p>
    <form action={process.env.REACT_APP_ESEWA_GATEWAY_URL} method="POST">
      <input type="hidden" name="amount" value={amount} />
      <input type="hidden" name="tax_amount" value={taxAmount} />
      <input type="hidden" name="total_amount" value={totalAmount} />
      <input type="hidden" name="booking_id" value={bookingId} />
      <input type="hidden" name="transaction_uuid" value={txUUID} />
      <input type="hidden" name="product_code" value={process.env.REACT_APP_ESEWA_PRODUCT_CODE}/>
      <input type="hidden" name="product_service_charge" value="0" />
      <input type="hidden" name="product_delivery_charge" value="0" />
      <input type="hidden" name="success_url" value={successUrl} />
      <input type="hidden" name="failure_url" value='http://localhost:3000/' />
      <input type="hidden" name="signed_field_names" value="total_amount,transaction_uuid,product_code"/>
      <input type="hidden" name="signature" value={generateSignature} />
      <button type="submit" className="esewa-button">PAY VIA ESEWA</button>
    </form>
    </>
  );
};

export default EsewaForm;

