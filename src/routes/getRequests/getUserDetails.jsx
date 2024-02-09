import { useState, useEffect } from "react";

const getUserDetails = (userID) => {
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://luxsever-production.up.railway.app/lux/profile/${userID}`, {
      method: "GET",
    })
      .then(async (response) => {
        if (response.status >= 400) {
          throw new Error("server error");
        }
        try {
          const data = await response.json();
          setUserDetails(data);
        } catch (error) {
          setError(error);
        }
      })
      .finally(() => setLoading(false));
  }, [userID]);

  return { userDetails, error, loading };
};

export default getUserDetails;
