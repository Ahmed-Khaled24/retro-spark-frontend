import z from "zod";
import CustomInput from "../../components/CustomInput";
import { useState } from "react";
import { errorToast } from "../../utils/toasters";
import { Link, useNavigate } from "react-router-dom";
import CustomButton from "../../components/CustomButton";

const LoginFormSchema = z
    .object({
        name: z.string().min(2),
        email: z.email(),
        password: z.string().min(8).max(100),
        confirmPassword: z.string().min(8).max(100),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords must match",
    });
type LoginFormFields = z.infer<typeof LoginFormSchema>;

const SignupForm = () => {
    const navigate = useNavigate();
    const [validating, setValidating] = useState(false);
    const [fields, setFields] = useState<LoginFormFields>({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setValidating(true);
        try {
            await LoginFormSchema.parseAsync(fields);
        } catch (error) {
            if (error instanceof z.ZodError) {
                const messages = error.issues.map(
                    (e) => `${e.path.join(".")}: ${e.message}`,
                );
                errorToast(messages.join("\n"));
                return;
            }
        } finally {
            setValidating(false);
        }

        // Handle signup logic here
        navigate("/app");
    };
    return (
        <form
            className="flex flex-col gap-6 w-sm bg-white border-primary-border border-1 px-4 py-8 rounded-md mt-20"
            onSubmit={handleSubmit}
        >
            <h1 className="font-pacifico! text-2xl mb-4">Create account!</h1>
            <CustomInput
                label="Name"
                rounded="rounded-lg"
                placeholder="John Doe"
                value={fields.name}
                onChange={(e) => setFields({ ...fields, name: e.target.value })}
            />
            <CustomInput
                label="Email"
                rounded="rounded-lg"
                placeholder="email@example.com"
                value={fields.email}
                onChange={(e) =>
                    setFields({ ...fields, email: e.target.value })
                }
            />
            <CustomInput
                label="Password"
                type="password"
                rounded="rounded-lg"
                placeholder="••••••••"
                value={fields.password}
                onChange={(e) =>
                    setFields({ ...fields, password: e.target.value })
                }
            />
            <CustomInput
                label="Confirm Password"
                type="password"
                rounded="rounded-lg"
                placeholder="••••••••"
                value={fields.confirmPassword}
                onChange={(e) =>
                    setFields({ ...fields, confirmPassword: e.target.value })
                }
            />

            <CustomButton rounded loading={validating} buttonType="submit">
                Continue
            </CustomButton>
            <p className="text-black/50 flex gap-1">
                Already have an account?
                <Link to="/auth/login" className="underline">
                    Log in
                </Link>
            </p>
        </form>
    );
};

export default SignupForm;
