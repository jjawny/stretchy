import { createTheme, PaletteOptions } from "@mui/material/styles";
import { useMemo } from "react";
import { darkPalette, lightPalette } from "~/constants/Palettes";
import { Theme } from "~/enums/Theme";
import { useTheme } from "~/hooks/useTheme";

/**
 * Resolves app's theme managed separately via chosen tech (Zustand/ReactQuery/etc)
 * @returns the MUI-compatible theme
 */
export const useMuiTheme = () => {
  const { theme } = useTheme(); // chosen tech

  const resolvedTheme = useMemo((): PaletteOptions => {
    const isDarkMode =
      theme === Theme.Dark || (theme === Theme.System && window.matchMedia("(prefers-color-scheme: dark)").matches);
    return isDarkMode ? darkPalette : lightPalette;
  }, [theme]);

  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: resolvedTheme,
        components: {
          MuiCssBaseline: {
            styleOverrides: (theme) => {
              const isDarkMode = theme.palette.mode === "dark";
              return {
                body: {
                  backgroundImage: `radial-gradient(circle, ${isDarkMode ? "#404040" : "#dadada"}  0.5px, transparent 0.5px)`, // dots
                  backgroundSize: "11px 11px", // dot spacing
                },
              };
            },
          },
        },
      }),
    [resolvedTheme],
  );

  return { muiTheme };
};
