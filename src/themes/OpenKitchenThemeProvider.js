import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";


const theme = createTheme({
    palette: {
        primary: {
            main: '#AD1457',
        },
        secondary: {
            main: '#ffd54f'
        },
        background: {
            default: '#efebe9',
            paper: '#fafafa',
        }
    },
    shape: {
        borderRadius: 12,
    },
    spacing: 4,
});

const OpenKitchenThemeProvider = ({
  children,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default OpenKitchenThemeProvider;