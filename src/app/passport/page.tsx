"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image, { StaticImageData } from "next/image";
import { UserType } from "@/types";
import GirlAvatar from "../../../public/girl-avatar.png"
import BoyAvatar from "../../../public/boy-avatar.png"
import IeeeDayLogoInner from "../../../public/logos/ieee-day-logo-inner.svg"
import IeeeDayLogoOuter from "../../../public/logos/ieee-day-logo-outer.svg"
import IeeeSbLogo from "../../../public/logos/ieee-nsbm-sb-logo.png"
import IeeeCsLogo from "../../../public/logos/ieee-nsbm-cs-logo.png"
import IeeeWieLogo from "../../../public/logos/ieee-nsbm-wie-logo.png"
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Countdown from "@/components/Countdown";

gsap.registerPlugin(useGSAP);

const chapterLogos = [IeeeSbLogo, IeeeCsLogo, IeeeWieLogo];

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
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const outerLogoRef = useRef<HTMLImageElement>(null);

  const router = useRouter();

  useGSAP(() => {
    gsap.from(
      outerLogoRef.current,
      {
        rotate: 360,
        duration: 4,
        repeat: -1,
        ease: "none",
      });
  }, []);

  if (userData == null) {
    return (
      <div className="relative z-50 flex flex-col items-center justify-center h-screen">
        <div className="bg-white/5 backdrop-blur-lg px-12 md:px-24 py-6 md:py-12">
          <button className="bg-white text-black px-4 py-2 hover:scale-95 transition-transform duration-300" onClick={() => router.push("/")}>Sign In</button>
        </div>
      </div>
    )
  }
  else {
    return (
      <div className="relative z-50 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-1">
        <div className="w-full h-160 md:h-screen flex items-center justify-center pt-4 md:py-10 2xl:py-20 px-4 md:pl-10 2xl:pl-20">

          <div className="relative flex flex-col bg-white/5 backdrop-blur-lg size-full">
            <div className="absolute inset-x-0 top-8 md:top-10 text-center">
              <div className="text-5xl md:text-6xl font-bold">Passport</div>
            </div>
            <Image src={IeeeDayLogoOuter} ref={outerLogoRef} alt="" width={400} height={400} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-75 md:scale-[80%] 2xl:scale-90" />
            <Image src={IeeeDayLogoInner} alt="" width={200} height={200} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-[70%] md:scale-90 2xl:scale-90" />
            <div className="hidden absolute inset-x-0 bottom-0 md:grid md:grid-cols-3 items-center md:mx-10">
              {chapterLogos.map((logo, index) => (<Image key={index} src={logo.src} alt="" height={300} width={300} className={`${logo == IeeeCsLogo ? 'scale-50 md:scale-[65%]' : 'scale-75 md:scale-90'}`} />))}
            </div>
            <div className="md:hidden absolute left-1/2 -translate-x-1/2 bottom-0 w-full flex items-center justify-center">
              <Image src={shownChapterLogo} alt="" width={300} height={300} className={`${shownChapterLogo == IeeeCsLogo ? "scale-75" : "scale-100 mb-8"}`} />
            </div>

          </div>
        </div>

        <div className="hidden fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 md:flex flex-col md:gap-6 2xl:gap-8">
          <div className="h-2 w-14 2xl:w-20 border-1 border-white bg-white/5"></div>
          <div className="h-2 w-14 2xl:w-20 border-1 border-white bg-white/5"></div>
          <div className="h-2 w-14 2xl:w-20 border-1 border-white bg-white/5"></div>
          <div className="h-2 w-14 2xl:w-20 border-1 border-white bg-white/5"></div>
          <div className="h-2 w-14 2xl:w-20 border-1 border-white bg-white/5"></div>
          <div className="h-2 w-14 2xl:w-20 border-1 border-white bg-white/5"></div>
          <div className="h-2 w-14 2xl:w-20 border-1 border-white bg-white/5"></div>
          <div className="h-2 w-14 2xl:w-20 border-1 border-white bg-white/5"></div>
          <div className="h-2 w-14 2xl:w-20 border-1 border-white bg-white/5"></div>
          <div className="h-2 w-14 2xl:w-20 border-1 border-white bg-white/5"></div>
          <div className="h-2 w-14 2xl:w-20 border-1 border-white bg-white/5"></div>
          <div className="h-2 w-14 2xl:w-20 border-1 border-white bg-white/5"></div>
          <div className="h-2 w-14 2xl:w-20 border-1 border-white bg-white/5"></div>
        </div>

        <div className="w-full h-160 md:h-screen flex items-center justify-center pb-4 md:py-10 2xl:py-20 px-4 md:pr-10 2xl:pr-20">
          <div className="relative flex flex-col bg-white/5 backdrop-blur-lg size-full">
            <div className="absolute top-10 flex flex-col items-center justify-center text-center">
              <div className="text-2xl md:text-4xl font-semibold">IEEE Day 2025</div>
              <div className="px-4 md:px-20 mt-2 md:mt-4">A global celebration of technology and innovation, connecting minds, sharing ideas, and shaping the future.</div>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center w-full gap-4 px-4 md:px-0">
              <div>
                {userData?.gender == "Female" && (<Image src={GirlAvatar} alt="" height={200} width={200} className="scale-[70%] md:scale-75 2xl:scale-90" />)}
                {userData?.gender == "Male" && (<Image src={BoyAvatar} alt="" height={200} width={200} className="scale-[70%] md:scale-75 2xl:scale-90" />)}
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
                  {/* <div className="font-semibold">Track Session: </div><div>{userData?.preferred_track_session_1}</div> */}
                </div>
              </div>
            </div>

            <div className="absolute bottom-4 grid grid-cols-2 items-center justify-center w-full text-sm md:text-base px-4 md:px-32 gap-4">
              <div className="border-2 border-white text-center h-24 flex flex-col items-center justify-center">
                <button className="bg-white text-black px-4 py-2 hover:scale-95 transition-transform duration-300">Pre-event Puzzle</button>
                <Countdown date={"2025-10-06T20:00:00Z"} />
              </div>
              <div className="border-2 border-white text-center h-24 flex flex-col items-center justify-center">
                <button className="bg-white text-black px-4 py-2 hover:scale-95 transition-transform duration-300">In event Quiz</button>
                <Countdown date={"2025-10-07T13:00:00Z"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  }

};

export default Home;
