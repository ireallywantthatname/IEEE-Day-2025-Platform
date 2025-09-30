"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchema, SignInType } from "@/types";
import { readUser } from "@/actions/firebaseActions";
import { useRouter } from "next/navigation";


import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import IeeeDayLogoInner from "../../public/logos/ieee-day-logo-inner.svg";
import IeeeDayLogoOuter from "../../public/logos/ieee-day-logo-outer.svg";
import BackgroundImage from "../../public/background.jpg";


const fields = [
    {
        name: "email",
        type: "email",
        label: "Email Address",
    },
    {
        name: "password",
        type: "password",
        label: "Password",
    },
];

const Home = () => {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<SignInType>({
        resolver: zodResolver(SignInSchema),
        mode: "onChange",
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit: SubmitHandler<SignInType> = async (data) => {
        console.log(data);
        try {
            const user = await readUser(data.email, data.password);
            console.log(user);
            localStorage.setItem("userData", JSON.stringify(user));
        } catch (e) {
            console.log(e);
        }
        router.push("/passport");
    };


    const outerLogoRef = useRef<HTMLImageElement>(null);
    const innerLogoRef = useRef<HTMLImageElement>(null);

    useEffect(() => {

        if (outerLogoRef.current) {
            gsap.to(outerLogoRef.current, {
                rotate: 360,
                duration: 20,
                ease: "linear",
                repeat: -1,
            });
        }
    }, []);


    return (
        //<div className="flex flex-col items-center justify-center h-screen px-4 ${audiowide.className} ">
        <div className={`flex flex-col items-center justify-center h-screen px-4 bg-[url('/background.jpg')] bg-cover bg-center`}>
            <div className=" rounded-lg shadow-lg flex flex-col md:flex-row items-center md:items-stretch w-full max-w-3xl">
                <div className="flex items-center justify-center bg-black/10 p-8 md:w-1/2">
                    <div className="relative w-80 h-80 flex items-center justify-center" >
                        <Image
                            ref={outerLogoRef}
                            src={IeeeDayLogoOuter}
                            width={305}
                            height={305}
                            alt="IEEE Day Logo Outer"
                            className="absolute"
                        />
                        <Image
                            src={IeeeDayLogoInner}
                            width={163}
                            height={163}
                            alt="IEEE Day Logo Inner"
                            className="absolute"
                        />
                        <Image
                            src={BackgroundImage}
                            alt="Background"
                            className="absolute -z-10 w-full h-full"
                        />
                    </div>
                </div>


                <div className="p-8 md:w-1/2" >
                    <h2 className="text-center text-xl font-bold mb-6">Sign In</h2>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        {fields.map((field, index) => (
                            <div key={index} className="h-28">
                                <div className="font-bold">{field.label}</div>
                                <input
                                    {...register(field.name as keyof SignInType)}
                                    type={field.type}
                                    className="border border-white p-1 text-base w-full"
                                />
                                <div className="text-red-500 text-sm">
                                    {errors[field.name as keyof SignInType]?.message}
                                </div>
                            </div>
                        ))}
                        <button
                            type="submit"
                            className="bg-white text-black px-4 py-2 w-full mt-4 hover:scale-95 transition-transform duration-300"
                        >
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Home;
