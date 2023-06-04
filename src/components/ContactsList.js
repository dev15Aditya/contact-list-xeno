import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import EditContact from './EditContact';

export default function ContactsList() {
  const [selectProfile, setSelectProfile] = useState(null);
  const [data, setData] = useState([]);
  const [editContact, setEditContact] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  const fetchProfiles = async () => {
    try {
      const response = await axios.get(
        'https://busy-pink-gecko-cape.cyclic.app/contacts'
      );
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const handleClick = (data) => {
    setSelectProfile(data);
  };

  const handleClose = () => {
    setSelectProfile(null);
  };

  const handleDelete = async (id) => {
    if (isAuthenticated) {
      // Find the index of the contact to be deleted
      const indexToDelete = data.findIndex((contact) => contact._id === id);

      // Create a new array without the deleted contact
      const newData = [
        ...data.slice(0, indexToDelete),
        ...data.slice(indexToDelete + 1),
      ];

      // Update the UI immediately
      setData(newData);

      try {
        await axios.delete(
          `https://busy-pink-gecko-cape.cyclic.app/contacts/${id}`
        );
      } catch (error) {
        console.log(error);
        // If the API call fails, revert the data state to its previous state
        setData(data);
      }
    } else {
      loginWithRedirect();
    }
  };

  const handleEditContact = (contactId) => {
    if (isAuthenticated) {
      const selectedContact = data.find((contact) => contact._id === contactId);
      setEditContact(selectedContact);
    } else {
      loginWithRedirect();
    }
  };

  const handleSaveContact = async (updatedContact) => {
    try {
      await axios.patch(
        `https://busy-pink-gecko-cape.cyclic.app/contacts/${updatedContact._id}`,
        updatedContact
      );
      setEditContact(null);
      setShowSuccessMessage(true);
      fetchProfiles();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelEdit = () => {
    setEditContact(null);
  };

  return (
    <div>
      {data.map((profile) => (
        <div className="flex justify-between items-center px-3 py-2 shadow-sm font-bold cursor-pointer my-1 bg-gradient-to-r from-gray-700 via-gray-900 to-black">
          <div
            key={profile.id}
            onClick={() => handleClick(profile)}
            className="flex items-center"
          >
            {profile.profilePicture ? (
              <img
                className="h-12 w-12 rounded-full mr-2"
                src={profile.profilePicture}
                alt={profile.name}
              />
            ) : (
              <img
                className="h-12 w-12 rounded-full mr-2"
                src="./pp.jpg"
                alt={profile.name}
              />
            )}
            <h2>{profile.name}</h2>
          </div>

          {/* Options  */}
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-pencil-square mr-3"
              viewBox="0 0 16 16"
              onClick={() => handleEditContact(profile._id)}
            >
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              <path
                fill-rule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-trash mr-2"
              viewBox="0 0 16 16"
              onClick={() => handleDelete(profile._id)}
            >
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
            </svg>
          </div>
        </div>
      ))}

      {selectProfile && (
        <div className="bg-gradient-to-r from-rose-100 to-teal-100 text-black font-serif w-[300px] p-3 rounded-md mx-auto fixed top-10 left-[50%] translate-x-[-50%]">
          <div>
            <button onClick={handleClose}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                fill="currentColor"
                class="bi bi-x-circle-fill"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
              </svg>
            </button>
            <div className="flex flex-col items-center">
              {selectProfile.profilePicture ? (
                <img
                  className="w-[100px] h-[100px] rounded-full"
                  src={selectProfile.profilePicture}
                  alt=""
                />
              ) : (
                <img
                  className="w-[100px] h-[100px] rounded-full"
                  src="./pp.jpg"
                  alt=""
                />
              )}
              <h2>Name: {selectProfile.name}</h2>
              <p>Phone: {selectProfile.phone}</p>
              <p>Email: {selectProfile.email}</p>
              <p>Add: {selectProfile.address}</p>
            </div>
          </div>
        </div>
      )}

      {/* Edit Contact */}
      {editContact && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-700 bg-opacity-50">
          <div className="bg-white p-4 rounded shadow">
            <EditContact
              contact={editContact}
              onSaveContact={handleSaveContact}
              onCancel={handleCancelEdit}
            />
          </div>
        </div>
      )}

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-700 bg-opacity-50">
          <div className="bg-white p-4 rounded shadow flex flex-col items-center">
            <h2 className="text-black">Contact saved successfully!</h2>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded mt-4"
              onClick={() => setShowSuccessMessage(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
