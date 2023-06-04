import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import ContactsList from './components/ContactsList';
import ContactsForm from './components/ContactsForm';

function App() {
  const [showContactForm, setShowContactForm] = useState(false);
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  const handleAddContact = () => {
    // setShowContactForm(true);
    if (isAuthenticated) {
      setShowContactForm(true);
    } else {
      loginWithRedirect();
    }
  };

  const handleFormClose = () => {
    setShowContactForm(false);
  };

  const handleSignInOut = () => {
    if (isAuthenticated) {
      logout({ returnTo: window.location.origin });
    } else {
      loginWithRedirect();
    }
  };

  return (
    <div className="text-[#ffff] bg-gradient-to-r from-gray-400 via-gray-600 to-blue-800 h-[100vh]">
      {showContactForm ? (
        <ContactsForm onClose={handleFormClose} />
      ) : (
        <div>
          {isAuthenticated && (
            <h1 className="text-xl p-3 ml-1">
              Hey {user.name}! You are now logged in. You can add new contacts,
              edit or delete them.
            </h1>
          )}

          <div className="flex justify-between px-4 py-3 shadow-sm items-center">
            <h1 className="text-xl font-bold">Contact List</h1>
            <div className="flex items-center">
              <button onClick={handleAddContact} className="p-1 mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  class="bi bi-plus-circle-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                </svg>
              </button>
              <button
                className="p-1 bg-green-500 text-white font-bold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600 animate-pulse"
                onClick={handleSignInOut}
              >
                {isAuthenticated ? 'SignOut' : 'SignIn'}
              </button>
            </div>
          </div>

          <ContactsList />
        </div>
      )}
    </div>
  );
}

export default App;
