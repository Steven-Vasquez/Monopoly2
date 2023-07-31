import { useEffect, useState } from 'react';

// Custom hook to check the user's authentication status
const useAuth = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Fetch the authentication status from the backend API
    fetch('http://localhost:3001/checkLogin', {
      method: 'GET',
      credentials: 'include', // Include cookies in the request
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.authenticated) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
        console.log("authenticated is: ")
        console.log(authenticated);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return { authenticated, setAuthenticated };
};

export default useAuth;
