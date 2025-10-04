"use client";

import { useState, useEffect, useRef } from "react";
import Image, { StaticImageData } from "next/image";
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
import gsap from "gsap";
import { useGSAP } from "@gsap/react";


const chapterLogos = [IeeeSbLogo, IeeeCsLogo, IeeeWieLogo];
const badges = [PastBadge, PresendBadge, Futurebadge]

const Home = () => {
  const [userData, setUserData] = useState<UserType | null>(null);
  const [shownChapterLogo, setShownChapterLogo] = useState<StaticImageData>(chapterLogos[0]);
  const [logoIndex, setLogoIndex] = useState(0);

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setLogoIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % chapterLogos.length;
        setShownChapterLogo(chapterLogos[nextIndex]);
        return nextIndex;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const outerLogoRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    gsap.from(
      outerLogoRef.current,
      {
        rotate: 720,
        duration: 10,
        repeat: -1,
        ease: "power3.out",
      });
  }, []);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-[100%] md:w-[50%] h-screen flex items-center justify-center">

        <div className="relative flex flex-col bg-white/5 backdrop-blur-lg size-[80%]">
          <div className="absolute inset-x-0 top-4 md:top-10 text-center">
            <div className="text-2xl md:text-4xl">Time Traveler&apos;s</div>
            <div className="text-5xl md:text-7xl font-bold">Passport</div>
          </div>
          <Image src={IeeeDayLogoOuter} ref={outerLogoRef} alt="" width={400} height={400} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-75 md:scale-[85%] 2xl:scale-100" />
          <Image src={IeeeDayLogoInner} alt="" width={200} height={200} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-[60%] md:scale-90 2xl:scale-100" />
          <div className="hidden absolute inset-x-0 bottom-0 md:grid md:grid-cols-3 items-center md:mx-10">
            {chapterLogos.map((logo, index) => (<Image key={index} src={logo.src} alt="" height={300} width={300} className={`${logo == IeeeCsLogo ? 'scale-50 md:scale-[65%]' : 'scale-75 md:scale-90'} `} />))}
          </div>
          <div className="block md:hidden absolute left-1/2 -translate-x-1/2 bottom-0">
            <Image src={shownChapterLogo} alt="" width={400} height={400} />
          </div>

        </div>
      </div>

      <div className="w-[100%] md:w-[50%] h-screen flex items-center justify-center">
        <div className="relative flex flex-col bg-white/5 backdrop-blur-lg size-[80%]">
          <div className="absolute top-10 flex flex-col items-center justify-center text-center">
            <div className="text-2xl md:text-4xl font-semibold">IEEE Day 2025</div>
            <div className="px-4 md:px-20 mt-2 md:mt-4">A global celebration of technology and innovation, connecting minds, sharing ideas, and shaping the future.</div>
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-full gap-10 px-4 md:px-0">
            <div className="hidden md:block">
              {userData?.gender == "Female" && (<Image src={GirlAvatar} alt="" height={200} width={200} />)}
              {userData?.gender == "Male" && (<Image src={BoyAvatar} alt="" height={200} width={200} />)}
            </div>
            <div className="text-sm md:text-base">
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

          <div className="absolute bottom-4 grid grid-cols-3 items-center justify-center w-full text-sm md:text-base">
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
      </div>
    </div>
  );
};

export default Home;
