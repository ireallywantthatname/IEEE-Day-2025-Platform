"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchema, SignInType } from "@/types";
import { readUser } from "@/actions/firebaseActions";

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

const onSubmit: SubmitHandler<SignInType> = async (data) => {
  console.log(data);
  try {
    const user = await readUser(data.email, data.password);
    console.log(user);
  } catch (e) {
    console.log(e);
  }
};

const Home = () => {
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

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <div key={index} className="h-28 w-xs">
            <div className="font-bold">{field.label}</div>
            <input
              {...register(field.name as keyof SignInType)}
              type={field.type}
              className="border border-white p-1 text-base"
            />
            <div className="text-red-500 text-sm">
              {errors[field.name as keyof SignInType]?.message}
            </div>
          </div>
        ))}
        <button
          type="submit"
          className="bg-white text-black px-2 py-1 hover:scale-95 transition-transform duration-300"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Home;
