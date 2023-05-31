import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import {
    TypedUseSelectorHook,
    useDispatch,
    useSelector,
} from 'react-redux'

import filesReducer from './reducers/filesSlice.js'

// --------------------------------------------------------------------------------

export const store = configureStore({
    reducer: {
        files: filesReducer,
    }
})

setupListeners(store.dispatch)

export type RootStore = typeof store

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector