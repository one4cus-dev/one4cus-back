// src\common\validation\validate-request.ts

//validateRequest is a helper function that takes a Zod schema and the data to validate. It returns the validated data if successful or throws a ValidationError if validation fails.

import {ZodSchema} from "zod";
import {ValidationError} from "../errors/validation-error.js";

export function validateRequest<T>(schema:ZodSchema<T>,data:unknown):T{
    const result = schema.safeParse(data);

    if(!result.success){
        throw new ValidationError("Validation failed",result.error.flatten());
    }

    return result.data;
}