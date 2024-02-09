import { useState, useEffect, useCallback } from "react";

const useLikePost = () => {
  const [likedPost, setLikedPost] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const attemptLikePost = useCallback((userID, postID) => {
    fetch(`https://luxsever-production.up.railway.app/lux/post/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userID,
        postID,
      }),
    })
      .then(async (response) => {
        try {
          let data = await response.json();
          setLikedPost(data);
        } catch (error) {
          setError(error);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return { likedPost, error, loading, attemptLikePost };
};

export default useLikePost;
