import { useState, useEffect } from "react";

const getUserPicture = (userID) => {
  const [userPicture, setUserPicture] = useState(null);
  const [error1, setError] = useState(null);
  const [loading1, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://luxsever-production.up.railway.app/lux/profile/${userID}/image`, {
      method: "GET",
    })
      .then(async (response) => {
        if (response.status >= 400) {
          throw new Error("server error");
        }
        try {
          const blob = await response.blob();
          setUserPicture(URL.createObjectURL(blob));
        } catch (error) {
          setError(error);
        }
      })
      .finally(() => setLoading(false));
  }, []);
  return { userPicture, error1, loading1 };
};

export default getUserPicture;
