import { createRoot } from 'react-dom/client'
import { App } from './App'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './components/theme'
import { Provider } from 'react-redux'
import { store } from './store'

// --------------------------------------------------------------------------------

createRoot(document.getElementById('root') as HTMLElement)
    .render(
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </Provider>
    )