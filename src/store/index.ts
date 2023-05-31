import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import {
    TypedUseSelectorHook,
    useDispatch,
    useSelector,
} from 'react-redux'

// reducers
import filesReducer from './reducers/filesSlice.js'

// --------------------------------------------------------------------------------

export const store = configureStore({
    reducer: {
        files: filesReducer,
    },
    middleware: (gDM) => gDM({ serializableCheck: false })
})

setupListeners(store.dispatch)

export type RootStore = typeof store

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector