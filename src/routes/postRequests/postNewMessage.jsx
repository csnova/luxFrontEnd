import { useState, useEffect, useCallback } from "react";

const usePostNewMessage = () => {
  const [newMessage, setNewMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const attemptNewMessage = useCallback((from, to, text) => {
    fetch(`https://luxsever-production.up.railway.app/lux/message/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        text,
      }),
    })
      .then(async (response) => {
        try {
          let data = await response.json();
          setNewMessage(data);
        } catch (error) {
          setError(error);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return { newMessage, error, loading, attemptNewMessage };
};

export default usePostNewMessage;
