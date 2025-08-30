import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../../../components/CustomInput";
import CustomButton from "../../../components/CustomButton";
import { useState } from "react";
import { errorToast, infoToast } from "../../../utils/toasters";
import { LoginFormSchema, type LoginFormFields } from "../dtos/login.dto";
import { useLoginMutation } from "../AuthApi";
import { useValidateForm } from "../../../hooks/useValidateForm";

export const LoginForm = () => {
    const navigate = useNavigate();
    const [login, { isLoading }] = useLoginMutation();
    const { validate, fieldErrors } = useValidateForm(LoginFormSchema);
    const [fields, setFields] = useState<LoginFormFields>({
        email: "",
        password: "",
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const isValid = await validate(fields);
        if (!isValid) return;

        await login({
            email: fields.email,
            password: fields.password,
        })
            .unwrap()
            .then(() => navigate("/app"))
            .catch(() => errorToast("Something went wrong!"));
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
                error={fieldErrors["email"]?.at(0)}
                required
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
                error={fieldErrors["password"]?.at(0)}
                required
            />
            <Link
                to={"#"}
                className="text-black/50 underline"
                onClick={() => infoToast("Not implemented yet!")}
            >
                Forgot password?
            </Link>
            <CustomButton rounded loading={isLoading} buttonType="submit">
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
