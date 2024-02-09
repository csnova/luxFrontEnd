import { useState, useEffect } from "react";

const getUserThreads = (userID) => {
  const [userThreads, setUserThreads] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://luxsever-production.up.railway.app/lux/thread/${userID} `, {
      method: "GET",
    })
      .then(async (response) => {
        if (response.status >= 400) {
          throw new Error("server error");
        }
        try {
          const data = await response.json();
          setUserThreads(data);
        } catch (error) {
          setError(error);
        }
      })
      .finally(() => setLoading(false));
  }, []);
  return { userThreads, error, loading };
};

export default getUserThreads;
