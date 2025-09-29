import z from "zod";

export const SignInSchema = z.object({
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

export type UserType = {
  id: string;
  full_name: string;
  email: string;
  phone_number: string;
  password: string;
  food_preference: "Vegetarian" | "Non-vegetarian";
  gender: "Male" | "Female";
  nic: string;
  university_name: string;
  preferred_track_session_1:
    | "Quantum Computing"
    | "Data Science & Analytics with AI"
    | "AI & Robotics in Industry 4.0"
    | "AI in Cybersecurity"
    | "AI in Cloud Computing";
  preferred_track_session_2:
    | "Quantum Computing"
    | "Data Science & Analytics with AI"
    | "AI & Robotics in Industry 4.0"
    | "AI in Cybersecurity"
    | "AI in Cloud Computing";
  preferred_track_session_3:
    | "Quantum Computing"
    | "Data Science & Analytics with AI"
    | "AI & Robotics in Industry 4.0"
    | "AI in Cybersecurity"
    | "AI in Cloud Computing";
};
