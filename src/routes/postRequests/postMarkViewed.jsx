import { useState, useEffect, useCallback } from "react";

const useMarkAsViewed = () => {
  const [markedViewed, setMarkedViewed] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const attemptMarkAsViewed = useCallback((threadID, currentUser) => {
    fetch(`https://luxsever-production.up.railway.app/lux/message/viewed/all`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        threadID,
        currentUser,
      }),
    })
      .then(async (response) => {
        try {
          let data = await response.json();
          setMarkedViewed(data);
        } catch (error) {
          setError(error);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return { markedViewed, error, loading, attemptMarkAsViewed };
};

export default useMarkAsViewed;
