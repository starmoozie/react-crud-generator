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
            minWidth: 130,
            textTransform: "capitalize",
            borderRadius: 20,
            "&:hover": {
              boxShadow: isLight
                ? "0 2px 8px 0 #7e868c"
                : "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
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
              boxShadow: isLight
                ? "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)"
                : "none",
              transform: "translateY(-1px)",
              backgroundColor: isLight ? "#F8F8F9" : "none",
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
                backgroundColor: isLight
                  ? "#F8F8F9"
                  : "rgba(255, 255, 255, 0.08)",
              },
              backgroundColor: isLight ? "#FFF" : "rgba(255, 255, 255, 0.10)",
              boxShadow: "rgba(0, 0, 0, 0.25) 0px 2px 10px",
            },
            "&:hover": {
              borderRadius: 50,
              boxShadow: isLight ? "0 2px 8px 0 #7e868c" : "none",
              backgroundColor: isLight ? "#F8F8F9" : "#none",
              transform: "translateY(-1px)",
            },
            borderRadius: 50,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: isLight ? "#F8F8F9" : "#121212",
            borderRadius: 20,
            filter: isLight
              ? `drop-shadow(0 12px 24px rgb(104 112 118 / 0.15)) drop-shadow(0 12px 14px rgb(104 112 118 / 0.1))`
              : "none",
            "&:hover": {
              filter: isLight
                ? `drop-shadow(0 25px 34px rgb(104 112 118 / 0.35))`
                : "none",
              transform: "translateY(-2px)",
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: isLight ? "#F8F8F9" : "#1B1B1B",
            borderRadius: 20,
            filter: isLight
              ? `drop-shadow(0 12px 24px rgb(104 112 118 / 0.15)) drop-shadow(0 12px 14px rgb(104 112 118 / 0.1))`
              : `none`,
            "&:hover": {
              filter: isLight
                ? `drop-shadow(0 25px 34px rgb(104 112 118 / 0.35))`
                : `none`,
              transform: "translateY(-2px)",
            },
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          root: {
            "& .MuiDrawer-paper": {
              borderRadius: 0,
              ":hover": {
                filter: isLight
                  ? `drop-shadow(0 12px 24px rgb(104 112 118 / 0.15)) drop-shadow(0 12px 14px rgb(104 112 118 / 0.1))`
                  : "none",
                transform: "none",
              },
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
      MuiCheckbox: {
        styleOverrides: {
          root: {
            "&:hover": {
              transform: "translateY(-1px)",
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            boxShadow:
              "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
          },
        },
      },
    },
  });
};
