import { useState, useEffect, useCallback } from "react";

const useUpdateProfile = () => {
  const [updateProfile, setUpdateProfile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const attemptUpdateProfile = useCallback(
    (first_name, last_name, bio, token, userID) => {
      fetch(`https://luxsever-production.up.railway.app/lux/profile/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name,
          last_name,
          bio,
          token,
          userID,
        }),
      })
        .then(async (response) => {
          try {
            let data = await response.json();
            setSignUp(data);
          } catch (error) {
            setError(error);
          }
        })
        .finally(() => setLoading(false));
    },
    []
  );

  return { updateProfile, error, loading, attemptUpdateProfile };
};

export default useUpdateProfile;
