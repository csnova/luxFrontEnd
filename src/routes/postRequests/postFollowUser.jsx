import { useState, useEffect, useCallback } from "react";

const useFollowUser = () => {
  const [followUser, setFollowUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const attemptFollowUser = useCallback((currentUser, userFollowed) => {
    fetch(`https://luxsever-production.up.railway.app/lux/follow/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentUser,
        userFollowed,
      }),
    })
      .then(async (response) => {
        try {
          let data = await response.json();
          setFollowUser(data);
        } catch (error) {
          setError(error);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return { followUser, error, loading, attemptFollowUser };
};

export default useFollowUser;
