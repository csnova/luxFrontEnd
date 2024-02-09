import React, { useState } from "react";
import useUpdatePicture from "../postRequests/postPictureUpdate";

const ProfilePhotoUpdate = ({ currentUser }) => {
  const { attemptUpdatePicture } = useUpdatePicture();
  const [photo, setPhoto] = useState(null);

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    attemptUpdatePicture(photo, currentUser._id);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button type="submit">Upload Photo</button>
    </form>
  );
};

export default ProfilePhotoUpdate;
