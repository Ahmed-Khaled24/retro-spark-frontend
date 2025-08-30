import { useState } from "react";
import { z, type ZodObject } from "zod";
import { errorToast } from "../utils/toasters";

export function useValidateForm<T extends ZodObject>(schema: T) {
    const [fieldErrors, setFieldErrors] = useState<{
        [K in keyof z.infer<T>]?: string[] | undefined;
    }>({});

    /**
     * Validate the data based on the given zod schema.
     * @param data The data to validate
     * @returns `true` if the data is valid, `false` otherwise
     */
    const validate = async (data: z.infer<T>) => {
        const validationResult = await schema.safeParseAsync(data);

        if (validationResult.success) return true;

        const errors = z.flattenError(validationResult.error);
        setFieldErrors(errors.fieldErrors);

        if (errors.formErrors?.length > 0) {
            errorToast(errors.formErrors.join("\n"));
        }

        return false;
    };

    return { fieldErrors, validate };
}
