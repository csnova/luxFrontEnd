import { useState, useEffect, useCallback } from "react";

const useNewComment = () => {
  const [newComment, setNewComment] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const attemptNewComment = useCallback((userID, token, postID, text) => {
    fetch(`https://luxsever-production.up.railway.app/lux/comment/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userID,
        token,
        postID,
        text,
      }),
    })
      .then(async (response) => {
        try {
          let data = await response.json();
          setNewComment(data);
        } catch (error) {
          setError(error);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return { newComment, error, loading, attemptNewComment };
};

export default useNewComment;
