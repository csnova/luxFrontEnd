import { useState, useEffect } from "react";

const getNewsFeed = (userID) => {
  const [postList, setPostList] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://luxsever-production.up.railway.app/lux/following/posts/${userID}`, {
      method: "GET",
    })
      .then(async (response) => {
        if (response.status >= 400) {
          throw new Error("server error");
        }
        try {
          const data = await response.json();
          setPostList(data);
        } catch (error) {
          setError(error);
        }
      })
      .finally(() => setLoading(false));
  }, []);
  return { postList, error, loading };
};

export default getNewsFeed;
