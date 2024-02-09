import { useState, useEffect, useCallback } from "react";

const usePostSignOut = () => {
  const [signOut, setSignOut] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const attemptLogout = useCallback(() => {
    fetch(`https://luxsever-production.up.railway.app/lux/user/sign-out`, {
      method: "POST",
    })
      .then(async (response) => {
        try {
          let data = await response.json();
          setSignOut(data);
        } catch (error) {
          setError(error);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return { signOut, error, loading, attemptLogout };
};

export default usePostSignOut;
