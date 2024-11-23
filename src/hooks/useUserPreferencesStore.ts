import { create } from "zustand";
import { Theme } from "~/enums/Theme";

export const LOCAL_STORAGE_KEY = "stretchy-preferences";

type UserPreferences = {
  theme: Theme;
};

type UserPreferencesStoreType = {
  userPreferences: UserPreferences;
  setUserPreferences: <K extends keyof UserPreferences>(key: K, value: UserPreferences[K]) => void;
};

const loadPreviouslySaved = (): UserPreferences => {
  const defaultUserPreferences: UserPreferences = { theme: Theme.System };
  let res = defaultUserPreferences;

  try {
    const savedJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedJSON) {
      const saved = JSON.parse(savedJSON) as UserPreferences;
      console.debug("Successfully loaded your previously saved preferences:", saved);
    }
  } catch (err) {
    console.warn("Failed to load your previously saved preferences:", err);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultUserPreferences));
  } finally {
    return res;
  }
};

export const useUserPreferencesStore = create<UserPreferencesStoreType>((set) => ({
  userPreferences: loadPreviouslySaved(),
  setUserPreferences: (key, value) =>
    set((state) => {
      const nextData = { ...state.userPreferences, [key]: value };

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(nextData));

      return { ...state, userPreferences: nextData };
    }),
}));
