"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { UserType } from "@/types";
import GirlAvatar from "../../../public/girl-avatar.png"
import BoyAvatar from "../../../public/boy-avatar.png"

const Home = () => {
  const [userData, setUserData] = useState<UserType | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-8">
      <div className="font-bold">{userData?.full_name}</div>
      <div className="animate-bounce">{userData?.email}</div>
      {userData?.gender == "Female" && (<Image src={GirlAvatar} alt="" height={200} width={200} />)}
      {userData?.gender == "Male" && (<Image src={BoyAvatar} alt="" height={200} width={200} />)}
      {userData?.nic && (<div>{2025 - parseInt(userData.nic.slice(0, 4))}</div>)}
      <div>{userData?.phone_number}</div>
      <div>{userData?.preferred_track_session_1}</div>
      <div>{userData?.university_name}</div>
    </div>
  );
};

export default Home;
