import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combine ClassNames (from props and on component itself) in a type-safe & predictable way
 */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
