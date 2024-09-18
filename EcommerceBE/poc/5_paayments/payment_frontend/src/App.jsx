import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = src
    script.onload = () => {
      resolve(true)
    }
    script.onerror = () => {
      resolve(false)
    }
    document.body.appendChild(script)
  })
}

async function openRazorpayCheckout(){
  await loadScript('https://checkout.razorpay.com/v1/checkout.js')
  //1. Get the order from backend
  const resp = await fetch("http://localhost:3000/checkout",{method:"POST"});
  const data = await resp.json();
  console.log("data",data);
  //2. Create new order object that will be sent to payment gateway 
  const {order:{amount,currency,id}} = data;
  const finalOrderObject = {
    "key": "rzp_test_gjelo5BJsZdnH4", // Enter the Key ID generated from the Dashboard(Public key)
    "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": currency,
    "name": "Acme Corp",
    "description": "Test Transaction",
    "image": "https://example.com/your_logo",
    "order_id": id, // Pass the `id` obtained in the response of Step 1
    "handler": function (response){
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature)
    },
    "prefill": {
        "name": "Ashok Krishna",
        "email": "ashok.sai7@gmail.com",
        "contact": "8977443343"
    },
    "notes": {
        "address": "Razorpay Corporate Office"
    },
    "theme": {
        "color": "#3399cc"
    }
  }
  const rzp1 = new Razorpay(finalOrderObject);
  rzp1.open();
}

function App() {

  return (
    <>
      <h1>Payment sample</h1>
      <a onClick={openRazorpayCheckout}>Buy now</a>
    </>
  )
}

export default App
