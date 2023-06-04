import React, { useState } from 'react';

export default function EditContact({ contact, onSaveContact, onCancel }) {
  const [updatedContact, setUpdatedContact] = useState(contact);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSaveContact(updatedContact);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-gray-900 bg-opacity-50 text-black">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Edit Contact</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={updatedContact.name}
              onChange={handleInputChange}
              className="border border-gray-400 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={updatedContact.email}
              onChange={handleInputChange}
              className="border border-gray-400 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="phoneNumber"
              className="block text-gray-700 font-bold"
            >
              Phone Number:
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={updatedContact.phoneNumber}
              onChange={handleInputChange}
              className="border border-gray-400 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-700 font-bold">
              Address:
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={updatedContact.address}
              onChange={handleInputChange}
              className="border border-gray-400 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleCancel}
              className="mr-2 px-4 py-2 bg-gray-500 text-white font-bold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
