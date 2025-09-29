"use client";

import * as z from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const SignInSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
});

export type SignInType = z.infer<typeof SignInSchema>;

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
