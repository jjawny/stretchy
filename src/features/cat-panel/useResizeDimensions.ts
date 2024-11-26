import { NumberSize } from "re-resizable";
import { useUserPreferencesStore } from "~/shared/useUserPreferencesStore";

export const useResizeDimensions = () => {
  const currSize = useUserPreferencesStore((state) => state.userPreferences.miniHeroSize);
  const setUserPreferences = useUserPreferencesStore((state) => state.setUserPreferences);

  const handleResize = (e: any, direction: string, ref: HTMLElement, delta: NumberSize) => {
    const nextSize = {
      width: currSize.width + delta.width,
      height: currSize.height + delta.height,
    };
    setUserPreferences("miniHeroSize", nextSize);
  };

  const setSizeDirectly = (nextSize: NumberSize) => {
    setUserPreferences("miniHeroSize", nextSize);
  };

  return { size: currSize, handleResize, setSizeDirectly };
};
