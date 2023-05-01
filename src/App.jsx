import { useMemo, useState } from "react";
import Router from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { StyledEngineProvider, createTheme } from "@mui/material";
import { defaultTheme } from "@/style";
import { ColorModeContext } from "@hook";

const queryClient = new QueryClient();

const App = () => {
  const [mode, setMode] = useState("light");

  // TODO => Dark theme support
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(() => defaultTheme(mode), [mode]);

  return (
    <StyledEngineProvider injectFirst>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <Router />
          </QueryClientProvider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </StyledEngineProvider>
  );
};

export default App;
