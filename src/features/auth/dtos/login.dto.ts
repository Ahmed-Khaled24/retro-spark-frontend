import z from "zod";

export const LoginFormSchema = z.object({
    email: z.email(),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters.")
        .max(100, "Password must be less than 100 characters."),
});

export type LoginFormFields = z.infer<typeof LoginFormSchema>;

export type LoginDto = LoginFormFields;
