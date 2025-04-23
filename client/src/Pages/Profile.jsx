import React from "react";
import { useAppStore } from "@/store/store.js";

const Profile = () => {
  const { userInfo } = useAppStore();


  return (
    <div>
      <h1>Welcome, {userInfo.firstName || "User"}!</h1>
      <p>Email: {userInfo.email}</p>
      <img src={userInfo.image} alt="Profile" />
    </div>
  );
};

export default Profile;
