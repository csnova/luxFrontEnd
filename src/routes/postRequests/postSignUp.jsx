import { useState, useEffect, useCallback } from "react";

const usePostSignUp = () => {
  const [signUp, setSignUp] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const attemptSignUp = useCallback(
    (first_name, last_name, email, username, password, confirm_password) => {
      fetch(`https://luxsever-production.up.railway.app/lux/user/sign-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name,
          last_name,
          email,
          username,
          password,
          confirm_password,
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

  return { signUp, error, loading, attemptSignUp };
};

export default usePostSignUp;
