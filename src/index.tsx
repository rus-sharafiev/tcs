import { App } from './App'
import { store } from './store'
import { Provider } from 'react-redux'
import { theme } from './components/theme'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles'

// --------------------------------------------------------------------------------

createRoot(document.getElementById('root') as HTMLElement)
    .render(
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </Provider>
    )