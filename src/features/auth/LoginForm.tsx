import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { z } from "zod";
import { useState } from "react";
import { errorToast } from "../../utils/toasters";

const LoginFormSchema = z.object({
    email: z.email(),
    password: z.string().min(8).max(100),
});
type LoginFormFields = z.infer<typeof LoginFormSchema>;

export const LoginForm = () => {
    const navigate = useNavigate();
    const [validating, setValidating] = useState(false);
    const [fields, setFields] = useState<LoginFormFields>({
        email: "",
        password: "",
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

        // Handle login logic here
        navigate("/app");
    };

    return (
        <form
            className="flex flex-col gap-8 w-sm bg-white border-primary-border border-1 px-4 py-8 rounded-md mt-20"
            onSubmit={handleSubmit}
        >
            <h1 className="font-pacifico! text-2xl mb-4">Welcome back!</h1>
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
            <Link to={"#"} className="text-black/50 underline">
                Forgot password?
            </Link>
            <CustomButton rounded loading={validating} buttonType="submit">
                Continue
            </CustomButton>
            <p className="text-black/50 flex gap-1">
                Don't have an account?
                <Link to="/auth/signup" className="underline">
                    Sign up
                </Link>
            </p>
        </form>
    );
};
