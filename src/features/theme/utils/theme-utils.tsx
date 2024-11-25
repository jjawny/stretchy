import { HiCog as SystemModeIcon } from "react-icons/hi";
import { WiMoonAltWaxingCrescent1 as DarkModeIcon, WiMoonAltWaxingGibbous5 as LightModeIcon } from "react-icons/wi";
import { Theme } from "~/features/theme/enums/Theme";

export const resolveThemeIcon = (theme: Theme): React.ReactNode => {
  switch (theme) {
    case Theme.Light:
      return <LightModeIcon />;
    case Theme.Dark:
      return <DarkModeIcon />;
    case Theme.System:
      return <SystemModeIcon />;
    default:
      return <DarkModeIcon />;
  }
};
