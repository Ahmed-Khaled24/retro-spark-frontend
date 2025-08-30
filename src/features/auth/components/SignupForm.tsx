import CustomInput from "../../../components/CustomInput";
import { useState } from "react";
import { errorToast } from "../../../utils/toasters";
import { Link, useNavigate } from "react-router-dom";
import CustomButton from "../../../components/CustomButton";
import { useSignupMutation } from "../AuthApi";
import { SignupFormSchema, type SignupFormFields } from "../dtos/signup.dto";
import { useValidateForm } from "../../../hooks/useValidateForm";

const SignupForm = () => {
    const navigate = useNavigate();

    const { validate, fieldErrors } = useValidateForm(SignupFormSchema);
    const [fields, setFields] = useState<SignupFormFields>({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [signup, { isLoading }] = useSignupMutation();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const isValid = await validate({ ...fields });
        if (!isValid) return;

        await signup({
            name: fields.name,
            email: fields.email,
            password: fields.password,
        })
            .unwrap()
            .then(() => navigate("/app"))
            .catch(() => errorToast("Something went wrong!"));
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
                error={fieldErrors["name"]?.at(0)}
                required
            />
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
            <CustomInput
                label="Confirm Password"
                type="password"
                rounded="rounded-lg"
                placeholder="••••••••"
                value={fields.confirmPassword}
                onChange={(e) =>
                    setFields({ ...fields, confirmPassword: e.target.value })
                }
                error={fieldErrors["confirmPassword"]?.at(0)}
                required
            />

            <CustomButton rounded loading={isLoading} buttonType="submit">
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
