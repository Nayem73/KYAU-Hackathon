import React, { useState } from 'react';

const DonationPage = () => {
  // State for form input fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    donationAmount: '',
    paymentMethod: 'creditCard',
  });

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can process the donation data here
    console.log(formData);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">Make a Donation</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        {/* Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="John Doe"
            className="border rounded p-2 w-full"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="johndoe@example.com"
            className="border rounded p-2 w-full"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
        </div>

        {/* Donation Amount */}
        <div className="mb-4">
          <label
            htmlFor="donationAmount"
            className="block text-gray-700 font-bold mb-2"
          >
            Donation Amount (USD)
          </label>
          <input
            type="number"
            id="donationAmount"
            name="donationAmount"
            placeholder="Enter amount"
            className="border rounded p-2 w-full"
            value={formData.donationAmount}
            onChange={(e) =>
              setFormData({
                ...formData,
                donationAmount: e.target.value,
              })
            }
            required
          />
        </div>

        {/* Payment Method */}
        <div className="mb-4">
          <label
            htmlFor="paymentMethod"
            className="block text-gray-700 font-bold mb-2"
          >
            Payment Method
          </label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            className="border rounded p-2 w-full"
            value={formData.paymentMethod}
            onChange={(e) =>
              setFormData({ ...formData, paymentMethod: e.target.value })
            }
            required
          >
            <option value="creditCard">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="bankTransfer">Bank Transfer</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          Donate Now
        </button>
      </form>
    </div>
  );
};

export default DonationPage;
