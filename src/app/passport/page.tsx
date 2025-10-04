"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { UserType } from "@/types";
import GirlAvatar from "../../../public/girl-avatar.png"
import BoyAvatar from "../../../public/boy-avatar.png"
import IeeeDayLogoInner from "../../../public/logos/ieee-day-logo-inner.svg"
import IeeeDayLogoOuter from "../../../public/logos/ieee-day-logo-outer.svg"
import IeeeSbLogo from "../../../public/logos/ieee-nsbm-sb-logo.png"
import IeeeCsLogo from "../../../public/logos/ieee-nsbm-cs-logo.png"
import IeeeWieLogo from "../../../public/logos/ieee-nsbm-wie-logo.png"
import PastBadge from "../../../public/badges/past.png"
import PresendBadge from "../../../public/badges/present.png"
import Futurebadge from "../../../public/badges/future.png"

const chapterLogos = [IeeeSbLogo, IeeeCsLogo, IeeeWieLogo];
const badges = [PastBadge, PresendBadge, Futurebadge]

const Home = () => {
  const [userData, setUserData] = useState<UserType | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="relative flex flex-col items-center w-full m-10">
        <div className="absolute text-center inset-x-0 top-10">
          <div className="text-4xl">Time Traveler&apos;s</div>
          <div className="text-8xl font-bold">Passport</div>
        </div>
        <Image src={IeeeDayLogoOuter} alt="" width={400} height={400} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <Image src={IeeeDayLogoInner} alt="" width={200} height={200} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute grid grid-cols-1 md:grid-cols-3 items-center inset-x-0 bottom-4">
          {chapterLogos.map((logo, index) => (<Image key={index} src={logo.src} alt="" height={300} width={300} className={`${logo == IeeeCsLogo && 'scale-75'}`} />))}
        </div>
      </div>


      <div className="relative flex flex-col items-center justify-center w-full bg-black">
        <div className="absolute inset-x-0 top-4">
          <div className="text-center mb-8">
            <div className="text-4xl font-semibold">IEEE Day 2025</div>
            <div className=" px-20 mt-4">A global celebration of technology and innovation, connecting minds, sharing ideas, and shaping the future.</div>
          </div>
          <div className="grid grid-cols-3 items-center justify-center w-full gap-8">
            <div className="border-2 border-white/15 text-center h-24 flex flex-col items-center justify-center">
              <div className="bg-white text-black px-2 py-1">Venue</div>
              <div className="mt-1">NSBM Green University</div>
            </div>
            <div className="border-2 border-white/15 text-center h-24 flex flex-col items-center justify-center">
              <div className="bg-white text-black px-2 py-1">Date</div>
              <div className="mt-1">7th October</div>
            </div>
            <div className="border-2 border-white/15 text-center h-24 flex flex-col items-center justify-center">
              <div className="bg-white text-black px-2 py-1">Time</div>
              <div className="mt-1">9:30 AM</div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-10">
          <div>
            {userData?.gender == "Female" && (<Image src={GirlAvatar} alt="" height={200} width={200} />)}
            {userData?.gender == "Male" && (<Image src={BoyAvatar} alt="" height={200} width={200} />)}
          </div>
          <div>
            <div className="font-bold text-center mb-4">Hi, I am {userData?.full_name}</div>
            <div className="flex gap-2">
              <div className="font-semibold">Email: </div><div>{userData?.email}</div>
            </div>
            <div className="flex gap-2">
              <div className="font-semibold">Phone: </div><div>{userData?.phone_number}</div>
            </div>
            <div className="flex gap-2">
              <div className="font-semibold">University: </div><div>{userData?.university_name}</div>
            </div>
            <div className="flex gap-2">
              <div className="font-semibold">Track Session: </div><div>{userData?.preferred_track_session_1}</div>
            </div>
          </div>
        </div>
        {/* <div className="absolute grid grid-cols-1 md:grid-cols-3 items-center inset-x-0 bottom-4">
          {badges.map((logo, index) => (<Image key={index} src={logo.src} alt="" height={100} width={100} className={`${logo == IeeeCsLogo && 'scale-75'}`} />))}
        </div> */}
      </div>
    </div>
  );
};

export default Home;
