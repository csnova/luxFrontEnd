import { useState, useEffect } from "react";

const getPostDetails = (postID, postLiked) => {
  const [postDetails, setPostDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://luxsever-production.up.railway.app/lux/post/${postID}`, {
      method: "GET",
    })
      .then(async (response) => {
        if (response.status >= 400) {
          throw new Error("server error");
        }
        try {
          const data = await response.json();
          setPostDetails(data);
        } catch (error) {
          setError(error);
        }
      })
      .finally(() => setLoading(false));
  }, [postLiked]);
  return { postDetails, error, loading };
};

export default getPostDetails;
