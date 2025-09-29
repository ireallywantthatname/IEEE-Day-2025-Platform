"use client";

import { useRouter } from "next/navigation";

const Engine = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div
        className="bg-white text-black px-2 py-1 hover:scale-95 transition-transform duration-300"
        onClick={() => router.push("/signin")}
      >
        Sign-In
      </div>
    </div>
  );
};

export default Engine;
