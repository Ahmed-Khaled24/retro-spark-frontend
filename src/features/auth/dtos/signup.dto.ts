import z from "zod";

export const SignupFormSchema = z
    .object({
        name: z.string().min(2, "Name must be at least two characters"),
        email: z.email(),
        password: z
            .string()
            .min(8, "Password must be at least 8 characters.")
            .max(100, "Password must be less than 100 characters."),
        confirmPassword: z
            .string()
            .min(8, "Confirm Password must be at least 8 characters.")
            .max(100, "Confirm Password must be less than 100 characters."),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Password and Confirm Password fields must match",
    });

export type SignupFormFields = z.infer<typeof SignupFormSchema>;

export type SignupDto = Omit<SignupFormFields, "confirmPassword">;
