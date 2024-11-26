import * as Yup from "yup";
import { DEFAULT_SIZE } from "~/features/mini-hero/mini-hero.constants";
import { Theme } from "~/features/theme/enums/Theme";
export const userPreferencesSchema = Yup.object({
  theme: Yup.string().oneOf(Object.values(Theme)).defined(),
  miniHeroSize: Yup.object({
    width: Yup.number().required().min(1, "Width must be at least 1"),
    height: Yup.number().required().min(1, "Height must be at least 1"),
  }).required("Size is required"),
});

export type UserPreferences = Yup.InferType<typeof userPreferencesSchema>;
export const DEFAULT_USER_PREFERENCES: UserPreferences = { theme: Theme.System, miniHeroSize: DEFAULT_SIZE };
