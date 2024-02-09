import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const useNewPost = () => {
  const [newPost, setNewPost] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const attemptNewPost = useCallback(
    (userID, token, title, text, setPostViewed) => {
      return fetch(`https://luxsever-production.up.railway.app/lux/post/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userID, token, title, text }),
      })
        .then(async (response) => {
          try {
            let data = await response.json();
            setNewPost(data);
            setPostViewed(data.post._id);
            navigate("/post");
          } catch (error) {
            setError(error);
          }
        })
        .finally(() => setLoading(false));
    },
    []
  );

  return { newPost, error, loading, attemptNewPost };
};

export default useNewPost;
