import { createTheme } from "@mui/material/styles"

// ----------------------------------------------------------------------

export const theme = createTheme({
    palette: {
        primary: {
            main: '#202667'
        },
        secondary: {
            main: '#f2f2f2'
        }
    },
    components: {
        MuiTab: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: '400'
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: '300',
                    padding: '5px 10px'
                },

            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: 'black'
                },
            },
        }
    },
})