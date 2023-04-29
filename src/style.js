import { createTheme } from "@mui/material/styles";
import blue from "@mui/material/colors/blue";

export const defaultTheme = (mode) => {
  const isLight = mode === "light";

  return createTheme({
    palette: {
      white: `linear-gradient(0deg, rgba(103, 80, 164, 0.05), rgba(103, 80, 164, 0.05))`,
      mode: mode,
      background: {
        default: isLight ? "#F8F8F9" : "#121212",
      },
      primary: { main: blue[800] },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "capitalize",
            borderRadius: 20,
            "&:hover": {
              boxShadow: isLight ? "0 2px 8px 0 #7e868c" : "none",
              transform: "translateY(-1px)",
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            textTransform: "capitalize",
            borderRadius: 20,
            "&:hover": {
              boxShadow: isLight ? "0 2px 4px 0 #7e868c" : "none",
              transform: "translateY(-1px)",
              backgroundColor: isLight ? "#FFF" : "none",
            },
          },
        },
      },
      MuiListItemText: {
        styleOverrides: {
          root: {
            textTransform: "capitalize",
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            "&.Mui-selected": {
              "&:hover": {
                backgroundColor: isLight ? "#FFF" : "#none",
              },
              backgroundColor: isLight ? "#FFF" : "#none",
              boxShadow: "0 2px 24px rgb(104 112 118 / 0.15)",
            },
            "&:hover": {
              borderRadius: 50,
              boxShadow: "0 8px 12px rgb(104 112 118 / 0.15)",
              backgroundColor: isLight ? "#FFF" : "#none",
              transform: "translateY(-1px)",
            },
            borderRadius: 50,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: isLight ? "#FFF" : "#121212",
            borderRadius: 14,
            boxShadow: isLight ? "0 12px 24px rgb(104 112 118 / 0.15)" : "none",
            "&:hover": {
              boxShadow: isLight
                ? "0 22px 34px rgb(104 112 118 / 0.35)"
                : "none",
              transform: "translateY(-1px)",
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: isLight ? "#FFF" : "#121212",
            borderRadius: 14,
            boxShadow: isLight ? "0 12px 24px rgb(104 112 118 / 0.15)" : "none",
            "&:hover": {
              boxShadow: isLight
                ? "0 15px 26px rgb(104 112 118 / 0.20)"
                : "none",
              transform: "translateY(-1px)",
            },
          },
        },
      },
      MuiButtonGroup: {
        styleOverrides: {
          root: {
            textTransform: "capitalize",
            borderRadius: 20,
            boxShadow: 0,
            "&:hover": {
              boxShadow: isLight ? "0 2px 8px 0 #7e868c" : "none",
              transform: "translateY(-1px)",
            },
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            "&.MuiTableRow-hover:hover": {
              boxShadow: "0 8px 12px rgb(104 112 118 / 0.15)",
              transform: "translateY(-1px)",
            },
          },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            "&:hover": {
              transform: "translateY(-1px)",
            },
          },
        },
      },
    },
  });
};
