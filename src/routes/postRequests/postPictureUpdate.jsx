import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const useUpdatePicture = () => {
  const [pictureData, setPictureData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const attemptUpdatePicture = useCallback((photo, userID) => {
    console.log("Photo: ", photo);
    const formData = new FormData();
    formData.append("photo", photo);
    fetch(`https://luxsever-production.up.railway.app/lux/profile/picture/${userID}`, {
      method: "POST",
      body: formData,
    })
      .then(async (response) => {
        try {
          let data = await response.json();
          setPictureData(data);
          navigate("/profile");
        } catch (error) {
          setError(error);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return { pictureData, error, loading, attemptUpdatePicture };
};

export default useUpdatePicture;
