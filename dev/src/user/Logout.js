// Logout.js
import React, { useEffect } from 'react';

const Logout = (props) => {
  useEffect(() => {
    // Perform logout actions here (e.g., clear local storage, redirect to login page)
    localStorage.removeItem('token'); // Clear the token from local storage

    // Use the workaround to access the history object
    const history = props.history || props.route.history;
    if (history) {
      history.push('/user/signin'); // Redirect to the login page
    }
  }, [props.history, props.route.history]);

  return (
    <div>
      <p>Logging out...</p>
      {/* You can add a loader or additional content if needed */}
    </div>
  );
};

export default Logout;
