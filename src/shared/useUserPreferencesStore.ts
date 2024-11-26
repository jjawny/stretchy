import { create } from "zustand";
import { DEFAULT_USER_PREFERENCES, UserPreferences, userPreferencesSchema } from "~/shared/userPreferences.type";

export const LOCAL_STORAGE_KEY = "STRETCHY_USER_PREFERENCES";

type UserPreferencesStoreType = {
  userPreferences: UserPreferences;
  setUserPreferences: <K extends keyof UserPreferences>(key: K, value: UserPreferences[K]) => void;
};

const loadPreviouslySaved = async (): Promise<UserPreferences> => {
  let res = DEFAULT_USER_PREFERENCES;

  try {
    const savedJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedJSON) {
      const saved = JSON.parse(savedJSON) as UserPreferences;
      const isValid = await userPreferencesSchema.isValid(saved);
      if (isValid) {
        console.debug("Successfully loaded your previously saved preferences:", saved);
        res = saved;
      } else {
        console.warn("Failed to load your previously saved preferences: Corrupted");
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_USER_PREFERENCES));
      }
    }
  } catch (err) {
    console.warn("Failed to load your previously saved preferences:", err);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_USER_PREFERENCES));
  } finally {
    return res;
  }
};

/**
 * FYI: Bc saved in LocalStorage, it is considered external/async state and should be managed by ReactQuery (if installed)
 */
export const useUserPreferencesStore = create<UserPreferencesStoreType>((set) => ({
  userPreferences: DEFAULT_USER_PREFERENCES,
  setUserPreferences: (key, value) =>
    set((state) => {
      const nextData = { ...state.userPreferences, [key]: value };

      // TODO: throttle
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(nextData));

      return { ...state, userPreferences: nextData };
    }),
}));

// Runs ONCE when store is accessed (imported), store is then turned into singleton
loadPreviouslySaved().then((previouslySaved) => {
  useUserPreferencesStore.setState({
    userPreferences: previouslySaved,
  });
});
