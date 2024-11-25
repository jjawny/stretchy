import { ThemeProvider as MuiThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { useMuiTheme } from "~/features/theme/hooks/useMuiTheme";

type MuiThemeWrapperProps = {
  children: React.ReactNode;
};

const MuiThemeWrapper: React.FC<MuiThemeWrapperProps> = (props) => {
  const { children } = props;
  const { muiTheme } = useMuiTheme();

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

export default MuiThemeWrapper;
