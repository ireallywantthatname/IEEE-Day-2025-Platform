"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchema, SignInType } from "@/types";
import { readUser } from "@/actions/firebaseActions";
import { useRouter } from "next/navigation";

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
    const [isFetching, setIsFetching] = useState(false);
    const [isUserNull, setIsUserNull] = useState(false);

    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
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
            setIsFetching(true);
            const user = await readUser(data.email, data.password);
            if (user == null) {
                setIsUserNull(true);

            }
            else {
                console.log(user);
                localStorage.setItem("userData", JSON.stringify(user));
                router.push("/passport");
            }
        } catch (e) {
            console.log(e);
        }
        finally {
            setIsFetching(false);
        }
    };

    return (
        <div className="relative z-50 flex flex-col bg-white/5 backdrop-blur-lg p-10 md:px-24 md:py-12">
            <div className={`${isUserNull ? "text-red-500 text-lg" : "text-2xl md:text-4xl"} font-semibold text-center h-20`}>{isUserNull ? "Something went wrong" : "Sign In"}</div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {fields.map((field, index) => (
                    <div key={index} className="h-28 w-60">
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
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className={`bg-white text-black px-4 py-2 hover:scale-95 transition-transform duration-300 ${isFetching && "animate-pulse"}`}
                    >
                        {isFetching ? ". . ." : "Sign In"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Home;
