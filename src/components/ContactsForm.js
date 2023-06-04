import React, { useState } from 'react';
import axios from 'axios';

const ContactForm = ({ onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newContact = {
      name,
      phone,
      email,
      address,
    };

    try {
      const response = await axios.post(
        'https://busy-pink-gecko-cape.cyclic.app/contacts',
        newContact
      );
      console.log(response.data);

      window.alert('Contact added successfully!');
      setName('');
      setPhone('');
      setEmail('');
      setAddress('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-3">
      <div className="flex items-center mb-3">
        <button onClick={onClose} className="p-1 mr-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            className="bi bi-arrow-left-circle-fill"
            viewBox="0 0 16 16"
          >
            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
          </svg>
        </button>
        <h2 className="text-xl font-bold">Contact Form</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="block font-semibold">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 border text-black border-gray-300 rounded"
          />
        </div>
        <div className="mb-3">
          <label className="block font-semibold">Phone:</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full p-2 border text-black border-gray-300 rounded"
          />
        </div>
        <div className="mb-3">
          <label className="block font-semibold">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border text-black border-gray-300 rounded"
          />
        </div>
        <div className="mb-3">
          <label className="block font-semibold">Address:</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="w-full p-2 border text-black border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
