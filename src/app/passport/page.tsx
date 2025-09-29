"use client";

import { UserType } from "@/types";

const Home = () => {
  const storedData = localStorage.getItem("userData");
  if (storedData) {
    const userData: UserType = JSON.parse(storedData);
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-8">
        <div className="font-bold">{userData.full_name}</div>
        <div className="bg-white size-40"></div>
        <div className="animate-bounce">{userData.email}</div>
      </div>
    );
  }
};

export default Home;
